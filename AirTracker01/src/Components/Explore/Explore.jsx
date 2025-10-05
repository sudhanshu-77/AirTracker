import React, { useState, useMemo, useEffect } from 'react';
import Cards from '../Cards/Cards';
import TrustSection from '../Cards/TrustSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faPlane, 
  faClock, 
  faMapMarkerAlt,
  faStar,
  faGlobe,
  faChartLine,
  faCalendarAlt,
  faTags,
  faHeart,
  faShare
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const destinations = [
  { name: "Delhi", name2: "Mumbai", path: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: "4,500", duration: "2h 15m", rating: "4.5", description: "Popular business route with frequent flights" },
  { name: "London", name2: "Paris", path: "https://images.unsplash.com/photo-1520967824495-b529aeba26df?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: "12,000", duration: "1h 30m", rating: "4.8", description: "Quick European connection" },
  { name: "New York", name2: "Los Angeles", path: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: "25,000", duration: "6h 0m", rating: "4.6", description: "Coast to coast American route" },
  { name: "Bangkok", name2: "Singapore", path: "https://images.unsplash.com/photo-1580327942498-53a877c6d0ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: "8,500", duration: "2h 30m", rating: "4.7", description: "Southeast Asian hub connection" },
  { name: "Goa", name2: "Delhi", path: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: "6,200", duration: "2h 45m", rating: "4.4", description: "Beach destination from capital" },
  { name: "London", name2: "Rome", path: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: "15,500", duration: "2h 45m", rating: "4.9", description: "Historic European capitals" },
  { name: "Singapore", name2: "Bangkok", path: "https://images.unsplash.com/photo-1542114740389-9b46fb1e5be7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: "9,000", duration: "2h 20m", rating: "4.6", description: "Modern Asian city connection" },
  { name: "Dublin", name2: "London", path: "https://images.unsplash.com/photo-1549918864-48ac978761a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: "11,200", duration: "1h 20m", rating: "4.3", description: "Short hop across Irish Sea" },
  { name: "Thailand", name2: "Mumbai", path: "https://images.unsplash.com/photo-1494948949099-1311f3e907a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: "18,500", duration: "4h 15m", rating: "4.5", description: "Gateway to Southeast Asia" }
];

export default function Explore() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [priceFilter, setPriceFilter] = useState('all');
  const [flightNumber, setFlightNumber] = useState('');
  const [airline, setAirline] = useState('');
  const [trackingDate, setTrackingDate] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('routes');
  const [isAnimated, setIsAnimated] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const filteredDestinations = useMemo(() => {
    let filtered = destinations.filter(dest => 
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.name2.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (priceFilter !== 'all') {
      const price = parseInt(priceFilter);
      filtered = filtered.filter(dest => parseInt(dest.price.replace(',', '')) <= price);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return parseInt(a.price.replace(',', '')) - parseInt(b.price.replace(',', ''));
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        case 'duration':
          return a.duration.localeCompare(b.duration);
        default:
          return 0;
      }
    });
  }, [searchTerm, sortBy, priceFilter]);

  const handleTrackFlight = () => {
    if (!airline || !flightNumber || !trackingDate) {
      toast.error('Please fill all tracking fields');
      return;
    }
    toast.success(`Tracking ${airline} ${flightNumber} for ${trackingDate}`);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const toggleFavorite = (index) => {
    setFavorites(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
    toast.success(favorites.includes(index) ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleQuickBook = (dest) => {
    const ls = JSON.parse(localStorage.getItem("auth"));
    if (ls?.user) {
      navigate('/home', { state: { from: dest.name, to: dest.name2 } });
    } else {
      toast.error('Please login to book flights');
      navigate('/login');
    }
  };

  const handleViewDetails = (dest) => {
    setSelectedRoute(dest);
    setShowModal(true);
  };

  const getRouteDetails = (dest) => {
    const details = {
      'London → Paris': {
        airlines: ['British Airways', 'Air France', 'EasyJet'],
        aircraft: 'Airbus A320',
        departure: '08:30 AM',
        arrival: '11:00 AM',
        terminal: 'Terminal 2',
        amenities: ['WiFi', 'Meals', 'Entertainment'],
        baggage: '23kg checked, 7kg cabin',
        cancellation: 'Free cancellation up to 24 hours'
      }
    };
    return details[`${dest.name} → ${dest.name2}`] || {
      airlines: ['Multiple Airlines'],
      aircraft: 'Various Aircraft',
      departure: 'Multiple Times',
      arrival: 'Multiple Times',
      terminal: 'Check with airline',
      amenities: ['WiFi', 'Refreshments'],
      baggage: 'Standard allowance',
      cancellation: 'As per airline policy'
    };
  };

  const shareRoute = (dest) => {
    if (navigator.share) {
      navigator.share({
        title: `${dest.name} to ${dest.name2}`,
        text: `Check out this amazing flight route from ${dest.name} to ${dest.name2} starting at ₹${dest.price}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r from-orange-600 to-blue-600 text-white py-16 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <FontAwesomeIcon icon={faGlobe} className="mr-4 animate-spin-slow" />
            Explore the World
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover amazing destinations, track flights in real-time, and find the best deals for your next adventure
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm">Airlines</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-sm">Routes</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>

      <TrustSection />
      
      {/* Tab Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-2 flex space-x-2">
            <button
              onClick={() => setActiveTab('routes')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'routes' 
                  ? 'bg-orange-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Popular Routes
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'tracking' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FontAwesomeIcon icon={faPlane} className="mr-2" />
              Flight Tracking
            </button>
            <button
              onClick={() => setActiveTab('deals')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'deals' 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FontAwesomeIcon icon={faTags} className="mr-2" />
              Best Deals
            </button>
          </div>
        </div>

        {/* Flight Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                <FontAwesomeIcon icon={faPlane} className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Real-Time Flight Tracking</h2>
              <p className="text-gray-600">Get live updates on flight status, delays, and gate information</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Airline</label>
                <select 
                  value={airline} 
                  onChange={(e) => setAirline(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Airline</option>
                  <option value="AI">Air India</option>
                  <option value="6E">IndiGo</option>
                  <option value="SG">SpiceJet</option>
                  <option value="UK">Vistara</option>
                  <option value="G8">Go First</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Flight Number</label>
                <input 
                  type="text" 
                  placeholder="e.g., AI101" 
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input 
                  type="date" 
                  value={trackingDate}
                  onChange={(e) => setTrackingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex items-end">
                <button 
                  onClick={handleTrackFlight}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  Track Flight
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Best Deals Tab */}
        {activeTab === 'deals' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-4">
                <FontAwesomeIcon icon={faTags} className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Today's Best Deals</h2>
              <p className="text-gray-600">Limited time offers on popular routes</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destinations.slice(0, 3).map((dest, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{dest.name} → {dest.name2}</h3>
                      <p className="text-sm text-gray-600">{dest.duration}</p>
                    </div>
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      30% OFF
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-green-600">₹{dest.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">₹{Math.round(parseInt(dest.price.replace(',', '')) * 1.3).toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => handleQuickBook(dest)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter Section - Only show for routes tab */}
        {activeTab === 'routes' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative">
                <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search destinations..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                />
              </div>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-gray-200 rounded-xl p-3 focus:border-orange-500 focus:outline-none"
              >
                <option value="popular">Sort by Popular</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
                <option value="duration">Sort by Duration</option>
              </select>
              <select 
                value={priceFilter} 
                onChange={(e) => setPriceFilter(e.target.value)}
                className="border-2 border-gray-200 rounded-xl p-3 focus:border-orange-500 focus:outline-none"
              >
                <option value="all">All Prices</option>
                <option value="10000">Under ₹10,000</option>
                <option value="20000">Under ₹20,000</option>
                <option value="30000">Under ₹30,000</option>
              </select>
              <div className="flex items-center justify-center bg-orange-50 rounded-xl p-3">
                <FontAwesomeIcon icon={faChartLine} className="mr-2 text-orange-600" />
                <span className="text-gray-700 font-semibold">{filteredDestinations.length} routes found</span>
              </div>
            </div>
          </div>
        )}

        {/* Popular Routes Section */}
        {activeTab === 'routes' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Flight Routes</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover amazing destinations with the best flight deals and exclusive offers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.slice(0, visibleCount).map((dest, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative">
                    <img src={dest.path} alt={`${dest.name} to ${dest.name2}`} className="w-full h-48 object-cover" />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button 
                        onClick={() => toggleFavorite(index)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          favorites.includes(index) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                      <button 
                        onClick={() => shareRoute(dest)}
                        className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white backdrop-blur-sm transition-colors"
                      >
                        <FontAwesomeIcon icon={faShare} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center bg-white/90 rounded-full px-3 py-1 backdrop-blur-sm">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                        <span className="font-semibold text-gray-800">{dest.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{dest.name} → {dest.name2}</h3>
                        <p className="text-gray-600 text-sm">{dest.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">₹{dest.price}</div>
                        <div className="text-sm text-gray-500">{dest.duration}</div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleQuickBook(dest)}
                        className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105"
                      >
                        Quick Book
                      </button>
                      <button 
                        onClick={() => handleViewDetails(dest)}
                        className="px-4 py-3 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white rounded-xl font-semibold transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {visibleCount < filteredDestinations.length && (
              <div className="flex justify-center mt-12">
                <button 
                  onClick={loadMore}
                  className="bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  Load More Routes
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Route Details Modal */}
      {showModal && selectedRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedRoute.name} → {selectedRoute.name2}
                  </h2>
                  <p className="text-gray-600">{selectedRoute.description}</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Route Image */}
              <img 
                src={selectedRoute.path} 
                alt={`${selectedRoute.name} to ${selectedRoute.name2}`}
                className="w-full h-48 object-cover rounded-xl mb-6"
              />

              {/* Flight Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">Flight Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold">{selectedRoute.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-semibold text-green-600">₹{selectedRoute.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-semibold">{selectedRoute.rating} ⭐</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Aircraft:</span>
                      <span className="font-semibold">{getRouteDetails(selectedRoute).aircraft}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">Schedule</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Departure:</span>
                      <span className="font-semibold">{getRouteDetails(selectedRoute).departure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arrival:</span>
                      <span className="font-semibold">{getRouteDetails(selectedRoute).arrival}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Terminal:</span>
                      <span className="font-semibold">{getRouteDetails(selectedRoute).terminal}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Airlines */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3 text-gray-800">Available Airlines</h3>
                <div className="flex flex-wrap gap-2">
                  {getRouteDetails(selectedRoute).airlines.map((airline, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {airline}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3 text-gray-800">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {getRouteDetails(selectedRoute).amenities.map((amenity, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-orange-50 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-lg mb-3 text-gray-800">Important Information</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Baggage:</strong> {getRouteDetails(selectedRoute).baggage}</p>
                  <p><strong>Cancellation:</strong> {getRouteDetails(selectedRoute).cancellation}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button 
                  onClick={() => {
                    setShowModal(false);
                    handleQuickBook(selectedRoute);
                  }}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  Book This Route
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}