import { getSuperAdminMetrics } from "@/service/apis";
import type { CustomError } from "@/types/error";
import { useQuery } from "@tanstack/react-query";

export function useMetrics() {

    const { data, isLoading, isError } = useQuery<MetricsResponse, CustomError>({
        queryKey: ["super-admin-metrics"],
        queryFn: () => getSuperAdminMetrics(),
        staleTime: 0,
        gcTime: 0,
    })
    return { data, isLoading, isError };
}