
import React, { useState } from 'react';
import Img1 from "../Images/google.svg";
import Img2 from "../Images/github.svg";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import DefaultAvatar from "../Images/default-avatar.png";
import { useAuth } from "../context/AuthContext";
const AuthPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [profilePic, setProfilePic] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleImage = (e) => {
    if (e.target.files[0]) {
        setImageFile(e.target.files[0]);
        setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
    };
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!isLogin) {
            if (!formData.name) {
                newErrors.name = 'Name is required';
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {

        if (isLogin) {
            
            await axios.get(
                "/sanctum/csrf-cookie",
                
            );

            const response = await axios.post(
                "/login",
                {
                    email: formData.email,
                    password: formData.password
                },
                
            );
            setUser(response.data.user);
            navigate("/");

        } else {

            const data = new FormData();

            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append(
                "password_confirmation",
                formData.confirmPassword
            );

            if (imageFile) {
                data.append("profile_picture", imageFile);
            }

            const response = await axios.post(
                "http://127.0.0.1:8000/register",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert(response.data.message);

            // Switch back to login page
            setIsLogin(true);

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setImageFile(null);
            setProfilePic(null);
        }

    } catch (err) {

        if (err.response) {

            if (err.response.data.errors) {

                const validationErrors = {};

                Object.keys(err.response.data.errors).forEach((key) => {

                    if (key === "password_confirmation") {
                        validationErrors.confirmPassword =
                            err.response.data.errors[key][0];
                    } else {
                        validationErrors[key] =
                            err.response.data.errors[key][0];
                    }

                });

                setErrors(validationErrors);

            } else {

                alert(err.response.data.message);

            }

        } else {

            alert("Server not responding.");

            }

        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        // Reset form when switching
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setErrors({});
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-[400px]">
                <div className="relative">
                    <div className="absolute inset-0 h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    <div className="relative flex justify-center items-center h-24">
                        <h1 className="text-white text-2xl font-bold">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                    </div>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="flex flex-col items-center mb-6">

                            <img
                                src={profilePic || DefaultAvatar}
                                alt="Profile Preview"
                                className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow"
                            />

                            <label className="mt-4 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition">
                                Choose Profile Picture

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                    className="hidden"
                                />
                            </label>

                            <p className="text-sm text-gray-500 mt-2">
                                Only if you want to 😉
                            </p>

                        </div>
                    )}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className={`appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className={`appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {/* <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "HIDE" : "SHOW"}
                                </button> */}

                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        {!isLogin && (
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        className={`appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    {/* <button */}
                                    {/* // type="button" */}
                                    {/* // className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700" */}
                                    {/* // onClick={() => setShowConfirmPassword(!showConfirmPassword)}> */}
                                    {/* {showConfirmPassword ? "HIDE" : "SHOW"} */}
                                    {/* </button> */}
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                            </div>
                        )}

                        <div className="flex items-center justify-between mb-6">
                            {isLogin && (
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>
                            )}

                            {isLogin && (
                                <div className="text-sm">
                                    <button type="button" onClick={()=>navigate('/forgot-password')} 
                                    className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline transition duration-150"
                            >
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={toggleForm}
                                className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>

                    
                </div>
            </div>
        </div>
    );
};

export default AuthPage;