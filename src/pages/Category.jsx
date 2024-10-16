import {useEffect, useState} from 'react';
import {getAllCategoryAPI} from "../service/api/categoryApi.js";
import CategoryTable from "../components/Category/TableCategory.jsx";
import SearchBar from "../components/share/SearchBar.jsx";
import CreateCategoryModalControl from "../components/Category/CreateCategory.Modal.Control.jsx";


const CategoryPage = () => {
    const [dataCategory, setDataCategory] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const filterData = dataCategory.filter((category) => {
        return (
            category.name.toLowerCase().includes(searchData.toLowerCase())
        )
    })

    useEffect(() => {
        fetchAllCategory();
    }, []);

    const fetchAllCategory = async () => {
        const res = await  getAllCategoryAPI();
        if (res && res.EC === 0) {
            setDataCategory(res.data);
        }else {
            setDataCategory([]);
        }
    }

    return (
        <>
            <div className="w-full bg-white p-4">
                <div className="flex justify-between items-center mb-4">
                    <SearchBar
                        searchData={searchData}
                        setSearchData={setSearchData}
                        placeholder="Tìm kiếm sản phẩm theo tên"
                    />
                    <button
                        className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700"
                        onClick={() => {setIsModalCreateOpen(true)}}
                    >
                        Tạo mới
                    </button>
                </div>

                <CategoryTable
                    fetchAllCategory={fetchAllCategory}
                    dataCategory={dataCategory}
                    filterData={filterData}/>
            </div>
            <CreateCategoryModalControl
                fetchAllCategory={fetchAllCategory}
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}
            />
        </>
    )
}

export default CategoryPage;