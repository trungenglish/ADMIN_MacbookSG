import {useEffect, useState} from "react";
import {getAllProductAPI} from "../service/api/productApi.js";
import TableProduct from "../components/Product/TableProduct.jsx";
import SearchBar from "../components/share/SearchBar.jsx";
import CreateProductModalControl from "../components/Product/CreateProduct.Modal.Control.jsx";

const ProductPage = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const filterData = dataProducts.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchData.toLowerCase())
        )
    })

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        const res = await getAllProductAPI();
        if (res && res.EC === 0) {
            setDataProducts(res.data);
        } else {
            setDataProducts([]);
        }
    }

    return (
        <>
            <div className="w-full bg-white p-4">
                <div className="flex justify-between items-center mb-4">
                    <SearchBar
                        searchData={searchData}
                        setSearchData={setSearchData}
                        placeholder="Tìm kiếm sản phẩm theo tên"
                    />
                    <button
                        className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700"
                        onClick={() => {
                            setIsModalCreateOpen(true)
                        }}
                    >
                        Tạo mới
                    </button>
                </div>

                <TableProduct
                    fetchAllProducts={fetchAllProducts}
                    dataProducts={dataProducts}
                    filterData={filterData}/>
            </div>
            <CreateProductModalControl
                fetchAllProducts={fetchAllProducts}
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}
            />
        </>
    )
}

export default ProductPage;