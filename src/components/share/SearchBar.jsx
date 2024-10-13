const SearchBar = (props) => {
    const { searchData, setSearchData, placeholder } = props;

    return (
        <input
            type="text"
            placeholder={placeholder || "Tìm kiếm..."}
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
        />
    );
};


export default SearchBar;
