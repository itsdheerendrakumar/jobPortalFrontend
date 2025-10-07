import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ShieldCheck, ShieldOff, Trash } from "lucide-react"

interface AdminTableProps {
    headers: string[]
    data: IAdminUserDetails[]
}

export function AdminReviewerTable({headers, data}: AdminTableProps) {
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
                {data?.map((admin) => (
                    <TableRow key={admin?.email}>
                        <TableCell>{admin?.name}</TableCell>
                        <TableCell>{admin?.email}</TableCell>
                        <TableCell>{admin?.phone}</TableCell>
                        <TableCell>{admin?.country}</TableCell>
                        <TableCell>{admin?.created}</TableCell>
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
    )
}