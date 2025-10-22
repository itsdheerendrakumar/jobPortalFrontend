import { Divider } from "@/components/customComponents/common/Divider";
import { MetricCard } from "@/components/customComponents/common/MetricCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Plus, User} from "lucide-react"
import { AdminReviewerTable } from "../../components/customComponents/superAdmin/AdminReviewerTable";
import { adminHeaders } from "@/constants/superAdmin";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Signup } from "@/components/Signup";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSuperAdminMetrics } from "@/service/apis";
import { useProfileStore } from "@/store/profile";
import type { CustomError } from "@/types/error";
export const adminData: IAdminUserDetails[] = [
    {
        name: "Dheerendra Kumar",
        email: "dheerendra.kumar@example.com",
        phone: "+91-9876543210",
        country: "India",
        created: "2025-01-12",
        status: "active",
    },
    {
        name: "Anjali Sharma",
        email: "anjali.sharma@example.com",
        phone: "+91-9123456780",
        country: "India",
        created: "2025-02-05",
        status: "inactive",
    },
    {
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        phone: "+1-202-555-0187",
        country: "USA",
        created: "2025-03-22",
        status: "active",
    },
    {
        name: "Sophia Müller",
        email: "sophia.muller@example.com",
        phone: "+49-151-1234567",
        country: "Germany",
        created: "2025-04-10",
        status: "active",
    },
    {
        name: "Hiroshi Tanaka",
        email: "hiroshi.tanaka@example.com",
        phone: "+81-80-1234-5678",
        country: "Japan",
        created: "2025-05-01",
        status: "active",
    },
];
export default function Home() {
  
  const {role} = useProfileStore()
  const {data, isLoading, isError} = useQuery<MetricsResponse, CustomError>({
    queryKey: ["super-admin-metrics"],
    queryFn: () => getSuperAdminMetrics(),
    staleTime: 0,
    gcTime: 0,
    enabled: ["superAdmin", "admin", "reviewer"].includes(role),
  })
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <span>Dashboard</span>
        <Button className="flex justify-between items-center cursor-pointer" onClick={handleIsOpen}>
          <Plus />Create Admin
        </Button>
      </div>
      <Divider />
      <div className="grid grid-cols-4 gap-4">
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
      <Tabs defaultValue="admins" className="mt-4">
        <TabsList className="bg-chart-2 [&>*]:cursor-pointer">
          <TabsTrigger value="admins">Admins</TabsTrigger>
          <TabsTrigger value="reviewers">Reviewers</TabsTrigger>
        </TabsList>
        <TabsContent value="admins">
          <AdminReviewerTable data={adminData} headers={adminHeaders}/>
        </TabsContent>
        <TabsContent value="reviewers">
          <AdminReviewerTable data={adminData} headers={adminHeaders}/>
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