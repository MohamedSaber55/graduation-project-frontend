import { Link } from "react-router-dom"
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaChevronRight } from "react-icons/fa6"
import logo from "./../assets/logo.png"

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-dark">
            <div className="container p-6 text-dark dark:text-light">
                <div className="grid md:grid-cols-3 gap-8 py-16">
                    <div className="col-span-1 space-y-4    text-left">
                        <div className="logo rounded-full ">
                            <Link to="/" className='flex gap-1 items-center'>
                                <img src={logo} className='h-12' alt="Dental Logo" />
                            </Link>
                        </div>
                        <p className="text-sm leading-6 pt-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, nemo! Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                        </p>
                        <div className="social-links flex gap-3 items-center">
                            <a href="/" target="_blank" className='border border-blue-600 dark:bg-light p-2 rounded-full'>
                                <FaFacebookF className='text-blue-600 hover:text-blue-700 transition duration-300' size={16} aria-label="facebook link" />
                            </a>
                            <a href="/" target="_blank" className='border border-blue-700 dark:bg-light p-2 rounded-full'>
                                <FaLinkedinIn className='text-blue-700 hover:text-blue-800' size={16} aria-label="facebook link" />
                            </a>
                            <a href="/" target="_blank" className='border border-blue-400 dark:bg-light p-2 rounded-full'>
                                <FaTwitter className='text-blue-400 hover:text-blue-500 transition duration-300' size={16} aria-label="facebook link" />
                            </a>
                            <a href="/" target="_blank" className='border border-pink-600 dark:bg-light p-2 rounded-full'>
                                <FaInstagram className='text-pink-600 hover:text-pink-700 transition duration-300' size={16} aria-label="facebook link" />
                            </a>
                        </div>
                    </div>
                    <div className="col-span-1 space-y-3">
                        <h2 className='text-2xl font-semibold '>Useful Links</h2>
                        <div className="links flex flex-col gap-3">
                            <Link to={'/about'} className="text-sm font-semibold tracking-wider hover:text-main duration-300 flex gap-1 items-center"><FaChevronRight className='text-main' /> About Us</Link>
                            <Link to={'/team'} className="text-sm font-semibold tracking-wider hover:text-main duration-300 flex gap-1 items-center"><FaChevronRight className='text-main' /> Our team</Link>
                            <Link to={'/missing'} className="text-sm font-semibold tracking-wider hover:text-main duration-300 flex gap-1 items-center"><FaChevronRight className='text-main' /> Missing</Link>
                            <Link to={'/contact'} className="text-sm font-semibold tracking-wider hover:text-main duration-300 flex gap-1 items-center"><FaChevronRight className='text-main' /> Contact Us</Link>
                        </div>
                    </div>
                    <div className="col-span-1 space-y-3">
                        <h2 className='text-2xl font-semibold text-white '>Contact Us</h2>
                        <ul className="contact-info flex flex-col gap-3">
                            <li className='text-sm font-semibold tracking-wider flex gap-1 items-center'><span className='text-main'>Address :</span> 123 Street Name, City, State, Country.</li>
                            <li className='text-sm font-semibold tracking-wider flex gap-1 items-center'><span className='text-main'>Phone :</span> +20 121 0529 969</li>
                            <li className='text-sm font-semibold tracking-wider flex gap-1 items-center'><span className='text-main'>Email :</span> tracker@example.com</li>
                            <li className='text-sm font-semibold tracking-wider flex gap-1 items-center'><span className='text-main'>Working Hours :</span> Sun - Tue, 9am -  5pm</li>
                        </ul>
                    </div>
                </div>
                <div className=" border-t border-gray-500 py-5">
                    <p className="text-sm text-dark-light dark:text-gray-400">
                        © 2024 Tracker - All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer