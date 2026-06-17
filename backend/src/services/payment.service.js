const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

/**
 * Mocks creating a payment intent or processing a card transaction
 */
exports.processMockPayment = async ({ userId, bookingId, amount }) => {
  const transactionId = 'txn_' + Math.random().toString(36).substring(2, 15);
  
  // Create payment record
  const payment = await Payment.create({
    user: userId,
    booking: bookingId,
    amount,
    transactionId,
    status: 'success',
  });

  // Update booking status
  await Booking.findByIdAndUpdate(bookingId, {
    paymentStatus: 'paid',
    status: 'confirmed',
    meetingLink: `https://meet.jit.si/careersaathi_${bookingId}`
  });

  return payment;
};
