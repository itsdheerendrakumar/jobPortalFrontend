import type { JobForm } from "@/types/inferType";
import {api} from "./apiInstance"

export const login = async (payload: ILogin) => {
    const res = await api.post("/auth/login", payload);
    return res.data;
}

export const getProfile = async () => {
    const res = await api.get("/auth/profile");
    return res.data;
}

export const createNewAdmin = async (payload: ISignup) => {
    const res = await api.post("/user/admin", payload);
    return res.data;
}

export const getSuperAdminMetrics = async () => {
    const res = await api.get("/user/admin-metrics");
    return res.data;
}

export const getAdminListing = async () => {
    const res = await api.get("/user/admin-listing");
    return res.data;
}

export const updateAdminStatus = async (payload: UpdateAdminStatusPayload) => {
    const res = await api.patch("/user/admin-status", payload);
    return res.data;
}

export const deleteAdmin = async (adminId: string) => {
    const res = await api.delete(`/user/admin/${adminId}`);
    return res.data;
}

export const createJob = async (payload: JobForm) => {
    const res = await api.post("/job", payload);
    return res.data;
}

export const getJob = async () => {
    const res = await api.get("/job");
    return res.data;
}