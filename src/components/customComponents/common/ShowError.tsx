import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export function ShowError({ message }: {message?: string}) {

    return (
        <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{message ?? "Something went wrong."}</AlertTitle>
        </Alert>
    )
}