import { TableView } from "../common/TableView";

const header = ["Applicant", "Job", "Applied Date", "Assign Reviewer"];
const data = [
    ["John Doe", "Software Engineer", "2023-10-01", "Assign"],
    ["Jane Smith", "Product Manager", "2023-10-02", "Assign"],
    ["Alice Johnson", "Data Scientist", "2023-10-03", "Assign"],
];
const action = [<span className="text-chart-2 cursor-pointer">Assign</span>, <span className="text-chart-2 cursor-pointer">Assign</span>, <span className="text-chart-2 cursor-pointer">Assign</span>];
export function SelectedApplication() {
    return(
        <TableView headers={header} data={data} action={action} />
    )
}