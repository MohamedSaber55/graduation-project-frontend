
import { data } from "./../data/data.json"
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/free-mode';
import moment from "moment";
import { Link } from "react-router-dom";
import objectImage from "./../assets/item.png"
import Select from "react-select"
const Home = () => {
    const theme = localStorage.getItem("theme") || "light"

    const categoryOptions = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" }
    ];
    const handleChange = (selectedOption) => {
        console.log("Selected Option:", selectedOption);
    };
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "none",
            borderRadius: "0.5rem",
            backgroundColor: theme === "dark" ? "#1a202c" : "#f3f4f6",
            color: theme === "dark" ? "#fff" : "#000",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: theme === "dark" ? "#fff" : "#000",
        }),
        menubar: (provided, state) => ({
            ...provided,
            backgroundColor: theme === "dark" ? "#1a202c" : "#f3f4f6",
        })
    };
    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen">
            <div className="container flex flex-col gap-10">
                <div className="title text-center py-10 text-dark dark:text-light">
                    <h1 className="text-5xl text-second font-bold mb-3">TRACKER</h1>
                    <p className="text-sm sm:text-base lg:text-lg">The connecting  between the advertiser of the missing and the searcher for any missing
                        {/* <br /> */}
                        help you meet your need
                    </p>
                </div>
                <div className="search-box container bg-white dark:bg-dark p-6 rounded-xl shadow-lg">
                    <h3 className="text-3xl font-semibold my-5">Search for the lost</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-between gap-5 py-5">
                        <input type="text" className="rounded-xl bg-light dark:bg-dark-light p-2 focus:outline-none" placeholder="Search..." />
                        <Select styles={customStyles}
                            options={categoryOptions}
                            onChange={handleChange}
                        // className="bg-light dark: rounded" 
                        />
                        <input type="text" className="rounded-xl bg-light dark:bg-dark-light p-2 focus:outline-none" placeholder="Address" />
                        <button className="bg-main hover:bg-second rounded-xl p-2 text-light">Search Now</button>
                    </div>
                </div>
                <div className="container bg-white dark:bg-dark p-6 rounded-xl shadow-lg my-5">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold my-5 text-center">Lost People</h3>
                    <div className="py-5">
                        <Swiper
                            modules={[FreeMode]}
                            freeMode={{ clickable: true }}
                            spaceBetween={30}
                            breakpoints={{
                                280: {
                                    width: 280,
                                    slidesPerView: 1,
                                },
                                375: {
                                    width: 375,
                                    slidesPerView: 1,
                                },
                                425: {
                                    width: 425,
                                    slidesPerView: 1,
                                },
                                576: {
                                    width: 576,
                                    slidesPerView: 3,
                                },
                                768: {
                                    width: 768,
                                    slidesPerView: 3,
                                },
                                1024: {
                                    width: 1024,
                                    slidesPerView: 4,
                                },
                                2048: {
                                    width: 2048,
                                    slidesPerView: 4,
                                },
                                2560: {
                                    width: 2560,
                                    slidesPerView: 5,
                                },
                                3840: {
                                    width: 3840,
                                    slidesPerView: 5,
                                },
                            }}
                        >
                            {data?.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <Link className="bg-light dark:bg-dark-light block rounded-md overflow-hidden" to={`/post/${item.id}`}>
                                        <div className="img-box">
                                            <img src={item.image} className="w-100" />
                                        </div>
                                        <div className="item-body flex flex-col gap-1 p-3">
                                            <span className="text-lg text-warning font-semibold">{item.status}</span>
                                            {/* <span className="text-lg font-semibold">{item.category}</span> */}
                                            <h5 className="text-xl font-bold">{item.name}</h5>
                                            <p className="text-lg">{item.age} Years</p>
                                        </div>
                                        <div className="bg-gray-300 dark:bg-gray-700 p-3">
                                            Since {" "}
                                            {moment(item.date, "DDMMYYYY").fromNow()}
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="container bg-white dark:bg-dark p-6 rounded-xl shadow-lg my-5">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold my-5 text-center">Lost Objects</h3>
                    <div className="py-5">
                        <Swiper
                            modules={[FreeMode]}
                            freeMode={{ clickable: true }}
                            spaceBetween={30}
                            breakpoints={{
                                280: {
                                    // width: 280,
                                    slidesPerView: 1,
                                },
                                375: {
                                    // width: 375,
                                    slidesPerView: 1,
                                },
                                425: {
                                    // width: 425,
                                    slidesPerView: 1,
                                },
                                576: {
                                    // width: 576,
                                    slidesPerView: 3,
                                },
                                768: {
                                    // width: 768,
                                    slidesPerView: 3,
                                },
                                1024: {
                                    // width: 1024,
                                    slidesPerView: 4,
                                },
                                2048: {
                                    // width: 2048,
                                    slidesPerView: 4,
                                },
                                2560: {
                                    // width: 2560,
                                    slidesPerView: 5,
                                },
                                3840: {
                                    width: 3840,
                                    slidesPerView: 5,
                                },
                            }}
                        >
                            {data?.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <Link className="bg-light dark:bg-dark-light block rounded-md overflow-hidden" to={`/post/${item.id}`}>
                                        <div className="img-box">
                                            <img src={objectImage} className="w-full" />
                                        </div>
                                        <div className="item-body flex flex-col gap-1 p-3">
                                            <span className="text-lg text-warning font-semibold">{item.status}</span>
                                            {/* <span className="text-lg font-semibold">{item.category}</span> */}
                                            <h5 className="text-xl font-bold">{item.name}</h5>
                                            <p className="text-lg">{item.age} Years</p>
                                        </div>
                                        <div className="bg-gray-300 dark:bg-gray-700 p-3">
                                            Since {" "}
                                            {moment(item.date, "DDMMYYYY").fromNow()}
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home