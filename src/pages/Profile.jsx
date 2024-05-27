import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../components/Pagination';
import Loading from './Loading';
import { getAllItems } from '../store/slices/itemSlice';
import { getAllPersons } from '../store/slices/personsSlice';
import avatar from "./../assets/IMG_20240504_113453.png";
import Post from '../components/Post';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('persons');
    const itemsState = useSelector((state) => state.items);
    const personsState = useSelector((state) => state.persons);
    const authState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const loadingItems = itemsState.loading;
    const loadingPersons = personsState.loading;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const items = itemsState.items;
    const persons = personsState.persons;

    useEffect(() => {
        dispatch(getAllItems(authState.token));
        dispatch(getAllPersons(authState.token));
    }, [authState.token, dispatch]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const currentPersons = persons.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

    const renderItems = () => (
        <>
            {loadingItems ? (
                <Loading />
            ) : currentItems.length === 0 ? (
                <div className="bg-white dark:bg-dark p-5 rounded-md">
                    <h2 className="text-2xl text-center">No items found</h2>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white dark:bg-dark p-5 rounded-md">
                    {currentItems.map((item) => (
                        <Post key={item.id} type="item" data={item} />
                    ))}
                </div>
            )}
        </>
    );

    const renderPersons = () => (
        <>
            {loadingPersons ? (
                <Loading />
            ) : currentPersons.length === 0 ? (
                <div className="bg-white dark:bg-dark p-5 rounded-md">
                    <h2 className="text-2xl text-center">No persons found</h2>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white dark:bg-dark p-5 rounded-md">
                    {currentPersons.map((person) => (
                        <Post key={person.id} type="person" data={person} />
                    ))}
                </div>
            )}
        </>
    );

    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen transition-colors duration-500">
            <div className="container mx-auto py-5">
                <div className="userInfo flex flex-col justify-center text-center items-center gap-3">
                    <div className="image h-28 aspect-square border rounded-full">
                        <img src={avatar} className="rounded-full w-full" alt="" />
                    </div>
                    <div className="info">
                        <h2 className="text-2xl font-bold">Mohamed Saber</h2>
                        <p className="text-gray dark:text-gray-light">mohamed.saber.7753@gmail.com</p>
                    </div>
                </div>
                <div className="flex justify-center my-5">
                    <button
                        className={`w-48 px-4 py-2 rounded-l-lg ${activeTab === 'persons' ? 'bg-main text-white' : 'bg-white dark:bg-dark text-main border border-main'}`}
                        onClick={() => handleTabChange('persons')}
                        style={{ transition: 'background-color 0.3s ease' }}
                    >
                        Persons
                    </button>
                    <button
                        className={`w-48 px-4 py-2 rounded-r-lg ${activeTab === 'items' ? 'bg-main text-white' : 'bg-white dark:bg-dark text-main border border-main'}`}
                        onClick={() => handleTabChange('items')}
                        style={{ transition: 'background-color 0.3s ease' }}
                    >
                        Items
                    </button>
                </div>
                {activeTab === 'persons' ? renderPersons() : renderItems()}
                <div className="p-4 mt-5 bg-white dark:bg-dark rounded-md">
                    <Pagination
                        currentPage={currentPage}
                        totalPageCount={Math.ceil((activeTab === 'persons' ? persons : items).length / itemsPerPage)}
                        onPageChange={paginate}
                        onNextPage={nextPage}
                        onPrevPage={prevPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
