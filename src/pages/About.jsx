// import aboutBg from "./../assets/aboutBg.png"
import { useSelector } from "react-redux"
import aboutSVG from "./../assets/about-us.svg"
const About = () => {
    const theme = useSelector(state => state.theme.theme)
    return (
        // <div className="relative text-dark dark:text-light min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${aboutBg})` }}>
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light h-[calc(100vh-64p)] bg-cover bg-center" style={{ background: `radial-gradient(circle,${theme == "dark" ? "#E1752C" : "#E1752C"} 0%,${theme !== "dark" ? "#f3f4f6" : "#111827"} 30%)` }}>
            <div className="layer h-[calc(100vh-64px)] w-full backdrop-blur-3xl">
                <div className="container py-5 h-full">
                    <div className="grid lg:grid-cols-2 gap-5 h-full">
                        <div className="flex flex-col justify-center gap-5 py-5">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif"><span className="text-main">About</span> Us</h2>
                            <div className="content">
                                <p className="leading-loose md:leading-loose text-base md:text-lg text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.  </p>
                            </div>
                        </div>
                        <div className="image hidde lg:block">
                            <img src={aboutSVG} className="w-full h-[490px]" alt="About" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default About