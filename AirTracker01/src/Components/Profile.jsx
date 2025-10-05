import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlane, faHistory, faSignOutAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserBookings } from '../bookingService';
import { generateTicketPDF } from '../pdfGenerator';

const Profile = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [userStats, setUserStats] = useState({
    totalBookings: 0,
    totalSpent: 0,
    favoriteDestination: 'N/A'
  });

  useEffect(() => {
    const loadBookings = async () => {
      const userInfo = JSON.parse(localStorage.getItem('auth') || '{}');
      if (userInfo.user?.uid) {
        try {
          const bookings = await getUserBookings(userInfo.user.uid);
          setBookingHistory(bookings);
          
          const totalBookings = bookings.length;
          const totalSpent = bookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
          const destinations = bookings.map(booking => booking.flight?.destination);
          const favoriteDestination = destinations.length > 0 
            ? destinations.reduce((a, b, i, arr) => 
                arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
              )
            : 'N/A';
          
          setUserStats({ totalBookings, totalSpent, favoriteDestination });
        } catch (error) {
          console.error('Error loading bookings:', error);
        }
      }
    };
    
    loadBookings();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const downloadTicket = (booking) => {
    try {
      const ticket = generateTicketPDF(booking);
      ticket.save(`flight-ticket-${booking.id}`);
      toast.success('Ticket downloaded successfully!');
    } catch (error) {
      console.error('Ticket generation error:', error);
      toast.error('Failed to download ticket');
    }
  };

  const userInfo = JSON.parse(localStorage.getItem('auth') || '{}');

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg mr-4 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="bg-orange-100 p-4 rounded-full mr-4">
              <FontAwesomeIcon icon={faUser} className="text-2xl text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
              <p className="text-gray-600">{userInfo.user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <FontAwesomeIcon icon={faPlane} className="text-2xl text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-blue-600">{userStats.totalBookings}</p>
            <p className="text-gray-600">Total Bookings</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-600">₹{userStats.totalSpent.toLocaleString()}</p>
            <p className="text-gray-600">Total Spent</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <p className="text-lg font-bold text-orange-600">{userStats.favoriteDestination}</p>
            <p className="text-gray-600">Favorite Destination</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FontAwesomeIcon icon={faHistory} className="mr-2 text-orange-600" />
          Booking History
        </h2>
        
        {bookingHistory.length === 0 ? (
          <div className="text-center py-8">
            <FontAwesomeIcon icon={faPlane} className="text-4xl text-gray-300 mb-4" />
            <p className="text-gray-600">No bookings yet. Start planning your next trip!</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
            >
              Search Flights
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookingHistory.map((booking, index) => (
              <div key={booking.id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg">{booking.flight?.source} → {booking.flight?.destination}</p>
                    <p className="text-gray-600">{booking.flight?.date}</p>
                    <p className="text-sm text-gray-500">{booking.passengers?.length} passenger(s)</p>
                    <p className="text-xs text-gray-400">Booking ID: {booking.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{booking.totalPrice?.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{booking.status || 'Confirmed'}</p>
                    <button
                      onClick={() => downloadTicket(booking)}
                      className="mt-2 bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700"
                    >
                      Download Ticket
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;