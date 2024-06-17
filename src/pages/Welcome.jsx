import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"

const Welcome = () => {
    const theme = useSelector(state => state.theme.theme)
    return (
        <section className="bg-light dark:bg-dark-light text-dark dark:text-light">
            <div className="h-screen flex flex-col justify-center items-center gap-10 w-4/5 m-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-main text-4xl  xxs:text-5xl md:text-7xl font-semibold mb-5">Welcome to</motion.h1>
                <h1 className="flex items-center text-5xl font-bold text-main">
                    {theme == "dark" ? <img src={"/logo-dark.png"} className='w-16' /> : <img src={"/logo.png"} className='w-16' />}
                    <span>Tracker</span>
                </h1>
                <p className="text-base md:text-xl font-semibold text-center">The connecting  between the advertiser of the missing and the searcher for any missing, <br />
                    help you meet your need
                </p>
                <Link to={"/signin"} className="bg-gradient-to-r from-second to-main text-white text-xl font-medium text-center p-3 w-64 rounded-3xl mt-10">Get Started</Link>
            </div>
        </section>
    )
}

export default Welcome