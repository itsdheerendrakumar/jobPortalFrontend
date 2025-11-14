import { JobPage } from "@/pages/common/JobPage";
import { TypeUserDetail } from "@/pages/common/userDetail";
import { Home } from "@/pages/reviwers/Home";

export const reviewerRoutes = [
    {path: "/", Page: Home},
    {path: "/job/:jobId", Page: JobPage},
    {path: "/user/:id", Page: TypeUserDetail},
]