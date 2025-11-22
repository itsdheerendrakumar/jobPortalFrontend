import { Divider } from "@/components/customComponents/common/Divider";
import { ButtonLoading } from "@/components/customComponents/common/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { addEducation, getEducation, uploadProfile } from "@/service/apis";
import { useProfileStore } from "@/store/profile";
import type { CustomError } from "@/types/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Delete, Edit, Pencil, PencilOff, User } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function UserProfile() {
    const {profileImage} = useProfileStore();
    const queryClient = useQueryClient();
    const ref = useRef(null);
    const [preview, setPreview] = useState<string | undefined>("");
    const [profile, setProfile] = useState<File | null>(null);
    const [showBorderRed, setShowBorderRed] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [education, setEducation] = useState<Record<EducationKeys, string>[]>([{name: "", collegeName: "", percentage: "", passYear: ""}])
    const profileMutation = useMutation<any, CustomError, FormData>({
        mutationFn: (payload) => uploadProfile(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["profile"], exact: true});
            queryClient.invalidateQueries({queryKey: ["profilePicture"], exact: true});
            setProfile(null);
            setPreview("");
            if( ref?.current?.value )
                ref.current.value = ""
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
        }
    })
    const onUpload = async () => {
        const formData = new FormData();
        formData.append("profile", profile!);
        profileMutation.mutate(formData)
    }
    const educationMutation = useMutation<EmptyDataResponse, CustomError, Record<EducationKeys, string>[]>({
        mutationFn: (payload) => addEducation({education: payload}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["education"], exact: true});
            setIsEdit(false);
        }
    })
    const educationQuery = useQuery<EducationResponse, CustomError>({
        queryKey: ["education"],
        queryFn: getEducation,
        gcTime: Infinity,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    })
    const addMore = () => {
        if(education.length > 5) {
            toast.error("You can fill maximum five education detail.");
            return;
        }
        const lastEducation = education?.[education?.length - 1];
        if(lastEducation.collegeName.trim() && lastEducation.name.trim() && `${lastEducation.passYear}`.trim() && lastEducation.percentage.trim())
            setEducation(pre => ([...pre, {name: "", collegeName: "", percentage: "", passYear: ""}]))
            else {
            setShowBorderRed(true);
            setTimeout(() => setShowBorderRed(false), 2000)
        }
    }
    const handleChange = (key: EducationKeys, ind: number, value: string) => {
        setEducation(pre => pre.map((edu, index) => {
            return index === ind ? {...edu, [key]: value} : edu
        }))
    }

    const handleEdit = () => {
        if(educationQuery.isSuccess)
            setEducation(educationQuery.data?.data);
        setIsEdit(true);
    }
    const isEducationExist = educationQuery.data?.data?.length! > 0 || educationQuery.isLoading;

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
                    ref={ref}
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
                <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Education</span> 
                    {!isEdit && isEducationExist && <Pencil className="hover:bg-sidebar-primary/50 rounded-full p-1" onClick={handleEdit}/>}
                    {isEdit && isEducationExist && <PencilOff className="hover:bg-sidebar-primary/50 rounded-full p-1" onClick={() => setIsEdit(false)}/>}
                    {!isEducationExist && <Button onClick={() => setIsEdit(true)}>Add Education</Button>}
                </div>

                {isEdit &&
                    <>
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
                        
                        <Button className="cursor-pointer" onClick={() => educationMutation.mutate(education)} disabled={educationMutation.isPending}>
                            Submit
                        </Button>
                    </>
                }
                {!isEdit && educationQuery.data?.data!?.length > 0 &&
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>College</TableHead>
                                <TableHead>Percentage</TableHead>
                                <TableHead>Passing Year</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {educationQuery?.data?.data?.map((edu, ind) => (
                                <TableRow key={ind}>
                                    <TableCell>{edu?.name}</TableCell>
                                    <TableCell>{edu?.collegeName}</TableCell>
                                    <TableCell>{edu?.percentage}</TableCell>
                                    <TableCell>{edu?.passYear}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </div>
        </div>
    )
}