import errorPage from '../../assets/403-error.jpg'
import {AuthContext} from "../../components/context/AuthContext.jsx";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const PrivateRoute = (props) => {
    const {user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            // Nếu có dữ liệu trong `localStorage`, cập nhật vào `AuthContext`
            setUser({
                isAuthenticated: true,
                user: JSON.parse(storedUser)
            });
        } else if (!user.isAuthenticated) {
            // Nếu không có thông tin đăng nhập, chuyển hướng đến trang đăng nhập
            navigate("/login", { replace: true });
        }
    }, [user.isAuthenticated, navigate, setUser]);

    if (user.isAuthenticated && user.user.name) {
        return (
            <>
                {props.children}
            </>
        )
    } else{
        return (
            <div className="flex flex-col md:flex-row justify-center items-center min-h-screen">
                <img
                    src={errorPage}
                    alt="403 Forbidden"
                    className="w-1/2 max-h-1/3 max-w-xs md:max-w-md lg:max-w-lg mb-8 object-contain"
                />
                <div className="md:ml-4 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Forbidden</h1>
                    <p className="text-gray-600 mb-6">You need to login to access this page.</p>
                    <button
                        onClick={() => navigate("/login", {replace: true})}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }
}

export default PrivateRoute;