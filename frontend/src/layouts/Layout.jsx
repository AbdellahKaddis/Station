import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const Layout =()=>{
    return <div className="flex h-screen bg-gray-100 font-inter">
            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <Header/>
                <main className="p-6 flex-1 overflow-y-auto">
                    <Outlet/>
                </main>
                <footer className="p-4 text-center text-sm text-gray-600 bg-white shadow-inner">
                    Gas Station Dashboard © 2025
                </footer>
            </div>
    </div>
};
export default Layout;