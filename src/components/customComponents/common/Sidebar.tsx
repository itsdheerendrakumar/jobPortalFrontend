import { Button } from "@/components/ui/button";
import { Divider } from "./Divider";
import { adminEndPoints } from "@/constants/superAdmin";
import { Link, NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getProfile } from "@/service/apis";
import type { CustomError } from "@/types/error";
import { useProfileStore } from "@/store/profile";
import { useEffect } from "react";

export function Sidebar() {

    const {name, profileImage, role, updateProfile} = useProfileStore();
    console.log(name, profileImage, role)
    const profile = useMutation<ProfileResponse, CustomError>({
        mutationFn: getProfile,
        onSuccess: (data) => {updateProfile(data.data.name, data.data.imageUrl || "", data.data.role)},
    })
    useEffect(() => {profile.mutate()}, [])
    return (
        <div className="flex flex-col gap-2.5  justify-between h-full boreder-solid border-sidebar-ring">
            <div className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-2 items-center justify-between">
                    <Link to="/"><span className="text-lg">jobPortal</span></Link>
                    <Divider />
                </div>
                <div className="flex justify-between items-center gap-2.5">
                    <span>Welcome</span>
                    <span className="text-ellipsis max-w-[50%]">{name}</span>
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