import Home from "@/pages/admins/Home";
import { Job } from "@/pages/admins/Job";
import { JobPage } from "@/pages/common/JobPage";


export const adminRoutes = [
    {path: "/", Page: Home},
    {path: "/jobs", Page: Job},
    {path: "/job/:jobId", Page: JobPage}
]