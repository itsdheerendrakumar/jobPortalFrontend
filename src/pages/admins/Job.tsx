import { NewJob } from "@/components/customComponents/admins/NewJob";
import { Divider } from "@/components/customComponents/common/Divider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getJob } from "@/service/apis";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

export function Job() {

  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  }
  const {data} = useQuery({
    queryKey: ["jobListing"],
    queryFn: () => getJob()
  })
  return (
    <>
      <div className="flex items-center justify-between">
        <span>Jobs</span>
        <Button className="flex items-center justify-center cursor-pointer" onClick={handleIsOpen}>
          <Plus size={16} />Create new job
        </Button>
      </div>
      <Divider />
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
    </>
  )
}