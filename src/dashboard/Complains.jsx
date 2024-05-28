import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComplains, getAllComplainsSearch } from "../store/slices/complainSlice";
import Loading from "../pages/Loading";
import Table from "../dashComponents/Table";

const Complains = () => {
    const complainsState = useSelector(state => state.complain);
    const authState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const complains = complainsState.complains || [];
    const isLoading = complainsState.loading;
    useEffect(() => {
        dispatch(getAllComplains(authState.token));
    }, [authState.token, dispatch]);

    const search = (email) => {
        const params = { email };
        if (email) {
            dispatch(getAllComplainsSearch({ token: authState.token, params }));
        } else {
            dispatch(getAllComplains(authState.token));
        }
    };

    const tableColumns = ["First Name", "Last Name", "Email", "Phone", "Complain", "Actions"]

    return (
        <div className="dashboard-complains-page bg-light dark:bg-dark-light text-dark dark:text-light h-full overflow-y-scroll w-full hidden-scrollbar">
            <div className="container mx-auto p-5">
                <div className="flex items-center gap-5 flex-wrap justify-between mb-4 bg-white dark:bg-dark p-3 rounded-md">
                    <h1 className="text-2xl font-semibold">Complains</h1>
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
                    <Table data={complains} tableName={"complains"} tableColumns={tableColumns} />
                )}
            </div>
        </div >
    )
}

export default Complains