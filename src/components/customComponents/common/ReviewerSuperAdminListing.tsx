import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { updateReviewerStatus } from "@/service/apis"
import { useProfileStore } from "@/store/profile"
import type { CustomError } from "@/types/error"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ShieldCheck, ShieldOff } from "lucide-react"
import { toast } from "sonner"
import { RowLoading } from "./Loader"
import { useReviewerListing } from "@/hooks/useReviewerListing"
import { ShowError } from "./ShowError"
import { NoDataFound } from "./NoDataFound"
import { format } from "date-fns"

interface AdminTableProps {
    headers: string[]
}

export function ReviewerSuperAdminListing({ headers }: AdminTableProps) {

    const { role } = useProfileStore();
    const queryClient = useQueryClient();
    const { data, isSuccess, isLoading, isError, error } = useReviewerListing();
    // const promoteReviewerMutation = useMutation<EmptyDataResponse, CustomError, string>({
    //     mutationFn: (userId) => promoteReviewer(userId),
    //     onSuccess: (data) => {
    //         toast.success(data?.message);
    //         queryClient.invalidateQueries({
    //             queryKey: ["admin-listing", "reviewer-listing", "super-admin-metrics"]
    //         })
    //     },
    //     onError: (err) => toast.error(err?.response?.data?.message)
    // })

    const updateReviwerStatusMutation = useMutation<EmptyDataResponse, CustomError, UpdateReviewerStatusPayload>({
        mutationFn: (payload) => updateReviewerStatus(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["reviewer-listing"], exact: true });
            toast.success(data?.message)
        }
    });

    if (isLoading) return <RowLoading />
    if (isError) return <ShowError message={error?.response?.data?.message} />
    if (isSuccess && data?.data?.length === 0) return <NoDataFound />

    return (
        <Table className="bg-white">
            <TableHeader>
                <TableRow>
                    {headers.map((header) => (
                        <TableHead key={header}>{header}</TableHead>
                    ))}

                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.data?.map((user) => (
                    <TableRow key={user?.email}>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.phone}</TableCell>
                        <TableCell>{user?.country}</TableCell>
                        <TableCell>{user?.createdAt ? format(user?.createdAt, "dd-MM-yyyy") : ""}</TableCell>
                        <TableCell>{user?.status === "active" ?
                            <span className="text-success">Active</span> :
                            <span className="text-destructive">Inactive</span>}
                        </TableCell>
                        <TableCell
                            className={`flex gap-4 items-center [&>.trash]:text-destructive cursor-pointer
                                    [&>.active]:text-chart-2 [&>.inactive]:text-destructive`}
                        >
                            {role === "admin" &&
                                <>
                                    <Button
                                        disabled={updateReviwerStatusMutation.isPending}
                                        variant="secondary"
                                        className="cursor-pointer"
                                        onClick={() => updateReviwerStatusMutation.mutate({
                                            reviewerId: user?._id,
                                            status: user?.status === "active" ? "inactive" : "active"
                                        })}
                                    >
                                        {user?.status === "active" ?
                                            <ShieldOff size={16} className="text-destructive" /> :
                                            <ShieldCheck size={16} className="text-success" />
                                        }
                                    </Button>

                                </>
                            }
                            {/* {role === "superAdmin" && 
                                <Button
                                    disabled={promoteReviewerMutation.isPending}
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() => promoteReviewerMutation.mutate(user?._id)}
                                >
                                    <MoveUp className="text-success"/>
                                </Button>
                            } */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}