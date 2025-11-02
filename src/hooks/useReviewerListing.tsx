import { getReviewerListing } from "@/service/apis";
import type { CustomError } from "@/types/error";
import { useQuery } from "@tanstack/react-query";

export function useReviewerListing() {

    const {data, isSuccess, isLoading, isError, error} = useQuery<AdminReviewerListingResponse, CustomError>({
        queryKey: ["reviewer-listing"],
        queryFn: getReviewerListing
    })
    return {data, isSuccess, isLoading, isError, error};
}