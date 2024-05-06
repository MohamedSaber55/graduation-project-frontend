// DarkBtn.js
import { useDispatch, useSelector } from "react-redux";
import dark from "./../assets/dark-mode-button.png";
import light from "./../assets/light-mode-button.png";
import { toggleTheme } from "../store/slices/themeSlice";
import { useEffect } from "react";

const DarkBtn = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);
    const element = document.documentElement;
    const changeTheme = () => {
        dispatch(toggleTheme());
    };
    useEffect(() => {
        if (theme == "light") {
            element.classList.remove("dark")
        }
        if (theme == "dark") {
            element.classList.remove("light")
        }
        element.classList.add(theme)
        localStorage.setItem("theme", theme)
    }, [element.classList, theme])

    return (
        <div className="relative">
            <img
                src={dark}
                onClick={changeTheme}
                className={`w-12 absolute right-0 z-10 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 ${theme === "dark" ? "opacity-0" : "opacity-100"
                    }`}
                alt=""
            />
            <img
                src={light}
                onClick={changeTheme}
                className="w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300"
                alt=""
            />
        </div>
    );
};

export default DarkBtn;
