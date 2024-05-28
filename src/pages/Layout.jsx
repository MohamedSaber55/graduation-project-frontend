import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ToTop"

const Layout = () => {
    return (
        <div>
            <ScrollToTop/>
            <Navbar />
            <div className="min-h-screen pt-16 hidden-scrollbar">
                <Outlet></Outlet>
            </div>
            <Footer />
        </div>
    )
}

export default Layout