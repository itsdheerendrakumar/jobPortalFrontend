import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TableViewProps {
    headers: string[]
    data: TableData
    action: React.ReactNode[]
    actionLabel?: string
}
export function TableView({headers, data, action, actionLabel}: TableViewProps) {
    return (
        <Table className="bg-white">
            <TableHeader>
                <TableRow>
                    {headers.map((header) => (
                        <TableHead key={header}>{header}</TableHead>
                    ))}
                    <TableHead>{actionLabel ?? "Action"}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (<TableCell key={cellIndex}>{cell}</TableCell>))}
                        <TableCell>{action[rowIndex]}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}