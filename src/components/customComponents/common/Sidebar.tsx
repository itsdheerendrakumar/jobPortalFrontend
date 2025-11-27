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

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const {role, profileImage, logout} = useProfileStore();

  const handleIsOpen = () => setIsOpen(pre => !pre)
    return (
        <div className="flex flex-col gap-2.5  justify-between h-full boreder-solid border-sidebar-ring">
            <div className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-2 items-center justify-between">
                    <Link to="/"><span className="text-lg">jobPortal</span></Link>
                    <Divider />
                </div>
                <Button 
                    variant="link" 
                    className="flex justify-center items-center bg-transparent cursor-pointer mb-2.5"
                    onClick={handleIsOpen}
                >
                    <Avatar className="h-14 w-14">
                        <AvatarImage src={profileImage} alt="@shadcn" />
                        <AvatarFallback><User size={16}/></AvatarFallback>
                    </Avatar>
                </Button>
                {commonEndPoints.map((path) => (
                    <NavLink
                        key={path.label}
                        to={path.endPoint}
                        className={({isActive}) => `${isActive ? "px-2 rounded-md hover:bg-blue-600 hover:text-white bg-blue-400" : "px-2 rounded-md hover:bg-red-500"} text-center`}
                    >
                        {path.label}
                    </NavLink>
                ))}
                {(role === "admin") && adminEndPoints.map((path) => (
                    <NavLink
                        key={path.label}
                        to={path.endPoint}
                        className={({isActive}) => isActive ? "px-2 rounded-md hover:bg-blue-600 hover:text-white bg-blue-400 text-center" : "px-2 rounded-md hover:bg-red-500 text-center"}
                    >
                        {path.label}
                    </NavLink>
                ))}
            </div>
            <Button className="w-full" onClick={logout}>Logout</Button>
            <Dialog
                open={isOpen}
                onOpenChange={handleIsOpen}
            >   
                <DialogContent className="overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle>Profile</DialogTitle>
                </DialogHeader>
                    <UserProfile />
                </DialogContent>

            </Dialog>
        </div>
    )
}