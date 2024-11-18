import {useEffect, useState} from "react";
import {getAllProductAPI} from "../service/api/productApi.js";
import TableProduct from "../components/Product/TableProduct.jsx";
import SearchBar from "../components/share/SearchBar.jsx";
import {Spin} from "antd";
import {useNavigate} from "react-router-dom";

const ProductPage = () => {
    const navigate = useNavigate();
    const [appLoading, setAppLoading] = useState(false);
    const [dataProducts, setDataProducts] = useState([]);
    const [searchData, setSearchData] = useState("");
    // const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const filterData = dataProducts.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchData.toLowerCase())
        )
    })

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        setAppLoading(true)
        const res = await getAllProductAPI();
        if (res && res.EC === 0) {
            setDataProducts(res.data);
        } else {
            setDataProducts([]);
        }
        setAppLoading(false)
    }

    return (
        <>
            {appLoading === true ?
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}>
                    <Spin/>
                </div>
                :
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
                                    navigate("/main/create-product")
                                }}
                            >
                                Tạo mới
                            </button>
                        </div>

                        <TableProduct
                            fetchAllProducts={fetchAllProducts}
                            filterData={filterData}/>
                    </div>
                </>
            }
        </>

    )
}

export default ProductPage;