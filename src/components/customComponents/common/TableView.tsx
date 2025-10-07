import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TableViewProps {
    headers: string[]
    data: (string | number)[][]
    action: React.ReactNode[]
}
export function TableView({headers, data, action}: TableViewProps) {
    return (
        <Table className="bg-white">
            <TableHeader>
                <TableRow>
                    {headers.map((header) => (
                        <TableHead key={header}>{header}</TableHead>
                    ))}
                    <TableHead>Action</TableHead>
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