import { Skeleton } from "@/components/ui/skeleton";

export function SkeltonLoading() {

    return (
        <Skeleton className="min-h-20 max-h-full max-w-full rounded-xl bg-muted-foreground" />
    )
}