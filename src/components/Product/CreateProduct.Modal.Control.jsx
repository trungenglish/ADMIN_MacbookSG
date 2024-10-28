import {useEffect, useState} from "react";
import { createProductAPI } from "../../service/api/productApi.js";
import { Input, Modal, notification, Select } from "antd";
import {getAllCategoryAPI} from "../../service/api/categoryApi.js";

const CreateProductModalControl = (props) => {
    const { isModalCreateOpen, setIsModalCreateOpen, fetchAllProducts } = props;
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [idCategory, setIdCategory] = useState("");
    const [categories, setCategories] = useState([]);

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

        try {
            const res = await createProductAPI(
                name,
                price,
                priceAfterDiscount,
                 [image],
                description,
                idCategory,
                quantity,
                discount,
            );
            if (res && res.data) {
                notification.success({
                    message: "Tạo mới sản phẩm",
                    description: "Tạo mới sản phẩm thành công",
                });
                resetAndCloseModal();
                await fetchAllProducts();
            } else {
                throw new Error(res.message || "Lỗi không xác định");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                notification.error({
                    message: "Lỗi khi tạo mới sản phẩm",
                    description: error.response.data.message || "Có lỗi xảy ra, vui lòng thử lại sau.",
                });
            } else if (error.request) {
                notification.error({
                    message: "Lỗi mạng",
                    description: "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng của bạn.",
                });
            } else {
                notification.error({
                    message: "Lỗi không xác định",
                    description: error.message,
                });
            }
        }
    };

    const resetAndCloseModal = () => {
        setIsModalCreateOpen(false);
        setName("");
        setQuantity("");
        setPrice("");
        setDiscount("");
        setPriceAfterDiscount("");
        setImage("");
        setDescription("");
        setIdCategory("");
        setErrors({ quantity: "", price: "", discount: "" }); // Reset lỗi
    };

    return (
        <Modal
            title="Tạo mới sản phẩm"
            open={isModalCreateOpen}
            cancelText="Hủy"
            okText="Tạo mới"
            onOk={handleSubmitBtn}
            onCancel={resetAndCloseModal}
            maskClosable={false}
            styles={{body: { maxHeight: '60vh', overflowY: 'auto' ,padding: '5px'}}}
        >
            <div className="flex flex-col gap-4">
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
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Số lượng</label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                    {errors.quantity && <span className="text-red-500">{errors.quantity}</span>} {/* Hiển thị lỗi */}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Giá gốc</label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={price}
                        onChange={handlePriceChange}
                    />
                    {errors.price && <span className="text-red-500">{errors.price}</span>} {/* Hiển thị lỗi */}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">% giảm</label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={discount}
                        onChange={handleDiscountChange}
                    />
                    {errors.discount && <span className="text-red-500">{errors.discount}</span>} {/* Hiển thị lỗi */}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Giá bán</label>
                    <Input
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={priceAfterDiscount}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Hình ảnh</label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={image}
                        onChange={(event) => setImage(event.target.value)}
                    />
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

export default CreateProductModalControl;
