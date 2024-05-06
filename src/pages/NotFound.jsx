/* eslint-disable react/no-unescaped-entities */
import { RiErrorWarningLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <section className="h-screen flex flex-col justify-center items-center bg-light dark:bg-dark-light text-dark dark:text-light">
            <div className="flex flex-col items-center gap-8">
                <RiErrorWarningLine className="text-8xl text-main" />
                <div className="text-center">
                    <p className="text-5xl font-bold mb-4">Oops!</p>
                    <p className="text-lg mb-6">We couldn't find the page you're looking for.</p>
                    <Link
                        to="/"
                        className="bg-main text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-80 transition duration-300"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;