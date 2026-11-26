
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('./models/userModel');
const Event = require('./models/eventModel');
const Booking = require('./models/bookingModel');

dotenv.config();

// ================= USERS =================

const users = [
    {
        name: 'Admin User',
        email: 'admin@eventpulse.com',
        password: 'password123',
        role: 'admin'
    },
    {
        name: 'Demo User',
        email: 'user@eventpulse.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Rahul Sharma',
        email: 'rahul@eventpulse.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Priya Verma',
        email: 'priya@eventpulse.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Aman Gupta',
        email: 'aman@eventpulse.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Sneha Patel',
        email: 'sneha@eventpulse.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Arjun Singh',
        email: 'arjun@eventpulse.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Kavya Joshi',
        email: 'kavya@eventpulse.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Rohit Mehta',
        email: 'rohit@eventpulse.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Ananya Das',
        email: 'ananya@eventpulse.com',
        password: 'password123',
        role: 'user'
    }
];

// ================= EVENTS =================

const events = [
    {
        title: 'Full Stack Developer Conference 2026',
        description: 'Join developers, tech leaders and industry experts for a full day of learning about modern web technologies, AI, cloud computing and software development.',
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        location: 'Indore Convention Centre, Indore',
        category: 'Technology',
        totalSeats: 200,
        ticketPrice: 499,
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Music & Beats Festival',
        description: 'Experience an unforgettable evening filled with live music, energetic performances, DJs and amazing vibes.',
        date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        location: 'Phoenix Citadel, Indore',
        category: 'Music',
        totalSeats: 500,
        ticketPrice: 999,
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Startup & Entrepreneurship Summit',
        description: 'Connect with startup founders, entrepreneurs, investors and innovators. Discover new opportunities and learn how to build successful businesses.',
        date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        location: 'Brilliant Convention Centre, Indore',
        category: 'Business',
        totalSeats: 150,
        ticketPrice: 799,
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Photography & Art Exhibition',
        description: 'Explore beautiful photography, creative artwork and contemporary designs from talented artists.',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        location: 'Art Gallery, Indore',
        category: 'Art',
        totalSeats: 300,
        ticketPrice: 199,
        image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'AI & Future Technology Meetup',
        description: 'Explore artificial intelligence, machine learning, generative AI and the future of technology with developers and experts.',
        date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        location: 'Super Corridor, Indore',
        category: 'Technology',
        totalSeats: 100,
        ticketPrice: 299,
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Fitness & Marathon Challenge',
        description: 'Participate in an exciting fitness challenge featuring running, wellness activities and fitness sessions for everyone.',
        date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        location: 'Nehru Stadium, Indore',
        category: 'Sports',
        totalSeats: 250,
        ticketPrice: 149,
        image: 'https://images.unsplash.com/photo-1530549387789-4c8b6f9e1e8b?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Free JavaScript Workshop',
        description: 'A beginner-friendly JavaScript workshop covering fundamentals, DOM manipulation, APIs and practical coding exercises.',
        date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        location: 'IT Park, Indore',
        category: 'Education',
        totalSeats: 80,
        ticketPrice: 0,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'New Year Networking Party',
        description: 'Meet new people, enjoy music, food, networking activities and celebrate with an amazing community.',
        date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        location: 'The Grand Bhagwati, Indore',
        category: 'Social',
        totalSeats: 400,
        ticketPrice: 1299,
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80'
    }
];

// ================= SEED DATABASE =================

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('✅ MongoDB Connected');

        // Clear old data
        await Booking.deleteMany({});
        await Event.deleteMany({});
        await User.deleteMany({});

        console.log('🗑️ Old data cleared');

        // Hash passwords
        const salt = await bcrypt.genSalt(10);

        const hashedUsers = await Promise.all(
            users.map(async (user) => ({
                ...user,
                password: await bcrypt.hash(user.password, salt),
                isVerified: true
            }))
        );

        // Create users
        const createdUsers = await User.insertMany(hashedUsers);

        const admin = createdUsers.find(user => user.role === 'admin');

        const normalUsers = createdUsers.filter(
            user => user.role === 'user'
        );

        console.log(`👤 ${createdUsers.length} users created`);

        // Create events
        const eventData = events.map(event => ({
            ...event,
            availableSeats: event.totalSeats,
            createdBy: admin._id
        }));

        const createdEvents = await Event.insertMany(eventData);

        console.log(`🎉 ${createdEvents.length} events created`);

        // ================= BOOKINGS =================

        const bookingsData = [];

        for (const event of createdEvents) {
            // 3-6 bookings per event
            const bookingCount = Math.floor(Math.random() * 4) + 3;

            const shuffledUsers = [...normalUsers].sort(
                () => Math.random() - 0.5
            );

            const selectedUsers = shuffledUsers.slice(0, bookingCount);

            for (const user of selectedUsers) {
                const statuses = ['pending', 'confirmed', 'cancelled'];

                const status =
                    statuses[Math.floor(Math.random() * statuses.length)];

                let paymentStatus = 'not_paid';

                if (event.ticketPrice === 0) {
                    paymentStatus = 'paid';
                } else if (status === 'confirmed') {
                    paymentStatus = Math.random() > 0.1 ? 'paid' : 'not_paid';
                } else if (status === 'cancelled') {
                    paymentStatus = Math.random() > 0.5 ? 'paid' : 'not_paid';
                }

                bookingsData.push({
                    userId: user._id,
                    eventId: event._id,
                    status,
                    paymentStatus,
                    amount: event.ticketPrice
                });

                // Reduce seats only for confirmed bookings
                if (status === 'confirmed') {
                    event.availableSeats -= 1;
                }
            }

            await event.save();
        }

        await Booking.insertMany(bookingsData);

        console.log(`🎫 ${bookingsData.length} bookings created`);

        // ================= SUCCESS =================

        console.log('\n=================================');
        console.log('🚀 EVENTPULSE SEEDED SUCCESSFULLY');
        console.log('=================================');
        console.log('Admin: admin@eventpulse.com');
        console.log('User:  user@eventpulse.com');
        console.log('Password: password123');
        console.log('=================================\n');

        await mongoose.connection.close();

        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding Error:', error);

        await mongoose.connection.close();

        process.exit(1);
    }
};

seedDatabase();
