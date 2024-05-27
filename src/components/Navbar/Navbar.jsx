import { useState, useEffect, useRef } from "react";
import { TfiClose } from 'react-icons/tfi';
import { VscMenu } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp, FaUserCircle } from 'react-icons/fa';
import logo from "./../../assets/logo.png";
import DarkBtn from "../DarkBtn";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const links = [
    { title: "Home", to: "/" },
    {
        title: "Posts", submenu: true, sublinks: [
            { title: "Items", to: "/items" },
            { title: "Persons", to: "/persons" },
        ]
    },
    { title: "About", to: "/about" },
    { title: "Team", to: "/team" },
    { title: "Contact", to: "/contact" },
];

const Navbar = () => {
    const dispatch = useDispatch();
    const [top, setTop] = useState(" ");
    const [navOpen, setNavOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [position, setPosition] = useState("absolute");
    const navbarRef = useRef(null);
    const state = useSelector(state => state.user);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 64) {
                setPosition("fixed");
                setTop("top-0");
            } else {
                setTop(" ");
                setPosition("fixed");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // useEffect(() => {
    //     // Function to handle clicks outside the dropdowns
    //     const handleClickOutside = (event) => {
    //         // Check if the click occurred outside the profile dropdown
    //         if (navbarRef.current && !navbarRef.current.contains(event.target)) {
    //             setProfileDropdownOpen(false);
    //         }
    //         // Check if the click occurred outside the main menu dropdown
    //         if (!event.target.closest('.nav-dropdown')) {
    //             setDropdownOpen(false);
    //         }
    //     };

    //     // Attach the event listener to the document
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         // Remove the event listener when component unmounts
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleProfileDropdownToggle = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    return (
        <nav ref={navbarRef} className={`bg-light h-16 dark:bg-dark text-dark dark:text-white select-none ${position} ${top} duration-300 left-0 right-0 z-50 shadow-md dark:shadow-black/30`}>
            <div className="container">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-between md:items-stretch">
                        <div className="flex items-center">
                            <Link to="/">
                                <img src={logo} className="h-12" alt="Logo" />
                            </Link>
                        </div>
                        <div className="hidden md:flex gap-4 items-center">
                            {state.token && links.map((link, i) => (
                                link.submenu ? (
                                    <div key={i} className="relative">
                                        <button onClick={handleDropdownToggle} className="flex items-center font-medium w-full py-2 px-0.5 hover:text-main">
                                            {link.title}
                                            {dropdownOpen ? <FaAngleUp className="ml-1" /> : <FaAngleDown className="ml-1" />}</button>
                                        {dropdownOpen && (
                                            <div className="nav-dropdown absolute left-0 top-full mt-2 w-48 shadow-lg z-20 border dark:border-gray-600 rounded bg-white dark:bg-dark-light">
                                                {link.sublinks.map((sublink, j) => (
                                                    <Link onClick={handleDropdownToggle} key={j} to={sublink.to} className="block px-4 py-2 text-sm hover:bg-main hover:text-white">
                                                        {sublink.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link key={i} to={link.to} className="font-medium w-full py-2 px-0.5 hover:text-main">{link.title}</Link>
                                )
                            ))}
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="flex items-center">
                                <DarkBtn />
                            </div>
                            <div className="flex gap-4 items-center">
                                {state.token && (
                                    <div className="relative">
                                        <FaUserCircle size={34} className="cursor-pointer" onClick={handleProfileDropdownToggle} />
                                        {profileDropdownOpen && (
                                            <div className="nav-dropdown absolute right-0 mt-2 w-48 shadow-lg z-20 border dark:border-gray-600 rounded bg-white dark:bg-dark-light">
                                                <Link onClick={handleProfileDropdownToggle} to="/profile" className="block px-4 py-2 text-sm hover:bg-main hover:text-white">Profile</Link>
                                                <Link onClick={handleProfileDropdownToggle} to="/settings" className="block px-4 py-2 text-sm hover:bg-main hover:text-white">Settings</Link>
                                                <Link onClick={handleProfileDropdownToggle} to="/post/add" className="block px-4 py-2 text-sm hover:bg-main hover:text-white">Add Post</Link>
                                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-main hover:text-white">Logout</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="inset-y-0 right-0 flex items-center md:hidden">
                        <button onClick={() => setNavOpen(!navOpen)} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none text-dark dark:text-white" aria-controls="mobile-menu" aria-expanded="false">
                            {!navOpen ? <VscMenu size={22} /> : <TfiClose size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* mobile view */}
            <div className={`md:hidden bg-light dark:bg-dark ${!navOpen && 'hidden duration-300'}`} id="mobile-menu">
                <div className="flex flex-col space-y-1 px-5 pb-4 pt-2 justify-center">
                    {state.token && links.map((link, i) => (
                        link.submenu ? (
                            <div key={i}>
                                <button onClick={handleDropdownToggle} className="font-medium w-full text-start py-2 px-0.5 hover:text-main">
                                    {link.title}
                                    {dropdownOpen ? <FaAngleUp className="ml-1" /> : <FaAngleDown className="ml-1" />}
                                </button>
                                {dropdownOpen && (
                                    <div className="mt-2 border dark:border-gray-600 rounded bg-white dark:bg-dark-light">
                                        {link.sublinks.map((sublink, j) => (
                                            <Link key={j} onClick={() => { setNavOpen(!navOpen); handleDropdownToggle() }} to={sublink.to} className="block px-4 py-2 text-sm hover:bg-main hover:text-white">
                                                {sublink.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link key={i} onClick={() => setNavOpen(!navOpen)} to={link.to} className="font-medium w-full py-2 px-0.5 hover:text-main">{link.title}</Link>
                        )
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

