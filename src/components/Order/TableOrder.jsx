import { CiEdit } from "react-icons/ci";
import { ImBin } from "react-icons/im";
import { useState } from "react";
import {Drawer, Modal, notification} from "antd";
import {deleteOrderAPI} from "../../service/api/orderApi.js";

const TableOrder = (props) => {
    const { filterData, fetchAllOrders } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleUpdatePro = (order) => {
        setDataUpdate(order);
        setIsModalUpdateOpen(true);
    };

    const confirmDelete = (_id) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa đơn hàng này không?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: () => handleDeletePro(_id),
        });
    };

    const handleDeletePro = async (_id) => {
        const res = await deleteOrderAPI(_id);
        if (res.data) {
            notification.success({
                message: "Xóa đơn hàng",
                description: "Xóa đơn hàng thành công",
            });
            await fetchAllOrders();
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

    const showDrawer = (order) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const onClose = () => {
        setSelectedOrder(null);
        setOpen(false);
    };

    return (
        <>
            <table className="min-w-full bg-white border border-gray-200 w-full">
                <thead className="bg-blue-300 border-b border-gray-200">
                <tr>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">STT</th>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">Số điện thoại</th>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">Ngày đặt</th>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">Tổng tiền</th>
                    <th className="py-2 px-4 text-center text-gray-600 font-semibold whitespace-nowrap">Tình Trạng</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Hành động</th>
                </tr>
                </thead>
                <tbody>

                {filterData && filterData.length > 0 ? (
                    filterData.map((order, index) => (
                        <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50"
                            onClick={() => showDrawer(order)}>
                            <td className="py-2 px-4 text-center text-sm">{index + 1}</td>
                            <td className="py-2 px-4 text-sm text-center hidden md:table-cell">{order.idUser.phone}</td>
                            <td className="py-2 px-4 text-sm text-center hidden md:table-cell">{order.createdAt}</td>
                            <td className="py-2 px-4 text-sm text-center hidden md:table-cell">{formatPrice(order.totalPrice)}</td>
                            <td className="py-2 px-4 text-sm text-center hidden md:table-cell">{order.status}</td>
                            <td className="py-2 px-4 text-sm text-center flex items-center space-x-4">
                                <span className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                      onClick={() => handleUpdatePro(order)}>
                                    <CiEdit size={20}/>
                                </span>
                                <span className="text-red-500 hover:text-red-700 cursor-pointer"
                                      onClick={() => confirmDelete(order._id)}>
                                    <ImBin size={20}/>
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

            <Drawer
                title="Chi tiết đơn hàng"
                placement="right"
                onClose={onClose}
                width={400}
            >
                {selectedOrder && (
                    <div>
                        <p><strong>Số điện thoại:</strong> {selectedOrder.idUser.phone}</p>
                        <p><strong>Ngày đặt:</strong> {selectedOrder.createdAt}</p>
                        <p><strong>Tổng tiền:</strong> {formatPrice(selectedOrder.totalPrice)}</p>
                        <p><strong>Tình trạng:</strong> {selectedOrder.status}</p>

                        <h3 className="font-semibold mt-4">Danh sách sản phẩm:</h3>
                        <ul>
                            {selectedOrder.products && selectedOrder.products.map((product, idx) => (
                                <li key={idx} className="mt-2">
                                    <p><strong>Tên sản phẩm:</strong> {product.name}</p>
                                    <p><strong>Số lượng:</strong> {product.quantity}</p>
                                    <p><strong>Giá:</strong> {formatPrice(product.price)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Drawer>
        </>
    );
};

export default TableOrder;