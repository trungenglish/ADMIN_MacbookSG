import { CiEdit } from "react-icons/ci";
import { ImBin } from "react-icons/im";
import { useEffect, useState } from "react";
import { deleteProductAPI, getProductByIdAPI, updateAvailableProductsAPI } from "../../service/api/productApi.js";
import { useParams } from "react-router-dom";
import {Modal, notification, Spin} from "antd";

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [variants, setVariants] = useState([]);
    const [appLoading, setAppLoading] = useState(false);

    useEffect(() => {
        getProductVariant();
    }, [id]);

    const getProductVariant = async () => {
        try {
            setAppLoading(true)
            const res = await getProductByIdAPI(id);
            console.log("res: ", res);
            if (res && res.EC === 0) {
                setProduct(res.data.mainProduct);
                setVariants(res.data.variants);
            }
            setAppLoading(false)
        } catch (error) {
            console.error("Error: ", error);
            setAppLoading(false)
        }
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
            await getProductVariant();
        } else {
            notification.error({
                message: "Lỗi khi xóa sản phẩm",
                description: JSON.stringify(res.message),
            });
        }
    };

    const confirmToggleStatus = (variant) => {
        Modal.confirm({
            title: 'Xác nhận thay đổi trạng thái',
            content: `Bạn có chắc chắn muốn ${variant.isActive ? "ngừng bán" : "kích hoạt bán"} sản phẩm này không?`,
            okText: variant.isActive ? "Ngừng bán" : "Kích hoạt bán",
            cancelText: 'Hủy',
            onOk: () => handleToggleStatus(variant),
        });
    };

    const handleToggleStatus = async (variant) => {
        const updatedStatus = !variant.isActive;
        const res = await updateAvailableProductsAPI(variant._id, updatedStatus);
        if (res && res.EC === 0) {
            notification.success({
                message: "Cập nhật trạng thái",
                description: `Sản phẩm đã được ${updatedStatus ? "kích hoạt bán" : "ngừng bán"} thành công`,
            });
            await getProductVariant();
        } else {
            notification.error({
                message: "Lỗi khi cập nhật trạng thái",
                description: res.message || "Đã xảy ra lỗi",
            });
        }
    };

    return (
        <>
            <div className="container mx-auto p-6">
                {appLoading ? (
                    <div style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}>
                        <Spin/>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {product ? product.name : "Loading..."}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <div className="mb-4">
                                    <strong className="text-gray-600">Danh mục:</strong>
                                    <p className="text-gray-800">{product?.idCategory?.name || "Loading..."}</p>
                                </div>

                                <div className="mb-4">
                                    <strong className="text-gray-600">Mô tả:</strong>
                                    <p className="text-gray-800">{product?.description || "Loading..."}</p>
                                </div>

                                <div className="mb-4">
                                    <strong className="text-gray-600">Ngày tạo:</strong>
                                    <p className="text-gray-800">{product?.createdAt ? new Date(product.createdAt).toLocaleDateString() : "Loading..."}</p>
                                </div>

                                <div className="mb-4">
                                    <strong className="text-gray-600">Trạng thái:</strong>
                                    <p className={`text-${product?.isActive ? 'green' : 'red'}-500`}>
                                        {product?.isActive ? "Đang bán" : "Ngừng bán"}
                                    </p>
                                </div>
                            </div>

                            {/* Hình ảnh */}
                            <div className="flex flex-wrap justify-center space-x-4">
                                {product?.images?.map((image, index) => (
                                    <div key={index} className="w-1/3 sm:w-1/4 md:w-1/6">
                                        <img src={image} alt={product.name}
                                             className="w-full h-auto rounded-lg shadow-md"/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-blue-300 border-b">
                <tr>
                    {["STT", "Tên", "Màu sắc", "Dung lượng", "Số lượng", "Giá gốc", "% giảm", "Giá bán", "Hành động"].map((header, index) => (
                        <th key={index}
                            className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {product && variants.length > 0 ? (
                    variants.map((variant, index) => (
                        <tr key={variant._id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4 text-center text-sm">{index + 1}</td>
                            <td className="py-2 px-4 text-sm text-center">{product.name} - {variant.storage}</td>
                            <td className="py-2 px-4 text-sm text-center">{variant.color}</td>
                            <td className="py-2 px-4 text-sm text-center">{variant.storage}</td>
                            <td className="py-2 px-4 text-sm text-center">{variant.quantity}</td>
                            <td className="py-2 px-4 text-sm text-center">{variant.price.toLocaleString()} VND</td>
                            <td className="py-2 px-4 text-sm text-center">{(variant.discount * 100).toFixed(0)}%</td>
                            <td className="py-2 px-4 text-sm text-center">{variant.priceAfterDiscount.toLocaleString()} VND</td>
                            <td className="py-2 px-4 text-sm text-center flex items-center space-x-4">
                            <span className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                  onClick={() => handleUpdatePro(variant)}>
                                    <CiEdit size={20}/>
                                </span>

                                {index !== 0 && (
                                    <span className="text-red-500 hover:text-red-700 cursor-pointer"
                                          onClick={() => confirmDelete(variant._id, index)}>
                                    <ImBin size={20}/>
                                </span>
                                )}
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
                        <td colSpan="10" className="text-center py-4 text-gray-600">
                            Không có sản phẩm nào.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    );
};

export default DetailProduct;
