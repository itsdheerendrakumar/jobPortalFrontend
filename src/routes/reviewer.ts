import { JobPage } from "@/pages/common/JobPage";
import { Home } from "@/pages/reviwers/Home";

export const reviewerRoutes = [
    {path: "/", Page: Home},
    {path: "/job/:jobId", Page: JobPage}
]