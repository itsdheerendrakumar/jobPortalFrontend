import { JobPage } from "@/pages/common/JobPage";
import { Home } from "@/pages/users/Home";
import { Applications } from "@/pages/users/Applications";
export const userRoutes = [
    {path: "/", Page: Home},
    {path: "/job/:jobId", Page: JobPage},
    {path: "/applications", Page: Applications},
]