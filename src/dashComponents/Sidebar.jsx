import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaBox, FaExclamationTriangle, FaHome } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const links = [
    { title: "Home", to: "/dashboard", icon: <FaHome /> },
    { title: "Items", to: "/dashboard/items", icon: <FaBox /> },
    { title: "Persons", to: "/dashboard/persons", icon: <FaUsers /> },
    { title: "Complains", to: "/dashboard/complains", icon: <FaExclamationTriangle /> },
    { title: "Users", to: "/dashboard/users", icon: <FaUsers /> }
];

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const theme = useSelector(state => state.theme.theme)

    return (
        <div className="">
            {/* <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className={`h-screen sidebar bg-white dark:bg-dark border-e border-e-gray-200 dark:border-e-gray-600 dark:text-light shadow-md p-4 transform transition-transform duration-300 ${isOpen ? 'translate-x-0 w-48' : 'w-20 -translate-x-0'}`}> */}
            <div className={`h-screen sidebar bg-white dark:bg-dark border-e border-e-gray-200 dark:border-e-gray-600 dark:text-light shadow-md transform transition-transform duration-300 ${isOpen ? 'translate-x-0 w-48' : 'w-20 -translate-x-0'}`}>
                {/* <div className="border-b bg-red-200 flex justify-center items-center"> */}
                <h2 className={`text-2xl h-16 border-b border-e-gray-200 dark:border-b-gray-600 flex p-4 items-center text-center font-semibold transition-opacity duration-300`}>
                    {isOpen ? <>{theme == "dark" ? <img src={"/logo-dark.png"} className='w-16' /> : <img src={"/logo.png"} className='w-16' />}  <span className='text-main'>Tracker</span></> : <>{theme == "dark" ? <img src={"/logo-dark.png"} className='w-16' /> : <img src={"/logo.png"} className='w-16' />}</>}
                </h2>
                {/* </div> */}
                <ul className="space-y-4 p-4">
                    {links.map((link, index) => (
                        <li key={index} className={`flex items-center rounded-lg ${location.pathname === link.to ? 'bg-main text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                            <Link to={link.to} className={`flex items-center space-x-2 w-full text-lg delay-300 transition-transform p-2 ${isOpen ? "" : "justify-center"}`} onClick={() => setIsOpen(false)}>
                                <span className={`${isOpen ? "basis-6" : ""} transform delay-300`}>
                                    {link.icon}
                                </span>
                                <span className={`transition delay-200 text-base ${isOpen ? "" : "sr-only opacity-0"}`}>{link.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;