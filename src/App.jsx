import Header from "./components/Header/Header.jsx";
import {Outlet} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./components/context/AuthContext.jsx";
import axios from "./service/axiosCustomize.js";
import {Spin} from "antd";

function App() {
    const {setUser, appLoading, setAppLoading} = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    useEffect(() => {
        const fetchAccount = async () => {
            setAppLoading(true);
            const res = await axios.get("/api/v1/admin/account");
            console.log('res', res)
            if (res && !res.message) {
                setUser({
                    isAuthenticated: true,
                    user: {
                        email: res.email,
                        name: res.name,
                    }
                });
            }
            setAppLoading(false);
        }
        fetchAccount();
    }, []);

    return (
        <>
            {appLoading === true ?
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}>
                    <Spin/>
                </div>
                :
                <div className={`${darkMode && "dark"}  font-quickSand`}>
                    <Header
                        toggleDarkMode={toggleDarkMode}
                        darkMode={darkMode}
                        toggleSidebar={toggleSidebar}
                    />
                    <div className="flex">
                        {/* Sidebar */}
                        <Sidebar isSidebarOpen={isSidebarOpen}/>

                        {/* Nội dung chính */}
                        <div className={`transition-all duration-300 flex-1 p-4 
                     ${isSidebarOpen ? "ml-64" : "ml-0"} sm:ml-64 pt-16`}> {/* Luôn đẩy nội dung khi màn hình lớn */}
                            <Outlet/>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default App
