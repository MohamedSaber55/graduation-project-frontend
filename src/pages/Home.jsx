/* eslint-disable no-unused-vars */
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/free-mode';
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllItems, getAllItemsSearch } from "../store/slices/itemSlice";
import { getAllPersons, getAllPersonsSearch } from "../store/slices/personsSlice";
import Post from '../components/Post';

const Home = () => {
    const [searchText, setSearchText] = useState("")
    const [searchCategory, setSearchCategory] = useState("")
    const theme = useSelector((state) => state.theme.theme);
    const itemsState = useSelector((state) => state.items);
    const personsState = useSelector((state) => state.persons);
    const authState = useSelector((state) => state.user);
    const items = itemsState?.items || [];
    const persons = personsState.persons || [];
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllItems(authState.token))
        dispatch(getAllPersons(authState.token))
    }, [authState, dispatch])
    const categoryOptions = [
        { value: "person", label: "Person" },
        { value: "item", label: "Item" },
    ];
    const handleChange = (selectedOption) => {
        setSearchCategory(selectedOption.value)
    };
    const handleSearch = (e) => {
        e.preventDefault()
        if (searchCategory === "item") {
            navigate(`/search/items/${searchText}`);
        } else {
            navigate(`/search/persons/${searchText}`);
        }
    }
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
                    <h3 className="text-3xl font-semibold my-5">Search Posts...</h3>
                    <form onSubmit={e => handleSearch(e)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-between gap-5 py-5">
                        <input onChange={e => setSearchText(e.target.value)} type="text" className="rounded-xl border border-main bg-transparent p-2 focus:outline-none" placeholder="Search..." />
                        <Select styles={customStyles}
                            options={categoryOptions}
                            placeholder="Category"
                            onChange={handleChange}
                        />
                        <button type='submit' className="bg-main hover:bg-second rounded-xl p-2 text-light">Search Now</button>
                    </form>
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
                                    slidesPerView: 1,
                                },
                                375: {
                                    slidesPerView: 1,
                                },
                                425: {
                                    slidesPerView: 1,
                                },
                                576: {
                                    slidesPerView: 1,
                                },
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                                2048: {
                                    slidesPerView: 4,
                                },
                                2560: {
                                    slidesPerView: 5,
                                },
                                3840: {
                                    slidesPerView: 5,
                                },
                            }}
                        >
                            {persons.slice(0, 10)?.map((person, i) => (
                                <SwiperSlide key={i}>
                                    <Post key={person.id} type="person" last={false} data={person} />
                                </SwiperSlide>
                            ))}
                            <SwiperSlide className="">
                                <Post type="person" last={true} data={{}} />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <div className="container bg-white dark:bg-dark p-6 rounded-xl shadow-lg my-5">
                    <h3 className="text-3xl md:text-4xl font-semibold my-5 text-center">Cards</h3>
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
                            {items.slice(0, 10)?.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <Post type="item" data={item} />
                                </SwiperSlide>
                            ))}
                            <SwiperSlide className="">
                                <Post type="item" last={true} data={{}} />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home