import { ButtonLoading } from "@/components/customComponents/common/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadProfile } from "@/service/apis";
import { useProfileStore } from "@/store/profile";
import type { CustomError } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function UserProfile() {
    const {profileImage} = useProfileStore();
    const [preview, setPreview] = useState<string | undefined>("");
    const [profile, setProfile] = useState<File | null>(null);
    const profileMutation = useMutation<any, CustomError, FormData>({
        mutationFn: (payload) => uploadProfile(payload),
        onError: (err) => {
            toast.error(err?.response?.data?.message)
        }
    })
    const onUpload = async () => {
        const formData = new FormData();
        formData.append("profile", profile!);
        profileMutation.mutate(formData)
    }


    return (
        <div>
            <div className="flex justify-center items-center flex-col gap-2.5">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={preview || profileImage} alt="@shadcn" />
                    <AvatarFallback><User size={16}/></AvatarFallback>
                </Avatar>
                <Button 
                    size="lg" 
                    className="bg-chart-2 hover:bg-chart-2/85 cursor-pointer min-w-24" 
                    disabled={profileMutation.isPending || !preview}
                    onClick={onUpload}
                >
                    {profileMutation?.isPending ? <ButtonLoading /> : "Update"}
                </Button>
                <Input 
                    type="file"
                    className="w-fit"
                    onChange={(e) =>  {
                        setPreview(URL.createObjectURL(e.target.files!?.[0]));
                        setProfile(e.target.files!?.[0])
                    }}
                />
            </div>
        </div>
    )
}