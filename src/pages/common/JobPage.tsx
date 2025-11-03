import { Divider } from "@/components/customComponents/common/Divider";
import { FullPageLoding } from "@/components/customComponents/common/Loader";
import { NoDataFound } from "@/components/customComponents/common/NoDataFound";
import { ShowError } from "@/components/customComponents/common/ShowError";
import { getJobDetail } from "@/service/apis";
import type { CustomError } from "@/types/error";
import { useQuery } from "@tanstack/react-query";
import { BadgeIndianRupee, BicepsFlexed, BookOpenText, Clock4, Locate } from "lucide-react";
import { useParams } from "react-router-dom"
import {format} from "date-fns"
import { useProfileStore } from "@/store/profile";
import { Button } from "@/components/ui/button";
export function JobPage() {

    const {role} = useProfileStore();
    const {jobId=""} = useParams();
    const {data, isSuccess, isLoading, isError, error,} = useQuery<JobDetailResponse, CustomError>({
        queryKey: ["jobById"],
        queryFn: () => getJobDetail(jobId),
        enabled: jobId?.length > 0
    })
    const deadline = new Date(data?.data?.deadline);
    const today = new Date();
    if(isLoading) return <FullPageLoding />
    if(isError) return <ShowError message={error?.message}/>
    if(isSuccess && !data?.data?._id) return <NoDataFound />

    return (
        <div className="p-4">
            <div className="mx-auto w-full sm:full md:max-w[700px] lg:max-w-[1000px] bg-white p-4">
                <div className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-capitalize">{data?.data?.jobTitle}</h2>
                    <span>{data?.data?.companyName}</span>
                    <div className="flex gap-2.5 items-center"><Locate size={16}/><span>{data?.data?.location}</span></div>
                </div>

                <Divider/>

                <div>
                    <h2 className="text-lg font-semibold">Skills</h2>
                    <div className="flex gap-3 flex-wrap mt-2.5">
                        {data?.data?.skills?.split(",")?.map((skill, key) => (
                            <span key={key} className="bg-green-200 text-green-700 font-semibold px-3 py-1 rounded-md">{skill}</span>
                        ))}
                    </div>
                </div>

                <Divider />

                <div className="[&>div]:mt-2.5">
                    <h2 className="text-lg font-semibold">Details</h2>
                    <div className="flex justify-between gap-2.5 flex-wrap sm:justify-start lg:gap-12">
                        <div className="flex gap-3 items-center">
                            <h3 className="font-semibold flex gap-1 items-center"><BadgeIndianRupee size={16}/> CTC</h3>
                            <span className="bg-green-200 text-green-700 px-3 py-1 rounded-md">
                                {data?.data?.minSalary}-{data?.data?.minSalary}
                            </span>
                        </div>

                        <div className="flex gap-3 items-center">
                            <h3 className="font-semibold flex gap-1 items-center"><BicepsFlexed size={16}/> Type</h3>
                            <span className="bg-green-200 text-green-700 px-3 py-1 rounded-md">
                                {data?.data?.jobType}
                            </span>
                        </div>

                        <div className="flex gap-3 items-center">
                            <h3 className="font-semibold flex">Experiene(min)</h3>
                            <span className="bg-green-200 text-green-700 px-3 py-1 rounded-md">
                                {data?.data?.experience} year
                            </span>
                        </div>

                        <div className="flex gap-3 items-center">
                            <h3 className="font-semibold flex">Vacancy</h3>
                            <span className="bg-green-200 text-green-700 px-3 py-1 rounded-md">
                                {data?.data?.vacancy}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold flex gap-1 items-center"><BookOpenText size={16}/> Description</h3>
                        <p>{data?.data?.description}</p>
                    </div>

                    <div className="flex gap-3 items-center">
                        <h3 className="font-semibold flex gap-1 items-center"><Clock4 size={16}/> Deadline</h3>
                        <span className={`${deadline > today ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"} px-3 py-1 rounded-md`}>
                            {format(data?.data?.deadline, "dd/MM/yyyy hh:mm a")}
                        </span>
                    </div>
                </div>
                <Divider />
                {role === "user" && <Button disabled={deadline < today}>Apply</Button>}
                {role === "admin" &&<Button>Extend Deadline</Button>}
            </div>
        </div>
    )
}