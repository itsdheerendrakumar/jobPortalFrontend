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

export const createNewUser = async (endPoint: string, payload: ISignup) => {
    const res = await api.post(endPoint, payload);
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

// export const deleteAdmin = async (adminId: string) => {
//     const res = await api.delete(`/user/admin/${adminId}`);
//     return res.data;
// }

export const createJob = async (payload: JobForm) => {
    const res = await api.post("/job", payload);
    return res.data;
}

export const getJob = async () => {
    const res = await api.get("/job");
    return res.data;
}

export const getJobDetail = async (jobId: string) => {
    const res = await api.get(`/job/${jobId}`);
    return res.data;
}

export const getReviewerListing = async () => {
    const res = await api.get("user/reviewer-listing");
    return res?.data
}

export const promoteReviewer = async (userId: string) => {
    const res = await api.patch("/user/promote-reviewer", {userId})
    return res.data;
}

export const applyJob = async (jobId: string) => {
    const res = await api.post("/applied-job", {jobId});
    return res.data;
}

export const getAppliedJobs = async () => {
    const res = await api.get("/applied-job");
    return res.data;
}

export const getUserSelectListing = async( payload: {role: UserRole}) => {
    const searchParams = new URLSearchParams(payload).toString();
    const res = await api.get(`/user/select-listing?${searchParams}`);
    return res.data;
}

export const assignReviewer = async (payload: AssignReviewerPayload) => {
    const res = await api.patch("/applied-job/assign-reviewer", payload);
    return res.data;
}

export const getAssignedJob = async () => {
    const res = await api.get("/applied-job/assigned-job");
    return res.data;
}