/* eslint-disable react/prop-types */
import moment from "moment";
import { useState } from "react";
import { CiLink } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { deleteComplain } from "../store/slices/complainSlice";
import { deleteItem } from "../store/slices/itemSlice";
import { deletePerson } from "../store/slices/personsSlice";
import { deleteUser } from "../store/slices/authSlice";

const Table = ({ data, tableColumns, tableName }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const theme = useSelector(state => state.theme.theme)
    const authState = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };
    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

    const handleDeleteItem = (id, name) => {
        if (name == "complain") {
            dispatch(deleteComplain({ id, token: authState.token }))
        }
        if (name == "item") {
            dispatch(deleteItem({ id, token: authState.token }))
        }
        if (name == "person") {
            dispatch(deletePerson({ id, token: authState.token }))
        }
        if (name == "user") {
            dispatch(deleteUser({ id, token: authState.token }))
        }
    }

    return (
        <div>
            <div className={`overflow-x-auto ${theme == "dark" ? "dark-custom-scrollbar" : "custom-scrollbar "}`}>
                <table className="min-w-full bg-white dark:bg-dark rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            {tableColumns.map((column, i) => (
                                <th key={i} className="py-3 px-4 border-b dark:border-gray-600 text-start">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableName === "items" ? (
                            currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">
                                        <img src={"http://localhost:5097/Resources/" + item.image} alt={item.itemName} className="h-12 w-12 object-cover" />
                                    </td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">{item.itemName}</td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">
                                        <a href={`tel:${item.phoneNumber}`} className="hover:underline">{item.phoneNumber}</a>
                                    </td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">{item.location}</td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">{moment(item.dateTime, "YYYY-MM-DDTHH:mm:ss").fromNow()}</td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600 text-light">
                                        {item.status === 0 ? <span className='bg-main rounded-3xl text-sm px-3 py-1'>Lost</span> : <span className='bg-main rounded-3xl text-sm px-3 py-1'>Found</span>}
                                    </td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">
                                        {item.communicationLink ? (
                                            <a href={item.communicationLink} target="_blank" rel="noreferrer" className="text-semibold flex items-center gap-1 text-blue">
                                                <CiLink size={24} /> Click here
                                            </a>
                                        ) : (
                                            "No communication link"
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">
                                        <button onClick={() => handleDeleteItem(item.id, "item")} className="text-red-500 hover:text-red-700">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : tableName === "persons" ? (
                            currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">
                                        <img src={"http://localhost:5097/Resources/" + item.image} alt={item.personName} className="h-12 w-12 object-cover" />
                                    </td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">{item.personName}</td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">
                                        <a href={`tel:${item.phoneNumber}`} className="hover:underline">{item.phoneNumber}</a>
                                    </td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">{item.location}</td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">{moment(item.dateTime, "YYYY-MM-DDTHH:mm:ss").fromNow()}</td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600 text-light">
                                        {item.status === 0 ? <span className='bg-main rounded-3xl text-sm px-3 py-1'>Lost</span> : <span className='bg-main rounded-3xl text-sm px-3 py-1'>Found</span>}
                                    </td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">
                                        {item.communicationLink ? (
                                            <a href={item.communicationLink} target="_blank" rel="noreferrer" className="text-semibold flex items-center gap-1 text-blue">
                                                <CiLink size={24} /> Click here
                                            </a>
                                        ) : (
                                            "No communication link"
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">
                                        <button onClick={() => handleDeleteItem(item.id, "person")} className="text-red-500 hover:text-red-700">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : tableName === "complains" ? (
                            currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">{item.firstName}</td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">{item.lastName}</td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">
                                        <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a>
                                    </td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">
                                        <a href={`tel:${item.phoneNumber}`} className="hover:underline">{item.phoneNumber}</a>
                                    </td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">{item.complainText}</td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">
                                        <button onClick={() => handleDeleteItem(item.id, "complain")} className="text-red-500 hover:text-red-700">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : tableName === "users" ? (
                            currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">{item.firstName}</td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">{item.firstName}</td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">{item.lastName}</td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">
                                        <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a>
                                    </td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">{item.userRole == 1 ? "User" : item.userRole == 2 ? "Admin" : null}</td>
                                    <td className="py-2 px-4 border-b dark:border-gray-600">
                                        <button onClick={() => handleDeleteItem(item.id, "user")} className="text-red-500 hover:text-red-700">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            ""
                        )}
                    </tbody>
                </table>
            </div>
            <div className="p-4 mt-5 bg-white w-full dark:bg-dark rounded-md">
                <Pagination
                    currentPage={currentPage}
                    totalPageCount={Math.ceil(data.length / itemsPerPage)}
                    onPageChange={paginate}
                    onNextPage={nextPage}
                    onPrevPage={prevPage}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
            </div>
        </div>
    );
};

export default Table;