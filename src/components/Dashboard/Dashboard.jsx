import React from 'react';

// Data của các thống kê nhân viên
const employeeStats = [
    {
        title: "Total Employees",
        count: 200,
        bgColor: "bg-gray-100",
        icon: "👥",
    },
    {
        title: "On Leave",
        count: 15,
        bgColor: "bg-blue-100",
        icon: "🏖️",
    },
    {
        title: "New Joinees",
        count: 25,
        bgColor: "bg-yellow-100",
        icon: "🎉",
    },
    {
        title: "Resigned",
        count: 5,
        bgColor: "bg-red-100",
        icon: "🚪",
    },
];

function Dashboard() {
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
