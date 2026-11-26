const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const eventRoutes = require('./routes/event')
const bookingRoutes = require('./routes/booking')

dotenv.config();



const app = express();
app.use(cors())
app.use(express.json())

//ROutes
app.get('/', (req, res) => {
    res.send('EventPulse Backend is Running 🚀');
});
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/bookings', bookingRoutes)

//Connect To MongoDB

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected To MongoDB");
    })
    .catch((err) => {
        console.error("Error Connecting To MongoDB", err)
    })



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});


