import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveBooking } from '../bookingService';
import { generateTicketPDF } from '../pdfGenerator';
import LoadingSpinner from './LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMobile } from '@fortawesome/free-solid-svg-icons';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [upiId, setUpiId] = useState('');

  if (!bookingData) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>No booking data found</p>
        <button onClick={() => navigate('/')} className="bg-orange-600 text-white px-4 py-2 rounded">
          Go Home
        </button>
      </div>
    );
  }

  const handleRazorpayPayment = async () => {
    setLoading(true);
    
    const options = {
      key: 'rzp_test_9999999999',
      amount: bookingData.totalPrice * 100,
      currency: 'INR',
      name: 'AirTracker',
      description: `Flight Booking: ${bookingData.flight.source} to ${bookingData.flight.destination}`,
      handler: async function (response) {
        await processPaymentSuccess(response.razorpay_payment_id, 'razorpay');
      },
      prefill: {
        email: bookingData.userEmail,
        contact: bookingData.passengers[0]?.mobileNo || ''
      },
      theme: { color: '#ea580c' }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      toast.error('Payment failed. Please try again.');
      setLoading(false);
    });
    
    rzp.open();
    setLoading(false);
  };

  const handleUPIPayment = async () => {
    if (!upiId || !upiId.includes('@')) {
      toast.error('Please enter a valid UPI ID');
      return;
    }
    
    setLoading(true);
    
    // Simulate UPI payment processing
    setTimeout(async () => {
      const success = Math.random() > 0.1; // 90% success rate for demo
      
      if (success) {
        const mockTransactionId = 'UPI' + Date.now();
        await processPaymentSuccess(mockTransactionId, 'upi');
      } else {
        toast.error('UPI payment failed. Please try again.');
        setLoading(false);
      }
    }, 2000);
  };

  const processPaymentSuccess = async (paymentId, method) => {
    try {
      setLoading(true);
      
      const bookingId = await saveBooking({
        ...bookingData,
        paymentId,
        paymentMethod: method,
        status: 'confirmed'
      });

      const ticket = generateTicketPDF({ ...bookingData, id: bookingId });
      ticket.save(`flight-ticket-${bookingId}`);
      
      // Create boarding pass
      if (window.addBoardingPass && bookingData.flight) {
        window.addBoardingPass({
          flightNumber: bookingData.flight.flightNumber || 'AI101',
          airlineName: bookingData.flight.airlineName || 'Air India',
          departureAirportCode: bookingData.flight.source,
          arrivalAirportCode: bookingData.flight.destination,
          departureDateTime: bookingData.flight.date,
          departureTime: bookingData.flight.departureTime
        });
      }
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Payment successful! Booking ID: ${bookingId}. Boarding pass added to wallet!`);
      
      // Small delay before navigation
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
      
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      handleUPIPayment();
    }
  };

  const sendTicketEmail = async (email, pdfBlob, bookingId) => {
    // Simulate email sending (in real app, this would call your backend API)
    console.log(`Sending ticket to ${email} for booking ${bookingId}`);
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  if (loading) {
    return <LoadingSpinner message="Processing payment..." />;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Payment Summary</h1>
        
        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Flight Details</h2>
          <p>{bookingData.flight.source} → {bookingData.flight.destination}</p>
          <p>{bookingData.flight.date} | {bookingData.flight.departureTime}</p>
          <p>{bookingData.passengers.length} passenger(s)</p>
        </div>
        
        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Passengers</h2>
          {bookingData.passengers.map((passenger, index) => (
            <p key={index}>{passenger.title} {passenger.firstName} {passenger.lastName}</p>
          ))}
        </div>
        
        <div className="text-right mb-6">
          <p className="text-2xl font-bold text-green-600">
            Total: ₹{bookingData.totalPrice.toLocaleString()}
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
          
          <div className="space-y-3">
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-orange-600" />
              <span>Credit/Debit Card, Net Banking (Razorpay)</span>
            </label>
            
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <FontAwesomeIcon icon={faMobile} className="mr-2 text-orange-600" />
              <span>UPI Payment</span>
            </label>
          </div>
          
          {paymentMethod === 'upi' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter UPI ID
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@paytm"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
          )}
        </div>
        
        <button
          onClick={handlePayment}
          disabled={loading || (paymentMethod === 'upi' && !upiId)}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg"
        >
          {loading ? 'Processing...' : 
           paymentMethod === 'razorpay' ? 'Pay with Razorpay' : 'Pay with UPI'}
        </button>
      </div>
    </div>
  );
};

export default Payment;