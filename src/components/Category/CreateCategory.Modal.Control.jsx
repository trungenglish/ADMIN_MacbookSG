import {Input, Modal, notification} from "antd";
import {useState} from "react";
import {createCategoryAPI} from "../../service/api/categoryApi.js";

const CreateCategoryModalControl = (props) => {
    const {isModalCreateOpen, setIsModalCreateOpen, fetchAllCategory} = props;
    const [name, setName] = useState("");

    const handleSubmitBtn = async () => {
        const res = await createCategoryAPI(name);
        if (res.cate) {
            notification.success({
                message: "Tạo mới danh mục",
                description: "Tạo mới danh mục thành công"
            })
            resetAndCloseModal();
            await fetchAllCategory();
        } else {
            notification.error({
                message: "Lỗi khi tạo mới danh mục",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalCreateOpen(false);
        setName("");
    }

    return (
        <Modal
            title="Tạo mới danh mục"
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
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default CreateCategoryModalControl;