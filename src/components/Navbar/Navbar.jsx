import { useState, useEffect, useRef } from "react";
import { TfiClose } from 'react-icons/tfi';
import { VscMenu } from "react-icons/vsc";
import { Link } from "react-router-dom";
import logo from "./../../assets/logo.png"
import DarkBtn from "../DarkBtn";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
const links = [
    { title: "Home", to: "/" },
    { title: "Posts", to: "/posts" },
    { title: "About", to: "/about" },
    { title: "Team", to: "/team" },
    { title: "Contact", to: "/contact" },
]


const Navbar = () => {
    const dispatch = useDispatch()
    const [top, setTop] = useState(" ")
    const [navOpen, setNavOpen] = useState(false)
    const [position, setPosition] = useState("absolute")
    const navbarRef = useRef(null)
    const state = useSelector(state => state.user)
    useEffect(() => {
        const handleScroll = () => {
            // if (scrollY >= 2 * navbarRef.current?.clientHeight) {
            if (window.scrollY >= 64) {
                setPosition("fixed")
                setTop("top-0")
            } else {
                setTop(" ")
                setPosition("fixed")
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <nav ref={navbarRef} className={`bg-light h-16 dark:bg-dark text-dark dark:text-white select-none ${position} ${top} duration-300 left-0 right-0 z-50 shadow-md dark:shadow-black/30`}>
            <div className="mx-5">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-between md:items-stretch">
                        <div className="flex items-center">
                            <Link to="/">
                                <img src={logo} className="h-12" alt="" />
                            </Link>
                        </div>
                        <div className="hidden md:flex gap-5 items-center">
                            {state.token && links.map((link, i) =>
                                <Link key={i} to={link.to} className={`font-medium w-full py-2 px-0.5  hover:text-main`}>{link.title}</Link>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <DarkBtn />
                            </div>
                            <div className="hidden md:flex gap-4 items-center ">
                                {state.token ? <>
                                    <button onClick={handleLogout} className="hover:bg-main text-sm border border-main py-2 px-4 hover:text-white rounded-2xl duration-150">Logout</button>
                                </> : <>
                                    <Link to={'/signin'} className="hover:bg-main text-sm border border-main py-2 px-4 hover:text-white rounded-2xl duration-150">Sign In</Link>
                                    <Link to={'/signup'} className="bg-main text-sm py-2 px-4 text-white hover:bg-transparent border border-main rounded-2xl duration-150">Sign Up</Link>
                                </>}
                                <Link to={'/post/add'} className="bg-main text-sm py-2 px-4 text-white dark:hover:text-light hover:text-dark hover:bg-transparent border border-main rounded-2xl duration-150">Add Post</Link>
                            </div>
                        </div>
                    </div>
                    <div className=" inset-y-0 right-0 flex items-center md:hidden">
                        <button onClick={() => setNavOpen(!navOpen)} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none text-dark dark:text-white" aria-controls="mobile-menu" aria-expanded="false">
                            {!navOpen ? <VscMenu size={22} /> : <TfiClose size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* mobile view */}
            <div className={`md:hidden bg-light dark:bg-dark ${!navOpen && 'hidden duration-300'}`} id="mobile-menu">
                <div className="flex flex-col  space-y-1 px-5 pb-4 pt-2 justify-center ">
                    {state.token && links.map((link, i) =>
                        <Link key={i} onClick={() => setNavOpen(!navOpen)} to={link.to} className={`font-medium w-full py-2 px-0.5 hover:text-main`}>{link.title}</Link>
                    )}
                </div>
                <div className="flex md:hidden gap-4 items-center px-5 pb-5">
                    {state.token ? <>
                        <button onClick={handleLogout} className="hover:bg-main text-sm border border-main py-2 px-4 hover:text-white rounded-2xl duration-150">Logout</button>
                    </> : <>
                        <Link to={'/signin'} className="hover:bg-main text-sm border border-main py-2 px-4 hover:text-white rounded-2xl duration-150">Sign In</Link>
                        <Link to={'/signup'} className="bg-main text-sm py-2 px-4 text-white hover:bg-transparent border border-main rounded-2xl duration-150">Sign Up</Link>
                    </>}
                    <Link onClick={() => setNavOpen(!navOpen)} to={'/post/add'} className="bg-main text-sm py-2 px-4 text-white dark:hover:text-light hover:text-dark hover:bg-transparent border border-main rounded-2xl duration-150">Add Post</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
