import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Select from "react-select"
const Pagination = ({ currentPage, totalPageCount, onPageChange, onNextPage, onPrevPage, itemsPerPage, onItemsPerPageChange }) => {
    const renderPageNumbers = () => {
        let pageNumbers = [];
        const windowSize = 5;
        let startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
        let endPage = Math.min(totalPageCount, startPage + windowSize - 1);
        if (totalPageCount <= 5) {
            for (let i = 1; i <= totalPageCount; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (endPage - startPage < windowSize - 1) {
                startPage = Math.max(1, endPage - windowSize + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
        }

        return (
            <ul className="flex flex-wrap space-x-2">
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            onClick={() => onPageChange(pageNumber)}
                            className={`py-2 px-4 font-bold ${currentPage === pageNumber
                                ? 'bg-main text-white'
                                : 'bg-gray-200 dark:bg-dark-light dark:text-light hover:bg-gray-300 text-gray-700'
                                } rounded transition-colors duration-200 ease-in-out`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        );
    };
    const theme = useSelector(state => state.theme.theme)
    const itemsPerPageOptions = [
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 15, label: '15' },
        { value: 20, label: '20' },
    ];

    const handleItemsPerPageChange = selectedOption => {
        onItemsPerPageChange({ target: { value: selectedOption.value } });
    };
    // Custom styles for React Select
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "none",
            // padding: "6px 2px",
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

    return (
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center">
                <label htmlFor="itemsPerPage" className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">Items per page:</label>
                <Select
                    id="itemsPerPage"
                    value={itemsPerPageOptions.find(option => option.value === itemsPerPage)}
                    onChange={handleItemsPerPageChange}
                    options={itemsPerPageOptions}
                    className=""
                    styles={customStyles}
                    classNamePrefix="react-select"
                />
            </div>
            <div className="pagination flex items-center justify-center space-x-2">
                <button
                    onClick={onPrevPage}
                    disabled={currentPage === 1}
                    className="bg-gray-200 dark:bg-dark-light dark:text-light dark:hover:bg-gray-600 dark:disabled:bg-dark-light disabled:bg-gray-300 hover:bg-gray-300 text-gray-700 font-bold py-2 px-3 rounded-s transition-colors duration-200 ease-in-out"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                {renderPageNumbers()}
                <button
                    onClick={onNextPage}
                    disabled={currentPage === totalPageCount}
                    className="bg-gray-200 dark:bg-dark-light dark:text-light dark:hover:bg-gray-600 dark:disabled:bg-dark-light disabled:bg-gray-300 hover:bg-gray-300 text-gray-700 font-bold py-2 px-3 rounded-e transition-colors duration-200 ease-in-out"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        ></path>
                    </svg>
                </button>
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPageCount}
            </div>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPageCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onPrevPage: PropTypes.func.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onItemsPerPageChange: PropTypes.func.isRequired,
};

export default Pagination;
