const User = require('../models/userModel')
const OTP = require('../models/otp')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { sendOtpEmail } = require('../utils/email')

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// Register User

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    let userExist = await User.findOne({ email })
    if (userExist) {
        return res.status(400).json({ error: 'User Already Exists' })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);



    try {
        const user = await User.create({ name, email, password: hashedPassword, role: 'user', isVerified: false })

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`OTP For ${email}: ${otp}`);
        await OTP.create({ email, otp, action: 'account_verification' });
        await sendOtpEmail(email, otp, 'account_verification')
        res.status(201).json({
            message: "User Registered Sucessfully.Please Check your Email for OTP to Verfiy your Account. ",
            email: user.email
        });

    }
    catch (error) {
        res.status(400).json({
            error: error.message

        });
    }
}

// Login User

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: "Invaild Credentials Please sign up First" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: "Invaild Credentials" });
    }

    if (!user.isVerified && user.role === 'user') {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.deleteMany({ email, action: 'account_verification' }) // Remove Old OTP
        await OTP.create({ email, otp, action: 'account_verification' })
        await sendOtpEmail(email, otp, 'account_verification')
        return res.status(400).json({ error: 'Account not verified. A New OTP has been sent to your email..' })
    }
    res.json({
        message: "Login Successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
    })
}

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({ email, otp, action: 'account_verification' });

    if (!otpRecord) {
        return res.status(400).json({ error: "Invaild or Expired OTP" })
    }

    const user = await User.findOneAndUpdate({ email }, { isVerified: true })
    await OTP.deleteMany({ email, action: 'account_verification' }) // remove old OTPs
    res.json({
        message: 'Account Verified Successfully. You can Now login..',
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
    })
}
