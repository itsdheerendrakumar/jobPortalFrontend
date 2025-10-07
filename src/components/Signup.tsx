import { loginSchema } from "@/formValidation/validation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormValidationError } from "./customComponents/common/formValidationError";
interface SignupProps {
    isCreateAdmin?: boolean
}
export function Signup({ isCreateAdmin }: SignupProps) {

    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            name: "",
            country: "",
            phone: "",
            email: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),

    });

    const onSubmit: SubmitHandler<Signup> = async (data) => {
        console.log(data)
    }

    return (
        <div className="flex items-center justify-center h-[calc(100vh - 32px)]">
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
                                    render={({ field }) => <Input {...field} type="password" />}
                                />
                                {errors?.password && <FormValidationError message={errors?.password?.message} />}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Country</Label>
                                <Controller
                                    name="country"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                                {errors?.country && <FormValidationError message={errors?.country?.message} />}
                            </div>
                            <Button type="submit" className="w-full cursor-pointer">
                                {isCreateAdmin ? "Create" : "Signup"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
