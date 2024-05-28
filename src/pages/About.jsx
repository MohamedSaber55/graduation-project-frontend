/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion';
import missingPersonImage from '../assets/People search-cuate.png';
import foundObjectImage from '../assets/Search engines-bro.png';
import img from "./../assets/Competitive intelligence-pana.png"

const About = () => {
    return (
        <div className="flex justify-center items-center flex-col min-h-screen bg-light dark:bg-dark-light text-gray-800 dark:text-gray-200 py-10 w-full hidden-scrollbar">
            <div className='container rounded-md'>
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Our Project</h1>
                <div className="flex flex-col gap-5">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white dark:bg-dark rounded-xl shadow-md p-4"
                    >
                        <img src={missingPersonImage} alt="Missing person" className="w-full aspect-video object-cover rounded-md" />
                        <div className="pt-1">
                            <p className="text-base md:text-lg px-5 leading-loose">
                                Undoubtedly, we often come across social media posts about missing people and objects, while occasionally encountering instances where people are found in unfamiliar places without any identifying information. Considering this, we decided to envision a platform or application that serves as a dedicated hub for locating the lost.
                            </p>
                        </div>

                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white dark:bg-dark rounded-xl shadow-md p-4"
                    >
                        <img src={foundObjectImage} alt="Missing Items" className="w-full aspect-video object-cover rounded-md" />
                        <div className="pt-1">
                            <p className="text-base md:text-lg px-5 leading-loose mb-4">
                                By utilizing this service, users can proactively search for their loved ones by entering all available information, accompanied by a photograph. Our application leverages a machine learning model for person identification or object recognition, assisting in locating them.
                            </p>
                            <p className='"text-base md:text-lg px-5 leading-loose'>
                                To cater to specific scenarios, we also offer a unique solution in the form of personalized bracelets. These bracelets are intended as gifts for people who are particularly susceptible to getting lost, such as toddlers or elderly people with Alzheimer's syndrome. Once the bracelet is scanned and linked to the wearer's home, our application establishes a connection to facilitate their safe return.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white dark:bg-dark rounded-xl shadow-md p-4"
                    >
                        <img src={img} alt="More" className="w-full aspect-[16/10] object-cover rounded-md" />
                        <div className="pt-1 text-base md:text-lg px-5 leading-loose">
                            <p className="mb-4">
                                Furthermore, our application offers a straightforward process for users who have found any lost person or object. By simply uploading an image of the found person or object along with their current location, our app manages the subsequent steps to connect users with each other. However, our platform's capabilities extend beyond this fundamental function.
                            </p>
                            <p>
                                Our mission is to provide peace of mind by creating a reliable and efficient platform to reunite lost individuals and objects with their owners. Join us in making the world a safer place, one connection at a time.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default About;
