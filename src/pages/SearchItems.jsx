/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Pagination from '../components/Pagination';
import { getAllItemsSearch } from '../store/slices/itemSlice';
import Loading from './Loading';

const SearchItems = () => {
    const itemsState = useSelector(state => state.items);
    const authState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const items = itemsState.items;
    const isLoading = itemsState.loading;
    const [currentPage, setCurrentPage] = useState(1);
    const params = useParams();
    const searchWord = params.word;
    const [itemsPerPage,setItemsPerPage] = useState(10);
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };
    useEffect(() => {
        const params = {
            UniqNumber: searchWord
            // name: searchWord
        }
        dispatch(getAllItemsSearch({ token: authState.token, params }));
    }, [authState.token, dispatch, searchWord]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prevPage => prevPage + 1);
    const prevPage = () => setCurrentPage(prevPage => prevPage - 1);

    return (
        <div className={`bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen transition-colors duration-500`}>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="container mx-auto p-4">
                    <div className="flex items-center gap-5 flex-wrap justify-between mb-4 bg-white dark:bg-dark p-4 rounded-md">
                        <h2 className="text-2xl font-semibold">Search results for '{searchWord}'</h2>
                    </div>
                    {currentItems.length === 0 ? (
                        <div className="bg-white dark:bg-dark p-5 rounded-md">
                            <h2 className="text-2xl text-center">No results found</h2>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white dark:bg-dark p-5 rounded-md">
                                {currentItems.map(item => (
                                    <Link to={`/item/${item?.id}`} key={item?.id} className="item-card bg-light dark:bg-dark-light rounded-md overflow-hidden flex flex-col">
                                        <div className="item-image">
                                            <img src={"http://localhost:5097/Resources/" + item?.image} alt={item?.itemName} className="w-full h-full aspect-square object-cover object-center" />
                                        </div>
                                        <div className="item-details p-4">
                                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{item?.itemName}</h2>
                                            <div className="grid grid-cols-2 gap-2 mb-2">
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Location</p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{item?.location}</p>
                                                </div>
                                                <div className="">
                                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Date</p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{moment(item.dateTime).format("YYYY-MM-DD")}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="p-4 mt-5 bg-white dark:bg-dark rounded-md">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPageCount={Math.ceil(items.length / itemsPerPage)}
                                    onPageChange={paginate}
                                    onNextPage={nextPage}
                                    onPrevPage={prevPage}
                                    itemsPerPage={itemsPerPage}
                                    onItemsPerPageChange={handleItemsPerPageChange}
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchItems;
