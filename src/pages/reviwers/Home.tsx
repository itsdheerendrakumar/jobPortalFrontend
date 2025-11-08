import { Divider } from "@/components/customComponents/common/Divider";
import { MetricCard } from "@/components/customComponents/common/MetricCard";
import { useMetrics } from "@/hooks/useMetrics"
import { getAssignedJob } from "@/service/apis";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";

export function Home() {

    const { data, isLoading } = useMetrics();
    const assignedJobQuery = useQuery({
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
        </>
    )
}