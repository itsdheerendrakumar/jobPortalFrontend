import { getJobDetail } from "@/service/apis";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"

export function JobPage() {

    const {jobId} = useParams();
    const jobQuery = useQuery<any>({
        queryKey: ["jobById"],
        queryFn: () => getJobDetail(jobId),
        enabled: jobId?.length > 0
    })
    return (
        <div>job page</div>
    )
}