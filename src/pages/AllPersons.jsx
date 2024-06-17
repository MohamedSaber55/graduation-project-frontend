import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../components/Pagination';
import { getAllPersons, getAllPersonsSearch } from '../store/slices/personsSlice';
import Loading from './Loading';
import Post from '../components/Post';

const AllPersons = () => {
    const personsState = useSelector(state => state.persons);
    const authState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const persons = personsState.persons;
    const isLoading = personsState.loading;
    const [personsPerPage, setPersonsPerPage] = useState(10);
    const handlePersonsPerPageChange = (event) => {
        setPersonsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };
    useEffect(() => {
        dispatch(getAllPersons(authState.token));
    }, [authState.token, dispatch]);

    const search = (name) => {
        const params = { name };
        if (name) {
            dispatch(getAllPersonsSearch({ token: authState.token, params }));
        } else {
            dispatch(getAllPersons(authState.token));
        }
    }

    // Pagination
    const indexOfLastPerson = currentPage * personsPerPage;
    const indexOfFirstPerson = indexOfLastPerson - personsPerPage;
    const currentPersons = persons.slice(indexOfFirstPerson, indexOfLastPerson);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prevPage => prevPage + 1);
    const prevPage = () => setCurrentPage(prevPage => prevPage - 1);

    return (
        <div className={`bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen transition-colors duration-500`}>
            {/* {isLoading ? (
                <Loading />
            ) : ( */}
            <div className="container mx-auto p-4">
                <div className="flex items-center gap-5 flex-wrap justify-between mb-4 bg-white dark:bg-dark p-4 rounded-md">
                    <h1 className="text-3xl font-semibold">All Persons</h1>
                    <div className="w-full sm:w-fit">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={e => search(e.target.value)}
                            className={`px-2 py-3 w-full rounded-lg text-sm bg-transparent border border-main`}
                        />
                    </div>
                </div>
                {currentPersons.length === 0 ? (
                    <div className="bg-white dark:bg-dark p-5 rounded-md">
                        <h2 className="text-2xl text-center">No results found</h2>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white dark:bg-dark p-5 rounded-md">
                            {currentPersons.map(person => (
                                <Post key={person.id} type="person" data={person} />
                            ))}
                        </div>
                        <div className="p-4 mt-5 bg-white dark:bg-dark rounded-md">
                            <Pagination
                                currentPage={currentPage}
                                totalPageCount={Math.ceil(persons.length / personsPerPage)}
                                onPageChange={paginate}
                                onNextPage={nextPage}
                                onPrevPage={prevPage}
                                itemsPerPage={personsPerPage}
                                onItemsPerPageChange={handlePersonsPerPageChange}
                            />
                        </div>
                    </>
                )}
            </div>
            {/* )} */}
        </div>
    );
};

export default AllPersons;