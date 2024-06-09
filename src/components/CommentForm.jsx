/* eslint-disable react/prop-types */
// CommentForm.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemComment } from '../store/slices/itemComments';
import { addPersonComment } from '../store/slices/personComments';

const CommentForm = ({ userId, itemId, type }) => {
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            text: commentText
        }
        if (type == "item") {
            dispatch(addItemComment({ userId, itemId, body }));
        } else {
            dispatch(addPersonComment({ userId, personId: itemId, body }));
        }
        setCommentText('');
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
