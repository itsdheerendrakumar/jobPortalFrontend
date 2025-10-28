import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
interface JobCardProps {
    job: JobListingData
}
export function JobCard({job}: JobCardProps) {

    return (
        <Card className="cursor-pointers">
            <CardHeader>
                <CardTitle>{job?.jobTitle}</CardTitle>
                <CardDescription className="flex justify-between">
                    <span>{job?.location}</span>
                    <span className="text-black font-semibold">{job?.experience} year</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="bg-green-200 text-green-700 font-semibold w-fit px-3 py-1 rounded-md">
                    {job?.minSalary} - {job?.maxSalary} / year
                </div>
                <div className="bg-green-200 text-green-700 font-semibold w-fit px-3 py-1 rounded-md">full-time</div>
            </CardContent>
        </Card>
    )
}