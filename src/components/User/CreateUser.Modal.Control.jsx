import {Input, Modal, notification} from "antd";
import {useState} from "react";
import {createUserAPI} from "../../service/api/userApi.js";

const CreateUserModalControl = (props) => {
    const {fetchAllUsers, isModalCreateOpen, setIsModalCreateOpen} = props;
    const [fullName,setFullName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [city,setCity] = useState("")

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phoneNumber)

        if (res.data) {
            notification.success({
                message: "Create User",
                description: "Create User Success"
            })
            resetAndCloseModal()
            await fetchAllUsers()
        }else {
            notification.error({
                message: "Error Create User",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalCreateOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
    }

    return (
        <Modal
            title="Tạo mới người dùng"
            open={isModalCreateOpen}
            cancelText="Hủy"
            okText="Tạo mới"
            onOk={handleSubmitBtn}
            onCancel={resetAndCloseModal}
            maskClosable={false}
        >
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Tên</label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Số điện thoại</label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Thành phố</label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Mật khẩu</label>
                    <Input.Password
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default CreateUserModalControl;
