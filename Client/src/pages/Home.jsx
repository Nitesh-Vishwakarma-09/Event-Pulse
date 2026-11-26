
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo1.png"
import api from '../utils/axios';
import { FaArrowUpRightFromSquare } from "react-icons/fa6"
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaSearch,
    FaRegClock,
    FaTicketAlt,
    FaShieldAlt,
    FaArrowRight,
    FaStar,
    FaBolt,
    FaUsers,
    FaCheckCircle,
    FaTimes
} from 'react-icons/fa';

const features = [
    {
        icon: <FaRegClock />,
        title: 'Quick & Easy Booking',
        description:
            'Book your favourite events in just a few clicks. No complicated process, just instant access.',
        number: '01'
    },
    {
        icon: <FaTicketAlt />,
        title: 'Digital Tickets',
        description:
            'Access your tickets anytime from your dashboard. Your next experience is always with you.',
        number: '02'
    },
    {
        icon: <FaShieldAlt />,
        title: 'Safe & Secure',
        description:
            'Enjoy a reliable booking experience with secure authentication and OTP verification.',
        number: '03'
    }
];

const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch events with debounce
    useEffect(() => {
        let active = true;

        const timeoutId = setTimeout(async () => {
            setLoading(true);

            try {
                const { data } = await api.get('/events', {
                    params: { search }
                });

                if (active) {
                    setEvents(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error('Error fetching events:', error);

                if (active) {
                    setEvents([]);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }, 400);

        return () => {
            active = false;
            clearTimeout(timeoutId);
        };
    }, [search]);

    const getSeatPercentage = (available, total) => {
        if (!total || total <= 0) return 0;

        return Math.min(
            100,
            Math.max(0, (available / total) * 100)
        );
    };

    const formatDate = (date) => {
        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return 'Date TBA';
        }

        return parsedDate.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-[#f8f9fc] text-gray-900">

            {/* HERO SECTION */}
            <section className="relative mx-3 mt-3 overflow-hidden rounded-[28px] bg-[#101014] sm:mx-6 sm:mt-5 lg:mx-10">

                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2400&auto=format&fit=crop')"
                    }}
                />

                <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-black/30" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                {/* Decorative glow */}
                <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-purple-600/20 blur-[100px]" />
                <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-blue-600/20 blur-[100px]" />

                <div className="relative z-10 flex min-h-135 flex-col justify-center px-6 py-20 sm:px-12 lg:min-h-screen lg:px-20">

                    <div className="mb-8 flex items-center gap-3">
                        <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-white backdrop-blur-md">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                            Discover. Experience. Celebrate.
                        </span>
                    </div>

                    <h1 className="max-w-4xl text-4xl font-black leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Every Event Has
                        <br />
                        A Story.
                        <br />
                        <span className="bg-linear-to-r from-purple-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
                            Find Yours.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-xl text-base leading-8 text-gray-300 sm:text-lg">
                        Discover concerts, tech conferences, workshops
                        and unforgettable experiences. Find your next
                        favourite event with EventPulse.
                    </p>

                    {/* Search */}
                    <div className="group mt-10 flex w-full max-w-2xl items-center rounded-2xl border border-white/20 bg-white p-2 shadow-2xl transition focus-within:border-purple-400">

                        <FaSearch className="ml-4 shrink-0 text-lg text-gray-400" />

                        <input
                            type="text"
                            placeholder="Search events, concerts, workshops..."
                            className="min-w-0 flex-1 border-none bg-transparent px-4 py-4 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-base"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="mr-2 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                                aria-label="Clear search"
                            >
                                <FaTimes />
                            </button>
                        )}

                        <button
                            onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                            className="hidden items-center gap-2 rounded-xl bg-gray-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-purple-700 sm:flex"
                        >
                            Explore <FaArrowRight />
                        </button>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-300">
                        <span className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-400" />
                            Easy Booking
                        </span>
                        <span className="flex items-center gap-2">
                            <FaShieldAlt className="text-purple-400" />
                            Secure Platform
                        </span>
                        <span className="flex items-center gap-2">
                            <FaTicketAlt className="text-pink-400" />
                            Digital Tickets
                        </span>
                    </div>
                </div>

                {/* Bottom decoration */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-purple-500 via-pink-500 to-orange-400" />
            </section>


            {/* FEATURES SECTION */}
            <section className="mx-4 mt-20 sm:mx-8 lg:mx-12">

                <div className="mb-10 text-center">
                    <span className="text-xs font-bold uppercase tracking-[3px] text-purple-600">
                        Why EventPulse
                    </span>

                    <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                        More Than Just Events
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                        Everything you need to discover, book and
                        experience the moments that matter.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={feature.number}
                            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <span className="absolute right-7 top-5 text-5xl font-black text-gray-100">
                                {feature.number}
                            </span>

                            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-indigo-600 text-xl text-white shadow-lg shadow-purple-200 transition group-hover:scale-110">
                                {feature.icon}
                            </div>

                            <h3 className="mb-3 text-xl font-bold text-gray-900">
                                {feature.title}
                            </h3>

                            <p className="text-sm leading-7 text-gray-500">
                                {feature.description}
                            </p>

                            <div className="mt-7 h-1 w-12 rounded-full bg-linear-to-r from-purple-600 to-pink-500 transition-all duration-300 group-hover:w-24" />
                        </div>
                    ))}
                </div>
            </section>


            {/* EVENTS SECTION */}
            <section id="events" className="mx-4 mb-20 mt-24 sm:mx-8 lg:mx-12">

                <div className="mb-10 flex flex-col justify-between gap-5 border-b border-gray-200 pb-7 sm:flex-row sm:items-end">

                    <div>
                        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-purple-600">
                            <FaBolt />
                            Don't Miss Out
                        </div>

                        <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                            {search ? 'Search Results' : 'Upcoming Events'}
                        </h2>

                        <p className="mt-3 text-sm text-gray-500">
                            Discover experiences worth remembering.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="rounded-full bg-purple-50 px-4 py-2 text-sm font-bold text-purple-700">
                            {events.length} Events Found
                        </span>
                    </div>
                </div>


                {/* LOADING STATE */}
                {loading ? (
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="animate-pulse overflow-hidden rounded-3xl border border-gray-100 bg-white"
                            >
                                <div className="h-56 bg-gray-200" />
                                <div className="space-y-4 p-6">
                                    <div className="h-3 w-1/4 rounded bg-gray-200" />
                                    <div className="h-6 w-3/4 rounded bg-gray-200" />
                                    <div className="h-3 w-1/2 rounded bg-gray-200" />
                                    <div className="h-10 rounded-xl bg-gray-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : events.length === 0 ? (

                    /* EMPTY STATE */
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-5 py-20 text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-50 text-3xl text-purple-500">
                            <FaCalendarAlt />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900">
                            No Events Found
                        </h3>

                        <p className="mt-3 text-sm text-gray-500">
                            {search
                                ? 'Try searching with a different event name.'
                                : 'There are no upcoming events available right now.'}
                        </p>

                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="mt-7 rounded-xl bg-gray-900 px-7 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>

                ) : (

                    /* EVENT CARDS */
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

                        {events.map((event) => {
                            const seatPercentage = getSeatPercentage(
                                event.availableSeats,
                                event.totalSeats
                            );

                            return (
                                <div
                                    key={event._id}
                                    className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                >

                                    {/* Event Image */}
                                    <div className="relative h-56 overflow-hidden bg-gray-200">

                                        {event.image ? (
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center bg-linear-to-br from-purple-100 to-indigo-100 text-3xl font-black text-purple-500">
                                                {event.category || 'EVENT'}
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                                        {/* Category */}
                                        <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                                            {event.category || 'Event'}
                                        </span>

                                        {/* Price */}
                                        <div className="absolute bottom-5 right-5 rounded-xl bg-white px-4 py-2 text-sm font-black text-gray-900 shadow-lg">
                                            {event.ticketPrice === 0
                                                ? <span className="text-green-600">FREE</span>
                                                : `₹${event.ticketPrice}`}
                                        </div>
                                    </div>


                                    {/* Card Content */}
                                    <div className="flex grow flex-col p-6">

                                        <h3 className="mb-5 line-clamp-2 text-xl font-extrabold text-gray-900 transition group-hover:text-purple-700">
                                            {event.title}
                                        </h3>

                                        {/* Date */}
                                        <div className="mb-4 flex items-center gap-3 text-sm text-gray-500">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                                <FaCalendarAlt />
                                            </div>

                                            <span>{formatDate(event.date)}</span>
                                        </div>

                                        {/* Location */}
                                        <div className="mb-6 flex items-center gap-3 text-sm text-gray-500">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                                                <FaMapMarkerAlt />
                                            </div>

                                            <span className="line-clamp-1">
                                                {event.location || 'Location TBA'}
                                            </span>
                                        </div>


                                        {/* Seats */}
                                        <div className="mt-auto border-t border-gray-100 pt-5">

                                            <div className="mb-3 flex items-center justify-between text-xs font-semibold">
                                                <span className="flex items-center gap-2 text-gray-500">
                                                    <FaUsers />
                                                    Available Seats
                                                </span>

                                                <span className="text-gray-900">
                                                    {event.availableSeats ?? 0} / {event.totalSeats ?? 0}
                                                </span>
                                            </div>

                                            <div className="mb-5 h-2 overflow-hidden rounded-full bg-gray-100">
                                                <div
                                                    className="h-full rounded-full bg-linear-to-r from-purple-600 to-pink-500 transition-all duration-500"
                                                    style={{
                                                        width: `${seatPercentage}%`
                                                    }}
                                                />
                                            </div>

                                            <Link
                                                to={`/events/${event._id}`}
                                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gray-900 py-4 text-sm font-bold text-white transition duration-300 hover:bg-purple-700"
                                            >
                                                Explore Event
                                                <FaArrowUpRightFromSquare className="transition group-hover:translate-x-1" />
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                )}
            </section>


            {/* CTA SECTION */}
            <section className="mx-3 mb-16 overflow-hidden rounded-3xl bg-linear-to-r from-purple-700 via-indigo-700 to-gray-900 px-6 py-16 text-center sm:mx-8 sm:px-12">

                <div className="mx-auto max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-[3px] text-purple-200">
                        Make Every Moment Count
                    </span>

                    <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-5xl">
                        Your Next Great Experience Starts Here.
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-purple-100 sm:text-base">
                        Explore exciting events, discover new experiences
                        and make memories that last forever.
                    </p>

                    <button
                        onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                        className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-sm font-bold text-purple-800 shadow-xl transition hover:-translate-y-1 hover:bg-purple-50"
                    >
                        Explore Events <FaArrowRight />
                    </button>
                </div>
            </section>


            {/* FOOTER */}
            <footer className="border-t border-gray-200 bg-white px-6 pb-8 pt-14 sm:px-10">

                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">

                    <div className="text-center md:text-left">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <div className="flex h-20 w-20 items-center justify-center rounded-xl  text-xl shadow-lg">
                                {/* <FaTicketAlt /> */}

                                <img
                                    src={logo}
                                    alt="EventPulse Logo"
                                    className="w-[55px] h-[55px] object-contain"
                                />

                            </div>

                            <span className="text-2xl font-black tracking-tight text-gray-900">
                                Event<span className="text-purple-600">Pulse</span>
                            </span>
                        </Link>

                        <p className="mt-4 max-w-sm text-sm leading-7 text-gray-500">
                            Discover. Book. Experience. Your destination
                            for unforgettable events and experiences.
                        </p>
                    </div>


                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500">
                        <Link to="/" className="transition hover:text-purple-600">
                            Home
                        </Link>

                        <a href="#events" className="transition hover:text-purple-600">
                            Explore Events
                        </a>
                    </div>
                </div>

                <div className="mx-auto mt-12 max-w-7xl border-t border-gray-100 pt-7 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} EventPulse. All rights reserved.
                    Built for unforgettable experiences.<br></br>  <br></br> <a href='https://niteshportfolio-chi.vercel.app/'>Created By Nitesh SE 💙</a>

                </div>
            </footer>

        </div>
    );
};

export default Home;
