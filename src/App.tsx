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

export default function App() {

  const {role} = useProfileStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [])
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