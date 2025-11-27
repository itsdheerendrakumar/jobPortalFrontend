import { getReviewedApplications } from "@/service/apis";
import { useQuery } from "@tanstack/react-query";
import type { CustomError } from "@/types/error";
import { RowLoading } from "../common/Loader";
import { ShowError } from "../common/ShowError";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const header = ["Applicant Name", "Job Title", "Company Name", "Reviewer Name", "Reviewer Email", "Reason", "Action"];

export function ReviewedApplication() {
    const navigate = useNavigate();
    const reviewedApplicationQuery = useQuery<ReviewedApplicationResponse, CustomError>({
        queryKey: ['reviewedApplications'],
        queryFn: getReviewedApplications
    })
    if(reviewedApplicationQuery.isLoading) return <RowLoading />
    if(reviewedApplicationQuery.isError) return <ShowError message={reviewedApplicationQuery?.error?.response?.data?.message} />
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    {header.map((head, index) => (
                        <TableHead key={index}>
                            {head}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {reviewedApplicationQuery.data?.data.map((application, index) => (
                    <TableRow key={index}>
                        <TableCell
                            className="cursor-pointer hover:bg-success/50"
                            onClick={() => navigate(`/user/${application?.applicantDetail?._id}`)}
                        >
                            {application?.applicantDetail?.name}
                        </TableCell>
                        <TableCell
                            className="cursor-pointer hover:bg-success/50"
                            onClick={() => navigate(`/job/${application?.jobDetails?.jobId}`)}
                        >
                            {application?.jobDetails?.jobTitle}
                        </TableCell>
                        <TableCell>{application?.jobDetails?.companyName}</TableCell>
                        <TableCell>{application?.reviewerDetail?.name}</TableCell>
                        <TableCell>{application?.reviewerDetail?.email}</TableCell>
                        <TableCell>
                            <Tooltip>
                                <TooltipTrigger>View</TooltipTrigger>
                                <TooltipContent>
                                    <p>{application?.reason}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TableCell>
                        <TableCell className="flex gap-2.5">
                            <Button size="sm" className="bg-chart-2/70 hover:bg-chart-2/90">Select</Button>
                            <Button variant="destructive" size="sm">Reject</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}