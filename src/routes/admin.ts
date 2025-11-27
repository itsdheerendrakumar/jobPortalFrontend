import Home from "@/pages/admins/Home";
import { Job } from "@/pages/admins/Job";
import { JobPage } from "@/pages/common/JobPage";
import { TypeUserDetail } from "@/pages/common/UserDetail";


export const adminRoutes = [
    {path: "/", Page: Home},
    {path: "/jobs", Page: Job},
    {path: "/job/:jobId", Page: JobPage},
    {path: "/user/:id", Page: TypeUserDetail},
]