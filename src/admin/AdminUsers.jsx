// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// export default function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   const fetchUsers = () => {
//     api
//       .get("/users")
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const toggleBlockUser = async (user) => {
//     const confirmMsg = user.isBlocked? "Unblock this user?" : "Block this user?";

//     if (!window.confirm(confirmMsg)) return;

//     try {
//       await api.patch(`/users/${user.id}`, {
//         isBlocked: !user.isBlocked,
//       });
//       fetchUsers(); 
       
//       } catch (error) {
//       console.log(error);
//       alert("Action failed");
//     }
//   };

//   return (
//     <div className="min-h-screen p-3 sm:p-5 md:p-8 text-center bg-red-50">
//       <h2
//         className="text-2xl md:text-3xl font-extrabold text-purple-800
//                    border-b-4 border-purple-800
//                    inline-block pb-2 mb-6 md:mb-8"
//       >
//         Users List
//       </h2>

//       <div className="overflow-x-auto">
//         <table
//           className="min-w-275 mx-auto bg-white
//                      border-collapse shadow-xl
//                      rounded-lg overflow-hidden"
//         >
//           <thead>
//             <tr className="bg-purple-100">
//               <th className="border px-3 py-2">S.No</th>
//               <th className="border px-3 py-2">Name</th>
//               <th className="border px-3 py-2">Email</th>
//               <th className="border px-3 py-2">Phone</th>
//               <th className="border px-3 py-2">Address</th>
//               <th className="border px-3 py-2">Pincode</th>
//               <th className="border px-3 py-2">Status</th>
//               <th className="border px-3 py-2">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="py-6 text-gray-600 font-semibold">
//                   No users found
//                 </td>
//               </tr>
//             ) : (
//               users.map((user, index) => (
//                 <tr key={user.id} className="hover:bg-purple-50">
//                   <td className="border px-3 py-2"> {index + 1} </td>
//                   <td className="border px-3 py-2 font-medium">👤 {user.name} </td>
//                   <td className="border px-3 py-2"> {user.email} </td>
//                   <td className="border px-3 py-2"> {user.phone} </td>
//                   <td className="border px-3 py-2"> {user.address} </td>
//                   <td className="border px-3 py-2"> {user.pincode} </td>

//                   <td className="border px-3 py-2">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold
//                         ${
//                           user.isBlocked
//                             ? "bg-red-100 text-red-700"
//                             : "bg-green-100 text-green-700"
//                         }`}
//                     >
//                       {user.isBlocked ? "Blocked" : "Active"}
//                     </span>
//                   </td>

//                    <td className="border px-3 py-2 space-x-2">
//                     <button
//                       onClick={() => navigate(`/admin/users/${user.id}`)}
//                       className="px-3 py-1 bg-blue-600 text-white
//                                  rounded-md text-xs
//                                  hover:bg-blue-700"
//                     >
//                       View
//                     </button>

//                     <button
//                       onClick={() => toggleBlockUser(user)}
//                       className={`px-3 py-1 rounded-md text-xs font-semibold
//                         ${
//                           user.isBlocked
//                             ? "bg-green-600 text-white hover:bg-green-700"
//                             : "bg-red-600 text-white hover:bg-red-700"
//                         }`}
//                     >
//                       {user.isBlocked ? "Unblock" : "Block"}
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-12 h-12 border-4 border-blue-500
                        border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-7 bg-blue-600 rounded-full" />
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
      </div>

      {/* Top Gradient Bar */}
      <div className="bg-linear-0 from-green-500 to-green-600
                      rounded-2xl p-5 mb-6 shadow-sm
                      flex items-center justify-between">
        <div>
          <p className="text-white font-bold text-base">Users List</p>
          <p className="text-green-100 text-xs mt-0.5">
            {users.length} registered users
          </p>
        </div>
        <span className="text-4xl">👥</span>
      </div>

      {/* Table */}
      {users.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
          <p className="text-gray-400 text-lg">No users found!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">S.No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Address</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}
                    className="border-b hover:bg-green-50 transition">

                    <td className="px-4 py-3 text-sm text-gray-500">
                      {index + 1}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100
                                        flex items-center justify-center
                                        text-green-700 font-bold text-sm">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <p className="text-sm font-semibold text-gray-800">
                          {user.name}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.phone}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600 max-w-48 truncate">
                      {user.address}
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/admin/users/${user._id}`)}
                        className="px-3 py-1.5 bg-blue-600 text-white
                                   rounded-lg text-xs font-semibold
                                   hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
