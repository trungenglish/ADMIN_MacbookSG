import {useEffect, useState} from 'react';
import TableAdministrator from "../components/Administrator/TableAdministrator.jsx";
import SearchBar from "../components/share/SearchBar.jsx";
import CreateAdministratorModalControl from "../components/Administrator/CreateAdministrator.Modal.Control.jsx";
import {getAllAdminAPI} from "../service/api/administratorApi.js";

const AdministratorPage = () => {
    const [dataAdministrator, setDataAdministrator] = useState([]);
    const {searchData, setSearchData} = useState("");
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const filterData = dataAdministrator.filter((administrator) => {
        administrator.name.toLowerCase().includes(searchData.toLowerCase()) ||
        administrator.username.toLowerCase().includes(searchData.toLowerCase()) ||
        administrator.email.toLowerCase().includes(searchData.toLowerCase()) ||
        administrator.phone.includes(searchData)
    })

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        const res = await  getAllAdminAPI();
        if (res && res.EC === 0) {
            setDataAdministrator(res.data);
        }else {
            setDataAdministrator([]);
        }
    }

    return (
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
                            // Điều hướng tới trang tạo mới
                            alert("Chuyển đến trang tạo mới người dùng");
                        }}
                    >
                        Tạo mới
                    </button>
                </div>

                <TableAdministrator
                    fetchAllUsers={fetchAllUsers}
                    dataAdministrator={dataAdministrator}
                    filterData={filterData}/>
            </div>
            <CreateAdministratorModalControl
                fetchAllUsers={fetchAllUsers}
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}
            />
        </>
    )
}

export default AdministratorPage;