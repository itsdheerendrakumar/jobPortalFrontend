import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { superAdminRoutes } from "./routes/superAdmin";
import { adminRoutes } from "./routes/admin";
const user: "admin" | "superAdmin" = "superAdmin";
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Layout />}>
        {user === "superAdmin" && superAdminRoutes.map(({path, Page}) => (
          <Route key={path} path={path} element={<Page />} />
        ))}

        {user === "admin" && adminRoutes.map(({path, Page}) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
      </Route>
    </Routes>
  )
}