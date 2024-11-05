import { useEffect, useState} from 'react';
import TableAdministrator from "../components/Administrator/TableAdministrator.jsx";
import SearchBar from "../components/share/SearchBar.jsx";
import CreateAdministratorModalControl from "../components/Administrator/CreateAdministrator.Modal.Control.jsx";
import {getAllAdminAPI} from "../service/api/administratorApi.js";
import {Spin} from "antd";

const AdministratorPage = () => {
    const [appLoading, setAppLoading] = useState(false);
    const [dataAdministrator, setDataAdministrator] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const filterData = dataAdministrator.filter((administrator) => {
        return (
            administrator.name.toLowerCase().includes(searchData.toLowerCase()) ||
            administrator.username.toLowerCase().includes(searchData.toLowerCase()) ||
            administrator.email.toLowerCase().includes(searchData.toLowerCase()) ||
            administrator.phone.includes(searchData)
        )
    })

    useEffect(() => {
        fetchAllAdmin();
    }, []);

    const fetchAllAdmin = async () => {
        setAppLoading(true);
        const res = await getAllAdminAPI();
        if (res && res.EC === 0) {
            setDataAdministrator(res.data);
        }else {
            setDataAdministrator([]);
        }
        setAppLoading(false);
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
                                placeholder="Tìm kiếm người dùng theo tên, email, sđt"
                            />
                            <button
                                className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700"
                                onClick={() => {
                                    setIsModalCreateOpen(true);
                                }}
                            >
                                Tạo mới
                            </button>
                        </div>

                        <TableAdministrator
                            fetchAllAdmin={fetchAllAdmin}
                            dataAdministrator={dataAdministrator}
                            filterData={filterData}/>
                    </div>
                    <CreateAdministratorModalControl
                        fetchAllAdmin={fetchAllAdmin}
                        isModalCreateOpen={isModalCreateOpen}
                        setIsModalCreateOpen={setIsModalCreateOpen}
                    />
                </>
            }

        </>

    )
}

export default AdministratorPage;