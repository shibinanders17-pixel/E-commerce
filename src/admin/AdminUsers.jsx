import { useNavigate } from "react-router-dom";
import "./AdminUsers.css";

export default function AdminUsers() {
  const navigate = useNavigate();

  // Fake users data (later API use panna replace pannalaam)
  const users = [
    {
      id: 1,
      name: "Shibin Anderson",
      email: "shibin@gmail.com",
      phone: "9876543210",
    },
    {
      id: 2,
      name: "Arun Kumar",
      email: "arun@gmail.com",
      phone: "9123456780",
    },
    {
      id: 3,
      name: "Vignesh",
      email: "vignesh@gmail.com",
      phone: "9988776655",
    },
  ];

  return (
    <div className="users-container">
      <h2 className="users-title">Users List</h2>

      <table className="users-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => navigate(`/admin/users/${user.id}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
