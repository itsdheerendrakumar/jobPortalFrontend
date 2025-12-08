import { useQuery } from "@tanstack/react-query";
import { TableView } from "../common/TableView";
import { getSelectedApplicationByAdmin } from "@/service/apis";
import { RowLoading } from "../common/Loader";
import { ShowError } from "../common/ShowError";
import type { CustomError } from "@/types/error";

const header = ["Applicant", "Job", "Applied Date", "Assign Reviewer"];
const data = [
    ["John Doe", "Software Engineer", "2023-10-01", "Assign"],
    ["Jane Smith", "Product Manager", "2023-10-02", "Assign"],
    ["Alice Johnson", "Data Scientist", "2023-10-03", "Assign"],
];
const action = [<span className="text-chart-2 cursor-pointer">Assign</span>, <span className="text-chart-2 cursor-pointer">Assign</span>, <span className="text-chart-2 cursor-pointer">Assign</span>];
export function SelectedApplication() {
    const selectedApplicationQuery = useQuery<ReviewedApplicationResponse, CustomError>({
        queryKey: ["selectedApplicationsByAdmin"],
        queryFn: getSelectedApplicationByAdmin,
        gcTime: Infinity,
        staleTime: Infinity,
    })
    if(selectedApplicationQuery.isLoading) return <RowLoading />
        if(selectedApplicationQuery.isError) return <ShowError message={selectedApplicationQuery?.error?.response?.data?.message} />
    return(
        <TableView headers={header} data={data} action={action} />
    )
}