import {CiEdit} from "react-icons/ci";
import {ImBin} from "react-icons/im";
import SearchBar from "../share/SearchBar.jsx";
import {useState} from "react";

const ProductTable = (props) => {
    const {dataProducts} = props;
    const [searchData, setSearchData] = useState("");

    const filterData = dataProducts.filter((product) => {
        product.name.toLowerCase().includes(searchData.toLowerCase())
    })

    return (
        <div className="w-full bg-white p-4">
            <div className="flex justify-between items-center mb-4">
                <SearchBar
                    searchData={searchData}
                    setSearchData={setSearchData}
                    placeholder="Tìm kiếm sản phẩm theo tên"
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
            <table className="min-w-full bg-white border border-gray-200 w-full">
                <thead>
                <tr className="bg-blue-200 border-b border-gray-200">
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">STT</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Tên</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Hình ảnh</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Số lượng</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Giá gốc</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">% giảm</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Giá giảm</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Hành động</th>
                    {/* Căn giữa tiêu đề */}
                </tr>
                </thead>
                <tbody>
                {filterData && filterData.length > 0 ? (
                    filterData.map((product, index) => (
                        <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-2 px-4 text-sm">{index + 1}</td>
                            <td className="py-2 px-4 text-sm hidden md:table-cell">{product.name}</td>
                            <td className="py-2 px-4 text-sm break-words w-0">{product.email}</td>
                            <td className="py-2 px-4 text-sm hidden md:table-cell">{product.phone}</td>
                            <td className="py-2 px-4 text-sm flex items-center space-x-4"> {/* Căn giữa nội dung */}
                                <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
                                <CiEdit size={20}/>
                            </span>
                                <span className="text-red-500 hover:text-red-700 cursor-pointer">
                                <ImBin size={20}/>
                            </span>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-600">
                            Không có sản phẩm nào.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable;