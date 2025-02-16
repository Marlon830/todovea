import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

export enum TodoStatus {
    Todo = 'Todo',
    InProgress = 'InProgress',
    Completed = 'Completed'
}

export interface TodoData {
    title: string;
    description: string;
    status: TodoStatus;
    owner: string;
    assignedUsers: string[];
    createdAt: Date;
    lastModification: Date;
}

export const useTodo = () => {
    const getTodos = async () => {
        const response = await axios.get(`${API_URL}/todos`);

        return response.data;
    };

    const createTodo = async (todoData: TodoData) => {
        const response = await axios.post(`${API_URL}/todos`, {
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

    const updateTodo = async (todoId: string, todoData: TodoData) => {
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

    const assignTodo = async (todoId: string, userId: string) => {
        const response = await axios.post(`${API_URL}/todos/assign/${todoId}`, {
            userId: userId
        });

        return response.data;
    };

    const deleteTodo = async (todoId: string) => {
        const response = await axios.delete(`${API_URL}/todos/${todoId}`);

        return response.data;
    };

    return { getTodos, createTodo, updateTodo, assignTodo, deleteTodo };
};
