const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `Booking Confirmed: ${eventTitle}`,
            html: `
        <h2>Hi ${userName}!</h2>
        <p>Your booking for the event <strong>${eventTitle}</strong> is successfully confirmed.</p>
        <p>Thank you for choosing EventPulse.</p>
      `
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to', userEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};



const sendOtpEmail = async (userEmail, otp, type) => {
    try {

        const title = type === 'account_verification' ? 'Verify your EventPulse Account' : 'EventPulse Booking Verification';
        const msg = type === 'account_verification'
            ? 'Please use the following OTP to verify your new EventPulse account.'
            : 'Please use the following OTP to verify and confirm your event booking.';



        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: title,
            html: `
<div style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: Arial, Helvetica, sans-serif;">

    <div style="padding: 40px 15px;">

        <div style="max-width: 480px; margin: auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background: #0f172a; padding: 30px 20px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 1px;">
                    ${title}
                </h1>
                <p style="margin: 10px 0 0; color: #cbd5e1; font-size: 14px;">
                    Secure Verification
                </p>
            </div>

            <!-- Body -->
            <div style="padding: 35px 25px; text-align: center;">

                <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 25px;">
                    ${msg}
                </p>

                <!-- OTP Box -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 22px 15px; margin: 20px 0;">

                    <p style="margin: 0 0 10px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">
                        Your Verification Code
                    </p>

                    <div style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 8px;">
                        ${otp}
                    </div>

                </div>

                <!-- Expiry -->
                <div style="margin-top: 25px; padding: 12px; background: #fff7ed; border-radius: 8px; border: 1px solid #fed7aa;">

                    <p style="margin: 0; color: #c2410c; font-size: 13px;">
                        ⏰ This OTP expires in <strong>5 minutes</strong>.
                    </p>

                </div>

                <p style="color: #94a3b8; font-size: 12px; line-height: 1.6; margin-top: 25px;">
                    If you didn't request this verification code, you can safely ignore this email. Never share this code with anyone.
                </p>

            </div>

            <!-- Footer -->
            <div style="background: #f8fafc; padding: 18px; text-align: center; border-top: 1px solid #e2e8f0;">

                <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                    &copy; ${new Date().getFullYear()} | Automated Security Email
                </p>

            </div>

        </div>

    </div>

</div>
`
        };
        await transporter.sendMail(mailOptions);
        console.log(`OTP Sent to Email ${userEmail} for ${type}`)
    }
    catch (error) {
        console.error(`Error sending OTP email to ${userEmail} for ${type} `, error);

    }
}

module.exports = { sendOtpEmail };