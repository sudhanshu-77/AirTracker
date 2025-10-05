import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRoute, 
  faPlus, 
  faTimes, 
  faPlane,
  faMapMarkerAlt,
  faClock,
  faCalendarAlt,
  faExchangeAlt,
  faDollarSign,
  faCogs,
  faTimeline,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const MultiCityPlanner = ({ isOpen, onClose }) => {
  const [cities, setCities] = useState([
    { id: 1, city: '', date: '', isOrigin: true },
    { id: 2, city: '', date: '', isOrigin: false }
  ]);
  const [optimizeFor, setOptimizeFor] = useState('cost');
  const [tripTimeline, setTripTimeline] = useState([]);
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [totalDuration, setTotalDuration] = useState('');
  const [loading, setLoading] = useState(false);

  const popularCities = [
    'New York (JFK)', 'Los Angeles (LAX)', 'London (LHR)', 'Paris (CDG)',
    'Tokyo (NRT)', 'Dubai (DXB)', 'Singapore (SIN)', 'Delhi (DEL)',
    'Mumbai (BOM)', 'Bangkok (BKK)', 'Sydney (SYD)', 'Amsterdam (AMS)'
  ];

  const addCity = () => {
    const newCity = {
      id: Date.now(),
      city: '',
      date: '',
      isOrigin: false
    };
    setCities([...cities, newCity]);
  };

  const removeCity = (id) => {
    if (cities.length > 2) {
      setCities(cities.filter(city => city.id !== id));
    }
  };

  const updateCity = (id, field, value) => {
    setCities(cities.map(city => 
      city.id === id ? { ...city, [field]: value } : city
    ));
  };

  const generateMockFlightData = (from, to, date) => {
    const airlines = ['Emirates', 'Qatar Airways', 'Singapore Airlines', 'Lufthansa', 'British Airways'];
    const basePrice = Math.floor(Math.random() * 800) + 200;
    const duration = Math.floor(Math.random() * 8) + 2;
    
    return {
      from: from.split('(')[0].trim(),
      to: to.split('(')[0].trim(),
      fromCode: from.match(/\(([^)]+)\)/)?.[1] || 'XXX',
      toCode: to.match(/\(([^)]+)\)/)?.[1] || 'XXX',
      date,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      flightNumber: `${['EK', 'QR', 'SQ', 'LH', 'BA'][Math.floor(Math.random() * 5)]}${Math.floor(Math.random() * 900) + 100}`,
      price: basePrice,
      duration: `${duration}h ${Math.floor(Math.random() * 60)}m`,
      departureTime: `${Math.floor(Math.random() * 12) + 6}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      arrivalTime: `${Math.floor(Math.random() * 12) + 12}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      layover: Math.random() > 0.6 ? `${Math.floor(Math.random() * 4) + 1}h ${Math.floor(Math.random() * 60)}m` : null
    };
  };

  const optimizeRoute = async () => {
    const validCities = cities.filter(city => city.city && city.date);
    
    if (validCities.length < 2) {
      toast.error('Please add at least 2 cities with dates');
      return;
    }

    setLoading(true);
    
    // Simulate route optimization
    setTimeout(() => {
      const flights = [];
      let totalPrice = 0;
      let totalTime = 0;
      
      for (let i = 0; i < validCities.length - 1; i++) {
        const flight = generateMockFlightData(
          validCities[i].city,
          validCities[i + 1].city,
          validCities[i + 1].date
        );
        flights.push(flight);
        totalPrice += flight.price;
        totalTime += parseInt(flight.duration);
      }

      // Optimize based on preference
      if (optimizeFor === 'cost') {
        flights.sort((a, b) => a.price - b.price);
        totalPrice = Math.floor(totalPrice * 0.85); // Simulate cost optimization
      } else {
        totalTime = Math.floor(totalTime * 0.9); // Simulate time optimization
      }

      setOptimizedRoute(flights);
      setTotalCost(totalPrice);
      setTotalDuration(`${Math.floor(totalTime / 24)}d ${totalTime % 24}h`);
      generateTimeline(flights);
      setLoading(false);
      toast.success(`Route optimized for ${optimizeFor}!`);
    }, 2000);
  };

  const generateTimeline = (flights) => {
    const timeline = [];
    
    flights.forEach((flight, index) => {
      // Departure
      timeline.push({
        type: 'departure',
        city: flight.from,
        code: flight.fromCode,
        time: flight.departureTime,
        date: flight.date,
        flight: flight.flightNumber,
        airline: flight.airline
      });

      // Flight duration
      timeline.push({
        type: 'flight',
        duration: flight.duration,
        airline: flight.airline,
        flightNumber: flight.flightNumber,
        from: flight.from,
        to: flight.to
      });

      // Layover (if exists)
      if (flight.layover) {
        timeline.push({
          type: 'layover',
          duration: flight.layover,
          city: flight.to,
          code: flight.toCode
        });
      }

      // Arrival
      timeline.push({
        type: 'arrival',
        city: flight.to,
        code: flight.toCode,
        time: flight.arrivalTime,
        date: flight.date
      });

      // Stay duration (except for last city)
      if (index < flights.length - 1) {
        const currentDate = new Date(flight.date);
        const nextDate = new Date(flights[index + 1].date);
        const stayDays = Math.ceil((nextDate - currentDate) / (1000 * 60 * 60 * 24));
        
        timeline.push({
          type: 'stay',
          city: flight.to,
          duration: `${stayDays} day${stayDays > 1 ? 's' : ''}`,
          activities: getActivitiesForCity(flight.to)
        });
      }
    });

    setTripTimeline(timeline);
  };

  const getActivitiesForCity = (city) => {
    const activities = {
      'New York': ['Times Square', 'Central Park', 'Statue of Liberty'],
      'Los Angeles': ['Hollywood Walk', 'Santa Monica', 'Beverly Hills'],
      'London': ['Big Ben', 'London Eye', 'British Museum'],
      'Paris': ['Eiffel Tower', 'Louvre', 'Notre Dame'],
      'Tokyo': ['Shibuya Crossing', 'Tokyo Tower', 'Senso-ji Temple'],
      'Dubai': ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah'],
      'Singapore': ['Marina Bay', 'Gardens by Bay', 'Sentosa Island'],
      'Delhi': ['Red Fort', 'India Gate', 'Lotus Temple'],
      'Mumbai': ['Gateway of India', 'Marine Drive', 'Bollywood Studios']
    };
    
    return activities[city] || ['City tour', 'Local cuisine', 'Shopping'];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <FontAwesomeIcon icon={faRoute} className="mr-3 text-blue-600" />
              Multi-City Trip Planner
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Trip Planning */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-xl p-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Plan Your Journey</h3>
                
                {/* Cities List */}
                <div className="space-y-4">
                  {cities.map((city, index) => (
                    <div key={city.id} className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <select
                            value={city.city}
                            onChange={(e) => updateCity(city.id, 'city', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          >
                            <option value="">Select City</option>
                            {popularCities.map((cityName) => (
                              <option key={cityName} value={cityName}>{cityName}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <input
                            type="date"
                            value={city.date}
                            onChange={(e) => updateCity(city.id, 'date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                      </div>
                      {cities.length > 2 && !city.isOrigin && (
                        <button
                          onClick={() => removeCity(city.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={addCity}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add City
                </button>
              </div>

              {/* Optimization Options */}
              <div className="bg-green-50 dark:bg-green-900 rounded-xl p-4">
                <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-4">Optimize Route</h3>
                <div className="flex space-x-4 mb-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="cost"
                      checked={optimizeFor === 'cost'}
                      onChange={(e) => setOptimizeFor(e.target.value)}
                      className="mr-2 text-green-600"
                    />
                    <FontAwesomeIcon icon={faDollarSign} className="mr-1 text-green-600" />
                    Best Price
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="time"
                      checked={optimizeFor === 'time'}
                      onChange={(e) => setOptimizeFor(e.target.value)}
                      className="mr-2 text-green-600"
                    />
                    <FontAwesomeIcon icon={faClock} className="mr-1 text-green-600" />
                    Shortest Time
                  </label>
                </div>
                
                <button
                  onClick={optimizeRoute}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <FontAwesomeIcon icon={faCogs} className="mr-2" />
                  )}
                  {loading ? 'Optimizing...' : 'Optimize Route'}
                </button>
              </div>

              {/* Trip Summary */}
              {optimizedRoute && (
                <div className="bg-orange-50 dark:bg-orange-900 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-orange-800 dark:text-orange-200 mb-4">Trip Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">${totalCost}</p>
                      <p className="text-sm text-orange-700 dark:text-orange-300">Total Cost</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{totalDuration}</p>
                      <p className="text-sm text-orange-700 dark:text-orange-300">Total Duration</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      {optimizedRoute.length} flight{optimizedRoute.length > 1 ? 's' : ''} • 
                      {cities.filter(c => c.city).length} cities • 
                      Optimized for {optimizeFor}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel - Visual Timeline */}
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-900 rounded-xl p-4">
                <h3 className="text-lg font-bold text-purple-800 dark:text-purple-200 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faTimeline} className="mr-2" />
                  Trip Timeline
                </h3>
                
                {tripTimeline.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {tripTimeline.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm ${
                          item.type === 'departure' ? 'bg-green-500' :
                          item.type === 'arrival' ? 'bg-blue-500' :
                          item.type === 'flight' ? 'bg-orange-500' :
                          item.type === 'layover' ? 'bg-yellow-500' :
                          'bg-purple-500'
                        }`}>
                          <FontAwesomeIcon icon={
                            item.type === 'departure' ? faPlane :
                            item.type === 'arrival' ? faMapMarkerAlt :
                            item.type === 'flight' ? faPlane :
                            item.type === 'layover' ? faClock :
                            faCalendarAlt
                          } />
                        </div>
                        
                        <div className="flex-1">
                          {item.type === 'departure' && (
                            <div>
                              <p className="font-semibold text-gray-800 dark:text-white">
                                Departure from {item.city} ({item.code})
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.time} • {item.date} • {item.airline} {item.flight}
                              </p>
                            </div>
                          )}
                          
                          {item.type === 'flight' && (
                            <div>
                              <p className="font-semibold text-gray-800 dark:text-white">
                                Flight: {item.from} → {item.to}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.duration} • {item.airline} {item.flightNumber}
                              </p>
                            </div>
                          )}
                          
                          {item.type === 'layover' && (
                            <div>
                              <p className="font-semibold text-gray-800 dark:text-white">
                                Layover in {item.city} ({item.code})
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Duration: {item.duration}
                              </p>
                            </div>
                          )}
                          
                          {item.type === 'arrival' && (
                            <div>
                              <p className="font-semibold text-gray-800 dark:text-white">
                                Arrival in {item.city} ({item.code})
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.time} • {item.date}
                              </p>
                            </div>
                          )}
                          
                          {item.type === 'stay' && (
                            <div>
                              <p className="font-semibold text-gray-800 dark:text-white">
                                Stay in {item.city}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.duration} • Visit: {item.activities.join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FontAwesomeIcon icon={faRoute} className="text-4xl text-purple-300 mb-4" />
                    <p className="text-purple-600 dark:text-purple-400">
                      Add cities and optimize your route to see the timeline
                    </p>
                  </div>
                )}
              </div>

              {/* Flight Details */}
              {optimizedRoute && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Flight Details</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {optimizedRoute.map((flight, index) => (
                      <div key={index} className="bg-white dark:bg-gray-600 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">
                              {flight.from} → {flight.to}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {flight.airline} {flight.flightNumber} • {flight.duration}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {flight.departureTime} - {flight.arrivalTime}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">${flight.price}</p>
                            {flight.layover && (
                              <p className="text-xs text-yellow-600">Layover: {flight.layover}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg"
            >
              Close
            </button>
            {optimizedRoute && (
              <button
                onClick={() => {
                  toast.success('Trip plan saved! You can now proceed to book individual flights.');
                  onClose();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg flex items-center"
              >
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                Search Flights
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiCityPlanner;