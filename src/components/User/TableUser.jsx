import { CiEdit } from "react-icons/ci";
import { ImBin } from "react-icons/im";
import UpdateUserModalControl from "./UpdateUser.Modal.Control.jsx";
import { useState } from "react";
import { deleteUserAPI } from "../../service/api/userApi.js";
import { notification } from "antd";

const TableUser = (props) => {
    const { dataUsers, filterData, fetchAllUsers } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const handleUpdateUser = (user) => {
        setDataUpdate(user);
        setIsModalUpdateOpen(true);
    };

    const handleDeleteUser = async (_id) => {
        const res = await deleteUserAPI(_id);
        if (res.data) {
            notification.success({
                message: "Xóa người dùng",
                description: "Xóa người dùng thành công",
            });
            await fetchAllUsers();
        } else {
            notification.error({
                message: "Lỗi khi xóa người dùng",
                description: JSON.stringify(res.message),
            });
        }
    };

    return (
        <>
            <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-blue-300 text-gray-600">
                <tr className="text-center">
                    <th className="py-2 px-4 font-semibold">STT</th>
                    <th className="py-2 px-4 font-semibold hidden md:table-cell">Tên</th>
                    <th className="py-2 px-4 font-semibold">Email</th>
                    <th className="py-2 px-4 font-semibold hidden md:table-cell">Số điện thoại</th>
                    <th className="py-2 px-4 font-semibold hidden md:table-cell">Thành phố</th>
                    <th className="py-2 px-4 font-semibold">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {filterData && filterData.length > 0 ? (
                    filterData.map((user, index) => (
                        <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100 text-center">
                            <td className="py-2 px-4">{index + 1}</td>
                            <td className="py-2 px-4 hidden md:table-cell">{user.name}</td>
                            <td className="py-2 px-4 break-words w-0">{user.email}</td>
                            <td className="py-2 px-4 hidden md:table-cell">{user.phone}</td>
                            <td className="py-2 px-4 hidden md:table-cell">{user.city}</td>
                            <td className="py-2 px-4 flex justify-center space-x-4">
                                    <span className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => handleUpdateUser(user)}>
                                        <CiEdit size={20} />
                                    </span>
                                <span className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDeleteUser(user._id)}>
                                        <ImBin size={20} />
                                    </span>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center py-4 text-gray-600">
                            Không có người dùng nào.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            <UpdateUserModalControl
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                fetchAllUsers={fetchAllUsers}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    );
}

export default TableUser;
