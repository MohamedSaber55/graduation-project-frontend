import { useSelector } from "react-redux";
import { FaLinkedin, FaFacebook, FaWhatsapp } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import avatarImg from "./../assets/avatar.png";
import { team } from "./../data/team.json";

// Import team images dynamically
import team1 from "./../assets/team/saber-2.jpg";
import team2 from "./../assets/team/hesham.jpg";
import team3 from "./../assets/team/ziad.jpg";
import team4 from "./../assets/team/islam.jpg";
import team5 from "./../assets/team/team-girl.png";
import team6 from "./../assets/team/team-girl.png";

const Team = () => {
    const theme = useSelector(state => state.theme.theme);

    const idToImageMap = {
        1: team1,
        2: team2,
        3: team3,
        4: team4,
        5: team5,
        6: team6,
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } },
    };

    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen py-10 px-4" style={{ background: `radial-gradient(circle,${theme === "dark" ? "#E1752C" : "#E1752C"} 0%,${theme !== "dark" ? "#f3f4f6" : "rgb(31 41 55)"} 30%)` }}>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Meet Our Team</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
                    {team.map(member => (
                        <motion.div
                            key={member.id}
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <Tilt glareEnable={true} glareBorderRadius="10px" glareColor="#5d56e000">
                                <div className="bg-white dark:bg-dark rounded-xl shadow-md overflow-hidden group">
                                    <img src={idToImageMap[member.id] || avatarImg} alt={member.name} className="w-full brightness-50 duration-200 transition group-hover:brightness-100 aspect-square object-cover" />
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold mb-2 text-center">{member.name}</h2>
                                        <p className="text-gray-600 mb-4 text-center">{member.role}</p>
                                        <div className="flex items-center justify-center space-x-4">
                                            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition duration-300">
                                                <FaLinkedin size={24} />
                                            </a>
                                            <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition duration-300">
                                                <FaFacebook size={24} />
                                            </a>
                                            <a href={member.social.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition duration-300">
                                                <FaWhatsapp size={24} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Tilt>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Team;
