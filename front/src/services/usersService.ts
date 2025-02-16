import axios from "axios";
import { TodoData } from "./todoService";
import { useCookies } from "react-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

export interface UserData {
  _id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  assignedTodos: TodoData[];
  createdAt: Date;
}

export const useUsers = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['todovea_auth_token'], {
      doNotParse: true,
    });

  const getAllUsers = async (): Promise<UserData[]> => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookies["todovea_auth_token"]}`;
    const response = await axios.get(`${API_URL}/users`);

    return response.data;
  };

  const getUserById = async (userId: string): Promise<UserData> => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookies["todovea_auth_token"]}`;
    const response = await axios.get(`${API_URL}/users/${userId}`);

    return response.data;
  };

  const getMe = async (): Promise<UserData> => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookies["todovea_auth_token"]}`;
    const response = await axios.get(`${API_URL}/users/me`);

    return response.data;
  }

  return { getAllUsers, getUserById, getMe };
};
