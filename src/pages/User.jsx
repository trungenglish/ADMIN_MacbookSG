import {useEffect, useState} from 'react';
import {getAllUserAPI} from "../service/api/userApi.js";
import TableUser from "../components/User/TableUser.jsx";
import CreateUserModalControl from "../components/User/CreateUser.Modal.Control.jsx";
import SearchBar from "../components/share/SearchBar.jsx";

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const filterData = dataUsers.filter((user) => {
        return (
            user.name.toLowerCase().includes(searchData.toLowerCase()) ||
            user.email.toLowerCase().includes(searchData.toLowerCase()) ||
            user.phone.includes(searchData)
        );
    })

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        const res = await  getAllUserAPI();
        if (res && res.EC === 0) {
            setDataUsers(res.data);
        }else {
            setDataUsers([]);
        }
    }



    return (
        <>
            <div className="w-full bg-white p-4">
                <div className="flex justify-between items-center mb-4">
                    <SearchBar
                        searchData={searchData}
                        setSearchData={setSearchData}
                        placeholder="Tìm kiếm người dùng theo tên, email, sđt"/>
                    <button
                        className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700"
                        onClick={() => setIsModalCreateOpen(true)}
                    >
                        Tạo mới
                    </button>
                </div>
                <TableUser
                    dataUsers={dataUsers}
                    filterData={filterData}
                    fetchAllUsers={fetchAllUsers}
                />
            </div>
            <CreateUserModalControl
                fetchAllUsers={fetchAllUsers}
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}
            />
        </>

    )
}

export default UserPage;