import {api} from "./apiInstance"

export const login = async (payload: ILogin) => {
    const res = await api.post("/auth/login", payload);
    return res.data;
}

export const getProfile = async () => {
    const res = await api.get("/auth/profile");
    return res.data;
}