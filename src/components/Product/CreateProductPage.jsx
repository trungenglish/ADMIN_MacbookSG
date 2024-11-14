import { useEffect, useRef, useState } from "react";
import { createProductAPI } from "../../service/api/productApi.js";
import { Input, notification, Select, Button } from "antd";
import { getAllCategoryAPI } from "../../service/api/categoryApi.js";
import { MdDeleteForever } from "react-icons/md";
import { PlusOutlined } from "@ant-design/icons";

const CreateProductPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [idCategory, setIdCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [defaultVariant, setDefaultVariant] = useState({
        storage: "", color: "", price: "", stock: "", discount: "", priceAfterDiscount: ""
    });
    const [variants, setVariants] = useState([]);
    const [specifications, setSpecifications] = useState({ os: "", chip: "" });
    const cloudinaryWidgetRef = useRef(null);

    useEffect(() => {
        const fetchAllCategory = async () => {
            const res = await getAllCategoryAPI();
            setCategories(res && res.EC === 0 ? res.data : []);
        };
        fetchAllCategory();
    }, []);

    const calculateDiscountedPrice = (price, discount) => {
        const numberPrice = Number(price);
        const numberDiscount = Number(discount);
        if (!isNaN(numberPrice) && numberPrice >= 0 && !isNaN(numberDiscount) && numberDiscount >= 0 && numberDiscount <= 100) {
            return (numberPrice - (numberPrice * numberDiscount / 100)).toFixed(2);
        }
        return "";
    };

    useEffect(() => {
        setDefaultVariant(prevVariant => ({
            ...prevVariant,
            priceAfterDiscount: calculateDiscountedPrice(prevVariant.price, prevVariant.discount),
        }));
    }, [defaultVariant.price, defaultVariant.discount]);

    const handleAddVariant = () => {
        setVariants([...variants, { storage: "", color: "", price: "", stock: "", discount: "", priceAfterDiscount: "" }]);
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;

        if (field === "price" || field === "discount") {
            newVariants[index].priceAfterDiscount = calculateDiscountedPrice(newVariants[index].price, newVariants[index].discount);
        }
        setVariants(newVariants);
    };

    const handleRemoveVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const myWidget = cloudinary.createUploadWidget(
            {
                cloudName: 'dllll1sn5',
                uploadPreset: 'macbooksg',
                multiple: true,
                clientAllowedFormats: ["image"],
                maxImageFileSize: 2000000,
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    const imageUrl = result.info.secure_url;
                    setProductImages(prevImages => [...prevImages, imageUrl]);
                }
            }
        );

        cloudinaryWidgetRef.current = myWidget;
    }, []);

    const openWidget = () => {
        cloudinaryWidgetRef.current.open();
    };

    const handleSubmit = async () => {
        try {
            const res = await createProductAPI(name, description, idCategory, defaultVariant, variants, productImages);
            if (res && res.data) {
                notification.success({
                    message: "Tạo mới sản phẩm",
                    description: "Tạo mới sản phẩm thành công",
                });
                resetForm();
            } else {
                throw new Error(res.message || "Lỗi không xác định");
            }
        } catch (error) {
            notification.error({
                message: "Lỗi khi tạo mới sản phẩm",
                description: error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau.",
            });
        }
    };

    const resetForm = () => {
        setName("");
        setDescription("");
        setIdCategory("");
        setProductImages([]); // Reset ảnh sản phẩm
        setDefaultVariant({ storage: "", color: "", price: "", stock: "", discount: "", priceAfterDiscount: "" });
        setVariants([]);
        setSpecifications({ os: "", chip: "" });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Tạo mới sản phẩm</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <label className="block text-gray-700">Danh mục</label>
                    <Select className="w-full" value={idCategory} onChange={(value) => setIdCategory(value)}>
                        {categories.map((category) => (
                            <Select.Option key={category._id} value={category._id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                    <Input placeholder="Tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input placeholder="Mô tả sản phẩm" value={description} onChange={(e) => setDescription(e.target.value)} />

                    <Button icon={<PlusOutlined />} onClick={openWidget} className="w-full mt-2">Thêm ảnh sản phẩm</Button>
                    {productImages.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 w-full">
                            {productImages.map((image, index) => (
                                <img key={index} src={image} alt="Uploaded" className="w-20 h-20 object-cover rounded-md" />
                            ))}
                        </div>
                    )}

                    <h2 className="text-lg font-semibold">Biến thể mặc định</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Dung lượng" value={defaultVariant.storage} onChange={(e) => setDefaultVariant({ ...defaultVariant, storage: e.target.value })} />
                        <Input placeholder="Màu sắc" value={defaultVariant.color} onChange={(e) => setDefaultVariant({ ...defaultVariant, color: e.target.value })} />
                        <Input placeholder="Giá" value={defaultVariant.price} onChange={(e) => setDefaultVariant({ ...defaultVariant, price: e.target.value })} />
                        <Input placeholder="Giảm giá (%)" value={defaultVariant.discount} onChange={(e) => setDefaultVariant({ ...defaultVariant, discount: e.target.value })} />
                        <Input placeholder="Giá bán sau giảm" value={defaultVariant.priceAfterDiscount} disabled />
                    </div>

                    <h2 className="text-lg font-semibold">Biến thể khác</h2>
                    {variants.map((variant, index) => (
                        <div key={index} className="grid grid-cols-4 gap-2 items-center">
                            <Input placeholder="Dung lượng" value={variant.storage} onChange={(e) => handleVariantChange(index, "storage", e.target.value)} />
                            <Input placeholder="Màu sắc" value={variant.color} onChange={(e) => handleVariantChange(index, "color", e.target.value)} />
                            <Input placeholder="Giá" value={variant.price} onChange={(e) => handleVariantChange(index, "price", e.target.value)} />
                            <Input placeholder="Giảm giá (%)" value={variant.discount} onChange={(e) => handleVariantChange(index, "discount", e.target.value)} />
                            <Input placeholder="Số lượng tồn kho" value={variant.stock} onChange={(e) => handleVariantChange(index, "stock", e.target.value)} />
                            <Input placeholder="Giá bán sau giảm" value={variant.priceAfterDiscount} disabled />
                            <Button icon={<MdDeleteForever />} className="text-red-500" onClick={() => handleRemoveVariant(index)} type="text" />
                        </div>
                    ))}
                    <button className="text-blue-500 mt-2" onClick={handleAddVariant}>+ Thêm biến thể khác</button>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Thông số kỹ thuật</h2>
                    <Input placeholder="Hệ điều hành" value={specifications.os} onChange={(e) => setSpecifications({ ...specifications, os: e.target.value })} />
                    <Input placeholder="Chip" value={specifications.chip} onChange={(e) => setSpecifications({ ...specifications, chip: e.target.value })} />
                </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white" onClick={handleSubmit}>Tạo sản phẩm</button>
        </div>
    );
};

export default CreateProductPage;
