import {CiEdit} from "react-icons/ci";
import {ImBin} from "react-icons/im";
import UpdateCategoryModalControl from "./UpdateCategory.Modal.Control.jsx";
import {useState} from "react";
import {deleteCategoryAPI} from "../../service/api/categoryApi.js";
import {notification} from "antd";

const CategoryTable = (props) => {
    const {dataCategory, fetchAllCategory, filterData} = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const handleUpdateCate = (category) => {
        setDataUpdate(category);
        setIsModalUpdateOpen(true);
    }

    const handleDeleteCate = async (_id) => {
        const res = await deleteCategoryAPI(_id);
        if (res.data) {
            notification.success({
                message: "Xóa danh mục",
                description: "Xóa danh mục thành công"
            })
            await fetchAllCategory();
        } else {
            notification.error({
                message: "Lỗi khi xóa danh mục",
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <>
            <table className="min-w-full bg-white border border-gray-200 w-full">
                <thead>
                <tr className="bg-blue-200 border-b border-gray-200">
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">STT</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Tên</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Ngày tạo</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Hành động</th>
                    {/* Căn giữa tiêu đề */}
                </tr>
                </thead>
                <tbody>
                {filterData && filterData.length > 0 ? (
                    filterData.map((category, index) => (
                        <tr key={category._id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-2 px-4 text-sm">{index + 1}</td>
                            <td className="py-2 px-4 text-sm hidden md:table-cell">{category.name}</td>
                            <td className="py-2 px-4 text-sm break-words w-0">{category.email}</td>
                            <td className="py-2 px-4 text-sm hidden md:table-cell">{category.phone}</td>
                            <td className="py-2 px-4 text-sm flex items-center space-x-4"> {/* Căn giữa nội dung */}
                                <span className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                      onClick={() => handleUpdateCate(category)}>
                                    <CiEdit size={20}/>
                                </span>
                                <span className="text-red-500 hover:text-red-700 cursor-pointer"
                                      onClick={() => handleDeleteCate(category._id)}>
                                    <ImBin size={20}/>
                                </span>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-600">
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
    )
}

export default CategoryTable;