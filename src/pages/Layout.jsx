import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer"

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen pt-16">
                <Outlet></Outlet>
            </div>
            <Footer />
        </div>
    )
}

export default Layout