import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlane, faCreditCard, faUserFriends, faCloudSun } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner';
import { saveBooking } from '../../bookingService';
import TravelCompanion from '../TravelCompanion';
import WeatherInsights from '../WeatherInsights';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flight = location.state?.flight;
  
  const [passengers, setPassengers] = useState([{ 
    title: '', 
    firstName: '', 
    middleName: '', 
    lastName: '', 
    dob: '', 
    mobileNo: '', 
    aadharCard: '', 
    type: 'Adult' 
  }]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showTravelCompanion, setShowTravelCompanion] = useState(false);
  const [showWeatherInsights, setShowWeatherInsights] = useState(false);
  
  if (!flight) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg mb-4">No flight selected for booking.</p>
          <button 
            onClick={() => navigate('/result')}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            Back to Results
          </button>
        </div>
      </div>
    );
  }

  const handleAddPassenger = () => {
    setPassengers([...passengers, { title: '', firstName: '', middleName: '', lastName: '', dob: '', mobileNo: '', aadharCard: '', type: '' }]);
  };

  const handleDeletePassenger = (index) => {
    const updatedPassengers = [...passengers];
    updatedPassengers.splice(index, 1);
    setPassengers(updatedPassengers);
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handlePassengerTypeChange = (index, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index].type = value;

    if (value === 'Child' || value === 'Infant') {
      updatedPassengers[index].mobileNo = ''; // Remove mobile number for child and infant passengers
    }

    if (value === 'Infant') {
      updatedPassengers[index].aadharCard = ''; // Remove Aadhar card for infant passengers
    }

    setPassengers(updatedPassengers);
  };

  const validatePassenger = (passenger, index) => {
    const passengerErrors = {};
    if (!passenger.title) passengerErrors.title = 'Title is required';
    if (!passenger.firstName.trim()) passengerErrors.firstName = 'First name is required';
    if (!passenger.lastName.trim()) passengerErrors.lastName = 'Last name is required';
    if (!passenger.dob) passengerErrors.dob = 'Date of birth is required';
    if (!passenger.type) passengerErrors.type = 'Passenger type is required';
    
    if (passenger.type === 'Adult' && !passenger.mobileNo.trim()) {
      passengerErrors.mobileNo = 'Mobile number is required for adults';
    }
    
    if (passenger.mobileNo && !/^\d{10}$/.test(passenger.mobileNo)) {
      passengerErrors.mobileNo = 'Mobile number must be 10 digits';
    }
    
    if (passenger.aadharCard && !/^\d{12}$/.test(passenger.aadharCard)) {
      passengerErrors.aadharCard = 'Aadhar card must be 12 digits';
    }
    
    return passengerErrors;
  };

  const handleProceedToPayment = () => {
    const allErrors = {};
    passengers.forEach((passenger, index) => {
      const passengerErrors = validatePassenger(passenger, index);
      if (Object.keys(passengerErrors).length > 0) {
        allErrors[index] = passengerErrors;
      }
    });
    
    setErrors(allErrors);
    
    if (Object.keys(allErrors).length > 0) {
      toast.error('Please fix the errors in passenger details');
      return;
    }
    
    const userInfo = JSON.parse(localStorage.getItem('auth') || '{}');
    const bookingData = {
      userId: userInfo.user?.uid,
      userEmail: userInfo.user?.email,
      flight: {
        source: flight.departureAirportCode,
        destination: flight.arrivalAirportCode,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        date: flight.departureDateTime?.substring(0, 10),
        duration: flight.duration,
        airline: flight.airlineCodes,
        class: flight.segments?.[0]?.cabin || 'Economy'
      },
      passengers: passengers,
      totalPrice: totalPrice,
      bookingDate: new Date().toISOString()
    };
    
    navigate('/payment', { state: { bookingData } });
  };

  const totalPrice = flight.score * passengers.length;

  if (loading) {
    return <LoadingSpinner message="Processing your booking..." />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center py-6 text-gray-800">
          <FontAwesomeIcon icon={faPlane} className="mr-3 text-orange-600" />
          Complete Your Booking
        </h1>
        
        {/* Flight Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Flight Details</h2>
          
          {/* Airline Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-blue-800">{flight.airlineName}</p>
                <p className="text-sm text-blue-600">{flight.flightNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Flight Date</p>
                <p className="font-medium">{flight.date}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">From</p>
              <p className="font-bold text-lg">{flight.departureAirportCode}</p>
              <p className="text-sm">{flight.departureTime}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-bold">{flight.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">To</p>
              <p className="font-bold text-lg">{flight.arrivalAirportCode}</p>
              <p className="text-sm">{flight.arrivalTime}</p>
            </div>
          </div>
        </div>
        {/* Passenger Details */}
        <div className="space-y-6">
          {passengers.map((passenger, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-orange-600" />
                  Passenger {index + 1}
                </h2>
                {passengers.length > 1 && (
                  <button 
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm" 
                    onClick={() => handleDeletePassenger(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <select
                    className={`w-full border rounded p-2 ${errors[index]?.title ? 'border-red-500' : 'border-gray-300'}`}
                    value={passenger.title}
                    onChange={(e) => handlePassengerChange(index, 'title', e.target.value)}
                  >
                    <option value="">Select Title</option>
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Mrs">Mrs</option>
                  </select>
                  {errors[index]?.title && <p className="text-red-500 text-xs mt-1">{errors[index].title}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    className={`w-full border rounded p-2 ${errors[index]?.firstName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="First Name"
                    value={passenger.firstName}
                    onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                  />
                  {errors[index]?.firstName && <p className="text-red-500 text-xs mt-1">{errors[index].firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2"
                    placeholder="Middle Name (Optional)"
                    value={passenger.middleName}
                    onChange={(e) => handlePassengerChange(index, 'middleName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    className={`w-full border rounded p-2 ${errors[index]?.lastName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Last Name"
                    value={passenger.lastName}
                    onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                  />
                  {errors[index]?.lastName && <p className="text-red-500 text-xs mt-1">{errors[index].lastName}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passenger Type *</label>
                  <select
                    className={`w-full border rounded p-2 ${errors[index]?.type ? 'border-red-500' : 'border-gray-300'}`}
                    value={passenger.type}
                    onChange={(e) => handlePassengerTypeChange(index, e.target.value)}
                  >
                    <option value="Adult">Adult (12+ years)</option>
                    <option value="Child">Child (2-11 years)</option>
                    <option value="Infant">Infant (0-2 years)</option>
                  </select>
                  {errors[index]?.type && <p className="text-red-500 text-xs mt-1">{errors[index].type}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    className={`w-full border rounded p-2 ${errors[index]?.dob ? 'border-red-500' : 'border-gray-300'}`}
                    value={passenger.dob}
                    onChange={(e) => handlePassengerChange(index, 'dob', e.target.value)}
                  />
                  {errors[index]?.dob && <p className="text-red-500 text-xs mt-1">{errors[index].dob}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number {passenger.type === 'Adult' ? '*' : ''}
                  </label>
                  <input
                    type="text"
                    className={`w-full border rounded p-2 ${errors[index]?.mobileNo ? 'border-red-500' : 'border-gray-300'} ${passenger.type !== 'Adult' ? 'bg-gray-100' : ''}`}
                    placeholder="10-digit mobile number"
                    value={passenger.mobileNo}
                    onChange={(e) => handlePassengerChange(index, 'mobileNo', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    disabled={passenger.type === 'Child' || passenger.type === 'Infant'}
                  />
                  {errors[index]?.mobileNo && <p className="text-red-500 text-xs mt-1">{errors[index].mobileNo}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhar Card {passenger.type !== 'Infant' ? '(Optional)' : ''}
                  </label>
                  <input
                    type="text"
                    className={`w-full border rounded p-2 ${errors[index]?.aadharCard ? 'border-red-500' : 'border-gray-300'} ${passenger.type === 'Infant' ? 'bg-gray-100' : ''}`}
                    placeholder="12-digit Aadhar number"
                    value={passenger.aadharCard}
                    onChange={(e) => handlePassengerChange(index, 'aadharCard', e.target.value.replace(/\D/g, '').slice(0, 12))}
                    disabled={passenger.type === 'Infant'}
                  />
                  {errors[index]?.aadharCard && <p className="text-red-500 text-xs mt-1">{errors[index].aadharCard}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-6">
          <div className="flex gap-3">
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium" 
              onClick={handleAddPassenger}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Add Passenger
            </button>
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium" 
              onClick={() => setShowTravelCompanion(true)}
            >
              <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
              Group Booking
            </button>
            <button 
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium" 
              onClick={() => setShowWeatherInsights(true)}
            >
              <FontAwesomeIcon icon={faCloudSun} className="mr-2" />
              Weather Insights
            </button>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-2">
              Total for {passengers.length} passenger(s)
            </p>
            <p className="text-2xl font-bold text-green-600 mb-4">
              ₹{totalPrice.toLocaleString()}
            </p>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-bold text-lg" 
              onClick={handleProceedToPayment}
            >
              <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
              Proceed to Payment
            </button>
          </div>
        </div>
        
        {/* Travel Companion Modal */}
        <TravelCompanion 
          isOpen={showTravelCompanion}
          onClose={() => setShowTravelCompanion(false)}
          flightData={{
            source: flight.departureAirportCode,
            destination: flight.arrivalAirportCode,
            date: flight.departureDateTime?.substring(0, 10),
            time: flight.departureTime,
            price: flight.score
          }}
        />
        
        {/* Weather Insights Modal */}
        <WeatherInsights 
          isOpen={showWeatherInsights}
          onClose={() => setShowWeatherInsights(false)}
          destination={flight.arrivalAirportCode}
        />
      </div>
    </div>
  );
};

export default Booking;