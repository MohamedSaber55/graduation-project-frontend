import PropTypes from "prop-types";
import avatar from "./../assets/IMG_20240504_113453.png";
import { comments } from "./../data/comments.json"
import { useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
const Comments = ({ postId, commentsPerPage = 5 }) => {
    const postComments = comments.filter(comment => comment.post_id == postId);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = postComments.slice(indexOfFirstComment, indexOfLastComment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-white dark:bg-dark rounded-lg shadow-md p-4 mt-5">
            <div className=" flex flex-col justify-between h-full">
                <div className="c">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Comments</h2>
                    {currentComments.map((comment, i) => (
                        <div key={i} className="mb-6 bg-light p-2 rounded-md dark:bg-dark-light">
                            <div className="flex items-center mb-2">
                                <img
                                    src={comment.user.image ? comment.user.image : avatar}
                                    alt={comment.user}
                                    className="w-10 h-10 rounded-full mr-3 object-cover"
                                />
                                <div>
                                    <h3 className="text-gray-900 dark:text-gray-200 text-sm font-semibold">{comment.user}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-xs">{comment.date}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm ps-2 leading-5">{comment.post_comment}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4 gap-1">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-800 dark:text-white bg-light dark:bg-dark-light rounded-md disabled:bg-light dark:disabled:bg-dark-light hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50"
                    >
                        <MdKeyboardArrowLeft size={18} />
                        Previous
                    </button>
                    <div className="px-4 py-2 bg-light rounded-md  dark:bg-dark-light select-none">{currentPage}</div>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentComments.length < commentsPerPage}
                        className="flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-800 dark:text-white bg-light dark:bg-dark-light rounded-md disabled:bg-light dark:disabled:bg-dark-light hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50"
                    >
                        Next
                        <MdKeyboardArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

Comments.propTypes = {
    postId: PropTypes.string.isRequired,
    commentsPerPage: PropTypes.number
}

export default Comments;
