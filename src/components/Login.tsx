import { loginSchema } from "@/formValidation/validation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormValidationError } from "./customComponents/common/FormValidationError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/service/apis";
import { toast } from "sonner";
import type { CustomError } from "@/types/error";
import { Link, useNavigate } from "react-router-dom";
import { ButtonLoading } from "./customComponents/common/Loader";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
type AutoKeys = "superAdmin" | "admin" | "reviewer" | "user"
const autoCredentials: Record<AutoKeys, {email: string, password: string}> = {
  superAdmin: {
    email: "dheerendra16kumar@gmail.com",
    password: "dheerendraSuperAdmin"
  },
  admin: {
    email: "dk16btechcs@gmail.com",
    password: "dkAdmin"
  },
  reviewer: {
    email: "testReviewer@gmail.com",
    password: "testReviewer"
  },
  user: {
    email: "testUser@gmail.com",
    password: "testUser"
  },
}
export function Login() {

  const [isTypePassword, setIsTypePassword] = useState(true);
  const queryClient = useQueryClient()
  const { control, handleSubmit,setValue, formState: { errors }, } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),

  });
  const navigate = useNavigate();
  const loginResponse = useMutation<LoginResponse, CustomError, ILogin>({
    mutationFn: (payload) => login(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"], exact: true })
      toast.success(data?.message);
      localStorage.setItem("accessToken", data?.data?.token);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message)
    }
  })

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    loginResponse.mutate(data);
  }
  const handleAutoCredentital = (type: AutoKeys) => {
    setValue("email", autoCredentials[type].email);
    setValue("password", autoCredentials[type].password);
  }

  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <>
        <Accordion type="single" collapsible className="px-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>Credentials</AccordionTrigger>
            <AccordionContent className="flex gap-2.5 flex-wrap [&>*]:bg-chart-2/60 [&>*]:hover:bg-chart-2/80">
              <Button onClick={() => handleAutoCredentital("superAdmin")}>
                Super Admin
              </Button>
              <Button onClick={() => handleAutoCredentital("admin")}>
                Admin
              </Button>
              <Button onClick={() => handleAutoCredentital("reviewer")}>
                Reviewer
              </Button>
              <Button onClick={() => handleAutoCredentital("user")}>
                User
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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
                  </div>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <Input {...field} type={isTypePassword ? "password" : "text"} className="pr-10" />
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
                <Button type="submit" className="w-full cursor-pointer" disabled={loginResponse.isPending}>
                  {loginResponse.isPending ? <ButtonLoading /> : "Login"}
                </Button>
              </div>
            </form>
            <div className="flex justify-end mt-3">
              <Link
                to="/signup"
                className="text-sm underline-offset-4 hover:underline"
              >
                Don't have account.
              </Link>
            </div>
          </CardContent>
        </Card>
      </>
    </div>
  )
}
