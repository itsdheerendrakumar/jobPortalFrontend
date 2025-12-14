import { FullPageLoding } from "@/components/customComponents/common/Loader";
import { NoDataFound } from "@/components/customComponents/common/NoDataFound";
import { ShowError } from "@/components/customComponents/common/ShowError";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAppliedJobForUser } from "@/service/apis";
import { useProfileStore } from "@/store/profile";
import type { CustomError } from "@/types/error";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
const headers = ["Job Title", "Company", "Applied On", "Status"];
export function Applications() {

    const {id} = useProfileStore();
    const appliedJobsQuery = useQuery<AppliedJobListingUserResponse, CustomError>({
        queryKey: ["appliedJobs", id],
        queryFn: getAppliedJobForUser,
        refetchOnWindowFocus: false,
    })
    if(appliedJobsQuery.isLoading) return <FullPageLoding />
    if(appliedJobsQuery.isError) return <ShowError message={appliedJobsQuery.error?.response?.data?.message}/>
    if(appliedJobsQuery.isSuccess && appliedJobsQuery.data?.data.length === 0) return <NoDataFound message="You have not applied any job" />

    return (
        < div className="p-4">
            <h1>Applied jobs</h1>
            <Separator className="my-4"/>
            <Table className=" bg-white">
                <TableHeader>
                    <TableRow>
                        {headers.map((header) => (
                            <TableHead key={header} className="text-left">{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appliedJobsQuery?.data?.data?.map((job, ind) => (
                        <TableRow key={ind}>
                            <TableCell>
                                {job.jobId?.jobTitle}
                            </TableCell>
                            <TableCell>
                                {job.jobId?.companyName}
                            </TableCell>
                            <TableCell>
                                {format(job.createdAt, "dd/MM/yyyy")}
                            </TableCell>
                            <TableCell>
                                {(job.adminStatus === "selected" && job.adminStatus === "selected") ?
                                    <span className="text-green-600 font-medium">Selected</span> :
                                    (job.adminStatus === "rejected" && job.adminStatus === "rejected") ?
                                        <span className="text-red-600 font-medium">Rejected</span> :
                                        <span className="text-blue-600 font-medium">Under Review</span>
                                }
                            </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}