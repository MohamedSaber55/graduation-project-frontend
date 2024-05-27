import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../components/Pagination';
import { getAllItems, getAllItemsSearch } from '../store/slices/itemSlice';
import Loading from './Loading';
import Post from '../components/Post';

const AllItems = () => {
    const itemsState = useSelector(state => state.items);
    const authState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const items = itemsState.items;
    const isLoading = itemsState.loading;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    useEffect(() => {
        dispatch(getAllItems(authState.token));
    }, [authState.token, dispatch]);

    const search = (name) => {
        const params = { name };
        if (name) {
            dispatch(getAllItemsSearch({ token: authState.token, params }));
        } else {
            dispatch(getAllItems(authState.token));
        }
    };

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
                        <h1 className="text-3xl font-semibold">All Items</h1>
                        <div className="w-full sm:w-fit">
                            <input
                                type="text"
                                placeholder="Search..."
                                onChange={e => search(e.target.value)}
                                className={`px-2 py-3 w-full rounded-lg text-sm bg-transparent border border-main`}
                            />
                        </div>
                    </div>
                    {currentItems.length === 0 ? (
                        <div className="bg-white dark:bg-dark p-5 rounded-md">
                            <h2 className="text-2xl text-center">No results found</h2>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white dark:bg-dark p-5 rounded-md">
                                {currentItems.map(item => (
                                    <Post key={item.id} type="item" data={item} />
                                ))}
                            </div>
                            <div className="p-4 mt-5 bg-white dark:bg-dark rounded-md">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPageCount={Math.ceil(items.length / itemsPerPage)}
                                    onPageChange={paginate}
                                    onNextPage={nextPage}
                                    onPrevPage={prevPage}
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllItems;