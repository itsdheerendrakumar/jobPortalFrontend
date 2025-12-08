import { adminResponseToApplication, getReviewedApplications } from "@/service/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CustomError } from "@/types/error";
import { RowLoading } from "../common/Loader";
import { ShowError } from "../common/ShowError";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const header = ["Applicant Name", "Job Title", "Company Name", "Reviewer Name", "Reviewer Email", "Reason", "Action"];

export function ReviewedApplication() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const reviewedApplicationQuery = useQuery<ReviewedApplicationResponse, CustomError>({
        queryKey: ['reviewedApplications'],
        queryFn: getReviewedApplications
    })
    const adminResponseMutation = useMutation<EmptyDataResponse, CustomError, AdminResponseToApplicationPayload>({
        mutationFn: (payload) => adminResponseToApplication(payload),
        onSuccess: () => {
            reviewedApplicationQuery.refetch();
            queryClient.invalidateQueries({queryKey: ["electedApplicationsByAdmin"]});
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Something went wrong while responding to application");
        }
    });
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
                            <Button 
                                size="sm" 
                                className="bg-chart-2/70 hover:bg-chart-2/90"
                                disabled={adminResponseMutation.isPending}
                                onClick={() => adminResponseMutation.mutate({docId: application._id, adminStatus: "selected"})}
                            >
                                Select
                            </Button>
                            <Button 
                                variant="destructive" 
                                size="sm"
                                disabled={adminResponseMutation.isPending}
                                onClick={() => adminResponseMutation.mutate({docId: application._id, adminStatus: "rejected"})}
                            >
                                Reject
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}