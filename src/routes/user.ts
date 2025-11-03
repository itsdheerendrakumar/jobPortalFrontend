import { JobPage } from "@/pages/common/JobPage";
import { Home } from "@/pages/users/Home";

export const userRoutes = [
    {path: "/", Page: Home},
    {path: "/job/:jobId", Page: JobPage},
]