import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

function AppLayout(){
    return(
        <div className="flex min-h-screen bg-surface-bg">
            <Sidebar></Sidebar>
            <div className="flex-1 pb-16 mb:pb-0">
                <Outlet/>
            </div>
            <MobileNav/>
        </div>
    )
}

export default AppLayout;