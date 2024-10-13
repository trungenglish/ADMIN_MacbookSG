import {Input, Modal, notification} from "antd";
import {useState} from "react";
import {updateUserAPI} from "../../service/api/userApi.js";

const UpdateUserModalControl = (props) => {
    const {setIsModalUpdateOpen, isModalUpdateOpen, fetchAllUsers, setDataUpdate, dataUpdate} = props;
    const [id,setId] = useState(dataUpdate?._id)
    const [fullName,setFullName] = useState(dataUpdate?.name)
    const [phoneNumber,setPhoneNumber] = useState(dataUpdate?.phone)
    const [city,setCity] = useState(dataUpdate?.city)

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phoneNumber, city)
        if (res.data) {
            notification.success({
                message: "Cập nhật nguời dùng",
                description: "Cập nhật danh mục thành công"
            })
            resetAndCloseModal()
            await fetchAllUsers()
        }else {
            notification.error({
                message: "Lỗi cập nhật người dùng",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
        setFullName("");
        setPhoneNumber("");
        setCity("");
        setDataUpdate(null);
    }

    return (
        <Modal
            title="Chỉnh sửa thông tin người dùng"
            open={isModalUpdateOpen}
            onOk={handleSubmitBtn}
            onCancel={resetAndCloseModal}
            cancelText="Hủy"
            maskClosable={false}
            okText="Lưu"
        >
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">ID</label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                        value={id}
                        disabled
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Họ và tên</label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
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
            </div>
        </Modal>
    )
}

export default UpdateUserModalControl;