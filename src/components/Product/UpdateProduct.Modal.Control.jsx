import { useEffect, useState } from "react";
import { updateProductAPI } from "../../service/api/productApi.js";
import { Input, Modal, notification, Select } from "antd";

const UpdateProductModalControl = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, fetchAllProducts, dataUpdate, setDataUpdate, categories } = props; // Nhận categories từ props
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [discountPercent, setDiscountPercent] = useState("");
    const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
    const [image, setImage] = useState("");
    const [idCategory, setIdCategory] = useState(""); // Lưu id danh mục
    const [id, setId] = useState("");

    useEffect(() => {
        if (dataUpdate) {
            setName(dataUpdate.name);
            setId(dataUpdate._id);
            setQuantity(dataUpdate.quantity);
            setPrice(dataUpdate.price);
            setDiscountPercent(dataUpdate.discountPercent);
            setPriceAfterDiscount(dataUpdate.priceAfterDiscount);
            setImage(dataUpdate.image);
            setIdCategory(dataUpdate.idCategory); // Gán danh mục
        }
    }, [dataUpdate]);

    const handleSubmitBtn = async () => {
        const res = await updateProductAPI(id, {
            name,
            quantity,
            price,
            discountPercent,
            priceAfterDiscount,
            image,
            idCategory
        });

        if (res.data) {
            notification.success({
                message: "Cập nhật sản phẩm",
                description: "Cập nhật sản phẩm thành công",
            });
            resetAndCloseModal();
            await fetchAllProducts();
        } else {
            notification.error({
                message: "Lỗi cập nhật sản phẩm",
                description: JSON.stringify(res.message),
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
        setName("");
        setQuantity("");
        setPrice("");
        setDiscountPercent("");
        setPriceAfterDiscount("");
        setImage("");
        setIdCategory("");
        setDataUpdate(null);
    };

    return (
        <Modal
            title="Chỉnh sửa thông tin sản phẩm"
            open={isModalUpdateOpen}
            onOk={handleSubmitBtn}
            onCancel={resetAndCloseModal}
            cancelText="Hủy"
            maskClosable={false}
            okText="Lưu"
        >
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">ID</label>
                    <Input value={id} disabled />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Danh mục</label>
                    <Select
                        className="w-full"
                        value={idCategory}
                        onChange={(value) => setIdCategory(value)}
                    >
                        {categories && categories.map((category) => (
                            <Select.Option key={category._id} value={category._id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Tên</label>
                    <Input value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Số lượng</label>
                    <Input value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Giá gốc</label>
                    <Input value={price} onChange={(event) => setPrice(event.target.value)} />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">% giảm</label>
                    <Input value={discountPercent} onChange={(event) => setDiscountPercent(event.target.value)} />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Giá bán</label>
                    <Input value={priceAfterDiscount} onChange={(event) => setPriceAfterDiscount(event.target.value)} />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Hình ảnh</label>
                    <Input value={image} onChange={(event) => setImage(event.target.value)} />
                </div>
            </div>
        </Modal>
    );
};

export default UpdateProductModalControl;
