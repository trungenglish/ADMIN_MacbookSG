import SearchBar from "../components/share/SearchBar.jsx";
import {useEffect, useState} from "react";
import {Spin} from "antd";
import {getAllOrderAPI} from "../service/api/orderApi.js";
import TableOrder from "../components/Order/TableOrder.jsx";

const OrderPage = () => {
    const [appLoading, setAppLoading] = useState(false);
    const [dataOrders, setDataOrders] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const filterData = dataOrders.filter((order) => {
        return (
            order.idUser.name.toLowerCase().includes(searchData.toLowerCase())
        )
    })

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const fetchAllOrders = async () => {
        const res = await getAllOrderAPI();
        console.log("res", res);
        if (res && res.EC === 0) {
            setDataOrders(res.data);
        } else {
            setDataOrders([]);
        }
    }

    console.log("dataOrders", dataOrders);

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
                                placeholder="Tìm kiếm đơn hàng theo sdt"
                            />
                        </div>

                        <TableOrder
                            fetchAllOrders={fetchAllOrders}
                            dataOrders={dataOrders}
                            filterData={filterData}/>
                    </div>
                </>
            }
        </>

    )
}

export default OrderPage;