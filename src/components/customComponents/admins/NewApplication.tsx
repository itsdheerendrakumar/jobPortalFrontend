import { TableView } from "../common/TableView";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignReviewer, getAppliedJobs, getUserSelectListing } from "@/service/apis";
import { ButtonLoading, RowLoading } from "../common/Loader";
import type { CustomError } from "@/types/error";
import { NoDataFound } from "../common/NoDataFound";
import { ShowError } from "../common/ShowError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
const header = ["Applicant", "Job", "category", "Applied Date", "Deadline"];

export function NewApplication() {
    
    const queryClient = useQueryClient();
    const appliedJobQuery = useQuery<AdminAppliedJobListing, CustomError>({
        queryKey: ["applied-job-listing"],
        queryFn: () => getAppliedJobs(),
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })
    const reviewerListingQuery = useQuery<UserSelectDataResponse, CustomError>({
        queryKey: ["reviewer-listing"],
        queryFn: () => getUserSelectListing({role: "reviewer"}),
    })

    const assignReviewerMutation = useMutation<EmptyDataResponse, CustomError, AssignReviewerPayload>({
        mutationFn: (payload) => assignReviewer(payload),
        onSuccess: function (data) {
            queryClient.invalidateQueries({queryKey: ["applied-job-listing"]});
            toast.success(data?.message)
        }
    })

    const action: React.ReactNode[] = [];
    const data: TableData = []
    appliedJobQuery.data?.data?.forEach((value, index) => {
        action.push(
        <Select key={index} onValueChange={(reviewerId) => assignReviewerMutation.mutate({docId: value?._id, reviewerId})} >
            <SelectTrigger disabled={assignReviewerMutation.isPending}>
                <SelectValue placeholder="Select reviewer" />
            </SelectTrigger>
            <SelectContent>
                {reviewerListingQuery.isLoading && <ButtonLoading />}
                {reviewerListingQuery.isSuccess && reviewerListingQuery.data.data.map(({label, value}) => (
                    <SelectItem key={value} value={value}>
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        );
        data.push([
            value?.userId?.name, 
            value?.jobId?.jobTitle, 
            value?.jobId?.category, 
           format(value?.createdAt, "dd-MM-yyyy hh:mm a"),
           format(value?.jobId?.deadline, "dd-MM-yyyy hh:mm a")        
        ])
})
    
    if(appliedJobQuery.isLoading) return <RowLoading />
    if(!appliedJobQuery.data?.data?.length) return <NoDataFound />
    if(appliedJobQuery.isError) return <ShowError message={appliedJobQuery.error?.response?.data?.message} />

    return(
        <TableView 
            headers={header} 
            data={data} action={action ?? []}
            actionLabel="Assign Reviewer"
        />
    )
}