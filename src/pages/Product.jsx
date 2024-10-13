import {useEffect, useState} from "react";
import {getAllProductAPI} from "../service/api/productApi.js";
import ProductTable from "../components/Product/ProductTable.jsx";

const ProductPage = () => {
    const [dataProducts, setDataProducts] = useState([]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            const res = await getAllProductAPI();
            if (res && res.EC === 0) {
                setDataProducts(res.data);
            } else {
                setDataProducts([]);
            }
        }
        fetchAllProducts();
    }, []);

    return (
        <ProductTable dataProducts={dataProducts}/>
    )
}

export default ProductPage;