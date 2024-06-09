import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DarkBtn from '../components/DarkBtn';
import { logout } from '../store/slices/authSlice';
import { TfiClose } from 'react-icons/tfi';
import { VscMenu } from 'react-icons/vsc';
import avatar from "./../assets/avatar2.jpg"

// eslint-disable-next-line react/prop-types
const TopNav = ({ isOpen, toggleSidebar }) => {
    const dispatch = useDispatch();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const state = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logout());
    };
    const userImage = localStorage.getItem("trackerUserImage")

    const handleProfileDropdownToggle = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    return (
        <nav className="bg-white dark:bg-dark text-dark dark:text-white border-b border-e-gray-200 dark:border-b-gray-600 select-none shadow-md dark:shadow-black/30 h-16 flex items-center justify-between px-4">
            <button onClick={toggleSidebar} className="p-2 focus:outline-none">
                {isOpen ? <TfiClose className="text-2xl" /> : <VscMenu className="text-2xl" />}
            </button>
            <div className="flex gap-4 items-center ">
                <div className="flex items-center">
                    <DarkBtn />
                </div>
                <div className="flex gap-4 items-center">
                    {state.token && (
                        <div className="relative">
                            <div onClick={handleProfileDropdownToggle} className="image h-10 aspect-square border rounded-full">
                                <img src={"http://localhost:5097/Resources/" + userImage || avatar} className="rounded-full w-full" alt="" />
                            </div>
                            {/* <FaUserCircle size={34} className="cursor-pointer" onClick={handleProfileDropdownToggle} /> */}
                            {profileDropdownOpen && (
                                <div className="nav-dropdown absolute right-0 mt-2 w-48 shadow-lg z-20 border dark:border-gray-600 rounded bg-white dark:bg-dark-light">
                                    <Link onClick={handleProfileDropdownToggle} to="/profile" className="block px-4 py-2 text-sm hover:bg-main hover:text-white">Profile</Link>
                                    {state.role == 2 && (
                                        <Link onClick={handleProfileDropdownToggle} to="/" className="block px-4 py-2 text-sm hover:bg-main hover:text-white">Website</Link>
                                    )}
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-main hover:text-white">Logout</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
