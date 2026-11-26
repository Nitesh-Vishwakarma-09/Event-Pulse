
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { Link, useNavigate } from 'react-router-dom';

import {
    FaTicketAlt,
    FaTimesCircle,
    FaCalendarAlt,
    FaCheckCircle,
    FaClock,
    FaTimes,
    FaArrowRight,
    FaMapMarkerAlt,
    FaWallet,
    FaUserCircle,
    FaCompass,
    FaSyncAlt
} from 'react-icons/fa';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        fetchBookings();
    }, [user, navigate]);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/bookings/my');
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings', error);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            setCancellingId(id);
            await api.delete(`/bookings/${id}`);
            await fetchBookings();
        } catch (error) {
            alert(error.response?.data?.message || 'Error cancelling booking');
        } finally {
            setCancellingId(null);
        }
    };

    const stats = {
        total: bookings.length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        pending: bookings.filter(b => b.status === 'pending').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length
    };

    const formatDate = (date) => {
        if (!date) return 'Date unavailable';

        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

            case 'cancelled':
                return 'bg-red-500/10 text-red-400 border-red-500/20';

            case 'pending':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20';

            default:
                return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    const getPaymentStyle = (status) => {
        return status === 'paid'
            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
            : 'bg-white/5 text-gray-400 border-white/10';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#080e1c] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-medium">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#080e1c] text-white px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="absolute top-96 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto">

                {/* Welcome Section */}
                <div className="bg-[#111a2c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                        <div className="flex items-center gap-5">

                            {/* Avatar */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-extrabold uppercase shadow-lg shadow-indigo-500/20 shrink-0">
                                {user?.name?.charAt(0) || <FaUserCircle />}
                            </div>

                            <div>
                                <p className="text-indigo-400 text-sm font-semibold mb-1">
                                    USER DASHBOARD
                                </p>

                                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                                    Welcome back, {user?.name || 'User'}!
                                </h1>

                                <p className="text-gray-400 mt-2 text-sm">
                                    Manage your bookings and explore upcoming events.
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:scale-105 transition-all shadow-lg shadow-indigo-500/20"
                        >
                            <FaCompass />
                            Explore Events
                        </Link>

                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">

                    {/* Total */}
                    <div className="bg-[#111a2c] border border-white/10 rounded-2xl p-5 hover:border-indigo-500/30 transition">
                        <div className="flex justify-between items-center mb-4">
                            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                <FaTicketAlt className="text-indigo-400 text-xl" />
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm">Total Bookings</p>
                        <h2 className="text-3xl font-extrabold text-white mt-1">
                            {stats.total}
                        </h2>
                    </div>

                    {/* Confirmed */}
                    <div className="bg-[#111a2c] border border-white/10 rounded-2xl p-5 hover:border-emerald-500/30 transition">
                        <div className="flex justify-between items-center mb-4">
                            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                <FaCheckCircle className="text-emerald-400 text-xl" />
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm">Confirmed</p>
                        <h2 className="text-3xl font-extrabold text-emerald-400 mt-1">
                            {stats.confirmed}
                        </h2>
                    </div>

                    {/* Pending */}
                    <div className="bg-[#111a2c] border border-white/10 rounded-2xl p-5 hover:border-amber-500/30 transition">
                        <div className="flex justify-between items-center mb-4">
                            <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                <FaClock className="text-amber-400 text-xl" />
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm">Pending</p>
                        <h2 className="text-3xl font-extrabold text-amber-400 mt-1">
                            {stats.pending}
                        </h2>
                    </div>

                    {/* Cancelled */}
                    <div className="bg-[#111a2c] border border-white/10 rounded-2xl p-5 hover:border-red-500/30 transition">
                        <div className="flex justify-between items-center mb-4">
                            <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center">
                                <FaTimesCircle className="text-red-400 text-xl" />
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm">Cancelled</p>
                        <h2 className="text-3xl font-extrabold text-red-400 mt-1">
                            {stats.cancelled}
                        </h2>
                    </div>

                </div>

                {/* Bookings Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

                    <div>
                        <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
                            <FaTicketAlt className="text-indigo-400" />
                            My Bookings
                        </h2>

                        <p className="text-gray-400 text-sm mt-2">
                            Track and manage your event reservations.
                        </p>
                    </div>

                    <button
                        onClick={fetchBookings}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-gray-300 transition"
                    >
                        <FaSyncAlt />
                        Refresh
                    </button>

                </div>

                {/* Empty State */}
                {bookings.length === 0 ? (
                    <div className="bg-[#111a2c]/80 border border-white/10 rounded-3xl p-10 sm:p-16 text-center">

                        <div className="w-24 h-24 bg-indigo-500/10 border border-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <FaTicketAlt className="text-indigo-400 text-4xl" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3">
                            No bookings yet
                        </h3>

                        <p className="text-gray-400 max-w-md mx-auto mb-8">
                            You haven't booked any events yet. Discover exciting experiences and reserve your spot today!
                        </p>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-500 to-purple-600 px-7 py-3.5 rounded-xl text-white font-bold hover:scale-105 transition shadow-lg shadow-indigo-500/20"
                        >
                            Browse Events
                            <FaArrowRight />
                        </Link>

                    </div>
                ) : (

                    /* Booking Cards */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {bookings.map((booking) => (

                            <div
                                key={booking._id}
                                className="group bg-[#111a2c]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >

                                {/* Card Top */}
                                <div className="p-6 flex grow">

                                    {booking.eventId ? (
                                        <>
                                            {/* Title + Status */}
                                            <div className="flex items-start justify-between gap-3 mb-5">

                                                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-indigo-300 transition-colors">
                                                    {booking.eventId.title}
                                                </h3>

                                                <span className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border ${getStatusStyle(booking.status)}`}>
                                                    {booking.status}
                                                </span>

                                            </div>

                                            {/* Event Details */}
                                            <div className="space-y-3 text-sm">

                                                <div className="flex items-center gap-3 text-gray-400">
                                                    <FaCalendarAlt className="text-indigo-400 shrink-0" />
                                                    <span>
                                                        {formatDate(booking.eventId.date)}
                                                    </span>
                                                </div>

                                                {booking.eventId.location && (
                                                    <div className="flex items-center gap-3 text-gray-400">
                                                        <FaMapMarkerAlt className="text-indigo-400 shrink-0" />
                                                        <span className="line-clamp-1">
                                                            {booking.eventId.location}
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-3 text-gray-400">
                                                    <FaWallet className="text-indigo-400 shrink-0" />
                                                    <span>
                                                        Amount: <strong className="text-white">
                                                            {booking.amount === 0 ? 'Free' : `₹${booking.amount}`}
                                                        </strong>
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-3 text-gray-400">
                                                    <FaClock className="text-indigo-400 shrink-0" />
                                                    <span>
                                                        Booked on {formatDate(booking.bookedAt)}
                                                    </span>
                                                </div>

                                            </div>

                                            {/* Payment Status */}
                                            {booking.status !== 'cancelled' && (
                                                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">

                                                    <span className="text-xs text-gray-500">
                                                        Payment Status
                                                    </span>

                                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getPaymentStyle(booking.paymentStatus)}`}>
                                                        {(booking.paymentStatus || 'unpaid').replace(/_/g, ' ')}
                                                    </span>

                                                </div>
                                            )}

                                        </>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <FaTimes className="text-red-400 text-3xl mx-auto mb-3" />
                                            <p className="text-red-400 font-semibold">
                                                Event unavailable
                                            </p>
                                            <p className="text-gray-500 text-sm mt-2">
                                                This event may have been deleted.
                                            </p>
                                        </div>
                                    )}

                                </div>

                                {/* Card Footer */}
                                <div className="p-4 bg-[#0b1323]/80 border-t border-white/5 flex items-center justify-between gap-3">

                                    {booking.eventId && booking.status !== 'cancelled' ? (
                                        <>
                                            <Link
                                                to={`/events/${booking.eventId._id}`}
                                                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors"
                                            >
                                                View Event
                                                <FaArrowRight className="text-xs" />
                                            </Link>

                                            <button
                                                onClick={() => cancelBooking(booking._id)}
                                                disabled={cancellingId === booking._id}
                                                className="flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold text-sm transition-colors disabled:opacity-50"
                                            >
                                                {cancellingId === booking._id ? (
                                                    <>
                                                        <span className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></span>
                                                        Cancelling...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaTimesCircle />
                                                        Cancel Booking
                                                    </>
                                                )}
                                            </button>
                                        </>
                                    ) : (
                                        <div className="w-full flex items-center justify-center gap-2 text-gray-500 text-sm">
                                            <FaTimesCircle />
                                            {booking.status === 'cancelled' ? 'Booking Cancelled' : 'Event unavailable'}
                                        </div>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>
        </div>
    );
};

export default UserDashboard;
