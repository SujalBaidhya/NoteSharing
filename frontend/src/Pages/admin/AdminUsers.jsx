import React, { useEffect,useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
      fetchUsers();
  }, []);
  const fetchUsers = async () => {
      try {
          const res = await axios.get("/admin/users");
          setUsers(res.data);
      } catch (err) {
          console.error(err);
      }
  };
  const deleteUser = async (id) => {
      const confirmDelete = window.confirm(
          "Are you sure you want to delete this user?"
      );

      if (!confirmDelete) return;

      try {
          await axios.delete(`/admin/users/${id}`);

          // Remove deleted user from state
          setUsers((prevUsers) =>
              prevUsers.filter((user) => user.id !== id)
          );
      } catch (err) {
          console.error(err);
          alert("Failed to delete user.");
      }
  };
  const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );
  const viewUser = async (id) => {
      try {
          const res = await axios.get(`/admin/users/${id}/notes`);
          setSelectedUser(res.data.user);
          setUserNotes(res.data.notes);
          setShowModal(true);

      } catch (err) {
          console.error(err);
      }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        Manage Users
      </h1>

      <input
        type="text"
        placeholder="Search users..."
        className="border px-4 py-3 rounded-lg mb-6 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>

              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Faculty</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                    <tr
                        key={user.id}
                        className="border-b hover:bg-gray-50"
                    >
                        <td className="p-4">
                            {user.name}
                        </td>

                        <td>{user.email}</td>

                        <td>{user.faculty || "N/A"}</td>

                        <td className="text-center space-x-2">
                            <button
                              onClick={()=>viewUser(user.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                            >
                                View
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/admin/notes", {
                                        state: {
                                            userId: user.id,
                                            userName: user.name,
                                        },
                                    })
                                }
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td
                        colSpan="4"
                        className="text-center py-6 text-gray-500"
                    >
                        No users found.
                    </td>
                </tr>
            )}
        </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminUsers;