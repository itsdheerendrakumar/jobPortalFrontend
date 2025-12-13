import { Button } from "@/components/ui/button";
import { Divider } from "./Divider";
import { Link, NavLink } from "react-router-dom";
import { useProfileStore } from "@/store/profile";
import { adminEndPoints, commonEndPoints } from "@/constants/user";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserProfile } from "@/pages/users/Profile";

export function Sidebar({closeSidebar}: {closeSidebar?: () => void}) {
    const [isOpen, setIsOpen] = useState(false);
    const {role, profileImage, logout} = useProfileStore();

  const handleIsOpen = () => setIsOpen(pre => !pre)
    return (
        <div className="flex flex-col gap-2.5  justify-between h-full boreder-solid border-sidebar-ring">
            <div className="flex flex-col gap-2.5">
                <Button className="flex flex-col gap-2 items-center justify-between" variant="link" onClick={() => closeSidebar?.()}>
                    <Link to="/"><span className="text-lg">jobPortal</span></Link>
                </Button>
                <Divider />
                <Button
                    variant="ghost" 
                    className="flex justify-center items-center bg-transparent cursor-pointer mb-2.5"
                >
                    <Avatar className="h-14 w-14">
                        <AvatarImage src={profileImage} alt="@shadcn" />
                        <AvatarFallback><User size={16}/></AvatarFallback>
                    </Avatar>
                </Button>
                {commonEndPoints.map((path) => (
                    <NavLink
                        onClick={() => closeSidebar?.()}
                        key={path.label}
                        to={path.endPoint}
                        className={({isActive}) => `${isActive ? "px-2 rounded-md hover:bg-blue-600 hover:text-white bg-blue-400" : "px-2 rounded-md hover:bg-red-500"} text-center`}
                    >
                        {path.label}
                    </NavLink>
                ))}
                {(role === "admin") && adminEndPoints.map((path) => (
                    <NavLink
                        onClick={() => closeSidebar?.()}
                        key={path.label}
                        to={path.endPoint}
                        className={({isActive}) => isActive ? "px-2 rounded-md hover:bg-blue-600 hover:text-white bg-blue-400 text-center" : "px-2 rounded-md hover:bg-red-500 text-center"}
                    >
                        {path.label}
                    </NavLink>
                ))}
            </div>
            <div>
                <Button className="w-full" onClick={() => {handleIsOpen(); closeSidebar?.()}}>Setting</Button>
                <Button className="w-full mt-4" onClick={logout}>Logout</Button>
            </div>
            <Dialog
                open={isOpen}
                onOpenChange={handleIsOpen}
            >   
                <DialogContent className="overflow-y-auto max-h-screen">
                <DialogHeader className="text-left sm:text-center">
                    <DialogTitle>Profile</DialogTitle>
                </DialogHeader>
                    <UserProfile />
                </DialogContent>

            </Dialog>
        </div>
    )
}