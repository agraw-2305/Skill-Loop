import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export const register = async (body) => {
    const res = await api.post("/api/auth/register", body);
    return res.data;
};

export const login = async (body) => {
    const res = await api.post("/api/auth/login", body);
    return res.data;
};

export const logout = async () => {
    const res = await api.get("/api/auth/logout");
    return res.data;
};

export const getMe = async () => {
    const res = await api.get("/api/auth/get-me");
    return res.data;
};