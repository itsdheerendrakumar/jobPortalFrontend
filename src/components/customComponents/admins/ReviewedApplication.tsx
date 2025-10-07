import { TableView } from "../common/TableView";

const header = ["Applicant", "Job", "Reviwer", "Reviewed Date"];
const data = [
    ["John Doe", "Software Engineer","A", "2023-10-01"],
    ["Jane Smith", "Product Manager","B", "2023-10-02"],
    ["Alice Johnson", "Data Scientist", "C", "2023-10-03"],
];
const action = [<span onClick={() => alert("dkld")} className="text-chart-2 cursor-pointer">Assign</span>, <span className="text-chart-2 cursor-pointer">Assign</span>, <span className="text-chart-2 cursor-pointer">Assign</span>];
export function ReviewedApplication() {
    return(
        <TableView headers={header} data={data} action={action} />
    )
}