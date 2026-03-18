import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
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

  const toggleBlockUser = async (user) => {
    const confirmMsg = user.isBlocked ? "Unblock this user?" : "Block this user?";
    if (!window.confirm(confirmMsg)) return;
    try {
      await api.patch(`/admin/users/${user._id}/block`);
      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Action failed!");
    }
  };

  // ✅ Search + Status filter
  const filteredUsers = users.filter((user) => {
   
    const matchSearch =
      user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchText.toLowerCase());

    const matchStatus =
      filterStatus === "All" ||
      (filterStatus === "Active" && !user.isBlocked) ||
      (filterStatus === "Blocked" && user.isBlocked);
    return matchSearch && matchStatus;
  });

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

      {/* Top Gradient Bar — Search + Filter */}
      <div className="bg-linear-0 from-green-500 to-green-600
                      rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div>
            <p className="text-white font-bold text-base">Users List</p>
            <p className="text-green-100 text-xs mt-0.5">
              {users.length} registered users
            </p>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none
                       bg-white text-gray-700 placeholder-gray-400
                       border border-gray-200 w-full md:w-64
                       focus:border-green-400 transition md:ml-auto"
          />

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none
                       bg-white text-gray-700
                       border border-gray-200
                       focus:border-green-400 transition"
          >
            <option value="All">All Users</option>
            <option value="Active">🟢 Active</option>
            <option value="Blocked">🔴 Blocked</option>
          </select>

          <p className="text-white text-xs font-semibold whitespace-nowrap">
            {filteredUsers.length} users found
          </p>
        </div>
      </div>

      {/* Table */}
      {filteredUsers.length === 0 ? (
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
                                 text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id}
                    className="border-b hover:bg-green-50 transition">

                    <td className="px-4 py-3 text-sm text-gray-500">
                      {index + 1}
                    </td>

                    {/* Profile pic + Name */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full overflow-hidden
                                        flex items-center justify-center
                                        bg-green-100 shrink-0 border border-gray-200">
                          {user.profileImg ? (
                            <img
                              src={`http://localhost:5002${user.profileImg}`}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-green-700 font-bold text-sm">
                              {user.name?.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-gray-800">
                          {user.name}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.username}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.phone}
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${user.isBlocked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"}`}>
                        {user.isBlocked ? "🔴 Blocked" : "🟢 Active"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/users/${user._id}`)}
                          className="px-3 py-1.5 bg-blue-600 text-white
                                     rounded-lg text-xs font-semibold
                                     hover:bg-blue-700 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => toggleBlockUser(user)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition
                            ${user.isBlocked
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-red-500 text-white hover:bg-red-600"}`}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </div>
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