import errorPage from '../../assets/404-pageNotFound.png'

export const PageNotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <img src={errorPage} alt="404 Error" className="w-1/2 max-w-xs md:max-w-md lg:max-w-lg mb-8"/>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
            <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
            <button
                // onClick={goBackHome}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
                Back to Homepage
            </button>
        </div>
    );
}

