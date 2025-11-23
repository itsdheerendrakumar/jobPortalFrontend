import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
interface JobCardProps {
    job: JobListingData
}
export function JobCard({job}: JobCardProps) {

    const navigate = useNavigate()
    return (
        <Card className="cursor-pointer" onClick={() => navigate(`/job/${job?._id}`)}>
            <CardHeader>
                <CardTitle>{job?.jobTitle}</CardTitle>
                <CardDescription className="flex justify-between">
                    <span>{job?.location}</span>
                    <span className="bg-green-200 text-green-700 font-semibold px-3 py-1 rounded-md">
                        {job?.vacancy > 1 ? "Position" : "Position"} {job?.vacancy}
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="bg-green-200 text-green-700 font-semibold w-fit px-3 py-1 rounded-md">
                    {job?.minSalary} - {job?.maxSalary} / year
                </div>
                <div className="flex gap-3 justify-between">
                    <span className="bg-green-200 text-green-700 font-semibold w-fit px-3 py-1 rounded-md">
                        {job?.jobType}
                    </span>
                    <span>{job?.experience} {job?.experience > 1 ? "Years" : "Year"}</span>
                </div>
            </CardContent>
        </Card>
    )
}