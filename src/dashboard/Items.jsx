import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems, getAllItemsSearch } from '../store/slices/itemSlice';
import Loading from '../pages/Loading';
import Table from '../dashComponents/Table';

const Items = () => {
    const itemsState = useSelector(state => state.items);
    const authState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const items = itemsState.items || [];
    const isLoading = itemsState.loading;
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

    const tableColumns =["Image", "Name","Phone","Location","Since","Status","Communication Link","Actions"]

    return (
        <div className="dashboard-items-page bg-light dark:bg-dark-light text-dark dark:text-light h-full w-full overflow-y-scroll hidden-scrollbar">
            <div className="container mx-auto p-5">
                <div className="flex items-center gap-5 flex-wrap justify-between mb-4 bg-white dark:bg-dark p-3 rounded-md">
                    <h1 className="text-2xl font-semibold">Items</h1>
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
                    <Table data={items} tableName={"items"} tableColumns={tableColumns} />
                )}
            </div>
        </div >
    );
};

export default Items;
