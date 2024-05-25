/* eslint-disable no-unused-vars */

import { data } from "./../data/data.json"
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/free-mode';
import moment from "moment";
import { Link } from "react-router-dom";
import objectImage from "./../assets/item.png"
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllItems } from "../store/slices/itemSlice";
import { getAllPersons } from "../store/slices/personsSlice";
const Home = () => {
    const theme = useSelector((state) => state.theme.theme);
    const itemsState = useSelector((state) => state.items);
    const personsState = useSelector((state) => state.persons);
    console.log(personsState);
    const items = itemsState?.items
    const persons = personsState?.persons
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllItems())
        dispatch(getAllPersons())
    }, [dispatch])
    const categoryOptions = [
        { value: "person", label: "Person" },
        { value: "item", label: "Item" },
    ];
    const handleChange = (selectedOption) => {
        console.log("Selected Option:", selectedOption);
    };
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "none",
            borderRadius: "6px",
            // borderRadius: "0.5rem",
            backgroundColor: theme === "dark" ? "#1f293700" : "#f3f4f600",
            color: theme === "dark" ? "#fff" : "#000",
            outline: "none",
            // borderColor: state.isFocused ? (theme === "dark" ? "#E1752C" : "#E1752C") : "#E1752C", // Change outline color when focused
            boxShadow: state.isFocused ? `0 0 0 1px ${theme === "dark" ? "#E1752C" : "#E1752C"}` : "0 0 0 1px #E1752C", // Add shadow when focused
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: theme === "dark" ? "#fff" : "#000",
        }),
        menubar: (provided, state) => ({
            ...provided,
            backgroundColor: theme === "dark" ? "#1f2937" : "#f3f4f6",
        }),
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: theme === "dark" ? "#1f2937" : "#f3f4f6",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? (theme === "dark" ? "#4a5568" : "#edf2f7") : "transparent",
            color: theme === "dark" ? "#fff" : "#000",
            "&:hover": {
                backgroundColor: theme === "dark" ? "#2d3748" : "#cbd5e0",
            },
        }),
    };
    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen">
            <div className="container flex flex-col gap-10">
                <div className="title text-center py-10 text-dark dark:text-light">
                    <h1 className="text-5xl text-second font-bold mb-3">TRACKER</h1>
                    <p className="text-sm sm:text-base lg:text-lg">The connecting  between the advertiser of the missing and the searcher for any missing
                        <br />
                        help you meet your need
                    </p>
                </div>
                <div className="search-box container bg-white dark:bg-dark p-6 rounded-xl shadow-lg">
                    <h3 className="text-3xl font-semibold my-5">Search for the lost</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-between gap-5 py-5">
                        <input type="text" className="rounded-xl border border-main bg-transparent p-2 focus:outline-none" placeholder="Search..." />
                        <Select styles={customStyles}
                            options={categoryOptions}
                            placeholder="Category"
                            onChange={handleChange}
                        />
                        <input type="text" className="rounded-xl border border-main bg-transparent p-2 focus:outline-none" placeholder="Address" />
                        <button className="bg-main hover:bg-second rounded-xl p-2 text-light">Search Now</button>
                    </div>
                </div>
                <div className="container bg-white dark:bg-dark p-6 rounded-xl shadow-lg my-5">
                    <h3 className="text-3xl md:text-4xl font-semibold my-5 text-center">People</h3>
                    <div className="py-5">
                        <Swiper
                            modules={[FreeMode]}
                            freeMode={{ clickable: true }}
                            spaceBetween={20}
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
                                    slidesPerView: 1,
                                },
                                640: {
                                    // width: 576,
                                    slidesPerView: 2,
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
                                    // width: 3840,
                                    slidesPerView: 5,
                                },
                            }}
                        >
                            {persons?.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <Link className="bg-light dark:bg-dark-light block rounded-md overflow-hidden" to={`/post/${item.id}`}>
                                        <div className="img-box">
                                            <img src={"http://localhost:5097/Resources/" + item.image} className="w-full" />
                                        </div>
                                        <div className="item-body flex flex-col gap-1 p-3">
                                            <span className="text-lg text-warning font-semibold">{item.status == 0 ? "Missed" : "Founded"}</span>
                                            {/* <span className="text-lg font-semibold">{item.category}</span> */}
                                            <h5 className="text-xl font-bold">{item.name}</h5>
                                            <p className="text-lg">{item.age} Years</p>
                                        </div>
                                        <div className="bg-gray-300 dark:bg-gray-700 p-3">
                                            {/* Since {" "} */}
                                            <p>Since: {moment(item.dateTime, "YYYY-MM-DDTHH:mm:ss").fromNow()}</p>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="container bg-white dark:bg-dark p-6 rounded-xl shadow-lg my-5">
                    <h3 className="text-3xl md:text-4xl font-semibold my-5 text-center">Objects</h3>
                    <div className="py-5">
                        <Swiper
                            modules={[FreeMode]}
                            freeMode={{ clickable: true }}
                            spaceBetween={20}
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
                                    slidesPerView: 1,
                                },
                                640: {
                                    // width: 576,
                                    slidesPerView: 2,
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
                                    // width: 3840,
                                    slidesPerView: 5,
                                },
                            }}
                        >
                            {items?.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <Link className="bg-light dark:bg-dark-light block rounded-md overflow-hidden" to={`/post/${item.id}`}>
                                        <div className="img-box">
                                            <img src={"http://localhost:5097/Resources/" + item.image} className="w-full" />
                                        </div>
                                        <div className="item-body flex flex-col gap-1 p-3">
                                            <span className="text-lg text-warning font-semibold">{item.status == 0 ? "Missed" : "Founded"}</span>
                                            {/* <span className="text-lg font-semibold">{item.category}</span> */}
                                            <h5 className="text-xl font-bold">{item.itemName}</h5>
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