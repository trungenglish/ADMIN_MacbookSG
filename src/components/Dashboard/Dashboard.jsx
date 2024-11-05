import {useEffect, useState} from "react";
import {countUserAPI} from "../../service/api/userApi.js";

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        const countUser = async () => {
            const res = await countUserAPI();
            if (res && res.EC === 0) {
                setUserCount(res.data);
            }
        }
        countUser();

        const countProduct = async () => {
            const res = await countUserAPI();
            if (res && res.EC === 0) {
                setProductCount(res.data);
            }
        }
        countProduct();

    }, []);

    const employeeStats = [
        {
            title: "Người dùng",
            count: userCount,
            bgColor: "bg-gray-100",
            icon: "👥",
        },
        {
            title: "Sản phẩm",
            count: productCount,
            bgColor: "bg-blue-100",
            icon: "🏖️",
        },
        {
            title: "Đơn hàng đã xử lý",
            count: 10,
            bgColor: "bg-yellow-100",
            icon: "🎉",
        },
        {
            title: "Doanh thu",
            count: "100.000.000đ",
            bgColor: "bg-red-100",
            icon: "🚪",
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

            {/* Phần thống kê nhân viên */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {employeeStats.map((stat, index) => (
                    <div
                        key={index}
                        className={`p-4 ${stat.bgColor} rounded-lg shadow-md flex items-center justify-between`}
                    >
                        <div>
                            <h3 className="text-lg font-medium">{stat.title}</h3>
                            <p className="text-2xl font-bold">{stat.count}</p>
                        </div>
                        <div className="text-4xl">{stat.icon}</div>
                    </div>
                ))}
            </div>

            {/* Placeholder cho biểu đồ */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Employee Statistics</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <p>Placeholder for chart or graph</p>
                    {/* Ở đây bạn có thể nhúng biểu đồ từ các thư viện như Chart.js hoặc Recharts */}
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
