import { team } from "./../data/team.json";
import { FaLinkedin, FaFacebook, FaWhatsapp } from "react-icons/fa";
import avatarImg from "./../assets/avatar.png";
import Tilt from "react-parallax-tilt";
import { useSelector } from "react-redux";

const Team = () => {
    const theme = useSelector(state => state.theme.theme)
    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen py-10 px-4" style={{ background: `radial-gradient(circle,${theme == "dark" ? "#E1752C" : "#E1752C"} 0%,${theme !== "dark" ? "#f3f4f6" : "rgb(31 41 55)"} 30%)` }}>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-12 text-center">Meet Our Team</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
                    {team.map(member => (
                        <Tilt key={member.id} glareEnable={true} glareBorderRadius="10px" glareColor="#5d56e000">
                            <div className="bg-white dark:bg-dark rounded-xl shadow-md overflow-hidden group">
                                <img src={member.image || avatarImg} alt={member.name} className="w-full brightness-50 duration-200 transition group-hover:brightness-100 aspect-square object-cover" />
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
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Team;
