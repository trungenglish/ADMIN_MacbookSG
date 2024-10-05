import Header from "./components/Header/Header.jsx";
import {Outlet} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import {useState} from "react";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
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
    )
}

export default App
