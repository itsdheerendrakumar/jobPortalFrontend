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