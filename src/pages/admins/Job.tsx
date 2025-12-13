import { NewJob } from "@/components/customComponents/admins/NewJob";
import { Divider } from "@/components/customComponents/common/Divider";
import { JobCard } from "@/components/customComponents/common/JobCard";
import { FullPageLoding } from "@/components/customComponents/common/Loader";
import { ShowError } from "@/components/customComponents/common/ShowError";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getJob } from "@/service/apis";
import { useProfileStore } from "@/store/profile";
import type { CustomError } from "@/types/error";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

export function Job() {

  const {role} = useProfileStore();
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  }
  const {data, isError, isLoading, error} = useQuery<JobListingResponse, CustomError>({
    queryKey: ["jobListing"],
    queryFn: () => getJob()
  })

  if(isLoading) return <FullPageLoding />
  if(isError) return <ShowError message={error?.response?.data?.message} />

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <span>Jobs</span>
        {role === "admin" && 
          <Button className="flex items-center justify-center cursor-pointer" onClick={handleIsOpen}>
            <Plus size={16} />Create new job
          </Button>
        }
      </div>

      <Divider />

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
        {data?.data?.map(job => (
          <JobCard
            key={job?._id}
            job={job}
          />
        ))}
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={handleIsOpen}
      >
        <DialogContent className="overflow-y-auto h-full">
          <DialogHeader>
            <DialogTitle>Create new job</DialogTitle>
          </DialogHeader>
          <NewJob />
        </DialogContent>

      </Dialog>
    </div>
  )
}