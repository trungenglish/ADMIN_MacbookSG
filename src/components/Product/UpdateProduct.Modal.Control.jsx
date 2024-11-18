import { useEffect, useState } from "react";
import { updateProductAPI } from "../../service/api/productApi.js";
import { Input, Modal, notification, Select } from "antd";
import {getAllCategoryAPI} from "../../service/api/categoryApi.js";

const UpdateProductModalControl = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, fetchAllProducts, dataUpdate, setDataUpdate } = props; // Nhận categories từ props
    const [name, setName] = useState("");
    const [condition, setCondition] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
    const [image, setImage] = useState("");
    const [idCategory, setIdCategory] = useState(""); // Lưu id danh mục
    const [categories, setCategories] = useState([]);
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({
        quantity: "",
        price: "",
        discount: ""
    });

    useEffect(() => {
        const fetchAllCategory = async () => {
            const res = await getAllCategoryAPI();
            if (res && res.EC === 0) {
                setCategories(res.data);
            }else {
                setCategories([]);
            }
        };
        fetchAllCategory();
    }, []);
    useEffect(() => {
        if (dataUpdate) {
            setName(dataUpdate.name);
            setId(dataUpdate._id);
            setQuantity(dataUpdate.quantity);
            setCondition(dataUpdate.condition);
            setPrice(dataUpdate.price);
            setDiscount(dataUpdate.discount);
            setPriceAfterDiscount(dataUpdate.priceAfterDiscount);
            setImage(dataUpdate.imgUrls);
            setIdCategory(dataUpdate.idCategory._id || "");
            setDescription(dataUpdate.description);
        }
    }, [dataUpdate]);

    useEffect(() => {
        const numberPrice = Number(price);
        const numberDiscount = Number(discount);

        if (!isNaN(numberPrice) && numberPrice >= 0 && !isNaN(numberDiscount) && numberDiscount >= 0 && numberDiscount <= 100) {
            const discountedPrice = numberPrice - (numberPrice * numberDiscount / 100);
            setPriceAfterDiscount(discountedPrice.toFixed(2)); // Cập nhật giá sau giảm với 2 chữ số thập phân
        } else {
            setPriceAfterDiscount(""); // Nếu dữ liệu không hợp lệ, reset giá trị
        }
    }, [price, discount]);

    const validateInput = (value, field) => {
        const numberValue = Number(value);
        if (isNaN(numberValue) || numberValue < 0) {
            setErrors(prev => ({
                ...prev,
                [field]: "Giá trị phải là số dương!"
            }));
        } else {
            setErrors(prev => ({
                ...prev,
                [field]: ""
            }));
        }
    };

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        setQuantity(value);
        validateInput(value, "quantity");
    };

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
        validateInput(value, "price");
    };

    const handleDiscountChange = (event) => {
        const value = event.target.value;
        setDiscount(value);
        validateInput(value, "discount");
    };

    const handleSubmitBtn = async () => {
        if (errors.quantity || errors.price || errors.discount) {
            notification.error({
                message: "Có lỗi trong dữ liệu nhập",
                description: "Vui lòng sửa lỗi trước khi tiếp tục.",
            });
            return;
        }

        const res = await updateProductAPI(id, name, condition, price, priceAfterDiscount, image, description,
            idCategory, quantity, discount);

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
        setCondition("");
        setQuantity("");
        setPrice("");
        setDiscount("");
        setPriceAfterDiscount("");
        setImage("");
        setIdCategory("");
        setDataUpdate(null);
        setDescription("");
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
                    <Input value={id} disabled/>
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
                    <Input value={name} onChange={(event) => setName(event.target.value)}/>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Tình trạng</label>
                    <Input value={condition} onChange={(event) => setCondition(event.target.value)}/>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Số lượng</label>
                    <Input value={quantity} onChange={handleQuantityChange}/>
                    {errors.quantity && <span className="text-red-500">{errors.quantity}</span>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Giá gốc</label>
                    <Input value={price} onChange={handlePriceChange}/>
                    {errors.price && <span className="text-red-500">{errors.price}</span>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">% giảm</label>
                    <Input value={discount} onChange={handleDiscountChange}/>
                    {errors.discount && <span className="text-red-500">{errors.discount}</span>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Giá bán</label>
                    <Input
                        disabled
                        value={priceAfterDiscount}/>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Hình ảnh</label>
                    <Input value={image} onChange={(event) => setImage(event.target.value)}/>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Mô tả</label>
                    <Input.TextArea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        rows={4}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default UpdateProductModalControl;
