/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemComment, getItemComments } from '../store/slices/itemComments';
import { addPersonComment, getPersonComments } from '../store/slices/personComments';

const CommentForm = ({ userId, itemId, type }) => {
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            text: commentText,
            phoneNuamber: phoneNumber
        }
        if (type === "item") {
            dispatch(addItemComment({ userId, itemId, body })).then(() => dispatch(getItemComments(itemId)))
        } else {
            dispatch(addPersonComment({ userId, personId: itemId, body })).then(() => dispatch(getPersonComments(itemId)))
        }
        setCommentText('');
        setPhoneNumber('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-dark-light shadow-md rounded-lg p-4">
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
                className="w-full p-2 border border-main rounded-lg bg-transparent resize-none"
                placeholder="Type your comment here..."
            />
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border border-main rounded-lg bg-transparent mt-2"
                placeholder="Enter your phone number..."
            />
            <button
                type="submit"
                className="bg-main/80 text-white font-semibold py-2 px-4 mt-2 rounded-lg transition duration-300 hover:bg-main "
            >
                Add Comment
            </button>
        </form>
    );
}

export default CommentForm;