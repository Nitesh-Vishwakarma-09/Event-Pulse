
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

import {
    FaTicketAlt,
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaArrowRight,
    FaShieldAlt,
    FaCheckCircle,
    FaKey
} from 'react-icons/fa';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!showOTP) {
                await register(name, email, password);
                setShowOTP(true);
            } else {
                await verifyOTP(email, otp);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(typeof err === 'string' ? err : err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-screen min-h-screen bg-[#080e1c] flex items-center justify-center px-4 py-12 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Register Card */}
            <div className="relative w-full max-w-lg">

                <div className="bg-[#111a2c]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-7 sm:p-10">

                    {/* Logo */}
                    <div className="flex justify-center mb-7">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                                <FaTicketAlt className="text-white text-xl" />
                            </div>
                            <span className="text-2xl font-extrabold text-white">
                                Event<span className="text-indigo-400">Pulse</span>
                            </span>
                        </Link>
                    </div>

                    {/* Heading */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 px-4 py-2 rounded-full text-xs font-semibold mb-5">
                            <FaShieldAlt />
                            {showOTP ? 'Account Verification' : 'JOIN THE COMMUNITY'}
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                            {showOTP ? 'Verify Your Email' : 'Create Account'}
                        </h1>

                        <p className="text-gray-400 text-sm sm:text-base">
                            {showOTP
                                ? 'One last step! Enter the verification code sent to your email.'
                                : 'Discover amazing events and create unforgettable memories.'}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {!showOTP ? (
                            <>
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Full Name
                                    </label>

                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            required
                                            autoComplete="name"
                                            className="w-full bg-[#0b1323] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Email Address
                                    </label>

                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            required
                                            autoComplete="email"
                                            className="w-full bg-[#0b1323] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Password
                                    </label>

                                    <div className="relative">
                                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Create a strong password"
                                            required
                                            autoComplete="new-password"
                                            className="w-full bg-[#0b1323] border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder-gray-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-400 transition"
                                            aria-label="Toggle password visibility"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* OTP Message */}
                                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-3 items-start">
                                    <FaCheckCircle className="text-emerald-400 text-xl mt-0.5 shrink-0" />

                                    <div>
                                        <p className="text-emerald-300 font-semibold text-sm">
                                            Verification email sent!
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            Please check your inbox for the 6-digit OTP.
                                        </p>
                                        <p className="text-gray-300 text-xs mt-2 break-all">
                                            {email}
                                        </p>
                                    </div>
                                </div>

                                {/* OTP Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-3 text-center">
                                        Enter Verification Code
                                    </label>

                                    <div className="relative">
                                        <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]{6}"
                                            placeholder="000000"
                                            required
                                            maxLength={6}
                                            autoComplete="one-time-code"
                                            className="w-full bg-[#0b1323] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-600 text-center text-2xl font-bold tracking-[12px] outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                        />
                                    </div>

                                    <p className="text-gray-500 text-xs text-center mt-3">
                                        Enter the 6-digit code received in your email.
                                    </p>
                                </div>
                            </>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    {showOTP ? 'Verify & Complete' : 'Create My Account'}
                                    <FaArrowRight />
                                </>
                            )}
                        </button>

                    </form>

                    {/* Login Link */}
                    {!showOTP && (
                        <p className="text-center text-gray-400 text-sm mt-8">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                    )}

                    {showOTP && (
                        <button
                            type="button"
                            onClick={() => {
                                setShowOTP(false);
                                setOtp('');
                                setError('');
                            }}
                            className="block mx-auto mt-6 text-sm text-gray-400 hover:text-white transition"
                        >
                            ← Back to registration
                        </button>
                    )}

                </div>

                {/* Footer */}
                <p className="text-center text-gray-600 text-xs mt-6">
                    © {new Date().getFullYear()} EventPulse. All rights reserved.
                </p>

            </div>
        </div>
    );
};

export default Register;
