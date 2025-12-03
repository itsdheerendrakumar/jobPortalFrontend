import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { superAdminRoutes } from "./routes/superAdmin";
import { adminRoutes } from "./routes/admin";
import { Toaster } from "sonner";
import { useProfileStore } from "./store/profile";
import { reviewerRoutes } from "./routes/reviewer";
import { userRoutes } from "./routes/user";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { CustomError } from "./types/error";
import { getProfile, getProfilePicture } from "./service/apis";
import { queryKeys } from "./constants";

export default function App() {

  const {role, updateProfile, updateProfilePicture} = useProfileStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [])
  const isToken = !!localStorage.getItem("accessToken");
      const {data, isSuccess} = useQuery<ProfileResponse, CustomError>({
      queryKey: [queryKeys.profile],
      queryFn: () => getProfile(),
      refetchOnWindowFocus: false,
      enabled: isToken,
      staleTime: Infinity,
      gcTime: Infinity
    })
    const {data: profileUrl, isSuccess: profleSucess} = useQuery({
      queryKey: [queryKeys.profilePicture],
      queryFn: getProfilePicture,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: Infinity,
      enabled: isToken
    })
    useEffect(() => {
      if(isSuccess) {
          updateProfile(
            data?.data.name!, 
            data?.data.role!, 
            data?.data?.role === "user" ? data?.data?.resumePublicId : ""
          )
      }
    }, [data, isSuccess])
    useEffect(() => {
      if(profleSucess)
        updateProfilePicture(profileUrl || "")
    }, [profileUrl])
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

          {role === "user" && userRoutes.map(({path, Page}) => (
            <Route key={path} path={path} element={<Page />} />
          ))}

        </Route>
      </Routes>
    </>
  )
}