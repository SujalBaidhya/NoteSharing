import { Link, useLocation } from "react-router-dom";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
const AdminHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post(
                "/logout",
                {},
            );
            navigate("/");

        } catch (error) {
            console.log(error);
        }
    };
    const navItems = [
        { label: "Dashboard", path: "/admin" },
        { label: "Notes", path: "/admin/notes" },
        { label: "Users", path: "/admin/users" },
    ];

    return (
        <header className="bg-gray-900 shadow text-white">
            <div className="container mx-auto flex justify-between items-center px-6 h-16">

                <h1 className="text-2xl font-bold">
                    NoteJS Admin
                </h1>

                <nav className="flex gap-8">

                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${
                                location.pathname === item.path
                                    ? "text-blue-400"
                                    : "hover:text-blue-300"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                </nav>

                <button onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded">
                    Logout
                </button>

            </div>
        </header>
    );
};

export default AdminHeader;