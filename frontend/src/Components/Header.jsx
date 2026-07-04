import React, { useState } from 'react';

import Img3 from "../Images/logo.png";

import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();


    const navItems = [
        { id: 'home', label: 'Home', path: '/' },
        { id: 'hire', label: 'Notes', path: '/notes' },
        { id: 'blog', label: 'Upload', path: '/upload' },
        { id: 'about', label: 'About', path: '/about us' },
        { id: 'contact', label: 'Contact', path: '/contact' }
    ];

    return (
        <header className="bg-white shadow-md fixed top-0 w-full z-50">
            <div className="container mx-auto px-3 sm:px-6">
                <div className="flex justify-between items-center h-18">

                    <div className="flex-shrink-0 flex items-center">
                        <div className="h-20 w-20 flex items-center justify-center text-white font-bold mr-2">
                            <img src={Img3} />
                        </div>
                        <span className="text-xl font-bold text-gray-800">NoteJS</span>
                    </div>


                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                className="relative group"
                            >
                                <span className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${location.pathname === item.path
                                    ? 'text-blue-600'
                                    : 'text-gray-700 group-hover:text-blue-600'
                                    }`}>
                                    {item.label}
                                </span>


                                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${location.pathname === item.path ? 'w-full' : ''
                                    }`}></span>
                            </Link>
                        ))}
                    </nav>


                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="relative group px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200"
                        >
                            <span className="group-hover:text-blue-600">Log in</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        >
                            Sign up
                        </Link>
                    </div>


                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <span className="text-lg font-bold">
                                {isMenuOpen ? '✕' : '☰'}
                            </span>
                        </button>
                    </div>
                </div>


                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                            {navItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 relative group ${location.pathname === item.path
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <span>{item.label}</span>
                                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${location.pathname === item.path ? 'w-full' : ''
                                        }`}></span>
                                </Link>
                            ))}
                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200 relative group"
                                >
                                    <span>Log in</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 mt-2 transition-colors duration-200 shadow-sm hover:shadow-md"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;