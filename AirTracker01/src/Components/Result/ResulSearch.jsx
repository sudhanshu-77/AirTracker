import React, { useState, useMemo } from "react";
import { useData } from "../../data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlaneDeparture, 
  faFilter, 
  faSortAmountDown, 
  faPlane,
  faClock,
  faMapMarkerAlt,
  faSearch,
  faTimes,
  faChevronDown,
  faStar,
  faWifi,
  faUtensils,
  faTv,
  faUserFriends,
  faCloudSun,
  faBell
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import CurrencyConverter from "../CurrencyConverter";
import TravelCompanion from "../TravelCompanion";
import WeatherInsights from "../WeatherInsights";
import PriceAlerts from "../PriceAlerts";
import FlightTracker from "../FlightTracker";
import { FlightCardSkeleton } from "../EnhancedLoading";

const ResultSearch = () => {
  const { data } = useData();
  const [sortBy, setSortBy] = useState('price');
  const [filterClass, setFilterClass] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [timeFilter, setTimeFilter] = useState('all');
  const [showTravelCompanion, setShowTravelCompanion] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showWeatherInsights, setShowWeatherInsights] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showPriceAlerts, setShowPriceAlerts] = useState(false);
  const [showFlightTracker, setShowFlightTracker] = useState(false);
  const [selectedFlightNumber, setSelectedFlightNumber] = useState(null);

  const airlines = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map(flight => flight.airlineName).filter(Boolean))];
  }, [data]);

  const sortedAndFilteredFlights = useMemo(() => {
    if (!data || data.length === 0) return [];

    let filtered = data.filter(flight => {
      const price = flight.score || 0;
      const classMatch = filterClass === 'all' || 
        (flight.segments && flight.segments[0]?.cabin?.toLowerCase() === filterClass.toLowerCase());
      const priceMatch = price >= priceRange.min && price <= priceRange.max;
      const airlineMatch = selectedAirlines.length === 0 || selectedAirlines.includes(flight.airlineName);
      
      let timeMatch = true;
      if (timeFilter !== 'all' && flight.departureTime) {
        const hour = parseInt(flight.departureTime.split(':')[0]);
        switch (timeFilter) {
          case 'morning': timeMatch = hour >= 6 && hour < 12; break;
          case 'afternoon': timeMatch = hour >= 12 && hour < 18; break;
          case 'evening': timeMatch = hour >= 18 && hour < 24; break;
          case 'night': timeMatch = hour >= 0 && hour < 6; break;
        }
      }
      
      return classMatch && priceMatch && airlineMatch && timeMatch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return (a.score || 0) - (b.score || 0);
        case 'duration':
          return (a.duration || '').localeCompare(b.duration || '');
        case 'departure':
          return (a.departureTime || '').localeCompare(b.departureTime || '');
        default:
          return 0;
      }
    });
  }, [data, sortBy, filterClass, priceRange, selectedAirlines, timeFilter]);

  if (!data || data.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <LoadingSpinner message="No flights found. Please search for flights." />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-2">
                <FontAwesomeIcon icon={faSearch} className="mr-3 text-orange-600" />
                Flight Results
              </h1>
              <p className="text-gray-600 text-lg">
                Found {sortedAndFilteredFlights.length} flights for your journey
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 focus:border-orange-500 focus:outline-none transition-colors"
                >
                  <option value="price">Price: Low to High</option>
                  <option value="duration">Duration: Shortest</option>
                  <option value="departure">Departure Time</option>
                </select>
                <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  showFilters 
                    ? 'bg-orange-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FontAwesomeIcon icon={faFilter} />
                Filters
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Class</label>
                  <select 
                    value={filterClass} 
                    onChange={(e) => setFilterClass(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="all">All Classes</option>
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Time</label>
                  <select 
                    value={timeFilter} 
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="all">Any Time</option>
                    <option value="morning">Morning (6AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 6PM)</option>
                    <option value="evening">Evening (6PM - 12AM)</option>
                    <option value="night">Night (12AM - 6AM)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Airlines</label>
                  <div className="max-h-32 overflow-y-auto border-2 border-gray-200 rounded-lg p-2">
                    {airlines.map(airline => (
                      <label key={airline} className="flex items-center p-1 hover:bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          checked={selectedAirlines.includes(airline)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAirlines([...selectedAirlines, airline]);
                            } else {
                              setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
                            }
                          }}
                          className="mr-2 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm">{airline}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                      className="w-full accent-orange-600"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹0</span>
                      <span>₹{priceRange.max.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    setSortBy('price');
                    setFilterClass('all');
                    setPriceRange({ min: 0, max: 100000 });
                    setSelectedAirlines([]);
                    setTimeFilter('all');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Flight Results */}
        <div className="space-y-6">
          {sortedAndFilteredFlights.map((flight, index) => (
            <div key={flight.id || index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                  {/* Airline & Flight Info */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlane} className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{flight.airlineName}</p>
                        <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FontAwesomeIcon icon={faWifi} />
                      <FontAwesomeIcon icon={faUtensils} />
                      <FontAwesomeIcon icon={faTv} />
                    </div>
                  </div>
                  
                  {/* Departure */}
                  <div className="text-center lg:text-left">
                    <p className="text-3xl font-bold text-gray-800 mb-1">{flight.departureTime}</p>
                    <p className="text-lg font-semibold text-orange-600 mb-1">{flight.departureAirportCode}</p>
                    <p className="text-sm text-gray-600">{flight.departureDateTime?.substring(0, 10)}</p>
                  </div>
                  
                  {/* Flight Path */}
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-orange-600 text-sm" />
                      </div>
                      <div className="flex-1 mx-4 relative">
                        <div className="border-t-2 border-dashed border-gray-300"></div>
                        <FontAwesomeIcon icon={faPlane} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-600 bg-white px-1" />
                      </div>
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600 text-sm" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faClock} className="text-sm" />
                      <span className="font-semibold">{flight.duration}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Non-stop</p>
                  </div>
                  
                  {/* Arrival */}
                  <div className="text-center lg:text-left">
                    <p className="text-3xl font-bold text-gray-800 mb-1">{flight.arrivalTime}</p>
                    <p className="text-lg font-semibold text-blue-600 mb-1">{flight.arrivalAirportCode}</p>
                    <p className="text-sm text-gray-600">{flight.arrivalDateTime?.substring(0, 10)}</p>
                  </div>
                  
                  {/* Price & Booking */}
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 mb-4">
                      <div className="mb-2">
                        <CurrencyConverter price={flight.score} />
                      </div>
                      <p className="text-sm text-gray-600">per person</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-xs" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">4.8</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 capitalize">
                        {flight.segments?.[0]?.cabin || 'Economy'} Class
                      </p>
                      <div className="flex space-x-2">
                        <Link
                          to="/result/book"
                          state={{ flight }}
                          className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                        >
                          Book Now
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedFlight(flight);
                            setShowTravelCompanion(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                          title="Group Booking"
                        >
                          <FontAwesomeIcon icon={faUserFriends} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDestination({
                              code: flight.arrivalAirportCode,
                              name: flight.arrivalAirportCode,
                              date: flight.arrivalDateTime?.substring(0, 10),
                              time: flight.arrivalTime
                            });
                            setShowWeatherInsights(true);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                          title="Weather & Travel Insights"
                        >
                          <FontAwesomeIcon icon={faCloudSun} />
                        </button>
                      </div>
                      
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => {
                            setSelectedFlight({
                              from: flight.departureAirportCode,
                              to: flight.arrivalAirportCode,
                              price: flight.score
                            });
                            setShowPriceAlerts(true);
                          }}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                          <FontAwesomeIcon icon={faBell} className="mr-1" />
                          Price Alert
                        </button>
                        <button
                          onClick={() => {
                            setSelectedFlightNumber(flight.flightNumber);
                            setShowFlightTracker(true);
                          }}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                          <FontAwesomeIcon icon={faPlane} className="mr-1" />
                          Track Flight
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">Free cancellation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      
        {sortedAndFilteredFlights.length === 0 && data.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faSearch} className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No flights found</h3>
            <p className="text-gray-600 text-lg mb-6">Try adjusting your filters to see more results</p>
            <button 
              onClick={() => {
                setSortBy('price');
                setFilterClass('all');
                setPriceRange({ min: 0, max: 100000 });
                setSelectedAirlines([]);
                setTimeFilter('all');
              }}
              className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Clear All Filters
            </button>
          </div>
        )}
        
        {/* Travel Companion Modal */}
        <TravelCompanion 
          isOpen={showTravelCompanion}
          onClose={() => setShowTravelCompanion(false)}
          flightData={selectedFlight}
        />
        
        {/* Weather Insights Modal */}
        <WeatherInsights 
          isOpen={showWeatherInsights}
          onClose={() => setShowWeatherInsights(false)}
          destination={selectedDestination?.code || selectedDestination}
          flightInfo={selectedDestination}
        />
        
        {/* Price Alerts Modal */}
        <PriceAlerts 
          isOpen={showPriceAlerts}
          onClose={() => setShowPriceAlerts(false)}
          flightRoute={selectedFlight}
        />
        
        {/* Flight Tracker Modal */}
        <FlightTracker 
          isOpen={showFlightTracker}
          onClose={() => setShowFlightTracker(false)}
          flightNumber={selectedFlightNumber}
        />
      </div>
    </div>
  );
}

export default ResultSearch; 