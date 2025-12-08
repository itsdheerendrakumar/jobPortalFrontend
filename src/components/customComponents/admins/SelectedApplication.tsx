import { useQuery } from "@tanstack/react-query";
import { getSelectedApplicationByAdmin } from "@/service/apis";
import { RowLoading } from "../common/Loader";
import { ShowError } from "../common/ShowError";
import type { CustomError } from "@/types/error";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const header = ["Applicant Name", "Job Title", "Company Name", "Reviewer Name", "Reviewer Email", "Reason"];

export function SelectedApplication() {
    const navigate = useNavigate();
    const selectedApplicationQuery = useQuery<ReviewedApplicationResponse, CustomError>({
        queryKey: ["selectedApplicationsByAdmin"],
        queryFn: getSelectedApplicationByAdmin,
        gcTime: Infinity,
        staleTime: Infinity,
    })
    if(selectedApplicationQuery.isLoading) return <RowLoading />
        if(selectedApplicationQuery.isError) return <ShowError message={selectedApplicationQuery?.error?.response?.data?.message} />
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
                        {selectedApplicationQuery.data?.data.map((application, index) => (
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
    )
}