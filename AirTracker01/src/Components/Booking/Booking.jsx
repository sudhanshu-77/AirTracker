import React, { useState } from 'react';

const Booking = () => {
  const [passengers, setPassengers] = useState([{ title: '', firstName: '', middleName: '', lastName: '', dob: '', mobileNo: '', aadharCard: '', type: '' }]);

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

  const handleProceedToPayment = () => {
    // Redirect to payment gateway
  };

  return (
    <div className="bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center py-4">Booking Page</h1>
      {passengers.map((passenger, index) => (
        <div key={index} className="shadow-md rounded-md p-4 mb-4 bg-gray-700">
          <h2 className="text-xl font-bold mb-2 text-white">Passenger {index + 1}</h2>
          <div className="flex mb-2">
            <select
              className="border border-gray-300 rounded p-2 mr-2"
              value={passenger.title}
              onChange={(e) => handlePassengerChange(index, 'title', e.target.value)}
            >
              <option value="">Title</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
            </select>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 mr-2"
              placeholder="First Name"
              value={passenger.firstName}
              onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
            />
            <input
              type="text"
              className="border border-gray-300 rounded p-2 mr-2"
              placeholder="Middle Name"
              value={passenger.middleName}
              onChange={(e) => handlePassengerChange(index, 'middleName', e.target.value)}
            />
            <input
              type="text"
              className="border border-gray-300 rounded p-2"
              placeholder="Last Name"
              value={passenger.lastName}
              onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
            />
          </div>
          <div className="flex mb-2">
            <select
              className="border border-gray-300 rounded p-2 mr-2"
              value={passenger.type}
              onChange={(e) => handlePassengerTypeChange(index, e.target.value)}
            >
              <option value="">Passenger Type</option>
              <option value="Adult">Adult</option>
              <option value="Child">Child</option>
              <option value="Infant">Infant</option>
            </select>
            <input
              type="date"
              className="border border-gray-300 rounded p-2"
              placeholder="Date of Birth"
              value={passenger.dob}
              onChange={(e) => handlePassengerChange(index, 'dob', e.target.value)}
            />
          </div>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 mb-2"
            placeholder="Mobile No"
            value={passenger.mobileNo}
            onChange={(e) => handlePassengerChange(index, 'mobileNo', e.target.value)}
            disabled={passenger.type === 'Child' || passenger.type === 'Infant'} // Disable mobile number for child and infant passengers
          />
          <input
            type="text"
            className="border border-gray-300 rounded p-2 mb-2 ml-2"
            placeholder="Aadhar Card"
            value={passenger.aadharCard}
            onChange={(e) => handlePassengerChange(index, 'aadharCard', e.target.value)}
            disabled={passenger.type === 'Infant'} // Disable Aadhar card for infant passengers
          />
          <button className="bg-red-500 text-white py-2 px-4 rounded ml-2" onClick={() => handleDeletePassenger(index)}>
            Delete Passenger
          </button>
        </div>
      ))}
      <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded " onClick={handleAddPassenger}>
        Add Passenger
      </button>
      <button className="bg-green-500 hover:bg-green-600  text-white py-2 px-4 rounded mt-4" onClick={handleProceedToPayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default Booking;