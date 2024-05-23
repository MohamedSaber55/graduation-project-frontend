import { useState, useEffect } from 'react';
import Select from 'react-select';
import { data } from "./../data/data.json"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
const Posts = () => {
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const theme = useSelector((state) => state.theme.theme);

    useEffect(() => {
        let filtered = data;
        if (searchTerm) {
            filtered = filtered.filter(post => post.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (selectedCategory) {
            filtered = filtered.filter(post => post.category === selectedCategory.value);
        }
        setFilteredPosts(filtered);
    }, [searchTerm, selectedCategory]);
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "none",
            padding: "4.5px 0",
            borderRadius: "6px",
            backgroundColor: theme === "dark" ? "#1f293700" : "#f3f4f600",
            color: theme === "dark" ? "#fff" : "#000",
            outline: "none",
            boxShadow: state.isFocused ? `0 0 0 1px ${theme === "dark" ? "#E1752C" : "#E1752C"}` : "0 0 0 1px #E1752C",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: theme === "dark" ? "#fff" : "#000",
        }),
        menu: (provided) => ({
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
    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = selectedOption => {
        setSelectedCategory(selectedOption);
    };

    return (
        <div className={`bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen transition-colors duration-500`}>
            <div className="container mx-auto p-4">
                <div className="flex items-center gap-5 flex-wrap justify-between mb-4 bg-white dark:bg-dark p-4 rounded-md">
                    <h1 className="text-3xl font-semibold">Posts</h1>
                    <div className="flex flex-wrap justify-between gap-4 w-full sm:w-fit">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={` px-2 py-3 sm:w-fit w-full rounded-lg text-sm bg-transparent border border-main`}
                        />
                        <Select
                            styles={customStyles}
                            options={[
                                { value: '', label: 'All Categories' },
                                { value: 'person', label: 'Person' },
                                { value: 'item', label: 'Item' }
                            ]}
                            onChange={handleCategoryChange}
                            value={selectedCategory}
                            className="sm:w-48 text-sm w-full"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white dark:bg-dark p-5 rounded-md">
                    {filteredPosts.map(post => (
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
                            </div>
                        </Link>
                    ))}
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
