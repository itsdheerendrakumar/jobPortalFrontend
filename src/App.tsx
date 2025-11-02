import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { superAdminRoutes } from "./routes/superAdmin";
import { adminRoutes } from "./routes/admin";
import { Toaster } from "sonner";
import { useProfileStore } from "./store/profile";
import type { CustomError } from "./types/error";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./service/apis";
import { useEffect } from "react";
import { reviewerRoutes } from "./routes/reviewer";

export default function App() {

  const {role, updateProfile} = useProfileStore();

  const {data} = useQuery<ProfileResponse, CustomError>({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if(data)
      updateProfile(data.data.name, data.data.imageUrl || "", data.data.role)
  }, [data])

  return (
    <>
      <Toaster 
        position="top-right"
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          {role === "superAdmin" && superAdminRoutes.map(({path, Page}) => (
            <Route key={path} path={path} element={<Page />} />
          ))}

          {role === "admin" && adminRoutes.map(({path, Page}) => (
            <Route key={path} path={path} element={<Page />} />
          ))}

          {role === "reviewer" && reviewerRoutes.map(({path, Page}) => (
            <Route key={path} path={path} element={<Page />} />
          ))}

        </Route>
      </Routes>
    </>
  )
}