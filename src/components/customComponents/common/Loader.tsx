import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export function ButtonLoading() {

    return (
        <Loader2 className="animate-spin" />
    )
}


export function FullPageLoding() {
    return(
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-2rem)]">
            <ButtonLoading />
        </div>
    )
}

export function RowLoading({rows = 10}: {rows?: number}) {
   return <div 
        className="
        flex 
        flex-col 
        gap-1 
        [&>*]:min-h-8 
        [&>*]:max-h-full 
        [&>*]:max-w-full 
        [&>*]:rounded-xl 
        [&>*]:bg-muted-foreground"
    >
        {Array.from({length: rows}, (_, i) => i)?.map(val => <Skeleton key={val}/>)}
    </div>
}