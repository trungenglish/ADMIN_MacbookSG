import SearchBar from "../components/share/SearchBar.jsx";
import TableProduct from "../components/Product/TableProduct.jsx";
import {useEffect, useState} from "react";
import {getAllProductAPI} from "../service/api/productApi.js";

const OrderPage = () => {
    const [dataOrders, setDataOrders] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const filterData = dataOrders.filter((order) => {
        return (
            order.name.toLowerCase().includes(searchData.toLowerCase())
        )
    })

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const fetchAllOrders = async () => {
        const res = await getAllProductAPI();
        if (res && res.EC === 0) {
            setDataOrders(res.data);
        } else {
            setDataOrders([]);
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
                    fetchAllOrders={fetchAllOrders}
                    dataOrders={dataOrders}
                    filterData={filterData}/>
            </div>
        </>
    )
}

export default OrderPage;