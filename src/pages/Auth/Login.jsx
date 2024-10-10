import leftLogin from '../../assets/left-login.png';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../components/context/AuthContext.jsx";
import {useContext, useState} from "react";
import {loginAPI} from "../../service/api/authApi.js";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Login = () => {
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        //validate Password
        const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
        if (!passwordPattern.test(password)) {
            setError("Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ in hoa, số và ký tự đặc biệt");
            return;
        }

        try {
            const res = await loginAPI(username, password);
            console.log("check res: ",res)
            if (res && res.EC === 0){
                localStorage.setItem('access_token', res.access_token);
                setUser({
                    isAuthenticated: true,
                    user: {
                        email: res?.admin?.email ?? "",
                        name: res?.admin?.name ?? "",
                        role: res?.admin?.role ?? ""
                    }
                })
                navigate("/main/dashboard", {replace: true});
            } else{
                setError(res.EM);
            }
        }catch (e) {
            setError("Không thể kết nối tới server. Vui lòng thử lại sau.");
            console.error("Error connecting to backend:", e);
        }
    }

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
                    <form className="space-y-4 w-full max-w-sm"
                          onSubmit={handleSubmit}
                    >
                        <input type="username" placeholder="Username"
                               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} placeholder="Password"
                                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <span
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <MdVisibilityOff/> : <MdVisibility/>} {/* Hiển thị icon mắt */}
                            </span>
                        </div>
                        {/* Thông báo lỗi */}
                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error}
                            </div>
                        )}
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
