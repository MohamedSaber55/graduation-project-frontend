/* eslint-disable react/prop-types */
import moment from 'moment';

const CommentList = ({ comments }) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4">
            <ul className="divide-y divide-gray-300 dark:divide-gray-700">
                {comments?.map((comment,i) => (
                    <li key={i} className="py-2">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-lg font-semibold">{comment.text}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{moment(comment.dateTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                {comment.phoneNuamber && (
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        <strong>Phone:</strong> {comment.phoneNuamber}
                                    </p>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CommentList;
