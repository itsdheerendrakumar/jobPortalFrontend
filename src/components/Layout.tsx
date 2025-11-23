import { Outlet } from "react-router-dom";
import { Sidebar } from "./customComponents/common/Sidebar";
import { Menu } from "lucide-react";
import { useRef, useState } from "react";
import { useOnClickOutside } from 'usehooks-ts'

export function Layout() {
    const [showSidebar, setShowSidebar] = useState(false);
    const mobileRef = useRef(null);
    
    const handleClickInside = () => {
        setShowSidebar(false)
    }
    useOnClickOutside(mobileRef as unknown as React.RefObject<HTMLElement>, handleClickInside)


    return(
        <div className="bg-background min-h-screen relative">
            <div className="hidden sm:block w-50 sm:fixed sm:top-4 sm:left-4 sm:bottom-4 rounded-sm p-2 shadow-md">
                <Sidebar />
            </div>

            <div className="px-4 py-2 sticky top-0 z-10 bg-white sm:hidden">
                <Menu  onClick={() => setShowSidebar(!showSidebar)}/>
            </div>
            <div 
            ref={mobileRef} 
            className={`absolute ${showSidebar ? "fixed left-4 top-0 bottom-0 p-2" : "-translate-x-full"} 
                z-11 bg-white sm:hidden transition-transform h-full min-w-[200px]`}
            >
                <Sidebar />
            </div>
            <div className="ml-0 sm:ml-56 bg-accent min-h-[calc(100vh-1rem)] rounded-sm">
                <Outlet />
            </div>
        </div>
    )
}