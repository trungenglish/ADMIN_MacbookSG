import { useEffect, useRef, useState } from "react";
import { Input, notification, Select, Button } from "antd";
import { getAllCategoryAPI } from "../../service/api/categoryApi.js";
import { MdDeleteForever } from "react-icons/md";
import { PlusOutlined } from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import {getProductByIdAPI, updateProductAPI} from "../../service/api/productApi.js";

const UpdateProduct = () => {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [idCategory, setIdCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [defaultVariant, setDefaultVariant] = useState({
        id: "",storage: "", color: "", price: "", discount: "", quantity: "",priceAfterDiscount: "", condition: ""
    });
    const [variants, setVariants] = useState([]);
    const [specifications, setSpecifications] = useState({
        operatingSystem: "",  // Hệ điều hành
        cpu: "",              // cpu xử lý (CPU)
        gpu: "",              // cpu đồ họa (GPU)
        ram: "",              // RAM
        storage: "",          // Dung lượng lưu trữ
        availableStorage: "", // Dung lượng còn lại (khả dụng)
        rearCameraResolution: "", // Độ phân giải camera sau
        rearCameraVideo: "",    // Quay phim camera sau
        rearCameraFlash: "",      // Đèn flash camera sau
        rearCameraFeatures: "", // Tính năng camera sau
        frontCameraResolution: "", // Độ phân giải camera trước
        frontCameraFeatures: "", // Tính năng camera trước
        screenTechnology: "",      // Công nghệ màn hình
        screenResolution: "",      // Độ phân giải màn hình
        screenSize: "",            // Màn hình rộng
        maxBrightness: "",         // Độ sáng tối đa
        touchGlass: "",            // Mặt kính cảm ứng
        batteryCapacity: "",       // Dung lượng pin
        batteryType: "",           // Loại pin
        maxChargingSupport: "",    // Hỗ trợ sạc tối đa
        batteryTechnology: "",   // Công nghệ pin
        advancedSecurity: "",      // Bảo mật nâng cao
        specialFeatures: "",     // Tính năng đặc biệt
        waterResistance: "",       // Kháng nước, bụi
        mobileNetwork: "",         // Mạng di động
        sim: "",                   // SIM
        wifi: "",                // WiFi
        gps: "",                 // GPS
        bluetooth: "",             // Bluetooth
        chargingPort: "",          // Cổng kết nối/ sạc
        headphoneJack: "",         // Jack tai nghe
        otherConnections: "",    // Kết nối khác (NFC, v.v.)
        design: "",                // Thiết kế
        material: "",              // Chất liệu
        dimensions: "",            // Kích thước
        weight: "",                // Khối lượng
        releaseDate: ""
    });

    const navigate = useNavigate();
    const cloudinaryWidgetRef = useRef(null);

    useEffect(() => {
        const fetchAllCategory = async () => {
            const res = await getAllCategoryAPI();
            setCategories(res && res.EC === 0 ? res.data : []);
        };
        fetchAllCategory();
    }, []);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const res = await getProductByIdAPI(id);
            console.log(res);
            if (res && res.EC === 0) {
                const product = res.data;
                setName(product.mainProduct.name);
                setDescription(product.mainProduct.description);
                setIdCategory(product.mainProduct.idCategory._id);
                setProductImages(product.mainProduct.images || []);
                const [firstVariant, ...otherVariants] = product.variants || [];
                setDefaultVariant({
                    id: firstVariant?._id || "",
                    quantity: firstVariant?.quantity || "",
                    storage: firstVariant?.storage || "",
                    color: firstVariant?.color || "",
                    price: firstVariant?.price || "",
                    discount: firstVariant?.discount || "",
                    priceAfterDiscount: calculateDiscountedPrice(firstVariant?.price, firstVariant?.discount),
                    condition: firstVariant?.condition || ""
                });

                setVariants(otherVariants);
                setSpecifications(product.mainProduct.idProDetail || {});
            } else {
                notification.error({
                    message: "Lỗi khi tải sản phẩm",
                    description: "Không thể tải thông tin sản phẩm.",
                });
            }
        };
        fetchProductDetails();
    }, [id]);

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
        setVariants([...variants, { storage: "", color: "", price: "", quantity: "", discount: "", priceAfterDiscount: "" }]);
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
            const res = await updateProductAPI(id, name, description, idCategory, defaultVariant, variants, productImages, specifications);
            if (res && res.data) {
                notification.success({
                    message: "Cập nhật sản phẩm",
                    description: "Cập nhật sản phẩm thành công",
                });
                navigate("/main/products");
            } else {
                throw new Error(res.message || "Lỗi không xác định");
            }
        } catch (error) {
            notification.error({
                message: "Lỗi khi ập nhật sản phẩm",
                description: error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau.",
            });
        }
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
                        <Input placeholder="Số lượng tồn kho" value={defaultVariant.quantity} onChange={(e) => setDefaultVariant({ ...defaultVariant, quantity: e.target.value })} />
                        <Input placeholder="Tình trạng" value={defaultVariant.condition} onChange={(e) => setDefaultVariant({ ...defaultVariant, condition: e.target.value })} />
                        <Input placeholder="Giá bán sau giảm" value={defaultVariant.priceAfterDiscount} disabled />
                    </div>

                    <h2 className="text-lg font-semibold">Biến thể khác</h2>
                    {variants.map((variant, index) => (
                        <div key={index} className="grid grid-cols-4 gap-2 items-center">
                            <Input placeholder="Dung lượng" value={variant.storage} onChange={(e) => handleVariantChange(index, "storage", e.target.value)} />
                            <Input placeholder="Màu sắc" value={variant.color} onChange={(e) => handleVariantChange(index, "color", e.target.value)} />
                            <Input placeholder="Giá" value={variant.price} onChange={(e) => handleVariantChange(index, "price", e.target.value)} />
                            <Input placeholder="Giảm giá (%)" value={variant.discount} onChange={(e) => handleVariantChange(index, "discount", e.target.value)} />
                            <Input placeholder="Số lượng tồn kho" value={variant.quantity} onChange={(e) => handleVariantChange(index, "quantity", e.target.value)} />
                            <Input placeholder="Tình trạng" value={variant.condition} onChange={(e) => handleVariantChange(index, "condition", e.target.value)} />
                            <Input placeholder="Giá bán sau giảm" value={variant.priceAfterDiscount} disabled />
                            <Button icon={<MdDeleteForever />} className="text-red-500" onClick={() => handleRemoveVariant(index)} type="text" />
                        </div>
                    ))}
                    <button className="text-blue-500 mt-2" onClick={handleAddVariant}>+ Thêm biến thể khác</button>
                </div>

                <div className="space-y-3">
                    <h2 className="text-lg font-semibold">Thông số kỹ thuật (không bắt buộc)</h2>
                    <div className="max-h-96 overflow-y-auto space-y-4">
                        <Input placeholder="Hệ điều hành" value={specifications.operatingSystem}
                               onChange={(e) => setSpecifications({ ...specifications, operatingSystem: e.target.value })} />
                        <Input placeholder="cpu xử lý" value={specifications.cpu}
                               onChange={(e) => setSpecifications({ ...specifications, cpu: e.target.value })} />
                        <Input placeholder="cpu đồ họa" value={specifications.gpu}
                               onChange={(e) => setSpecifications({ ...specifications, gpu: e.target.value })} />
                        <Input placeholder="RAM" value={specifications.ram}
                               onChange={(e) => setSpecifications({ ...specifications, ram: e.target.value })} />
                        <Input placeholder="Dung lượng lưu trữ" value={specifications.storage}
                               onChange={(e) => setSpecifications({ ...specifications, storage: e.target.value })} />
                        <Input placeholder="Dung lượng còn lại" value={specifications.availableStorage}
                               onChange={(e) => setSpecifications({ ...specifications, availableStorage: e.target.value })} />
                        <Input placeholder="Độ phân giải camera sau" value={specifications.rearCameraResolution}
                               onChange={(e) => setSpecifications({ ...specifications, rearCameraResolution: e.target.value })} />
                        <Input placeholder="Quay phim camera sau" value={specifications.rearCameraVideo}
                               onChange={(e) => setSpecifications({ ...specifications, rearCameraVideo: e.target.value })} />
                        <Input placeholder="Đèn flash camera sau" value={specifications.rearCameraFlash}
                               onChange={(e) => setSpecifications({ ...specifications, rearCameraFlash: e.target.value })} />
                        <Input placeholder="Tính năng camera sau" value={specifications.rearCameraFeatures}
                               onChange={(e) => setSpecifications({ ...specifications, rearCameraFeatures: e.target.value })} />
                        <Input placeholder="Độ phân giải camera trước" value={specifications.frontCameraResolution}
                               onChange={(e) => setSpecifications({ ...specifications, frontCameraResolution: e.target.value })} />
                        <Input placeholder="Tính năng camera trước" value={specifications.frontCameraFeatures}
                               onChange={(e) => setSpecifications({ ...specifications, frontCameraFeatures: e.target.value })} />
                        <Input placeholder="Công nghệ màn hình" value={specifications.screenTechnology}
                               onChange={(e) => setSpecifications({ ...specifications, screenTechnology: e.target.value })} />
                        <Input placeholder="Độ phân giải màn hình" value={specifications.screenResolution}
                               onChange={(e) => setSpecifications({ ...specifications, screenResolution: e.target.value })} />
                        <Input placeholder="Màn hình rộng" value={specifications.screenSize}
                               onChange={(e) => setSpecifications({ ...specifications, screenSize: e.target.value })} />
                        <Input placeholder="Độ sáng tối đa" value={specifications.maxBrightness}
                               onChange={(e) => setSpecifications({ ...specifications, maxBrightness: e.target.value })} />
                        <Input placeholder="Mặt kính cảm ứng" value={specifications.touchGlass}
                               onChange={(e) => setSpecifications({ ...specifications, touchGlass: e.target.value })} />
                        <Input placeholder="Dung lượng pin" value={specifications.batteryCapacity}
                               onChange={(e) => setSpecifications({ ...specifications, batteryCapacity: e.target.value })} />
                        <Input placeholder="Loại pin" value={specifications.batteryType}
                               onChange={(e) => setSpecifications({ ...specifications, batteryType: e.target.value })} />
                        <Input placeholder="Hỗ trợ sạc tối đa" value={specifications.maxChargingSupport}
                               onChange={(e) => setSpecifications({ ...specifications, maxChargingSupport: e.target.value })} />
                        <Input placeholder="Công nghệ pin" value={specifications.batteryTechnology}
                               onChange={(e) => setSpecifications({ ...specifications, batteryTechnology: e.target.value })} />
                        <Input placeholder="Bảo mật nâng cao" value={specifications.advancedSecurity}
                               onChange={(e) => setSpecifications({ ...specifications, advancedSecurity: e.target.value })} />
                        <Input placeholder="Tính năng đặc biệt" value={specifications.specialFeatures}
                               onChange={(e) => setSpecifications({ ...specifications, specialFeatures: e.target.value })} />
                        <Input placeholder="Kháng nước, bụi" value={specifications.waterResistance}
                               onChange={(e) => setSpecifications({ ...specifications, waterResistance: e.target.value })} />
                        <Input placeholder="Mạng di động" value={specifications.mobileNetwork}
                               onChange={(e) => setSpecifications({ ...specifications, mobileNetwork: e.target.value })} />
                        <Input placeholder="SIM" value={specifications.sim}
                               onChange={(e) => setSpecifications({ ...specifications, sim: e.target.value })} />
                        <Input placeholder="Wifi" value={specifications.wifi}
                               onChange={(e) => setSpecifications({ ...specifications, wifi: e.target.value })} />
                        <Input placeholder="GPS" value={specifications.gps}
                               onChange={(e) => setSpecifications({ ...specifications, gps: e.target.value })} />
                        <Input placeholder="Bluetooth" value={specifications.bluetooth}
                               onChange={(e) => setSpecifications({ ...specifications, bluetooth: e.target.value })} />
                        <Input placeholder="Cổng kết nối/ sạc" value={specifications.chargingPort}
                               onChange={(e) => setSpecifications({ ...specifications, chargingPort: e.target.value })} />
                        <Input placeholder="Jack tai nghe" value={specifications.headphoneJack}
                               onChange={(e) => setSpecifications({ ...specifications, headphoneJack: e.target.value })} />
                        <Input placeholder="Kết nối khác (NFC, v.v.)" value={specifications.otherConnections}
                               onChange={(e) => setSpecifications({ ...specifications, otherConnections: e.target.value })} />
                        <Input placeholder="Thiết kế" value={specifications.design}
                               onChange={(e) => setSpecifications({ ...specifications, design: e.target.value })} />
                        <Input placeholder="Chất liệu" value={specifications.material}
                               onChange={(e) => setSpecifications({ ...specifications, material: e.target.value })} />
                        <Input placeholder="Kích thước" value={specifications.dimensions}
                               onChange={(e) => setSpecifications({ ...specifications, dimensions: e.target.value })} />
                        <Input placeholder="Khối lượng" value={specifications.weight}
                               onChange={(e) => setSpecifications({ ...specifications, weight: e.target.value })} />
                        <Input placeholder="Thời điểm ra mắt" value={specifications.releaseDate}
                               onChange={(e) => setSpecifications({ ...specifications, releaseDate: e.target.value })} />
                    </div>
                </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleSubmit}>Cập nhật sản phẩm</button>
        </div>
    );
};

export default UpdateProduct;
