import { signupSchema } from "@/formValidation/validation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormValidationError } from "./customComponents/common/FormValidationError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { countryData } from "@/constants/country";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { useProfileStore } from "@/store/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CustomError } from "@/types/error";
import { createNewUser } from "@/service/apis";
import { toast } from "sonner";
import { ButtonLoading } from "./customComponents/common/Loader";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
interface SignupProps {
    isCreateAdmin?: boolean
}
export function Signup({ isCreateAdmin }: SignupProps) {

    const navigate = useNavigate();
    const [isTypePassword, setIsTypePassword] = useState(true);
    const {role} = useProfileStore();
    const queryClient = useQueryClient();
    const [deletePermission, setDeletePermission] = useState(true);
    const { control, handleSubmit, reset , formState: { errors }, } = useForm({
        defaultValues: {
            name: "",
            country: "",
            phone: "",
            email: "",
            password: "",
        },
        resolver: yupResolver(signupSchema),

    });
    console.log(errors)
    const onSubmit: SubmitHandler<ISignup> = async (data) => {
        const payload = role === "superAdmin" ? { ...data, deletePermission } : data;
        console.log(payload)
        newUserMutation.mutate(payload);
    }

    const newUserMutation = useMutation<NewAdminResponse, CustomError, ISignup>({
        mutationFn: (payload) => createNewUser(endpoint, payload),
        onSuccess:(data) => {
            toast.success(data?.message)
            reset();
            queryClient.invalidateQueries({queryKey: ["admin-listing", "super-admin-metrics"]});
            if(!role)
                navigate("/login")
        },
        onError: (err) => toast.error(err?.response?.data?.message)
    })
    const loading = newUserMutation.isPending;
    const endpoint = role === "superAdmin" ? "/user/admin" : (role === "admin" ? "/user/reviewer" : "/user/user")

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-sm">
                {!isCreateAdmin &&
                    <CardHeader>
                        <CardTitle className="text-2xl text-center"><span>job</span>Portal<span></span></CardTitle>
                    </CardHeader>
                }
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                                {errors?.name && <FormValidationError message={errors?.name?.message} />}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Phone</Label>
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                                {errors?.phone && <FormValidationError message={errors?.phone?.message} />}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                                {errors?.email && <FormValidationError message={errors?.email?.message} />}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="relative">
                                         <Input {...field} type={isTypePassword ? "password" : "text"} />
                                         <Button
                                            type="button"
                                            variant="secondary"
                                            className="absolute right-0 top-2.5 px-0 p-0 h-auto cursor-pointer z-1"
                                            onClick={() => setIsTypePassword(pre => !pre)}
                                        >
                                            {isTypePassword && <Eye size={16} />}
                                            {!isTypePassword && <EyeOff size={16} />}
                                        </Button>
                                        </div>
                                    )}
                                />
                                {errors?.password && <FormValidationError message={errors?.password?.message} />}
                            </div>
                            <div className="grid gap-2 [&>button]:w-full">
                                <Label htmlFor="name">Country</Label>
                                <Controller
                                    name="country"
                                    control={control}
                                    render={({ field }) => 
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countryData.map((country) => (
                                                <SelectItem key={country} value={country}>
                                                    {country}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>}
                                />
                                {errors?.country && <FormValidationError message={errors?.country?.message} />}
                                
                            </div>
                            {role === "superAdmin" &&
                                <div className="flex justify-between items-center gap-2.5">
                                    <Label>Delete Permission</Label>
                                    <Checkbox 
                                        checked={deletePermission} 
                                        onCheckedChange={(checked) => setDeletePermission(!!checked)}
                                    />
                                </div>
                            }
                            <Button type="submit" className={`w-full cursor-pointer`} disabled={loading}>
                                {loading ? <ButtonLoading /> : (isCreateAdmin ? "Create" : "Signup")}
                            </Button>
                        </div>
                    </form>
                    <div className="flex justify-end mt-3">
                        <Link
                            to="/login"
                            className="text-sm underline-offset-4 hover:underline"
                        >
                        Have account.
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
