
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from "../assets/logo1.png"
import {
    FaTicketAlt,
    FaBars,
    FaTimes,
    FaCalendarAlt,
    FaTachometerAlt,
    FaSignInAlt,
    FaUserPlus,
    FaSignOutAlt,
    FaUserCircle
} from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/login');
    };

    const closeMenu = () => setIsOpen(false);

    const linkStyle =
        "flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/5 px-4 py-2.5 rounded-xl";

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#0b1220]/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/10">

            <div className="max-w-7xl mx-auto px-5 lg:px-8">

                <div className="flex items-center justify-between h-20">

                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-13 h-13 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">

                            <img
                                src={logo}
                                alt="EventPulse Logo"
                                className="w-[45px] h-[45px] object-contain"
                            />

                            {/* <FaTicketAlt className="text-white text-xl" /> */}
                        </div>

                        <div className="flex flex-col">
                            <span className="text-white text-2xl font-extrabold tracking-tight">
                                Event<span className="text-indigo-400">Pulse</span>
                            </span>
                            <span className="text-gray-500 text-[10px] tracking-[3px] uppercase font-semibold">
                                Feel the Moment
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2">

                        <Link to="/" className={linkStyle}>
                            <FaCalendarAlt className="text-indigo-400" />
                            Events
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                    className={linkStyle}
                                >
                                    <FaTachometerAlt className="text-indigo-400" />
                                    Dashboard
                                </Link>

                                <div className="w-px h-8 bg-white/10 mx-2"></div>

                                <div className="flex items-center gap-2 text-gray-300 px-3">
                                    <FaUserCircle className="text-indigo-400 text-xl" />
                                    <span className="text-sm font-medium">
                                        {user.name || 'Account'}
                                    </span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 ml-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all duration-300"
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl transition-all duration-300"
                                >
                                    <FaSignInAlt />
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300"
                                >
                                    <FaUserPlus />
                                    Get Started
                                </Link>
                            </>
                        )}

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? (
                            <FaTimes className="text-xl" />
                        ) : (
                            <FaBars className="text-xl" />
                        )}
                    </button>

                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen
                        ? 'max-h-96 opacity-100 pb-5'
                        : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="flex flex-col gap-2 pt-3 border-t border-white/10">

                        <Link
                            to="/"
                            onClick={closeMenu}
                            className={linkStyle}
                        >
                            <FaCalendarAlt className="text-indigo-400" />
                            Events
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                    onClick={closeMenu}
                                    className={linkStyle}
                                >
                                    <FaTachometerAlt className="text-indigo-400" />
                                    Dashboard
                                </Link>

                                <div className="flex items-center gap-2 px-4 py-3 text-gray-400 text-sm">
                                    <FaUserCircle className="text-indigo-400 text-lg" />
                                    {user.name || 'My Account'}
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-left"
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className={linkStyle}
                                >
                                    <FaSignInAlt className="text-indigo-400" />
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="flex items-center justify-center gap-2 mt-2 px-5 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/20"
                                >
                                    <FaUserPlus />
                                    Get Started
                                </Link>
                            </>
                        )}

                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
