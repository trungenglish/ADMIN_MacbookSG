import {useState} from "react";
import {Input, Modal, notification, Select} from "antd";
import {createAdminAPI} from "../../service/api/authApi.js";

const CreateAdministratorModalControl = (props) => {
    const {isModalCreateOpen, setIsModalCreateOpen, fetchAllAdmin} = props;
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSubmitBtn = async () => {
        try {
            const res = await createAdminAPI(name, username, email, phone, password, role);
            console.log('check res', res)
            if (res && res.data) {
                notification.success({
                    message: "Tạo mới quản trị",
                    description: "Tạo mới quản trị thành công"
                })
                resetAndCloseModal();
                await fetchAllAdmin();
            } else {
                notification.error({
                    message: "Lỗi khi tạo mới quản trị",
                    description: JSON.stringify(res.EM)
                })
            }
        }catch(error) {
            notification.error({
                message: error.message,
                description: JSON.stringify(error.errors)
            });
        }

    }

    const resetAndCloseModal = () => {
        setIsModalCreateOpen(false);
        setName("");
    }

    return (
        <Modal
            title="Tạo mới quản trị viên"
            open={isModalCreateOpen}
            onOk={handleSubmitBtn}
            onCancel={resetAndCloseModal}
            cancelText="Hủy"
            maskClosable={false}
            okText="Lưu"
        >
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Phân quyền</label>
                    <Select
                        className="w-full"
                        value={role}
                        onChange={setRole}
                        placeholder="Chọn phân quyền"
                    >
                        <Select.Option value="quản trị">Quản trị</Select.Option>
                        <Select.Option value="quản lý tài chính">Quản lý tài chính</Select.Option>
                        <Select.Option value="hỗ trợ khách hàng">Hỗ trợ khách hàng</Select.Option>
                        {/* Thêm các tùy chọn khác nếu cần */}
                    </Select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Tên người dùng </label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Tài khoản người dùng</label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
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
    );
}

export default CreateAdministratorModalControl;