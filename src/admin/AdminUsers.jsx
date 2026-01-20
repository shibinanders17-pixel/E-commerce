import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className="min-h-screen p-3 sm:p-5 md:p-8 text-center
                bg-linear-to-l from-emerald-300 to-teal-400"
    >
      <h2
        className="text-2xl md:text-3xl font-extrabold text-purple-800
                   border-b-4 border-purple-800
                   inline-block pb-2 mb-6 md:mb-8"
      >
        Users List
      </h2>

      <div className="overflow-x-auto">
        <table
          className="min w-225 mx-auto bg-white
                     border-collapse
                     shadow-xl rounded-lg overflow-hidden"
        >
          <thead>
            <tr className="bg-purple-100">
              <th className="border px-3 py-2 md:px-4 md:py-3 text-sm md:text-base">S.No</th>
              <th className="border px-3 py-2 md:px-4 md:py-3 text-sm md:text-base">Name</th>
              <th className="border px-3 py-2 md:px-4 md:py-3 text-sm md:text-base">Email</th>
              <th className="border px-3 py-2 md:px-4 md:py-3 text-sm md:text-base">Phone</th>
              <th className="border px-3 py-2 md:px-4 md:py-3 text-sm md:text-base">Address</th>
              <th className="border px-3 py-2 md:px-4 md:py-3 text-sm md:text-base">Pincode</th>
              <th className="border px-3 py-2 md:px-4 md:py-3 text-sm md:text-base">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-6 text-gray-600 font-semibold"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-purple-50 transition"
                >
                  <td className="border px-4 py-2 text-sm md:text-base">
                    {index + 1}
                  </td>
                  <td className="border px-4 py-2 font-medium text-sm md:text-base">
                    👤 {user.name}
                  </td>
                  <td className="border px-4 py-2 text-sm md:text-base">
                    {user.email}
                  </td>
                  <td className="border px-4 py-2 text-sm md:text-base">
                    {user.phone}
                  </td>
                  <td className="border px-4 py-2 text-sm md:text-base">
                    {user.address}
                  </td>
                  <td className="border px-4 py-2 text-sm md:text-base">
                    {user.pincode}
                  </td>
                  <td className="border px-4 py-2 ">
                    <button
                      onClick={() =>
                        navigate(`/admin/users/${user.id}`)
                      }
                      className="px-4 py-1.5
                                 bg-blue-600 text-white
                                 rounded-md text-xs md:text-sm font-semibold
                                 hover:bg-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
