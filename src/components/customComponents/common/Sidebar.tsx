import { Button } from "@/components/ui/button";
import { Divider } from "./Divider";
import { adminEndPoints } from "@/constants/superAdmin";
import { Link, NavLink } from "react-router-dom";

export function Sidebar() {
    return (
        <div className="flex flex-col gap-2.5  justify-between h-full boreder-solid border-sidebar-ring">
            <div className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-2 items-center justify-between">
                    <Link to="/"><span className="text-lg">jobPortal</span></Link>
                    <Divider />
                </div>
                <div className="flex justify-between items-center">
                    <span>Welcome</span>
                    <span>name</span>
                </div>
                {adminEndPoints.map((path) => (
                    <NavLink
                        key={path.label}
                        to={path.endPoint}
                        className={({isActive}) => isActive ? "px-2 rounded-md hover:bg-red-500 bg-blue-400" : "px-2 rounded-md hover:bg-red-500"}
                    >
                        {path.label}
                    </NavLink>
                ))}
            </div>
            <Button className="w-full">Logout</Button>
        </div>
    )
}