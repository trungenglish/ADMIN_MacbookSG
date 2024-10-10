import { CiEdit } from "react-icons/ci";
import { ImBin } from "react-icons/im";

const UserTable = (props) => {
    const {dataUsers} = props;

    return (
        <table className="min-w-full bg-white border border-gray-200 w-full">
            <thead>
            <tr className="bg-blue-200 border-b border-gray-200">
                <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">STT</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap hidden md:table-cell">Name</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Email</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap hidden md:table-cell">Phone</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold whitespace-nowrap">Action</th>
                {/* Căn giữa tiêu đề */}
            </tr>
            </thead>
            <tbody>
            {dataUsers && dataUsers.length > 0 ? (
                dataUsers.map((user, index) => (
                    <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-4 text-sm">{index + 1}</td>
                        <td className="py-2 px-4 text-sm hidden md:table-cell">{user.name}</td>
                        <td className="py-2 px-4 text-sm break-words w-0">{user.email}</td>
                        <td className="py-2 px-4 text-sm hidden md:table-cell">{user.phone}</td>
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
                        No users available.
                    </td>
                </tr>
            )}
            </tbody>
        </table>

    )
}

export default UserTable