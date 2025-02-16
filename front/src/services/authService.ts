import axios from "axios";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

export interface SignupFormData {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['todovea_auth_token'], {
    doNotParse: true,
  });
  const router = useRouter();

  const signup = async (formData: SignupFormData) => {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      username: formData.username,
      password: formData.password,
      firstname: formData.firstname,
      lastname: formData.lastname,
    });

    if (!response.data.token.todovea_auth_token) {
      throw new Error("Authentification échouée");
    }
    
    setCookie("todovea_auth_token", response.data.token.todovea_auth_token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token.todovea_auth_token}`;
    return response.data.token.todovea_auth_token;
  };

  const login = async (formData: LoginFormData) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username: formData.username,
      password: formData.password,
    });

    if (!response.data.todovea_auth_token) {
      throw new Error("Authentification échouée");
    }

    setCookie("todovea_auth_token", response.data.todovea_auth_token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.todovea_auth_token}`;
    return response.data.todovea_auth_token;
  };

  const logout = () => {
    removeCookie("todovea_auth_token");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
  };

  return { signup, login, logout };
};
