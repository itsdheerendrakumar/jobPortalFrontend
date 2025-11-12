import { Divider } from "@/components/customComponents/common/Divider";
import { ButtonLoading, FullPageLoding } from "@/components/customComponents/common/Loader";
import { MetricCard } from "@/components/customComponents/common/MetricCard";
import { NoDataFound } from "@/components/customComponents/common/NoDataFound";
import { ShowError } from "@/components/customComponents/common/ShowError";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useMetrics } from "@/hooks/useMetrics"
import { getAssignedJob } from "@/service/apis";
import type { CustomError } from "@/types/error";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import { Eye, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Home() {

    const navigate = useNavigate()
    const { data, isLoading } = useMetrics();
    const assignedJobQuery = useQuery<AssignedJobResponse, CustomError>({
        queryKey: ["assignedJob"],
        queryFn: getAssignedJob
    })
    return (
        <>
            <div className="p-4">
                <span>Dashboard</span>
            </div>
            <Divider />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                <MetricCard
                    label="Total Admins"
                    value={data?.data?.admin || 0}
                    icon={<User />}
                    loading={isLoading}
                />
                <MetricCard
                    label="Total Reviewers"
                    value={data?.data?.reviewer || 0}
                    icon={<User />}
                    loading={isLoading}
                />
                <MetricCard
                    label="Total Users"
                    value={data?.data?.user || 0}
                    icon={<User />}
                    loading={isLoading}
                />
                <MetricCard
                    label="Total Pending Applications"
                    value={5}
                    icon={<User />}
                    loading={isLoading}
                />
            </div>
            <div className="p-4">
                {assignedJobQuery.isLoading && <div className="mt-4 mx-auto p-4 flex justify-center items-center"><ButtonLoading /></div>}
                {assignedJobQuery?.isSuccess && assignedJobQuery?.data?.data?.applicantDetail?.length === 0 &&
                    <NoDataFound message="No assigned job found." />
                }
                {assignedJobQuery.isError && <ShowError message={assignedJobQuery?.error?.response?.data?.message} />}
                {assignedJobQuery.isSuccess && assignedJobQuery?.data?.data?.applicantDetail?.length > 0 &&
                    <Card className="m-auto w-fit lg:min-w-[600px]">
                        <CardContent>
                            <div>
                                <div className="flex gap-4 justify-between items-center">
                                    <h2 className="text-lg font-semibold">Job Details</h2>
                                    <Button variant="outline" onClick={() => navigate(`/job/${assignedJobQuery?.data?.data?.jobDetails?._id}`)}><Eye size={16} /></Button>
                                </div>
                                <Divider />
                                <div className="flex justify-between gap-2.5">
                                    <span>{assignedJobQuery?.data?.data?.jobDetails?.jobTitle}</span>
                                    <span>{assignedJobQuery?.data?.data?.jobDetails?.companyName}</span>
                                </div>

                                <div className="flex justify-between gap-2.5 mt-4">
                                    <div>
                                        <span>Education: </span>
                                        <span className="bg-green-200 text-green-700 font-semibold px-3 py-1 rounded-md">{assignedJobQuery?.data?.data?.jobDetails?.education}</span>
                                    </div>

                                    <div>
                                        <span>Experience: </span>
                                        <span className="bg-green-200 text-green-700 font-semibold px-3 py-1 rounded-md">{assignedJobQuery?.data?.data?.jobDetails?.experience}</span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <span>Skills: </span>
                                    {assignedJobQuery?.data?.data?.jobDetails?.skills?.split(",")?.map((skill, ind) =>
                                        <span className="bg-green-200 text-green-700 font-semibold px-3 py-1 rounded-md" key={ind}>{skill}</span>
                                    )}
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                }
                <div className="flex flex-col gap-2.5 mt-4">
                    {assignedJobQuery.isSuccess && assignedJobQuery?.data?.data?.applicantDetail?.length > 0 &&
                        assignedJobQuery?.data?.data?.applicantDetail?.map((aplnt, ind) => (
                            <Card key={ind}>
                                <CardContent className="flex flex-col gap-2.5">
                                    <div>
                                        <div className="flex gap-4 justify-between items-center">
                                            <h2 className="text-lg font-semibold">User Details</h2>
                                            <Button variant="outline"><Eye size={16} /></Button>
                                        </div>
                                        <Divider />
                                    </div>
                                    <div className="col-span-full flex flex-col gap-2.5">
                                        <Label>Reason</Label>
                                        <Textarea />
                                    </div>
                                    <div className="col-span-full [&>button]:cursor-pointer flex gap-4 mt-2.5">
                                        <Button variant="outline" size="lg">Accept</Button>
                                        <Button variant="destructive" size="lg">Reject</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </>
    )
}