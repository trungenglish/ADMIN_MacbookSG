import { CiEdit } from "react-icons/ci";
import { ImBin } from "react-icons/im";
import UpdateCategoryModalControl from "./UpdateCategory.Modal.Control.jsx";
import { useState } from "react";
import { deleteCategoryAPI } from "../../service/api/categoryApi.js";
import {Modal, notification} from "antd";

const CategoryTable = (props) => {
    const { dataCategory, fetchAllCategory, filterData } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const handleUpdateCate = (category) => {
        setDataUpdate(category);
        setIsModalUpdateOpen(true);
    };

    const confirmDelete = (_id) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa danh mục này không?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: () => handleDeleteCate(_id),
        });
    };

    const handleDeleteCate = async (_id) => {
        const res = await deleteCategoryAPI(_id);
        if (res.data) {
            notification.success({
                message: "Xóa danh mục",
                description: "Xóa danh mục thành công",
            });
            await fetchAllCategory();
        } else {
            notification.error({
                message: "Lỗi khi xóa danh mục",
                description: JSON.stringify(res.message),
            });
        }
    };

    return (
        <>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-blue-300 text-gray-600">
                <tr>
                    <th className="py-2 px-4 text-left font-semibold">STT</th>
                    <th className="py-2 px-4 text-left font-semibold">Tên</th>
                    <th className="py-2 px-4 text-left font-semibold">Ngày tạo</th>
                    <th className="py-2 px-4 text-left font-semibold">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {filterData && filterData.length > 0 ? (
                    filterData.map((category, index) => (
                        <tr key={category._id}
                            className="border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                            <td className="py-2 px-4 text-gray-700">{index + 1}</td>
                            <td className="py-2 px-4 text-gray-700">{category.name}</td>
                            <td className="py-2 px-4 text-gray-700">
                                {new Date(category.createdAt).toLocaleDateString('vi-VN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </td>
                            <td className="py-2 px-4 flex items-center space-x-2">
                                <span className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                      onClick={() => handleUpdateCate(category)}>
                                    <CiEdit size={20}/>
                                </span>
                                <span className="text-red-500 hover:text-red-700 cursor-pointer"
                                      onClick={() => confirmDelete(category._id)}>
                                    <ImBin size={20}/>
                                </span>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center py-4 text-gray-600">
                            Không có danh mục nào.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            <UpdateCategoryModalControl
                fetchAllCategory={fetchAllCategory}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    );
}

export default CategoryTable;
