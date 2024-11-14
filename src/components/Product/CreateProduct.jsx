import { useEffect, useRef, useState } from "react";
import { createProductAPI } from "../../service/api/productApi.js";
import { Input, notification, Select, Button } from "antd";
import { getAllCategoryAPI } from "../../service/api/categoryApi.js";
import { MdDeleteForever } from "react-icons/md";
import { PlusOutlined } from "@ant-design/icons";

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [idCategory, setIdCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [defaultVariant, setDefaultVariant] = useState({
        storage: "", color: "", price: "", stock: "", discount: "", priceAfterDiscount: ""
    });
    const [variants, setVariants] = useState([]);
    const [specifications, setSpecifications] = useState({
        os: "", chip: "", gpu: "", ram: "", storage: "", availableStorage: "", rearCameraResolution: "",
        rearCameraVideo: "", rearCameraFlash: "", rearCameraFeatures: "", frontCameraResolution: "",
        frontCameraFeatures: "", screenTechnology: "", screenResolution: "", screenSize: "", maxBrightness: "",
        touchGlass: "", batteryCapacity: "", batteryType: "", maxChargingSupport: "", batteryTechnology: "",
        advancedSecurity: "", specialFeatures: "", waterResistance: "", mobileNetwork: "", sim: "", wifi: "",
        gps: "", bluetooth: "", chargingPort: "", headphoneJack: "", otherConnections: "", design: "",
        material: "", dimensions: "", weight: "", releaseDate: ""
    });
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
        setProductImages([]);
        setDefaultVariant({ storage: "", color: "", price: "", stock: "", discount: "", priceAfterDiscount: "" });
        setVariants([]);
        setSpecifications({
            os: "", chip: "", gpu: "", ram: "", storage: "", availableStorage: "", rearCameraResolution: "",
            rearCameraVideo: "", rearCameraFlash: "", rearCameraFeatures: "", frontCameraResolution: "",
            frontCameraFeatures: "", screenTechnology: "", screenResolution: "", screenSize: "", maxBrightness: "",
            touchGlass: "", batteryCapacity: "", batteryType: "", maxChargingSupport: "", batteryTechnology: "",
            advancedSecurity: "", specialFeatures: "", waterResistance: "", mobileNetwork: "", sim: "", wifi: "",
            gps: "", bluetooth: "", chargingPort: "", headphoneJack: "", otherConnections: "", design: "",
            material: "", dimensions: "", weight: "", releaseDate: ""
        });
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
                    <Input.TextArea placeholder="Mô tả sản phẩm" value={description}
                                    onChange={(e) => setDescription(e.target.value)} />
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

                <div className="space-y-3">
                    <h2 className="text-lg font-semibold">Thông số kỹ thuật</h2>
                    <div className="max-h-96 overflow-y-auto space-y-4">
                        <Input placeholder="Hệ điều hành" value={specifications.os}
                               onChange={(e) => setSpecifications({ ...specifications, os: e.target.value })} />
                        <Input placeholder="Chip xử lý" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, chip: e.target.value })} />
                        <Input placeholder="Chip đồ họa" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, gpu: e.target.value })} />
                        <Input placeholder="RAM" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, ram: e.target.value })} />
                        <Input placeholder="Dung lượng lưu trữ" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, storage: e.target.value })} />
                        <Input placeholder="Dung lượng còn lại" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, availableStorage: e.target.value })} />
                        <Input placeholder="Độ phân giải camera sau" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, rearCameraResolution: e.target.value })} />
                        <Input placeholder="Quay phim camera sau" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, rearCameraVideo: e.target.value })} />
                        <Input placeholder="Đèn flash camera sau" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, rearCameraFlash: e.target.value })} />
                        <Input placeholder="Tính năng camera sau" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, rearCameraFeatures: e.target.value })} />
                        <Input placeholder="Độ phân giải camera trước" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, frontCameraResolution: e.target.value })} />
                        <Input placeholder="Tính năng camera trước" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, frontCameraFeatures: e.target.value })} />
                        <Input placeholder="Công nghệ màn hình" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, screenTechnology: e.target.value })} />
                        <Input placeholder="Độ phân giải màn hình" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, screenResolution: e.target.value })} />
                        <Input placeholder="Màn hình rộng" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, screenSize: e.target.value })} />
                        <Input placeholder="Độ sáng tối đa" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, maxBrightness: e.target.value })} />
                        <Input placeholder="Mặt kính cảm ứng" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, touchGlass: e.target.value })} />
                        <Input placeholder="Dung lượng pin" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, batteryCapacity: e.target.value })} />
                        <Input placeholder="Loại pin" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, batteryType: e.target.value })} />
                        <Input placeholder="Hỗ trợ sạc tối đa" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, maxChargingSupport: e.target.value })} />
                        <Input placeholder="Công nghệ pin" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, batteryTechnology: e.target.value })} />
                        <Input placeholder="Bảo mật nâng cao" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, advancedSecurity: e.target.value })} />
                        <Input placeholder="Tính năng đặc biệt" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, specialFeatures: e.target.value })} />
                        <Input placeholder="Kháng nước, bụi" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, waterResistance: e.target.value })} />
                        <Input placeholder="Mạng di động" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, mobileNetwork: e.target.value })} />
                        <Input placeholder="SIM" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, sim: e.target.value })} />
                        <Input placeholder="Wifi" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, wifi: e.target.value })} />
                        <Input placeholder="GPS" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, gps: e.target.value })} />
                        <Input placeholder="Bluetooth" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, bluetooth: e.target.value })} />
                        <Input placeholder="Cổng kết nối/ sạc" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, chargingPort: e.target.value })} />
                        <Input placeholder="Jack tai nghe" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, headphoneJack: e.target.value })} />
                        <Input placeholder="Kết nối khác (NFC, v.v.)" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, otherConnections: e.target.value })} />
                        <Input placeholder="Thiết kế" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, design: e.target.value })} />
                        <Input placeholder="Chất liệu" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, material: e.target.value })} />
                        <Input placeholder="Kích thước" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, dimensions: e.target.value })} />
                        <Input placeholder="Khối lượng" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, weight: e.target.value })} />
                        <Input placeholder="Thời điểm ra mắt" value={specifications.chip}
                               onChange={(e) => setSpecifications({ ...specifications, releaseDate: e.target.value })} />
                    </div>
                </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleSubmit}>Tạo sản phẩm</button>
        </div>
    );
};

export default CreateProduct;
