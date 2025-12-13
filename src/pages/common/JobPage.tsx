import { Divider } from "@/components/customComponents/common/Divider";
import { ButtonLoading, FullPageLoding } from "@/components/customComponents/common/Loader";
import { NoDataFound } from "@/components/customComponents/common/NoDataFound";
import { ShowError } from "@/components/customComponents/common/ShowError";
import { applyJob, getJobDetail, updateJobDeadline } from "@/service/apis";
import type { CustomError } from "@/types/error";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BadgeIndianRupee, BicepsFlexed, BookOpenText, Clock4, Locate } from "lucide-react";
import { useParams } from "react-router-dom"
import {format} from "date-fns"
import { useProfileStore } from "@/store/profile";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { toast } from "sonner";
export function JobPage() {
    const queryClient = useQueryClient()
    const {role} = useProfileStore();
    const {jobId=""} = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [newDeadline, setNewDeadline] = useState("");
    const {data, isSuccess, isLoading, isError, error,} = useQuery<JobDetailResponse, CustomError>({
        queryKey: ["jobById", jobId],
        queryFn: () => getJobDetail(jobId),
        enabled: jobId?.length > 0
    })

    const applyJobMutation = useMutation<EmptyDataResponse, CustomError>({
        mutationFn: () => applyJob(jobId)
    })

    const changeDeadlineMutation = useMutation<EmptyDataResponse, CustomError, ExtendDeadlinePayload>({
        mutationFn: (payload) => updateJobDeadline(payload),
        onSuccess: (data) => {
            setIsOpen(false);
            toast.success(data?.message);
            queryClient.invalidateQueries({queryKey: ["jobById"]})
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
        }
    })

    const deadline = new Date(data?.data?.deadline!);
    const today = new Date();

    const handleOpen = () => {setIsOpen(pre => !pre)}
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        changeDeadlineMutation.mutate({newDeadline, jobId})
    }

    if(isLoading) return <FullPageLoding />
    if(isError) return <ShowError message={error?.response?.data?.message}/>
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
                            {format(data?.data?.deadline!, "dd/MM/yyyy hh:mm a")}
                        </span>
                    </div>
                </div>
                <Divider />
                {role === "user" && 
                <Button 
                    className="cursor-pointer" 
                    disabled={(deadline < today) || applyJobMutation?.isPending} 
                    onClick={() => applyJobMutation.mutate()}
                >
                    Apply
                </Button>}
                {role === "admin" && <Button onClick={handleOpen}>Change Deadline</Button>}
                <Dialog open={isOpen} onOpenChange={handleOpen}>
                    <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-lg font-medium">Change Deadline</DialogTitle>
                    </DialogHeader>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <Input type="date" required value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)}/>
                            <Button 
                                type="submit"
                                disabled={changeDeadlineMutation?.isPending}
                                className="mt-4 bg-chart-2/30 text-chart-2/70 hover:bg-chart-2 hover:text-background"
                            >
                                {changeDeadlineMutation?.isPending ? <ButtonLoading /> : "Update"}
                            </Button>
                        </form>
                    </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}