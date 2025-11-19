import { Divider } from "@/components/customComponents/common/Divider";
import { ButtonLoading } from "@/components/customComponents/common/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { uploadProfile } from "@/service/apis";
import { useProfileStore } from "@/store/profile";
import type { CustomError } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { Delete, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
type EducationKeys = "name" | "collegeName" | "percentage" | "passYear"
export function UserProfile() {
    const {profileImage} = useProfileStore();
    const [preview, setPreview] = useState<string | undefined>("");
    const [profile, setProfile] = useState<File | null>(null);
    const [showBorderRed, setShowBorderRed] = useState(false);
    const [education, setEducation] = useState<Record<EducationKeys, string>[]>([{name: "", collegeName: "", percentage: "", passYear: ""}])
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

    const addMore = () => {
        if(education.length > 5) {
            toast.error("You can fill maximum five education detail.");
            return;
        }
        const lastEducation = education?.[education?.length - 1];
        if(lastEducation.collegeName.trim() && lastEducation.name.trim() && lastEducation.passYear.trim() && lastEducation.percentage.trim())
            setEducation(pre => ([...pre, {name: "", collegeName: "", percentage: "", passYear: ""}]))
            else {
            setShowBorderRed(true);
            setTimeout(() => setShowBorderRed(false), 2000)
        }
    }
    const handleChange = (key: EducationKeys, ind: number, value: string) => {
        setEducation(pre => pre.map((edu, index) => {
            return index === ind ? {...edu, [key]: value?.trim()} : edu
        }))
    }
    return (
        <div className="">
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
                    accept="image/png, image/jpeg"
                    onChange={(e) =>  {
                        setPreview(URL.createObjectURL(e.target.files!?.[0]));
                        setProfile(e.target.files!?.[0])
                    }}
                />
            </div>

            <Separator className="my-2.5"/>

            <div>
                <div className="text-lg font-medium">Education</div>
                    {education?.map((edu, ind) => (
                        <div key={ind} className={`grid grid-cols-2 gap-2.5 relative ${showBorderRed && 
                            (education?.length - 1) === ind ? "[&_input]:border-destructive" : ""}`}
                        >
                            <div className="col-span-full">
                                <Label className="mb-2.5">Name</Label>
                                <Input value={edu.name} onChange={(e) => handleChange("name", ind, e.target.value)}/>
                            </div>
                            <div className="col-span-full">
                                <Label className="mb-2.5">College Name</Label>
                                <Input value={edu.collegeName} onChange={(e) => handleChange("collegeName", ind, e.target.value)}/>
                            </div>
                            <div>
                                <Label className="mb-2.5">Percentage</Label>
                                <Input value={edu.percentage} onChange={(e) => handleChange("percentage", ind, e.target.value)}/>
                            </div>
                            <div>
                                <Label className="mb-2.5">Passing Year</Label>
                                <Input value={edu.passYear} onChange={(e) => handleChange("passYear", ind, e.target.value)}/>
                            </div>
                            {(education?.length - 1) !== ind && <Separator className="col-span-full my-4"/>}
                        </div>
                    ))}
                    <div className="flex justify-end mt-2.5">
                        <Button onClick={addMore} className="hover:bg-chart-2 bg-chart-2/90 cursor-pointer">Add More</Button>
                    </div>
                    
            </div>
        </div>
    )
}