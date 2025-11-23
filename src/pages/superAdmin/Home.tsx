import { Divider } from "@/components/customComponents/common/Divider";
import { MetricCard } from "@/components/customComponents/common/MetricCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Plus, User} from "lucide-react"
import { AdminReviewerTable } from "../../components/customComponents/superAdmin/AdminReviewerTable";
import { adminHeaders, reviewerHeadersSuperAdmin } from "@/constants/user";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Signup } from "@/components/Signup";
import { useState } from "react";
import { useMetrics } from "@/hooks/useMetrics";
import { ReviewerSuperAdminListing } from "@/components/customComponents/common/ReviewerSuperAdminListing"

export default function Home() {
  const {data, isLoading, isError} = useMetrics();
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <div className="flex justify-between items-center p-4">
        <span>Dashboard</span>
        <Button className="flex justify-between items-center cursor-pointer" onClick={handleIsOpen}>
          <Plus />Create Admin
        </Button>
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
      <Tabs defaultValue="admins" className="mt-4 p-4">
        <TabsList className="bg-chart-2 [&>*]:cursor-pointer">
          <TabsTrigger value="admins">Admins</TabsTrigger>
          <TabsTrigger value="reviewers">Reviewers</TabsTrigger>
        </TabsList>
        <TabsContent value="admins">
          <AdminReviewerTable headers={adminHeaders}/>
        </TabsContent>
        <TabsContent value="reviewers">
          <ReviewerSuperAdminListing headers={reviewerHeadersSuperAdmin}/>
        </TabsContent>
        </Tabs>
        <Dialog
          open={isOpen}
          onOpenChange={handleIsOpen}
        >
          <DialogContent className="overflow-y-auto h-full">
            <DialogHeader>
              <DialogTitle>Create new admin</DialogTitle>
            </DialogHeader>
            <Signup isCreateAdmin={true} />
          </DialogContent>

        </Dialog>
    </>
  )
}