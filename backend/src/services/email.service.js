const nodemailer = require('nodemailer');

// Helper to create transport
const createTransport = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  // Return null or simulated transport in development
  return null;
};

/**
 * Sends an OTP email to the user
 */
exports.sendOtpEmail = async (email, name, otp) => {
  const transporter = createTransport();
  const subject = 'CareerSaathi - Verify Your Account';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #4f46e5; text-align: center;">Welcome to CareerSaathi!</h2>
      <p>Hello <strong>${name}</strong>,</p>
      <p>Thank you for choosing CareerSaathi. Please verify your email address to get started on your career journey.</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1e1b4b; background: #e0e7ff; padding: 10px 20px; border-radius: 6px; border: 1px dashed #4f46e5;">
          ${otp}
        </span>
      </div>
      <p>This OTP will expire in 10 minutes. If you did not register for a CareerSaathi account, please ignore this email.</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;"/>
      <p style="font-size: 12px; color: #64748b; text-align: center;">© 2026 CareerSaathi. Your AI Partner for Career Success.</p>
    </div>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL || '"CareerSaathi" <noreply@careersaathi.in>',
        to: email,
        subject,
        html,
      });
      return true;
    } catch (e) {
      console.error("Failed to send OTP email: ", e.message);
      return false;
    }
  } else {
    console.log(`[EMAIL SIMULATION] Sent verification OTP (${otp}) to ${email}`);
    return true;
  }
};

/**
 * Sends a booking confirmation email
 */
exports.sendBookingConfirmation = async (email, name, mentorName, slot, link) => {
  const transporter = createTransport();
  const subject = 'CareerSaathi - Mentorship Session Confirmed';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #10b981; text-align: center;">Session Confirmed!</h2>
      <p>Hello <strong>${name}</strong>,</p>
      <p>Your mentorship session with <strong>${mentorName}</strong> has been successfully booked and confirmed.</p>
      <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981; margin: 20px 0;">
        <p style="margin: 4px 0;"><strong>Mentor:</strong> ${mentorName}</p>
        <p style="margin: 4px 0;"><strong>Slot:</strong> ${slot}</p>
        <p style="margin: 4px 0;"><strong>Meeting Link:</strong> <a href="${link || '#'}" style="color: #4f46e5; text-decoration: underline;">Join Video Call</a></p>
      </div>
      <p>Please make sure to join on time. If you need to reschedule or cancel, you can manage your bookings in your Student Dashboard.</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;"/>
      <p style="font-size: 12px; color: #64748b; text-align: center;">© 2026 CareerSaathi. Your AI Partner for Career Success.</p>
    </div>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL || '"CareerSaathi" <noreply@careersaathi.in>',
        to: email,
        subject,
        html,
      });
      return true;
    } catch (e) {
      console.error("Failed to send booking email: ", e.message);
      return false;
    }
  } else {
    console.log(`[EMAIL SIMULATION] Sent Booking Confirmation with ${mentorName} to ${email}`);
    return true;
  }
};
