import {useEffect, useState} from 'react';
import {getAllUserAPI} from "../../service/api/userApi.js";
import UserTable from "../../components/User/UserTable.jsx";

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            const res = await  getAllUserAPI();
            if (res && res.EC === 0) {
                setDataUsers(res.data);
            }else {
                setDataUsers([]);
            }
        }
        fetchAllUsers();
    }, []);

    return (
        // <div className="container mx-auto p-4 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
        //     <div className="overflow-x-auto">
        //
        //     </div>
        // </div>
        <UserTable dataUsers={dataUsers}/>
    )
}

export default UserPage;