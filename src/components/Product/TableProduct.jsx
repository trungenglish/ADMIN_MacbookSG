import { CiEdit, CiSquareAlert  } from "react-icons/ci";
import { ImBin } from "react-icons/im";

import { Modal, notification } from "antd";
import { deleteProductAPI, updateAvailableProductsAPI } from "../../service/api/productApi.js";
import {useNavigate} from "react-router-dom";

const TableProduct = (props) => {
    const { filterData, fetchAllProducts } = props;
    const navigate = useNavigate();

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

    const confirmToggleStatus = (product) => {
        Modal.confirm({
            title: 'Xác nhận thay đổi trạng thái',
            content: `Bạn có chắc chắn muốn ${product.isActive ? "ngừng bán" : "kích hoạt bán"} sản phẩm này không?`,
            okText: product.isActive ? "Ngừng bán" : "Kích hoạt bán",
            cancelText: 'Hủy',
            onOk: () => handleToggleStatus(product),
        });
    };

    const handleToggleStatus = async (product) => {
        const updatedStatus = !product.isActive;
        const res = await updateAvailableProductsAPI(product._id, updatedStatus);
        if (res && res.EC === 0) {
            notification.success({
                message: "Cập nhật trạng thái",
                description: `Sản phẩm đã được ${updatedStatus ? "kích hoạt bán" : "ngừng bán"} thành công`,
            });
            await fetchAllProducts();
        } else {
            notification.error({
                message: "Lỗi khi cập nhật trạng thái",
                description: JSON.stringify(res.message),
            });
        }
    };

    return (
        <>
            <table className="min-w-full bg-white border border-gray-200 w-full">
                <thead className="bg-blue-300 border-b border-gray-200">
                <tr>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">STT</th>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">Danh mục</th>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">Tên</th>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">Hình ảnh</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Hành động</th>
                    {/*<th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Đang bán </th>*/}
                </tr>
                </thead>
                <tbody>

                {filterData && filterData.length > 0 ? (
                    filterData.map((product, index) => (
                        <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-2 px-4 text-center text-sm">{index + 1}</td>
                            <td className="py-2 px-4 text-sm text-center hidden md:table-cell">{product.idCategory.name}</td>
                            <td className="py-2 px-4 text-sm text-center hidden md:table-cell">{product.name}</td>
                            <td className="py-2 px-4 text-sm text-center break-words w-0">
                                <img src={product.images[0]} alt={product.name} className="max-w-[100px] h-auto"/>
                            </td>
                            <td className="py-2 px-4 text-sm text-center flex items-center space-x-4 ">
                                <span className="text-green-500 hover:text-red-700 cursor-pointer"
                                      onClick={() => navigate(`/main/detail-product/${product._id}`)}>
                                    <CiSquareAlert size={26}/>
                                </span>
                                <span className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                      onClick={() => navigate(`/main/update-product/${product._id}`)}>
                                    <CiEdit size={20}/>
                                </span>
                                <span className="text-red-500 hover:text-red-700 cursor-pointer"
                                      onClick={() => confirmDelete(product._id)}>
                                    <ImBin size={20}/>
                                </span>
                            </td>
                            <td className="py-2 px-4 text-sm text-center flex items-center space-x-4">
                                <label htmlFor={`check-${product._id}`}
                                       className="bg-gray-200 cursor-pointer relative w-12 h-6 rounded-full">
                                    <input
                                        type="checkbox"
                                        id={`check-${product._id}`}
                                        className="sr-only peer"
                                        checked={product.isActive}
                                        onChange={() => confirmToggleStatus(product)}
                                    />
                                    <span
                                        className="w-5 h-5 bg-blue-300 absolute rounded-full left-1 top-0.5 peer-checked:bg-blue-600 peer-checked:left-6 transition-all duration-300"></span>
                                </label>
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

            {/*<UpdateProductModalControl*/}
            {/*    fetchAllProducts={fetchAllProducts}*/}
            {/*    isModalUpdateOpen={isModalUpdateOpen}*/}
            {/*    setIsModalUpdateOpen={setIsModalUpdateOpen}*/}
            {/*    dataUpdate={dataUpdate}*/}
            {/*    setDataUpdate={setDataUpdate}*/}
            {/*/>*/}
        </>
    );
};

export default TableProduct;