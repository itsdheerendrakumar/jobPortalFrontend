import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { deleteAdmin, getAdminListing, updateAdminStatus } from "@/service/apis"
import { useProfileStore } from "@/store/profile"
import type { CustomError } from "@/types/error"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ShieldCheck, ShieldOff, Trash } from "lucide-react"
import { toast } from "sonner"

interface AdminTableProps {
    headers: string[]
    data: IAdminUserDetails[]
}

export function AdminReviewerTable({headers}: AdminTableProps) {

    const {role} = useProfileStore();
    const queryClient = useQueryClient();
    const {data, isLoading,isFetching, isError, isSuccess} = useQuery<AdminReviewerListingResponse, CustomError>({
        queryKey: ["admin-listing"],
        queryFn: () => getAdminListing(),
        staleTime: Infinity,
        enabled: role === "superAdmin"
    });
    const updateAdminStatusMutation = useMutation<EmptyDataResponse, CustomError, UpdateAdminStatusPayload>({
        mutationFn: (payload) => updateAdminStatus(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["admin-listing"], exact: true});
            toast.success(data?.message)
        }
    });
    
    const deleteAdminMutation = useMutation<EmptyDataResponse, CustomError, string>({
        mutationFn: (adminId) =>  deleteAdmin(adminId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["admin-listing"], exact: true});
            toast.success(data?.message)
        }
    })

    return (
        <>
            {isLoading && 
            <div 
                className="
                flex 
                flex-col 
                gap-1 
                [&>*]:min-h-8 
                [&>*]:max-h-full 
                [&>*]:max-w-full 
                [&>*]:rounded-xl 
                [&>*]:bg-muted-foreground"
            >
                <Skeleton  />
                <Skeleton  />
                <Skeleton  />
                <Skeleton  />
                <Skeleton  />
                <Skeleton  />
                <Skeleton  />
                <Skeleton  />
                <Skeleton  />
                <Skeleton  />
            </div>
            }

            {isSuccess && data?.data?.length > 0 &&
                <Table className="bg-white">
                    <TableHeader>
                        <TableRow>
                            {headers.map((header) => (
                                <TableHead key={header}>{header}</TableHead>
                            ))}

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((admin) => (
                            <TableRow key={admin?.email}>
                                <TableCell>{admin?.name}</TableCell>
                                <TableCell>{admin?.email}</TableCell>
                                <TableCell>{admin?.phone}</TableCell>
                                <TableCell>{admin?.country}</TableCell>
                                <TableCell>{admin?.createdAt}</TableCell>
                                <TableCell>{admin?.status === "active" ? 
                                    <span className="text-success">Active</span> : 
                                    <span className="text-destructive">Inactive</span>}
                                </TableCell>
                                <TableCell
                                    className={`flex gap-4 items-center [&>.trash]:text-destructive cursor-pointer
                                        [&>.active]:text-chart-2 [&>.inactive]:text-destructive`}
                                >
                                    <Button 
                                        disabled={updateAdminStatusMutation.isPending} 
                                        variant="secondary" 
                                        className="cursor-pointer"
                                        onClick={() => updateAdminStatusMutation.mutate({
                                            adminId: admin?._id, 
                                            status: admin?.status === "active" ? "inactive" : "active"
                                        })}
                                    >
                                        {admin?.status === "active" ? 
                                        <ShieldOff size={16} className="text-destructive"/> : 
                                        <ShieldCheck size={16} className="text-success"/>
                                        }
                                    </Button>
                                    <Button 
                                        variant="secondary" 
                                        disabled={deleteAdminMutation.isPending} 
                                        onClick={() => deleteAdminMutation.mutate(admin?._id)}
                                        className="cursor-pointer [&>*]:color-red-500"
                                    >
                                        <Trash size={16} className="text-destructive"/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
    }
        </>
    )
}