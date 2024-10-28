import {Input, Modal, notification} from "antd";
import {updateCategoryAPI} from "../../service/api/categoryApi.js";
import {useEffect, useState} from "react";

const UpdateCategoryModalControl = (props) => {
    const {isModalUpdateOpen, setIsModalUpdateOpen, fetchAllCategory, dataUpdate, setDataUpdate} = props;
    const [name, setName] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        if (dataUpdate) {
            setName(dataUpdate.name);
            setId(dataUpdate._id);
        }
    }, [dataUpdate]);

    const handleSubmitBtn = async () => {
        const res = await updateCategoryAPI(id, name);
        if (res.data) {
            notification.success({
                message: "Cập nhật danh mục",
                description: "Cập nhật danh mục thành công"
            })
            resetAndCloseModal()
            await fetchAllCategory()
        }else {
            notification.error({
                message: "Lỗi cập nhật danh mục",
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
            title="Chỉnh sửa thông tin danh mục"
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
                    <label className="block text-gray-700 font-medium mb-1">Tên danh mục </label>
                    <Input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateCategoryModalControl