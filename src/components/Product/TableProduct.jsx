import { CiEdit } from "react-icons/ci";
import { ImBin } from "react-icons/im";
import { useState } from "react";
import UpdateProductModalControl from "./UpdateProduct.Modal.Control.jsx";
import { Modal, notification } from "antd";
import { deleteProductAPI } from "../../service/api/productApi.js";

const TableProduct = (props) => {
    const { dataProducts, filterData, fetchAllProducts } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const handleUpdatePro = (product) => {
        setDataUpdate(product);
        setIsModalUpdateOpen(true);
    };

    const confirmDelete = (_id) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: () => handleDeletePro(_id),
        });
    };

    const handleDeletePro = async (_id) => {
        const res = await deleteProductAPI(_id);
        if (res.data) {
            notification.success({
                message: "Xóa sản phẩm",
                description: "Xóa sản phẩm thành công",
            });
            await fetchAllProducts();
        } else {
            notification.error({
                message: "Lỗi khi xóa sản phẩm",
                description: JSON.stringify(res.message),
            });
        }
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
        <>
            <table className="min-w-full bg-white border border-gray-200 w-full">
                <thead className="bg-blue-300 border-b border-gray-200">
                <tr>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">STT</th>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">Tên</th>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">Hình ảnh</th>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">Số lượng</th>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">Giá gốc</th>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">% giảm</th>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">Giá bán</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {filterData && filterData.length > 0 ? (
                    filterData.map((product, index) => (
                        <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-2 px-4 text-center text-sm">{index + 1}</td>
                            <td className="py-2 px-4 text-sm text-center hidden md:table-cell">{product.name}</td>
                            <td className="py-2 px-4 text-sm text-center break-words w-0">
                                <img src={product.imgUrls} alt={product.name} className="max-w-[100px] h-auto" />
                            </td>
                            <td className="py-2 px-4 text-sm text-center hidden md:table-cell">{product.quantity}</td>
                            <td className="py-2 px-4 text-sm text-center hidden md:table-cell">{formatPrice(product.price)}</td>
                            <td className="py-2 px-4 text-sm text-center hidden md:table-cell">{product.discount}%</td>
                            <td className="py-2 px-4 text-sm text-center hidden md:table-cell">{formatPrice(product.priceAfterDiscount)}</td>
                            <td className="py-2 px-4 text-sm text-center flex items-center space-x-4">
                                    <span className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => handleUpdatePro(product)}>
                                        <CiEdit size={20} />
                                    </span>
                                <span className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => confirmDelete(product._id)}>
                                        <ImBin size={20} />
                                    </span>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center py-4 text-gray-600">
                            Không có sản phẩm nào.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            <UpdateProductModalControl
                fetchAllProducts={fetchAllProducts}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    );
};

export default TableProduct;
