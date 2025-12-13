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
export const updateReviewerStatus = async (payload: UpdateReviewerStatusPayload) => {
    const res = await api.patch("/user/reviewer-status", payload);
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

export const getTypeUserById = async (id: string) => {
    const res = await api.get(`/user/user/${id}`);
    return res.data;
}

export const uploadProfile = async (formData: FormData) => {
    const res = await api.post("/user/profile", formData);
    return res.data;
}

export const getProfilePicture = async () => {
    const res = await api.get("/user/profile", {responseType: "blob"});
    const profileUrl = URL.createObjectURL(res.data)
    console.log(profileUrl);
    return profileUrl
}

export const addEducation = async (payload: {education: Record<EducationKeys, string>[]}) => {
    const res = await api.post("/user/education", payload);
    return res.data;
}
export const getEducation = async () => {
    const res = await api.get("/user/education");
    return res.data;
}

export const reviewerResponseToAssignedJob = async (payload:ReviewerResponseToAssignedJobPayload) => {
    const res = await api.patch("/applied-job/assigned-job", payload);
    return res.data;
}

export const getReviewedApplications = async () => {
    const res = await api.get("/applied-job/selected-application-by-reviewer");
    return res.data;
}

export const uploadResume = async (resumeData: FormData) => {
    const res = await api.post("/user/resume", resumeData);
    return res.data;
}

export const getUserResume = async (publicId: string) => {
    const searchParams = new URLSearchParams({publicId}).toString();
    const res = await api.get(`/user/resume?${searchParams}`);
    return res.data;
}

export const adminResponseToApplication = async (payload: AdminResponseToApplicationPayload) => {
    const res = await api.patch("/applied-job/admin-response", payload);
    return res.data;
}
export const getSelectedApplicationByAdmin = async () => {
    const res = await api.get("/applied-job/selected-application-by-admin");
    return res.data;
}

export const updateJobDeadline = async (payload: ExtendDeadlinePayload) => {
    const res = await api.patch("/job", payload);
    return res.data;
}
