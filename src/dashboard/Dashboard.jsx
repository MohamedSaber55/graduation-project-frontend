import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { FaBox, FaExclamationTriangle, FaUsers } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../store/slices/itemSlice';
import { getAllPersons } from '../store/slices/personsSlice';
import { getAllComplains } from '../store/slices/complainSlice';
import { getAllUsers } from '../store/slices/authSlice';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Register the necessary components for the charts
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const itemsState = useSelector(state => state.items);
    const personsState = useSelector(state => state.persons);
    const complainsState = useSelector(state => state.complain);
    const authState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const items = itemsState.items || [];
    const persons = personsState.persons || [];
    const complains = complainsState.complains || [];
    const users = authState.users || [];
    console.log(complains);
    useEffect(() => {
        dispatch(getAllItems(authState.token));
        dispatch(getAllPersons(authState.token));
        dispatch(getAllUsers(authState.token));
        dispatch(getAllComplains(authState.token));
    }, [authState.token, dispatch]);

    // Helper function to count entries by date
    const countByDate = (data, dateField) => {
        return data.reduce((acc, entry) => {
            const date = dayjs(entry[dateField]).format('YYYY-MM-DD');
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
    };

    const usersByDate = countByDate(users, 'createdDate'); // Assuming there's a createdDate field for users
    const itemsByDate = countByDate(items, 'dateTime');
    const personsByDate = countByDate(persons, 'dateTime');
    const complainsByDate = countByDate(complains, 'dateTime');

    const createUsersChartData = (dataByDate) => {
        const labels = Object.keys(dataByDate).sort();
        const data = labels.map(date => dataByDate[date]);

        return {
            labels,
            datasets: [
                {
                    label: 'Users',
                    backgroundColor: 'rgb(59 130 246 / 1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data
                }
            ]
        };
    };

    const createItemsChartData = (dataByDate) => {
        const labels = Object.keys(dataByDate).sort();
        const data = labels.map(date => dataByDate[date]);

        return {
            labels,
            datasets: [
                {
                    label: 'Items',
                    backgroundColor: 'rgb(34 197 94 /1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data
                }
            ]
        };
    };

    const createPersonsChartData = (dataByDate) => {
        const labels = Object.keys(dataByDate).sort();
        const data = labels.map(date => dataByDate[date]);

        return {
            labels,
            datasets: [
                {
                    label: 'Persons',
                    backgroundColor: '#E1752C',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data
                }
            ]
        };
    };
    const createComplainsChartData = (dataByDate) => {
        const labels = Object.keys(dataByDate).sort();
        const data = labels.map(date => dataByDate[date]);

        return {
            labels,
            datasets: [
                {
                    label: 'Persons',
                    backgroundColor: 'rgb(238 17 17 / 1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data
                }
            ]
        };
    };

    const userChartData = createUsersChartData(usersByDate);
    const itemsChartData = createItemsChartData(itemsByDate);
    const personsChartData = createPersonsChartData(personsByDate);
    const complainsChartData = createComplainsChartData(complainsByDate);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Data Overview',
            },
        },
    };

    return (
        <div className="dash bg-light dark:bg-dark-light text-dark dark:text-light h-full overflow-y-scroll hidden-scrollbar">
            <div className="container mx-auto p-5 h-full">
                <h1 className="text-3xl font-semibold mb-5">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Link to={"/dashboard/users"} className="bg-white dark:bg-dark p-5 rounded-md shadow-md flex items-center">
                        <FaUsers className="text-blue-500 text-4xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">Users</h2>
                            <p className="text-lg">{users.length}</p>
                        </div>
                    </Link>
                    <Link to={"/dashboard/items"} className="bg-white dark:bg-dark p-5 rounded-md shadow-md flex items-center">
                        <FaBox className="text-green-500 text-4xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">Items</h2>
                            <p className="text-lg">{items.length}</p>
                        </div>
                    </Link>
                    <Link to={"/dashboard/persons"} className="bg-white dark:bg-dark p-5 rounded-md shadow-md flex items-center">
                        <FaUsers className="text-main text-4xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">Persons</h2>
                            <p className="text-lg">{persons.length}</p>
                        </div>
                    </Link>
                    <Link to={"/dashboard/complains"} className="bg-white dark:bg-dark p-5 rounded-md shadow-md flex items-center">
                        <FaExclamationTriangle className="text-warning text-4xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">Complains</h2>
                            <p className="text-lg">{complains.length}</p>
                        </div>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-dark p-5 rounded-md shadow-md h-full">
                        <Bar data={userChartData} options={options} />
                    </div>
                    <div className="bg-white dark:bg-dark p-5 rounded-md shadow-md h-full">
                        <Bar data={itemsChartData} options={options} />
                    </div>
                    <div className="bg-white dark:bg-dark p-5 rounded-md shadow-md h-full">
                        <Bar data={personsChartData} options={options} />
                    </div>
                    <div className="bg-white dark:bg-dark p-5 rounded-md shadow-md h-full">
                        <Bar data={complainsChartData} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
