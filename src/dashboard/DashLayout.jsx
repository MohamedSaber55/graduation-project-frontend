import { Outlet } from "react-router-dom"
import Sidebar from "../dashComponents/Sidebar"
import TopNav from "../dashComponents/TopNav"
import { useState } from "react";

const DashLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="flex overflow-hidden">
            <div className={`side ${isOpen ? "basis-48" : "basis-20"}`}>
                <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <div className="flex-grow shrink">
                <TopNav toggleSidebar={toggleSidebar} isOpen={isOpen} />
                <div className="h-[calc(100vh-64px)]">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default DashLayout