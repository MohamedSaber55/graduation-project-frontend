import { useState } from 'react';

const AddComment = () => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment) return;
        setComment('');
    };

    return (
        <div className="bg-white dark:bg-dark rounded-lg p-4 mt-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Add Comment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 space-y-2">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Comment</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="3"
                        className="p-3 text-gray-800 dark:text-light bg-transparent border border-main  w-full shadow-sm sm:text-sm rounded-md"
                        placeholder='Comment'
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-main hover:bg-second border border-main rounded-md"
                >
                    Add Comment
                </button>
            </form>
        </div>
    );
};


export default AddComment;
