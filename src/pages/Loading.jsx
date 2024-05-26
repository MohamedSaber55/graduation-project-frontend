
const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-light dark:bg-dark-light">
            <div className="text-center flex flex-col items-center">
                <div className="loader border-gray-400 border-t-main dark:border-t-main dark:border-light ease-linear rounded-full border-4 border-t-4 h-12 w-12 mb-4"></div>
                <h2 className="text-center text-gray-700 dark:text-gray-300 text-xl font-semibold">Loading...!</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">Please wait while we load the content</p>
            </div>
        </div>
    );
}

export default Loading;
