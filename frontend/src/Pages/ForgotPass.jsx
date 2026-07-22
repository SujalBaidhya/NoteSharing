import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate=useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
        const response = await axios.post("/forgot-password/otp", { email });
        navigate("/otp", {
            state: {
                email: email,
                type:'forgot-password'
            }
        });}
        catch(err){
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Forgot Password?
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Enter your email address and we'll send you a password reset link.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Send Otp
                    </button>

                </form>

                <div className="text-center mt-6">
                    <a
                        href="/login"
                        className="text-blue-600 hover:underline"
                    >
                        ← Back to Login
                    </a>
                </div>

            </div>
        </div>
    );
}