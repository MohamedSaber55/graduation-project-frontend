/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { data } from "./../data/data.json";
import { useSelector } from 'react-redux';
import Select from "react-select"
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import moment from 'moment/moment';

const Posts = () => {
    // Initial state for posts, filtration, and sorting
    const [filter, setFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [ageFilter, setAgeFilter] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const theme = useSelector((state) => state.theme.theme);

    const categoryOptions = [
        { value: "person", label: "Person" },
        { value: "item", label: "Item" },
    ];
    const sortByOptions = [
        { value: "name", label: "Name" },
        { value: "date", label: "Date" },
    ];

    // Function to handle category filter
    const handleCategoryFilterChange = (value) => {
        setCategoryFilter(value);
    };

    const handleChangeCategory = (selectedOption) => {
        handleCategoryFilterChange(selectedOption.value)
    };
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "none",
            width: "100%",
            borderRadius: "6px",
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
            // backgroundColor: theme === "dark" ? "#1f2937" : "#f3f4f6",
            backgroundColor: theme === "dark" ? "#1f293700" : "#f3f4f600",
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

    // Function to handle filtration
    const handleFilterChange = (e) => {
        const { value } = e.target;
        setFilter(value);
    };

    // Function to handle age filter
    const handleAgeFilterChange = (e) => {
        const { value } = e.target;
        setAgeFilter(value);
    };

    // Function to handle sorting
    const handleSortChange = (value) => {
        setSortBy(value);
    };
    const handleChangeSort = (selectedOption) => {
        handleSortChange(selectedOption.value)
    };
    // Apply filtration and sorting to posts
    const filteredPosts = data.filter(post =>
        post.name.toLowerCase().includes(filter.toLowerCase()) &&
        (categoryFilter ? post.category === categoryFilter : true) &&
        (ageFilter ? post.age.toString() === ageFilter : true)
    );
    const sortedPosts = sortBy ? [...filteredPosts].sort((a, b) => a[sortBy].localeCompare(b[sortBy])) : filteredPosts;

    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light overflow-hidden h-[calc(100vh-64px)]">
            <div className="px-3 py-5 h-full">
                <div className="filtration sorting mb-5 gap-4 lg:hidden rounded-md bg-white dark:bg-dark p-3 relative">
                    <button onClick={toggleDropdown} className="flex items-center justify-between w-full bg-transparent border border-main rounded-md px-3 py-2 text-lg text-left">
                        Filters
                        {!isOpen ? <MdKeyboardArrowDown size={18} /> : <MdKeyboardArrowUp size={18} />}
                    </button>
                    <div
                        className={`absolute top-full left-3 w-[calc(100%-24px)] bg-white dark:bg-dark p-3 border border-main rounded-md shadow-md transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                        style={{ maxHeight: isOpen ? "500px" : "0", overflow: "hidden" }}
                    >
                        {/* Filter input */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="search" className="text-lg">
                                Search what you're looking for
                            </label>
                            <input type="text" id="search" placeholder="Search..." value={filter} onChange={handleFilterChange} className="border border-main rounded-md px-3 py-2 w-full bg-transparent" />
                        </div>
                        {/* Category filter */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="sortCategory" className="text-lg">
                                Sort by Category
                            </label>
                            <Select styles={customStyles} id="sortCategory" options={categoryOptions} placeholder="Category" onChange={handleChangeCategory} />
                        </div>
                        {/* Age filter */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="filterAge" className="text-lg">
                                Filter by Age
                            </label>
                            <input type="number" placeholder="Age" min={1} value={ageFilter} onChange={handleAgeFilterChange} className="border border-main rounded-md px-3 py-2 w-full bg-transparent" />
                        </div>
                        {/* Sort select */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="sortBy" className="text-lg">
                                Sort by
                            </label>
                            <Select styles={customStyles} options={sortByOptions} id="sortBy" placeholder="Sort" onChange={handleChangeSort} />
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-10 gap-2 h-full">
                    <div className="posts col-span-8 overflow-y-scroll hidden-scrollbar rounded-md bg-white dark:bg-dark border-8 border-white dark:border-dark p4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {sortedPosts.map(post => (
                                <Link to={`/post/${post?.id}`} key={post?.id} className="post-card bg-light dark:bg-dark-light rounded-md overflow-hidden flex flex-col">
                                    <div className="post-image">
                                        <img src={post?.image} alt={post?.name} className="w-full h-full object-cover object-center" />
                                    </div>
                                    <div className="post-details p-4">
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{post?.name}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{post?.status}</p>
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            <div>
                                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Category</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{post?.category}</p>
                                            </div>
                                            {/* <div>
                                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Country</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{post?.country}</p>
                                            </div> */}
                                            <div className="">
                                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Address</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{post?.address}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Since</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{moment(post.date, "YYYY-MM-DD").fromNow()}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Age</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{post?.age ? post.age : null}</p>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Description</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{post?.desc}</p>
                                        </div> */}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="hidden lg:block space-y-4 col-span-2 rounded-md bg-white dark:bg-dark p-4">
                        {/* Filter input */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="search" className='text-lg'>Search what you looking for</label>
                            <input
                                type="text"
                                id='search'
                                placeholder="Search..."
                                value={filter}
                                onChange={handleFilterChange}
                                className="border border-main rounded-md px-3 py-2 w-full bg-transparent"
                            />
                        </div>
                        {/* Category filter */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="sortCategory" className='text-lg'>Sort by Category</label>
                            <Select
                                styles={customStyles}
                                id='sortCategory'
                                options={categoryOptions}
                                placeholder="Category"
                                onChange={handleChangeCategory}
                            />
                        </div>
                        {/* Age filter */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="filterAge" className='text-lg'>Filter by Age</label>
                            <input
                                type="number"
                                placeholder="Age"
                                min={1}
                                value={ageFilter}
                                onChange={handleAgeFilterChange}
                                className="border border-main rounded-md px-3 py-2 w-full bg-transparent"
                            />
                        </div>
                        {/* Sort select */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="sortBy" className='text-lg'>Sort by</label>
                            <Select styles={customStyles}
                                options={sortByOptions}
                                id='sortBy'
                                placeholder="Sort"
                                onChange={handleChangeSort}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;


// {/* <div className="filtration sorting grid sm:grid-cols-2 items-stretch mb-5 gap-4 lg:hidden rounded-md bg-white dark:bg-dark p-3">
// {/* Filter input */}
// <div className="flex flex-col gap-2 w-full">
//     <label htmlFor="search" className='text-lg'>Search what you looking for</label>
//     <input
//         type="text"
//         id='search'
//         placeholder="Search..."
//         value={filter}
//         onChange={handleFilterChange}
//         className="border border-main rounded-md px-3 py-2 w-full bg-transparent"
//     />
// </div>
// {/* Age filter */}
// <div className="flex flex-col gap-2 w-full">
//     <label htmlFor="filterAge" className='text-lg'>Filter by Age</label>
//     <input
//         type="number"
//         placeholder="Age"
//         min={1}
//         value={ageFilter}
//         onChange={handleAgeFilterChange}
//         className="border border-main rounded-md px-3 py-2 w-full bg-transparent"
//     />
// </div>
// {/* Category filter */}
// <div className="flex flex-col gap-2 w-full">
//     <label htmlFor="sortCategory" className='text-lg'>Sort by Category</label>
//     <Select
//         className=''
//         styles={customStyles}
//         id='sortCategory'
//         options={categoryOptions}
//         placeholder="Category"
//         onChange={handleChangeCategory}
//     />
// </div>
// {/* Sort select */}
// <div className="flex flex-col gap-2 w-full">
//     <label htmlFor="sortBy" className='text-lg'>Sort by</label>
//     <Select styles={customStyles}
//         options={sortByOptions}
//         id='sortBy'
//         placeholder="Sort"
//         onChange={handleChangeSort}
//     />
// </div>
// </div> */}


// <div key={post.id} className="bg-white dark:bg-dark-light rounded-lg shadow-lg overflow-hidden mb-8">
//     <div className="flex items-center p-6">
//         <img src={post.image} alt={post.name} className="w-20 h-20 rounded-full object-cover mr-6 shadow-md" />
//         <div>
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{post.name}</h2>
//             <p className="text-sm text-gray-600 dark:text-gray-400">{post.status}</p>
//         </div>
//     </div>
//     <div className="px-6 py-4">
//         <div className="grid grid-cols-2 gap-2">
//             <div>
//                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{post.category}</p>
//             </div>
//             <div>
//                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Country</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{post.country}</p>
//             </div>
//             <div>
//                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Date</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{post.date}</p>
//             </div>
//             <div>
//                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Age</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{post.age}</p>
//             </div>
//         </div>
//         <div className="mt-4">
//             <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Address</p>
//             <p className="text-sm text-gray-600 dark:text-gray-400">{post.address}</p>
//         </div>
//         <div className="mt-4">
//             <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</p>
//             <p className="text-sm text-gray-600 dark:text-gray-400">{post.desc}</p>
//         </div>
//     </div>
// </div>



//

// {/* <Link to={`/post/${post?.id}`} key={post?.id} className="bg-light dark:bg-dark-light rounded-md overflow-hidden flex flex-col md:flex-row">
// <div className="md:w-1/3">
//     {/* <img src={post?.image} alt={post?.name} className="w-full max-h-[350px] object-cover object-center" /> */}
// <img src={post?.image} alt={post?.name} className="w-full h-full object-cover object-center" />
// </div >
//     <div className="p-6 md:w-2/3">
//         <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{post?.name}</h2>
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{post?.status}</p>
//         <div className="grid grid-cols-2 gap-2">
//             <div>
//                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{post?.category}</p>
//             </div>
//             <div>
//                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Country</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{post?.country}</p>
//             </div>
//             <div>
//                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Date</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{post?.date}</p>
//             </div>
//             <div>
//                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Age</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{post?.age ? post.age : null}</p>
//             </div>
//         </div>
//         <div className="mt-4">
//             <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Address</p>
//             <p className="text-sm text-gray-600 dark:text-gray-400">{post?.address}</p>
//         </div>
//         <div className="mt-4">
//             <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</p>
//             <p className="text-sm text-gray-600 dark:text-gray-400">{post?.desc}</p>
//         </div>
//     </div>
// </Link > * /}
