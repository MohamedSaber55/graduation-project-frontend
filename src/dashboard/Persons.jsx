import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPersons, getAllPersonsSearch } from "../store/slices/personsSlice";
import Loading from "../pages/Loading";
import Table from "../dashComponents/Table";

const Persons = () => {
    const personsState = useSelector(state => state.persons);
    const authState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const persons = personsState.persons|| [];
    const isLoading = personsState.loading;
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
    };

    const tableColumns = ["Image", "Name", "Phone", "Location", "Since", "Status", "Communication Link", "Actions"]
    return (
        <div className="dashboard-persons-page bg-light dark:bg-dark-light text-dark dark:text-light h-full w-full overflow-y-scroll hidden-scrollbar">
            <div className="container mx-auto p-5">
                <div className="flex items-center gap-5 flex-wrap justify-between mb-4 bg-white dark:bg-dark p-3 rounded-md">
                    <h1 className="text-2xl font-semibold">Persons</h1>
                    <div className="w-full sm:w-fit">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={e => search(e.target.value)}
                            className={`px-2 py-2 w-full rounded-lg text-sm bg-transparent border border-main`}
                        />
                    </div>
                </div>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Table data={persons} tableName={"persons"} tableColumns={tableColumns} />
                )}
            </div>
        </div >
    )
}

export default Persons