import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import axios from "../api/axios";
import { useLocation, useNavigate, Link } from "react-router-dom";

const NewPassword = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    const [formData, setFormData] = useState({
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.password_confirmation) {
            setError("Passwords do not match.");
            return;
        }

        if (loading) return; // guard against double-clicks while a request is in flight

        setLoading(true);
        try {
            const response = await axios.post("/resetpassword", {
                email,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
            });

            alert(response.data.message || "Password changed successfully.");
            navigate("/login");
        } catch (err) {
            if (err.response) {
                setError(err.response.data?.message || "Something went wrong.");
            } else if (err.request) {
                setError("Server not responding.");
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

                <div className="flex justify-center mb-5">
                    <div className="bg-blue-100 p-4 rounded-full">
                        <Lock className="text-blue-600" size={32} />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Create New Password
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Your OTP has been verified.
                    <br />
                    Create a strong new password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                className="w-full border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-4 top-3.5 text-gray-500"
                            >
                                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm text-center mt-2">
                                {error}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Remembered your password?
                    <Link
                        to="/login"
                        className="text-blue-600 font-medium hover:underline ml-1"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default NewPassword;