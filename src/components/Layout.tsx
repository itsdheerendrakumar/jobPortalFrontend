import { Outlet } from "react-router-dom";
import { Sidebar } from "./customComponents/common/Sidebar";

export function Layout() {
    return(
        <div className="bg-background min-h-screen">
            <div className="w-50 fixed top-4 left-4 bottom-4 rounded-sm p-2 shadow-md">
                <Sidebar />
            </div>
            <div className="ml-52 bg-accent min-h-[calc(100vh-2rem)] rounded-sm">
                <Outlet />
            </div>
        </div>
    )
}