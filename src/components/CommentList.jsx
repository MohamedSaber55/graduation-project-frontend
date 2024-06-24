/* eslint-disable react/prop-types */
import moment from 'moment';
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemComment, getItemComments } from '../store/slices/itemComments';
import { deletePersonComment, getPersonComments } from '../store/slices/personComments';
const CommentList = ({ comments, itemId, type }) => {
    const dispatch = useDispatch()
    const authSlice = useSelector((state) => state.user);
    const handleDelete = (commentId) => {
        console.log({ itemId, commentId, userId: authSlice.userId });
        if (type == "persons") {
            dispatch(deletePersonComment({ itemId, commentId, userId: authSlice.userId })).then(() => {
                dispatch(getPersonComments(itemId))
            })
        } else {
            dispatch(deleteItemComment({ itemId, commentId, userId: authSlice.userId })).then(() => {
                dispatch(getItemComments(itemId))
            })
        }
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4">
            <ul className="divide-y divide-gray-300 dark:divide-gray-700">
                {comments.length > 0 ? <>{
                    comments?.map((comment, i) => (
                        <li key={i} className="py-2">
                            <div className="w-full flex justify-between items-center gap-4">
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
                                <button onClick={() => handleDelete(comment.id)} className='border p-1 rounded-md text-warning border-warning hover:bg-warning hover:text-light duration-200'><MdDeleteOutline size={24} /></button>
                            </div>
                        </li>
                    ))
                }</> : "No Comments yet"}
            </ul>
        </div>
    );
}

export default CommentList;
