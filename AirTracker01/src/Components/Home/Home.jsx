import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useData } from "../../data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faExchangeAlt, faRoute } from "@fortawesome/free-solid-svg-icons";
import { FLIGHT_CLASSES, POPULAR_AIRPORTS } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";
import SmartRecommendations from "../SmartRecommendations";
import MultiCityPlanner from "../MultiCityPlanner";
import { PlaneLoader } from "../EnhancedLoading";
import { toast } from 'react-toastify';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [departure, setDeparture] = useState('');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');
  const [infants, setInfants] = useState('0');
  const [flightClass, setFlightClass] = useState('Economy');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showMultiCityPlanner, setShowMultiCityPlanner] = useState(false);
  const [userBudget, setUserBudget] = useState(20000);
  const { data, setData } = useData();

  // Pre-fill form if coming from Explore page
  useEffect(() => {
    if (location.state?.from && location.state?.to) {
      const sourceCode = handleCitySearch(location.state.from, true);
      const destCode = handleCitySearch(location.state.to, false);
      setSource(sourceCode);
      setDestination(destCode);
      toast.success(`Pre-filled route: ${location.state.from} to ${location.state.to}`);
    }
  }, [location.state]);

  const cityAirportMap = {
    'delhi': 'DEL', 'new delhi': 'DEL',
    'mumbai': 'BOM', 'bombay': 'BOM',
    'bangalore': 'BLR', 'bengaluru': 'BLR',
    'chennai': 'MAA', 'madras': 'MAA',
    'kolkata': 'CCU', 'calcutta': 'CCU',
    'hyderabad': 'HYD',
    'pune': 'PNQ',
    'ahmedabad': 'AMD',
    'goa': 'GOI',
    'kochi': 'COK', 'cochin': 'COK',
    'new york': 'JFK', 'newyork': 'JFK',
    'london': 'LHR',
    'paris': 'CDG',
    'dubai': 'DXB',
    'singapore': 'SIN',
    'tokyo': 'NRT',
    'bangkok': 'BKK',
    'kuala lumpur': 'KUL',
    'hong kong': 'HKG',
    'sydney': 'SYD',
    'melbourne': 'MEL',
    'los angeles': 'LAX',
    'san francisco': 'SFO',
    'chicago': 'ORD',
    'toronto': 'YYZ',
    'vancouver': 'YVR'
  };

  const popularCities = [
    { name: 'Delhi', code: 'DEL', country: 'India' },
    { name: 'Mumbai', code: 'BOM', country: 'India' },
    { name: 'Bangalore', code: 'BLR', country: 'India' },
    { name: 'Chennai', code: 'MAA', country: 'India' },
    { name: 'New York', code: 'JFK', country: 'USA' },
    { name: 'London', code: 'LHR', country: 'UK' },
    { name: 'Dubai', code: 'DXB', country: 'UAE' },
    { name: 'Singapore', code: 'SIN', country: 'Singapore' },
    { name: 'Paris', code: 'CDG', country: 'France' },
    { name: 'Tokyo', code: 'NRT', country: 'Japan' }
  ];

   // Rahu : 655e1b03de8b4b8c2c7e1116
  //655d8e7163ab81f6dc002ac1
  // const url = `https://api.flightapi.io/onewaytrip/655ce1d263ab81f6dc0023f9/HEL/OUL/2024-05-20/1/0/0/Economy/INR`;


  const validateForm = () => {
    const newErrors = {};
    if (!source.trim()) newErrors.source = 'Source is required';
    if (!destination.trim()) newErrors.destination = 'Destination is required';
    if (!departure) newErrors.departure = 'Departure date is required';
    if (source === destination) newErrors.destination = 'Source and destination cannot be same';
    
    const today = new Date().toISOString().split('T')[0];
    if (departure < today) newErrors.departure = 'Departure date cannot be in the past';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateMockFlights = () => {
    const airlines = [
      { code: 'AI', name: 'Air India', flightPrefix: 'AI' },
      { code: 'SG', name: 'SpiceJet', flightPrefix: 'SG' },
      { code: '6E', name: 'IndiGo', flightPrefix: '6E' },
      { code: 'UK', name: 'Vistara', flightPrefix: 'UK' },
      { code: 'G8', name: 'Go First', flightPrefix: 'G8' }
    ];
    const mockFlights = [];
    
    for (let i = 0; i < 5; i++) {
      const depHour = 6 + i * 3;
      const arrHour = depHour + 2 + Math.floor(Math.random() * 3);
      const price = 3000 + Math.floor(Math.random() * 7000);
      const selectedAirline = airlines[Math.floor(Math.random() * airlines.length)];
      const flightNumber = `${selectedAirline.flightPrefix}${Math.floor(Math.random() * 9000) + 1000}`;
      
      mockFlights.push({
        id: `flight_${i}`,
        departureTime: `${depHour.toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        arrivalTime: `${arrHour.toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        departureDateTime: `${departure}T${depHour.toString().padStart(2, '0')}:00:00`,
        arrivalDateTime: `${departure}T${arrHour.toString().padStart(2, '0')}:00:00`,
        departureAirportCode: source,
        arrivalAirportCode: destination,
        airlineCodes: selectedAirline.code,
        airlineName: selectedAirline.name,
        flightNumber: flightNumber,
        duration: `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 60)}m`,
        score: price,
        segments: [{ cabin: flightClass.toLowerCase() }]
      });
    }
    return mockFlights;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    // Convert city names to airport codes if needed
    const sourceCode = handleCitySearch(source, true);
    const destCode = handleCitySearch(destination, false);
    
    setSource(sourceCode);
    setDestination(destCode);

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockFlights = generateMockFlights();
      setData(mockFlights);
      toast.success(`Found ${mockFlights.length} flights from ${sourceCode} to ${destCode}!`);
      navigate("/result");
      setLoading(false);
    }, 1500);
  };

  const swapLocations = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const handleCitySearch = (input, isSource = true) => {
    const normalizedInput = input.toLowerCase().trim();
    
    // Check if it's already an airport code
    if (input.length === 3 && input.match(/^[A-Z]{3}$/)) {
      return input;
    }
    
    // Check city name mapping
    if (cityAirportMap[normalizedInput]) {
      return cityAirportMap[normalizedInput];
    }
    
    return input.toUpperCase();
  };

  const getFilteredCities = (input) => {
    if (!input || input.length < 2) return popularCities;
    const normalizedInput = input.toLowerCase();
    return popularCities.filter(city => 
      city.name.toLowerCase().includes(normalizedInput) ||
      city.code.toLowerCase().includes(normalizedInput) ||
      city.country.toLowerCase().includes(normalizedInput)
    );
  };

  const handleSourceChange = (value) => {
    setSource(value);
    setShowSourceSuggestions(value.length > 0);
  };

  const handleDestChange = (value) => {
    setDestination(value);
    setShowDestSuggestions(value.length > 0);
  };

  const selectCity = (city, isSource = true) => {
    if (isSource) {
      setSource(city.code);
      setShowSourceSuggestions(false);
    } else {
      setDestination(city.code);
      setShowDestSuggestions(false);
    }
  };

  const handleRecommendationSelect = (recommendation) => {
    setDestination(recommendation.name.substring(0, 3).toUpperCase());
    setShowRecommendations(false);
    toast.success(`Selected ${recommendation.name} - Great choice!`);
  };



