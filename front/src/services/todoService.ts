import axios from "axios";
import { useCookies } from "react-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

export enum TodoStatus {
    Todo = 'Todo',
    InProgress = 'InProgress',
    Completed = 'Completed'
}

export interface TodoData {
    _id: string;
    title: string;
    description: string;
    status: TodoStatus;
    owner: string;
    assignedUsers: string[];
    createdAt: Date;
    lastModification: Date;
}

export const useTodo = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['todovea_auth_token'], {
        doNotParse: true,
      });

    const getTodos = async (): Promise<TodoData[]> => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${cookies["todovea_auth_token"]}`;
        const response = await axios.get(`${API_URL}/todos`);

        return response.data;
    };

    const createTodo = async (todoData: TodoData): Promise<TodoData> => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${cookies["todovea_auth_token"]}`;
        const response = await axios.post(`${API_URL}/todos`, {
            title: todoData.title,
            description: todoData.description,
            status: TodoStatus.Todo,
            assignedUsers: [],
        });

        return response.data;
    };

    const updateTodo = async (todoId: string, todoData: TodoData): Promise<TodoData> => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${cookies["todovea_auth_token"]}`;
        const response = await axios.put(`${API_URL}/todos/${todoId}`, {
            title: todoData.title,
            description: todoData.description,
            status: todoData.status,
            owner: todoData.owner,
            assignedUsers: todoData.assignedUsers,
            createdAt: todoData.createdAt,
            lastModification: todoData.lastModification
        });

        return response.data;
    };

    const assignTodo = async (todoId: string, userIds: string[]): Promise<TodoData> => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${cookies["todovea_auth_token"]}`;
        const response = await axios.put(`${API_URL}/todos/assign/${todoId}`, {
            userIds: userIds
        });

        return response.data;
    };

    const deleteTodo = async (todoId: string) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${cookies["todovea_auth_token"]}`;
        const response = await axios.delete(`${API_URL}/todos/${todoId}`);

        return response.data;
    };

    return { getTodos, createTodo, updateTodo, assignTodo, deleteTodo };
};
