import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

export function NoDataFound({ message }: { message?: string }) {

    return (
        <Card className="flex flex-col items-center justify-center p-8 text-center border-dashed">
            <CardContent className="flex flex-col items-center justify-center space-y-2">
                <FileQuestion className="h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground">{message ?? "No Data Found."}</p>
            </CardContent>
        </Card>

    )
}