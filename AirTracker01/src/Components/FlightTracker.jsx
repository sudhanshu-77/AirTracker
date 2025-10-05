import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlane, 
  faClock, 
  faMapMarkerAlt,
  faExclamationTriangle,
  faCheckCircle,
  faTimesCircle,
  faSearch,
  faTimes,
  faRoute,
  faCloudRain,
  faWind
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const FlightTracker = ({ isOpen, onClose, flightNumber: initialFlightNumber }) => {
  const [flightNumber, setFlightNumber] = useState(initialFlightNumber || '');
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trackingHistory, setTrackingHistory] = useState([]);

  useEffect(() => {
    if (initialFlightNumber) {
      trackFlight(initialFlightNumber);
    }
    loadTrackingHistory();
  }, [initialFlightNumber]);

  const loadTrackingHistory = () => {
    const history = JSON.parse(localStorage.getItem('flightTrackingHistory') || '[]');
    setTrackingHistory(history);
  };

  const saveToHistory = (flight) => {
    const history = JSON.parse(localStorage.getItem('flightTrackingHistory') || '[]');
    const existingIndex = history.findIndex(f => f.flightNumber === flight.flightNumber);
    
    if (existingIndex >= 0) {
      history[existingIndex] = { ...flight, lastTracked: new Date().toISOString() };
    } else {
      history.unshift({ ...flight, lastTracked: new Date().toISOString() });
    }
    
    const limitedHistory = history.slice(0, 10); // Keep only last 10
    localStorage.setItem('flightTrackingHistory', JSON.stringify(limitedHistory));
    setTrackingHistory(limitedHistory);
  };

  const generateMockFlightData = (flightNum) => {
    const airlines = ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'Emirates'];
    const statuses = ['On Time', 'Delayed', 'Boarding', 'Departed', 'Arrived', 'Cancelled'];
    const airports = [
      { code: 'DEL', name: 'Delhi', city: 'New Delhi' },
      { code: 'BOM', name: 'Mumbai', city: 'Mumbai' },
      { code: 'BLR', name: 'Bangalore', city: 'Bangalore' },
      { code: 'MAA', name: 'Chennai', city: 'Chennai' }
    ];
    
    const origin = airports[Math.floor(Math.random() * airports.length)];
    const destination = airports.filter(a => a.code !== origin.code)[Math.floor(Math.random() * 3)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const delay = status === 'Delayed' ? Math.floor(Math.random() * 120) + 15 : 0;
    
    return {
      flightNumber: flightNum,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      status,
      delay,
      origin,
      destination,
      scheduledDeparture: '14:30',
      actualDeparture: delay > 0 ? `${14 + Math.floor(delay/60)}:${(30 + delay%60).toString().padStart(2, '0')}` : '14:30',
      scheduledArrival: '17:45',
      actualArrival: delay > 0 ? `${17 + Math.floor(delay/60)}:${(45 + delay%60).toString().padStart(2, '0')}` : '17:45',
      gate: `A${Math.floor(Math.random() * 20) + 1}`,
      terminal: Math.floor(Math.random() * 3) + 1,
      aircraft: 'Boeing 737-800',
      altitude: status === 'Departed' ? `${Math.floor(Math.random() * 20000) + 15000} ft` : null,
      speed: status === 'Departed' ? `${Math.floor(Math.random() * 200) + 400} mph` : null,
      weather: {
        origin: { condition: 'Clear', temp: '28°C' },
        destination: { condition: 'Partly Cloudy', temp: '32°C' }
      },
      progress: status === 'Departed' ? Math.floor(Math.random() * 80) + 10 : 
                status === 'Arrived' ? 100 : 0
    };
  };

  const trackFlight = async (flightNum) => {
    if (!flightNum.trim()) {
      toast.error('Please enter a flight number');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockData = generateMockFlightData(flightNum.toUpperCase());
      setFlightData(mockData);
      saveToHistory(mockData);
      setLoading(false);
      
      // Show status notification
      if (mockData.status === 'Delayed') {
        toast.warn(`Flight ${flightNum} is delayed by ${mockData.delay} minutes`);
      } else if (mockData.status === 'Cancelled') {
        toast.error(`Flight ${flightNum} has been cancelled`);
      } else {
        toast.success(`Flight ${flightNum} is ${mockData.status.toLowerCase()}`);
      }
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Time': return 'text-green-600 bg-green-100';
      case 'Delayed': return 'text-yellow-600 bg-yellow-100';
      case 'Boarding': return 'text-blue-600 bg-blue-100';
      case 'Departed': return 'text-purple-600 bg-purple-100';
      case 'Arrived': return 'text-green-600 bg-green-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'On Time': return faCheckCircle;
      case 'Delayed': return faExclamationTriangle;
      case 'Boarding': return faPlane;
      case 'Departed': return faPlane;
      case 'Arrived': return faCheckCircle;
      case 'Cancelled': return faTimesCircle;
      default: return faClock;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <FontAwesomeIcon icon={faPlane} className="mr-3 text-blue-600" />
              Flight Tracker
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Search */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-xl p-6 mb-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                placeholder="Enter flight number (e.g., AI101, 6E234)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-lg"
                onKeyPress={(e) => e.key === 'Enter' && trackFlight(flightNumber)}
              />
              <button
                onClick={() => trackFlight(flightNumber)}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <FontAwesomeIcon icon={faSearch} className="mr-2" />
                )}
                Track
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Flight Details */}
            <div className="lg:col-span-2">
              {flightData ? (
                <div className="space-y-6">
                  {/* Status Card */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{flightData.flightNumber}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{flightData.airline}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-full flex items-center ${getStatusColor(flightData.status)}`}>
                        <FontAwesomeIcon icon={getStatusIcon(flightData.status)} className="mr-2" />
                        {flightData.status}
                      </div>
                    </div>

                    {flightData.delay > 0 && (
                      <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 mb-4">
                        <p className="text-yellow-800 dark:text-yellow-200 flex items-center">
                          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                          Delayed by {flightData.delay} minutes
                        </p>
                      </div>
                    )}

                    {/* Route */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-800 dark:text-white">{flightData.origin.code}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{flightData.origin.city}</p>
                        <p className="text-lg font-semibold text-blue-600 mt-2">{flightData.scheduledDeparture}</p>
                        {flightData.actualDeparture !== flightData.scheduledDeparture && (
                          <p className="text-sm text-red-600">Actual: {flightData.actualDeparture}</p>
                        )}
                      </div>
                      
                      <div className="flex-1 mx-8 relative">
                        <div className="border-t-2 border-dashed border-gray-300 relative">
                          <FontAwesomeIcon 
                            icon={faPlane} 
                            className="absolute top-1/2 transform -translate-y-1/2 text-blue-600 bg-white px-2"
                            style={{ left: `${flightData.progress}%` }}
                          />
                        </div>
                        <div className="text-center mt-2">
                          <p className="text-sm text-gray-600">{flightData.progress}% Complete</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-800 dark:text-white">{flightData.destination.code}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{flightData.destination.city}</p>
                        <p className="text-lg font-semibold text-green-600 mt-2">{flightData.scheduledArrival}</p>
                        {flightData.actualArrival !== flightData.scheduledArrival && (
                          <p className="text-sm text-red-600">Actual: {flightData.actualArrival}</p>
                        )}
                      </div>
                    </div>

                    {/* Flight Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Gate</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{flightData.gate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Terminal</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{flightData.terminal}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Aircraft</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{flightData.aircraft}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Status</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{flightData.status}</p>
                      </div>
                    </div>

                    {/* Live Data */}
                    {flightData.altitude && (
                      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Live Flight Data</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-blue-600 dark:text-blue-400">Altitude</p>
                            <p className="font-semibold">{flightData.altitude}</p>
                          </div>
                          <div>
                            <p className="text-blue-600 dark:text-blue-400">Speed</p>
                            <p className="font-semibold">{flightData.speed}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Weather */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <FontAwesomeIcon icon={faCloudRain} className="mr-2 text-blue-600" />
                      Weather Conditions
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{flightData.origin.city}</p>
                        <p className="font-semibold">{flightData.weather.origin.condition}</p>
                        <p className="text-lg text-blue-600">{flightData.weather.origin.temp}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{flightData.destination.city}</p>
                        <p className="font-semibold">{flightData.weather.destination.condition}</p>
                        <p className="text-lg text-green-600">{flightData.weather.destination.temp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FontAwesomeIcon icon={faPlane} className="text-6xl text-gray-300 mb-4" />
                  <p className="text-xl text-gray-600 dark:text-gray-400">Enter a flight number to track</p>
                  <p className="text-gray-500">Get real-time updates on flight status, delays, and more</p>
                </div>
              )}
            </div>

            {/* Tracking History */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recent Searches</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {trackingHistory.map((flight, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      setFlightNumber(flight.flightNumber);
                      trackFlight(flight.flightNumber);
                    }}
                    className="bg-white dark:bg-gray-700 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{flight.flightNumber}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{flight.airline}</p>
                        <p className="text-xs text-gray-500">{flight.origin.code} → {flight.destination.code}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(flight.status)}`}>
                        {flight.status}
                      </span>
                    </div>
                  </div>
                ))}
                
                {trackingHistory.length === 0 && (
                  <div className="text-center py-8">
                    <FontAwesomeIcon icon={faRoute} className="text-3xl text-gray-300 mb-2" />
                    <p className="text-gray-500 text-sm">No recent searches</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightTracker;