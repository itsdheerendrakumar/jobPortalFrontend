import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getAdminListing } from "@/service/apis"
import { useProfileStore } from "@/store/profile"
import type { CustomError } from "@/types/error"
import { useQuery } from "@tanstack/react-query"
import { ShieldCheck, ShieldOff, Trash } from "lucide-react"

interface AdminTableProps {
    headers: string[]
    data: IAdminUserDetails[]
}

export function AdminReviewerTable({headers}: AdminTableProps) {

    const {role} = useProfileStore();
    const {data, isLoading, isError, isSuccess} = useQuery<AdminReviewerListingResponse, CustomError>({
        queryKey: ["admin-listing"],
        queryFn: () => getAdminListing(),
        staleTime: Infinity,
        enabled: role === "superAdmin"
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
                                    <span className="text-chart-2">Active</span> : 
                                    <span className="text-destructive">Inactive</span>}
                                </TableCell>
                                <TableCell
                                    className={`flex gap-4 items-center [&>.trash]:text-destructive cursor-pointer
                                        [&>.active]:text-chart-2 [&>.inactive]:text-destructive`}
                                >
                                    {admin?.status === "active" ? <ShieldOff size={16} className="inactive"/> : 
                                    <ShieldCheck size={16} className="active"/>
                                    }
                                    <Trash size={16} className="trash"/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
    }
        </>
    )
}