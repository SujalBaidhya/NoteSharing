// src/components/LoginForm.jsx
import React, { useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const LoginForm = ({ onSuccess,onCancel }) => {
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.post("/login", formData);
            setUser(res.data.user);
            onSuccess?.();
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 border-gray-300"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 border-gray-300"
                required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3">
    <button
        type="submit"
        disabled={loading}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
    >
        {loading ? "Logging in..." : "Log In"}
    </button>

    <button
        type="button"
        onClick={onCancel}
        className="flex-1 border border-gray-300 rounded-lg py-2 px-6 hover:bg-gray-100 font-semibold"
    >
        Cancel
    </button>
</div>
        </form>
    );
};

export default LoginForm;