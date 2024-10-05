import leftLogin from '../../assets/left-login.png';

const Login = () => {


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 md:p-8">
            <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Left */}
                <div className="hidden md:flex w-1/2 bg-blue-500 items-center justify-center">
                    <img src={leftLogin} alt="Login illustration" className="w-full h-full object-cover"/>
                </div>
                {/* Right */}
                <div className="flex-1 p-8 flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold text-blue-600 mb-6">Login Administrator</h2>
                    <form className="space-y-4 w-full max-w-sm">
                        <input type="username" placeholder="Username"
                               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"/>
                        <input type="password" placeholder="Password"
                               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"/>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2"/>
                                Keep me signed in
                            </label>
                            {/*<a href="#" className="text-blue-500 hover:underline">Already a member?</a>*/}
                        </div>

                        <button type="submit"
                                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
