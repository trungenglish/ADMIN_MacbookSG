import {useEffect, useState} from 'react';
import {getAllUserAPI} from "../service/api/userApi.js";
import TableUser from "../components/User/TableUser.jsx";
import CreateUserModalControl from "../components/User/CreateUser.Modal.Control.jsx";
import SearchBar from "../components/share/SearchBar.jsx";
import {Spin} from "antd";

const UserPage = () => {
    const [appLoading, setAppLoading] = useState(false);
    const [dataUsers, setDataUsers] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const filterData = dataUsers.filter((user) => {
        console.log('res1', user)
        return (
            user.name.toLowerCase().includes(searchData.toLowerCase()) ||
            user.email.toLowerCase().includes(searchData.toLowerCase()) ||
            user.phone.includes(searchData)
        )
    })

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        setAppLoading(true);
        const res = await getAllUserAPI();
        console.log('res', res)
        if (res && res.EC === 0) {
            setDataUsers(res.data);
        }else {
            setDataUsers([]);
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
            }
        </>

    )
}

export default UserPage;