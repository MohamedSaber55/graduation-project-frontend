import aboutBg from "./../assets/aboutBg.png"

const About = () => {
    return (
        <div className="relative text-dark dark:text-light min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${aboutBg})` }}>
            <div className="layer absolute inset-0 bg-gray-900 bg-opacity-50 flex p-5">
                <div className="flex flex-col gap-10 container mx-auto">
                    <h2 className="text-6xl font-bold text-light font-serif"><span className="text-main">About</span> Us</h2>
                    <div className="content max-w-md">
                        <p className="leading-loose text-light text-lg">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.  </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About