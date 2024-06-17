import { Link } from "react-router-dom"
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaChevronRight } from "react-icons/fa6"
import { useSelector } from "react-redux"

const Footer = () => {
    const theme = useSelector(state => state.theme.theme)
    return (
        <footer className="bg-white dark:bg-dark">
            <div className="container p-6 text-dark dark:text-light">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
                    <div className="col-span-2 text-left">
                        <div className="logo rounded-full ">
                            <Link to="/" className="flex gap- items-center">
                                {theme == "dark" ?
                                    <img src={"/logo-dark.png"} className="h-16" alt="Logo" /> :
                                    <img src={"/logo.png"} className="h-16" alt="Logo" />}
                                <h1 className="text-main font-bold text-3xl">Tracker</h1>
                            </Link>
                        </div>
                        <p className="text-sm leading-6 pt-2">
                            Our platform is dedicated to helping individuals find lost loved ones and personal items. Utilizing advanced machine learning technology, we enable users to upload photos and information to assist in the search process. Join us in creating a safer and more connected community.
                        </p>
                    </div>
                    <div className="col-span-2 md:col-span-1 space-y-3">
                        <h2 className='text-2xl font-semibold '>Useful Links</h2>
                        <div className="links flex flex-col gap-3">
                            <Link to={'/about'} className="text-sm font-semibold tracking-wider hover:text-main duration-300 flex gap-1 items-center"><FaChevronRight className='text-main' /> About Us</Link>
                            <Link to={'/team'} className="text-sm font-semibold tracking-wider hover:text-main duration-300 flex gap-1 items-center"><FaChevronRight className='text-main' /> Our team</Link>
                            {/* <Link to={'/posts'} className="text-sm font-semibold tracking-wider hover:text-main duration-300 flex gap-1 items-center"><FaChevronRight className='text-main' /> Posts</Link> */}
                            <Link to={'/contact'} className="text-sm font-semibold tracking-wider hover:text-main duration-300 flex gap-1 items-center"><FaChevronRight className='text-main' /> Contact Us</Link>
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1 space-y-3">
                        <h2 className='text-2xl font-semibold '>Social Links</h2>
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