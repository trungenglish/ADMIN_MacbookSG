import  { useEffect, useState } from "react";
import { Line, Bar, Doughnut, Radar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from "chart.js";
import { FiUsers, FiShoppingBag, FiDollarSign, FiCheckCircle } from "react-icons/fi";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale);

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [salesData, setSalesData] = useState([]);
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        setUserCount(1250);
        setProductCount(450);
        setSalesData([
            { month: "Jan", amount: 35000000 },
            { month: "Feb", amount: 42000000 },
            { month: "Mar", amount: 38000000 },
            { month: "Apr", amount: 45000000 },
            { month: "May", amount: 55000000 },
            { month: "Jun", amount: 48000000 }
        ]);
        setOrdersData([
            { month: "Jan", orders: 120 },
            { month: "Feb", orders: 145 },
            { month: "Mar", orders: 132 },
            { month: "Apr", orders: 158 },
            { month: "May", orders: 175 },
            { month: "Jun", orders: 162 }
        ]);
    }, []);

    const stats = [
        {
            title: "người dùng",
            count: userCount.toLocaleString(),
            icon: <FiUsers className="w-8 h-8" />,
            bgColor: "bg-gradient-to-r from-blue-400 to-blue-600",
            textColor: "text-blue-500"
        },
        {
            title: "Sản phẩm",
            count: productCount.toLocaleString(),
            icon: <FiShoppingBag className="w-8 h-8" />,
            bgColor: "bg-gradient-to-r from-emerald-400 to-emerald-600",
            textColor: "text-emerald-500"
        },
        {
            title: "Đơn hàng đã xử lý",
            count: "1,234",
            icon: <FiCheckCircle className="w-8 h-8" />,
            bgColor: "bg-gradient-to-r from-amber-400 to-amber-600",
            textColor: "text-amber-500"
        },
        {
            title: "Doanh thu",
            count: "$263,000",
            icon: <FiDollarSign className="w-8 h-8" />,
            bgColor: "bg-gradient-to-r from-purple-400 to-purple-600",
            textColor: "text-purple-500"
        }
    ];

    const lineChartData = {
        labels: salesData.map(item => item.month),
        datasets: [
            {
                label: "Revenue ($)",
                data: salesData.map(item => item.amount),
                borderColor: "rgb(99, 102, 241)",
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                fill: true,
                tension: 0.4
            }
        ]
    };

    const barChartData = {
        labels: ordersData.map(item => item.month),
        datasets: [
            {
                label: "Number of Orders",
                data: ordersData.map(item => item.orders),
                backgroundColor: "rgba(16, 185, 129, 0.8)"
            }
        ]
    };

    const doughnutData = {
        labels: ["iPhone", "MacBook", "iPad", "Apple Watch", "AirPods"],
        datasets: [
            {
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    "rgba(99, 102, 241, 0.8)",
                    "rgba(16, 185, 129, 0.8)",
                    "rgba(251, 146, 60, 0.8)",
                    "rgba(147, 51, 234, 0.8)",
                    "rgba(236, 72, 153, 0.8)"
                ]
            }
        ]
    };

    const radarData = {
        labels: ["Battery Life", "Performance", "Camera", "Display", "Design", "Price"],
        datasets: [
            {
                label: "iPhone 14 Pro",
                data: [90, 95, 92, 88, 85, 75],
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                borderColor: "rgba(99, 102, 241, 0.8)",
                pointBackgroundColor: "rgba(99, 102, 241, 1)"
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 12,
                        weight: "bold"
                    }
                }
            },
            title: {
                display: true,
                text: "Monthly Statistics",
                font: {
                    size: 16,
                    weight: "bold"
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(0, 0, 0, 0.05)"
                }
            },
            x: {
                grid: {
                    color: "rgba(0, 0, 0, 0.05)"
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">Bảng điều khiển</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-4 rounded-2xl ${stat.bgColor}`}>
                                <div className="text-white">{stat.icon}</div>
                            </div>
                            <span className="text-sm font-semibold text-gray-600">{stat.title}</span>
                        </div>
                        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">{stat.count}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Revenue Chart</h2>
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                        <Line data={lineChartData} options={chartOptions} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Orders Chart</h2>
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                        <Bar data={barChartData} options={chartOptions} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Sales Distribution</h2>
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                        <Doughnut data={doughnutData} options={{ responsive: true }} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">iPhone 14 Pro Performance Metrics</h2>
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                        <Radar data={radarData} options={{ responsive: true }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