return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-600/10"></div>
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Section - Hero Content */}
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-6">
                    <FontAwesomeIcon icon={faPlane} className="mr-4 text-blue-600" />
                    Fly More, Pay Less
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Discover the world with unbeatable flight deals. Smart search, instant booking, and 24/7 support.
                  </p>
                </div>
                
                {/* Hero Image */}
                <div className="relative">
                  <img 
                    src="https://plus.unsplash.com/premium_photo-1679830513990-82a4280f41b4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Travel Destination" 
                    className="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <p className="text-2xl font-bold text-blue-600">500K+</p>
                    <p className="text-sm text-gray-600">Happy Travelers</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <p className="text-2xl font-bold text-orange-600">1000+</p>
                    <p className="text-sm text-gray-600">Destinations</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <p className="text-2xl font-bold text-green-600">24/7</p>
                    <p className="text-sm text-gray-600">Support</p>
                  </div>
                </div>
              </div>

              {/* Right Section - Enhanced Flight Search */}
              <div className="">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-2">
                      Find Your Perfect Flight
                    </h2>
                    <p className="text-gray-600">Search millions of flights in seconds</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* From/To Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                      <div className="relative">
                        <label htmlFor="source" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <FontAwesomeIcon icon={faPlane} className="mr-2 text-blue-600" />
                          From
                        </label>
                        <input 
                          type="text" 
                          id="source" 
                          value={source}
                          onChange={(e) => handleSourceChange(e.target.value)}
                          onFocus={() => setShowSourceSuggestions(true)}
                          onBlur={() => setTimeout(() => setShowSourceSuggestions(false), 200)}
                          className={`w-full border-2 rounded-xl p-4 text-lg font-medium transition-all duration-200 focus:ring-4 focus:ring-blue-100 ${errors.source ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                          placeholder="Delhi, Mumbai, DEL..."
                        />
                        {showSourceSuggestions && (
                          <div className="absolute z-20 w-full bg-white border border-gray-200 rounded-xl mt-2 max-h-48 overflow-y-auto shadow-2xl">
                            {getFilteredCities(source).map((city, index) => (
                              <div 
                                key={index}
                                onClick={() => selectCity(city, true)}
                                className="p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <span className="font-semibold text-gray-800">{city.name}</span>
                                    <span className="text-sm text-blue-600 ml-2 font-medium">({city.code})</span>
                                  </div>
                                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{city.country}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {errors.source && <p className="text-red-500 text-sm mt-2 flex items-center"><span className="mr-1">⚠️</span>{errors.source}</p>}
                      </div>
                      
                      {/* Swap Button */}
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 md:block hidden">
                        <button 
                          type="button" 
                          onClick={swapLocations}
                          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
                        >
                          <FontAwesomeIcon icon={faExchangeAlt} className="text-lg" />
                        </button>
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <FontAwesomeIcon icon={faPlane} className="mr-2 text-orange-600 transform rotate-45" />
                          To
                        </label>
                        <input 
                          type="text" 
                          id="destination" 
                          value={destination}
                          onChange={(e) => handleDestChange(e.target.value)}
                          onFocus={() => setShowDestSuggestions(true)}
                          onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
                          className={`w-full border-2 rounded-xl p-4 text-lg font-medium transition-all duration-200 focus:ring-4 focus:ring-orange-100 ${errors.destination ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'}`}
                          placeholder="Mumbai, Goa, BOM..."
                        />
                        {showDestSuggestions && (
                          <div className="absolute z-20 w-full bg-white border border-gray-200 rounded-xl mt-2 max-h-48 overflow-y-auto shadow-2xl">
                            {getFilteredCities(destination).map((city, index) => (
                              <div 
                                key={index}
                                onClick={() => selectCity(city, false)}
                                className="p-4 hover:bg-orange-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <span className="font-semibold text-gray-800">{city.name}</span>
                                    <span className="text-sm text-orange-600 ml-2 font-medium">({city.code})</span>
                                  </div>
                                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{city.country}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {errors.destination && <p className="text-red-500 text-sm mt-2 flex items-center"><span className="mr-1">⚠️</span>{errors.destination}</p>}
                      </div>
                    </div>
                    
                    {/* Mobile Swap Button */}
                    <div className="flex justify-center md:hidden mb-4">
                      <button 
                        type="button" 
                        onClick={swapLocations}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
                      >
                        <FontAwesomeIcon icon={faExchangeAlt} />
                      </button>
                    </div>
                    
                    {/* Date and Class */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="departure" className="block text-sm font-semibold text-gray-700 mb-2">Departure Date</label>
                        <input 
                          type="date" 
                          id="departure" 
                          value={departure}
                          onChange={(e) => setDeparture(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full border-2 rounded-xl p-4 text-lg transition-all duration-200 focus:ring-4 focus:ring-green-100 ${errors.departure ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'}`}
                        />
                        {errors.departure && <p className="text-red-500 text-sm mt-2 flex items-center"><span className="mr-1">⚠️</span>{errors.departure}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="class" className="block text-sm font-semibold text-gray-700 mb-2">Class</label>
                        <select 
                          id="class" 
                          className="w-full border-2 border-gray-200 rounded-xl p-4 text-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200" 
                          value={flightClass}
                          onChange={(e) => setFlightClass(e.target.value)}
                        >
                          {FLIGHT_CLASSES.map(cls => (
                            <option key={cls.value} value={cls.value}>{cls.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Travelers */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Travelers</label>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                          <label className="block text-xs text-gray-600 mb-1">Adults</label>
                          <input 
                            type="number" 
                            id="adults" 
                            value={adults}
                            onChange={(e)=>setAdults(e.target.value)} 
                            className="w-full border-2 border-gray-200 rounded-xl p-3 text-center text-lg font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200" 
                            min="1" max="9"
                          />
                        </div>
                        <div className="text-center">
                          <label className="block text-xs text-gray-600 mb-1">Children</label>
                          <input 
                            type="number" 
                            id="children" 
                            value={children}
                            onChange={(e)=>setChildren(e.target.value)}  
                            className="w-full border-2 border-gray-200 rounded-xl p-3 text-center text-lg font-semibold focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200" 
                            min="0" max="9"
                          />
                        </div>
                        <div className="text-center">
                          <label className="block text-xs text-gray-600 mb-1">Infants</label>
                          <input 
                            type="number" 
                            id="infants" 
                            value={infants}
                            onChange={(e)=>setInfants(e.target.value)}  
                            className="w-full border-2 border-gray-200 rounded-xl p-3 text-center text-lg font-semibold focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200" 
                            min="0" max="9"
                          />
                        </div>
                      </div>
                    </div>
             
                    
                    {/* Search Button */}
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <PlaneLoader message="Searching Amazing Deals..." />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <FontAwesomeIcon icon={faPlane} className="mr-3" />
                          Search Flights
                        </div>
                      )}
                    </button>
                    
                    {/* Additional Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      <button 
                        type="button"
                        onClick={() => setShowRecommendations(!showRecommendations)}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                      >
                        <FontAwesomeIcon icon={faPlane} className="mr-2" />
                        Smart Tips
                      </button>
                      
                      <button 
                        type="button"
                        onClick={() => setShowMultiCityPlanner(true)}
                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                      >
                        <FontAwesomeIcon icon={faRoute} className="mr-2" />
                        Multi-City
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Smart Recommendations Section */}
        {showRecommendations && (
          <div className="container mx-auto px-4 py-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <SmartRecommendations 
                budget={userBudget}
                onSelectRecommendation={handleRecommendationSelect}
              />
            </div>
          </div>
        )}
        
        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose AirTracker?</h2>
            <p className="text-xl text-gray-600">Experience the future of flight booking</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faPlane} className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Search</h3>
              <p className="text-gray-600">AI-powered flight search with personalized recommendations</p>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faRoute} className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Multi-City Planning</h3>
              <p className="text-gray-600">Plan complex itineraries with multiple destinations</p>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">24/7</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support for peace of mind</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Multi-City Planner Modal */}
      <MultiCityPlanner 
        isOpen={showMultiCityPlanner}
        onClose={() => setShowMultiCityPlanner(false)}
      />
    </>
  );
}
