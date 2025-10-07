import { loginSchema } from "@/formValidation/validation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormValidationError } from "./customComponents/common/formValidationError";

export function Login() {
  
  const { control, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: {
        email: "",
        password: "",
    },
    resolver: yupResolver(loginSchema),

  });

  const onSubmit: SubmitHandler<Login> = async (data) => {
    console.log(data)
  }

  return (
    <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl text-center"><span>job</span>Portal<span></span></CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
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
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                    Forgot your password?
                    </a>
                </div>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <Input {...field} type="password" />}
                />
                {errors?.password && <FormValidationError message={errors?.password?.message} />}
                </div>
                <Button type="submit" className="w-full cursor-pointer">
                Login
                </Button>
            </div>
            </form>
        </CardContent>
        </Card>
    </div>
  )
}
