import {Input, Modal, notification, Select} from "antd";
import {useState} from "react";
import {updateAdminAPI} from "../../service/api/administratorApi.js";

const UpdateAdministratorModalControl = (props) => {
    const {isModalUpdateOpen, setIsModalUpdateOpen, fetchAllAdmin, dataUpdate, setDataUpdate} = props;
    const [name, setName] = useState(dataUpdate?.name);
    const [id, setId] = useState(dataUpdate?._id);
    const [role, setRole] = useState(dataUpdate?.role);
    const [phone, setPhone] = useState(dataUpdate?.phone);
    const [email, setEmail] = useState(dataUpdate?.email);

    const handleSubmitBtn = async () => {
        const res = await updateAdminAPI(id, role, name, email, phone);
        if (res.data) {
            notification.success({
                message: "Cập nhật tài khoản quản trị",
                description: "Cập nhật quản trị thành công"
            })
            resetAndCloseModal()
            await fetchAllUsers()
        }else {
            notification.error({
                message: "Lỗi cập nhật tài khoản quản trị",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
        setName("");
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
                    <label className="block text-gray-700 font-medium mb-1">Phân quyền</label>
                    <Select
                        className="w-full"
                        value={role}
                        onChange={setRole}
                        placeholder="Chọn phân quyền"
                    >
                        <Select.Option value="admin">Quản trị</Select.Option>
                        <Select.Option value="finance">Quản lý tài chính</Select.Option>
                        <Select.Option value="support">Hỗ trợ khách hàng</Select.Option>
                        {/* Thêm các tùy chọn khác nếu cần */}
                    </Select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Tên danh mục </label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
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
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateAdministratorModalControl;