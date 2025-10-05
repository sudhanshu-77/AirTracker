import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCloudSun, 
  faThermometerHalf, 
  faCalendarAlt, 
  faMapMarkerAlt,
  faTimes,
  faUmbrella,
  faWind,
  faEye,
  faSun,
  faCloud,
  faCloudRain,
  faSnowflake,
  faCalendarCheck,
  faMusic,
  faCrown,
  faGift
} from '@fortawesome/free-solid-svg-icons';

const WeatherInsights = ({ isOpen, onClose, destination, flightInfo }) => {
  const [activeTab, setActiveTab] = useState('weather');
  const [weatherData, setWeatherData] = useState(null);
  const [bestTimeData, setBestTimeData] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [destinationInfo, setDestinationInfo] = useState(null);

  useEffect(() => {
    if (isOpen && destination) {
      loadWeatherInsights();
    }
  }, [isOpen, destination]);

  const loadWeatherInsights = async () => {
    setLoading(true);
    
    try {
      const cityName = getCityFromCode(destination);
      setDestinationInfo({ code: destination, name: cityName });
      
      // Load weather data from OpenWeatherMap API
      const weather = await fetchWeatherData(cityName);
      setWeatherData(weather);
      
      // Load location-specific data
      setBestTimeData(generateBestTimeData(destination));
      setEventsData(generateEventsData(destination));
    } catch (error) {
      console.error('Error loading weather insights:', error);
      // Fallback to mock data
      setWeatherData(generateMockWeatherData(destination));
      setBestTimeData(generateBestTimeData(destination));
      setEventsData(generateEventsData(destination));
    } finally {
      setLoading(false);
    }
  };
  
  const getCityFromCode = (code) => {
    const airportCities = {
      'JFK': 'New York', 'LAX': 'Los Angeles', 'LHR': 'London', 'CDG': 'Paris',
      'NRT': 'Tokyo', 'SYD': 'Sydney', 'DXB': 'Dubai', 'SIN': 'Singapore',
      'DEL': 'Delhi', 'BOM': 'Mumbai', 'BLR': 'Bangalore', 'MAA': 'Chennai',
      'CCU': 'Kolkata', 'HYD': 'Hyderabad', 'GOI': 'Goa', 'AMD': 'Ahmedabad',
      'PNQ': 'Pune', 'JAI': 'Jaipur', 'LKO': 'Lucknow', 'COK': 'Kochi'
    };
    return airportCities[code] || code;
  };
  
  const fetchWeatherData = async (cityName) => {
    // Using OpenWeatherMap API (free tier)
    const API_KEY = '2d8a45c2ed955c8b4b0d7e5c6f4a3b9e'; // Demo key - replace with real one
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) throw new Error('Weather API failed');
      
      const data = await response.json();
      
      return {
        current: {
          name: data.city.name,
          temp: Math.round(data.list[0].main.temp),
          condition: mapWeatherCondition(data.list[0].weather[0].main),
          humidity: data.list[0].main.humidity,
          wind: Math.round(data.list[0].wind.speed * 3.6), // Convert m/s to km/h
          visibility: Math.round((data.list[0].visibility || 10000) / 1000)
        },
        forecast: data.list.slice(0, 7).map((item, index) => ({
          day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          date: new Date(item.dt * 1000).getDate(),
          high: Math.round(item.main.temp_max),
          low: Math.round(item.main.temp_min),
          condition: mapWeatherCondition(item.weather[0].main),
          precipitation: Math.round((item.pop || 0) * 100)
        }))
      };
    } catch (error) {
      throw error;
    }
  };
  
  const mapWeatherCondition = (condition) => {
    const conditionMap = {
      'Clear': 'sunny',
      'Clouds': 'cloudy',
      'Rain': 'rainy',
      'Snow': 'snowy',
      'Thunderstorm': 'rainy',
      'Drizzle': 'rainy',
      'Mist': 'cloudy',
      'Fog': 'cloudy'
    };
    return conditionMap[condition] || 'partly-cloudy';
  };

  const generateMockWeatherData = (dest) => {
    const cities = {
      'JFK': { name: 'New York', temp: 18, condition: 'cloudy', humidity: 60, wind: 15, visibility: 10 },
      'LAX': { name: 'Los Angeles', temp: 24, condition: 'sunny', humidity: 55, wind: 8, visibility: 15 },
      'LHR': { name: 'London', temp: 12, condition: 'rainy', humidity: 80, wind: 18, visibility: 6 },
      'CDG': { name: 'Paris', temp: 15, condition: 'cloudy', humidity: 70, wind: 12, visibility: 8 },
      'NRT': { name: 'Tokyo', temp: 20, condition: 'partly-cloudy', humidity: 65, wind: 10, visibility: 12 },
      'DEL': { name: 'Delhi', temp: 28, condition: 'sunny', humidity: 65, wind: 12, visibility: 8 },
      'BOM': { name: 'Mumbai', temp: 32, condition: 'cloudy', humidity: 78, wind: 15, visibility: 6 },
      'BLR': { name: 'Bangalore', temp: 25, condition: 'partly-cloudy', humidity: 70, wind: 8, visibility: 10 },
      'MAA': { name: 'Chennai', temp: 34, condition: 'sunny', humidity: 82, wind: 18, visibility: 7 },
      'CCU': { name: 'Kolkata', temp: 30, condition: 'rainy', humidity: 85, wind: 10, visibility: 5 },
      'HYD': { name: 'Hyderabad', temp: 29, condition: 'partly-cloudy', humidity: 68, wind: 14, visibility: 9 },
      'GOI': { name: 'Goa', temp: 31, condition: 'sunny', humidity: 75, wind: 16, visibility: 12 },
      'AMD': { name: 'Ahmedabad', temp: 35, condition: 'sunny', humidity: 45, wind: 11, visibility: 9 },
      'PNQ': { name: 'Pune', temp: 27, condition: 'partly-cloudy', humidity: 65, wind: 9, visibility: 11 },
      'JAI': { name: 'Jaipur', temp: 33, condition: 'sunny', humidity: 55, wind: 13, visibility: 10 },
      'LKO': { name: 'Lucknow', temp: 31, condition: 'cloudy', humidity: 72, wind: 8, visibility: 7 },
      'COK': { name: 'Kochi', temp: 29, condition: 'rainy', humidity: 88, wind: 12, visibility: 6 }
    };

    const cityData = cities[dest] || { name: dest, temp: 26, condition: 'sunny', humidity: 70, wind: 10, visibility: 8 };
    
    return {
      current: cityData,
      forecast: Array.from({ length: 7 }, (_, i) => ({
        day: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).getDate(),
        high: cityData.temp + Math.floor(Math.random() * 6) - 3,
        low: cityData.temp - Math.floor(Math.random() * 8) - 5,
        condition: ['sunny', 'cloudy', 'partly-cloudy', 'rainy'][Math.floor(Math.random() * 4)],
        precipitation: Math.floor(Math.random() * 40)
      }))
    };
  };

  const generateBestTimeData = (dest) => {
    const recommendations = {
      'JFK': {
        bestMonths: ['Apr', 'May', 'Jun', 'Sep', 'Oct'],
        peakSeason: 'April to October',
        offSeason: 'November to March',
        weather: 'Four distinct seasons, cold winters',
        activities: ['Central Park', 'Times Square', 'Statue of Liberty', 'Broadway shows'],
        avgTemp: { winter: '-3-7°C', summer: '20-29°C', spring: '10-20°C' }
      },
      'LAX': {
        bestMonths: ['Mar', 'Apr', 'May', 'Sep', 'Oct', 'Nov'],
        peakSeason: 'March to November',
        offSeason: 'December to February',
        weather: 'Mediterranean climate, mild year-round',
        activities: ['Hollywood tours', 'Beach visits', 'Theme parks', 'Sunset Strip'],
        avgTemp: { winter: '9-20°C', summer: '18-28°C', fall: '15-25°C' }
      },
      'LHR': {
        bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
        peakSeason: 'May to September',
        offSeason: 'October to April',
        weather: 'Temperate oceanic, frequent rain',
        activities: ['Museums', 'Royal palaces', 'Thames cruises', 'West End shows'],
        avgTemp: { winter: '2-8°C', summer: '12-22°C', spring: '6-15°C' }
      },
      'DEL': {
        bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        peakSeason: 'October to March',
        offSeason: 'April to September',
        weather: 'Pleasant winters, extreme summers',
        activities: ['Red Fort tours', 'India Gate visits', 'Chandni Chowk shopping', 'Lotus Temple'],
        avgTemp: { winter: '5-25°C', summer: '25-47°C', monsoon: '26-35°C' }
      },
      'BOM': {
        bestMonths: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        peakSeason: 'November to February',
        offSeason: 'June to September',
        weather: 'Tropical climate, heavy monsoons',
        activities: ['Marine Drive walks', 'Gateway of India', 'Bollywood studios', 'Juhu Beach'],
        avgTemp: { winter: '16-32°C', summer: '24-34°C', monsoon: '24-30°C' }
      },
      'BLR': {
        bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        peakSeason: 'October to April',
        offSeason: 'May to September',
        weather: 'Pleasant climate year-round',
        activities: ['Lalbagh Gardens', 'Bangalore Palace', 'Cubbon Park', 'Brewery tours'],
        avgTemp: { winter: '15-28°C', summer: '21-35°C', monsoon: '20-28°C' }
      },
      'MAA': {
        bestMonths: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        peakSeason: 'November to March',
        offSeason: 'April to October',
        weather: 'Hot and humid, coastal climate',
        activities: ['Marina Beach', 'Kapaleeshwarar Temple', 'Fort St. George', 'Mahabalipuram'],
        avgTemp: { winter: '20-30°C', summer: '26-40°C', monsoon: '25-35°C' }
      },
      'CCU': {
        bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        peakSeason: 'October to March',
        offSeason: 'April to September',
        weather: 'Humid subtropical, heavy monsoons',
        activities: ['Victoria Memorial', 'Howrah Bridge', 'Dakshineswar Temple', 'Park Street'],
        avgTemp: { winter: '12-27°C', summer: '27-36°C', monsoon: '26-32°C' }
      },
      'HYD': {
        bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        peakSeason: 'October to March',
        offSeason: 'April to September',
        weather: 'Semi-arid climate, moderate rainfall',
        activities: ['Charminar', 'Golconda Fort', 'Ramoji Film City', 'Hussain Sagar Lake'],
        avgTemp: { winter: '15-29°C', summer: '23-40°C', monsoon: '23-32°C' }
      },
      'GOI': {
        bestMonths: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        peakSeason: 'November to April',
        offSeason: 'May to October',
        weather: 'Tropical coastal, monsoon rains',
        activities: ['Beach hopping', 'Water sports', 'Spice plantations', 'Portuguese churches'],
        avgTemp: { winter: '20-32°C', summer: '24-35°C', monsoon: '24-30°C' }
      },
      'AMD': {
        bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        peakSeason: 'October to March',
        offSeason: 'April to September',
        weather: 'Semi-arid, hot summers',
        activities: ['Sabarmati Ashram', 'Akshardham Temple', 'Kankaria Lake', 'Heritage walks'],
        avgTemp: { winter: '12-30°C', summer: '25-43°C', monsoon: '26-35°C' }
      }
    };

    return recommendations[dest] || recommendations['DEL'];
  };

  const generateEventsData = (dest) => {
    const events = {
      'JFK': [
        { name: 'New York Fashion Week', date: 'Feb & Sep', type: 'cultural', icon: faMusic },
        { name: 'Thanksgiving Day Parade', date: 'Nov 28', type: 'festival', icon: faGift },
        { name: 'Times Square New Year', date: 'Dec 31', type: 'festival', icon: faCalendarCheck },
        { name: 'Broadway Week', date: 'Jan & Sep', type: 'entertainment', icon: faCrown },
        { name: 'Central Park SummerStage', date: 'Jun-Aug', type: 'cultural', icon: faMusic },
        { name: 'NYC Marathon', date: 'Nov 3', type: 'sports', icon: faCalendarCheck }
      ],
      'LAX': [
        { name: 'Coachella Festival', date: 'Apr 12-21', type: 'entertainment', icon: faMusic },
        { name: 'Academy Awards', date: 'Mar 10', type: 'cultural', icon: faCrown },
        { name: 'LA Film Festival', date: 'Jun 19-28', type: 'cultural', icon: faMusic },
        { name: 'Rose Parade', date: 'Jan 1', type: 'festival', icon: faGift },
        { name: 'LA Marathon', date: 'Mar 17', type: 'sports', icon: faCalendarCheck },
        { name: 'Sunset Strip Music Festival', date: 'Aug 15-17', type: 'entertainment', icon: faMusic }
      ],
      'LHR': [
        { name: 'Notting Hill Carnival', date: 'Aug 25-26', type: 'festival', icon: faGift },
        { name: 'Edinburgh Festival', date: 'Aug 2-26', type: 'cultural', icon: faMusic },
        { name: 'Wimbledon Championships', date: 'Jun 24-Jul 7', type: 'sports', icon: faCalendarCheck },
        { name: 'London Fashion Week', date: 'Feb & Sep', type: 'cultural', icon: faCrown },
        { name: 'Thames Festival', date: 'Sep 14-15', type: 'cultural', icon: faMusic },
        { name: 'Christmas Markets', date: 'Nov-Dec', type: 'festival', icon: faGift }
      ],
      'DEL': [
        { name: 'Delhi International Arts Festival', date: 'Dec 15-25', type: 'cultural', icon: faMusic },
        { name: 'Red Fort Light Show', date: 'Daily 7-9 PM', type: 'entertainment', icon: faCrown },
        { name: 'Diwali Celebrations', date: 'Nov 12', type: 'festival', icon: faGift },
        { name: 'Republic Day Parade', date: 'Jan 26', type: 'national', icon: faCalendarCheck },
        { name: 'Qutub Festival', date: 'Nov-Dec', type: 'cultural', icon: faMusic },
        { name: 'Delhi Book Fair', date: 'Aug 28-Sep 5', type: 'cultural', icon: faCalendarCheck }
      ],
      'BOM': [
        { name: 'Mumbai Film Festival', date: 'Oct 17-24', type: 'cultural', icon: faMusic },
        { name: 'Ganesh Chaturthi', date: 'Aug 31-Sep 10', type: 'festival', icon: faGift },
        { name: 'Kala Ghoda Arts Festival', date: 'Feb 4-12', type: 'cultural', icon: faMusic },
        { name: 'Mumbai Marathon', date: 'Jan 21', type: 'sports', icon: faCalendarCheck },
        { name: 'Navratri Festival', date: 'Sep-Oct', type: 'festival', icon: faGift },
        { name: 'Prithvi Theatre Festival', date: 'Nov 3-10', type: 'cultural', icon: faCrown }
      ],
      'BLR': [
        { name: 'Bangalore Literature Festival', date: 'Nov 25-27', type: 'cultural', icon: faMusic },
        { name: 'Karaga Festival', date: 'Apr 15', type: 'festival', icon: faGift },
        { name: 'Bangalore Comic Con', date: 'Dec 9-10', type: 'entertainment', icon: faCrown },
        { name: 'Classical Music Season', date: 'Dec-Jan', type: 'cultural', icon: faMusic },
        { name: 'Dussehra Celebrations', date: 'Sep-Oct', type: 'festival', icon: faGift },
        { name: 'Bangalore International Film Festival', date: 'Feb-Mar', type: 'cultural', icon: faMusic }
      ],
      'MAA': [
        { name: 'Chennai Music Season', date: 'Dec 15-Jan 15', type: 'cultural', icon: faMusic },
        { name: 'Pongal Festival', date: 'Jan 14-17', type: 'festival', icon: faGift },
        { name: 'Chennai Book Fair', date: 'Jan 10-26', type: 'cultural', icon: faCalendarCheck },
        { name: 'Natyanjali Dance Festival', date: 'Feb-Mar', type: 'cultural', icon: faMusic },
        { name: 'Chennai International Film Festival', date: 'Dec 12-19', type: 'cultural', icon: faCrown },
        { name: 'Margazhi Festival', date: 'Dec 15-Jan 15', type: 'cultural', icon: faMusic }
      ],
      'CCU': [
        { name: 'Durga Puja', date: 'Sep-Oct', type: 'festival', icon: faGift },
        { name: 'Kolkata Book Fair', date: 'Jan 28-Feb 9', type: 'cultural', icon: faCalendarCheck },
        { name: 'Kali Puja', date: 'Oct-Nov', type: 'festival', icon: faGift },
        { name: 'Kolkata Film Festival', date: 'Nov 10-17', type: 'cultural', icon: faMusic },
        { name: 'Poila Boishakh', date: 'Apr 14-15', type: 'festival', icon: faGift },
        { name: 'Dover Lane Music Conference', date: 'Jan 24-28', type: 'cultural', icon: faMusic }
      ],
      'HYD': [
        { name: 'Bonalu Festival', date: 'Jul-Aug', type: 'festival', icon: faGift },
        { name: 'Hyderabad Literary Festival', date: 'Jan 28-29', type: 'cultural', icon: faMusic },
        { name: 'Bathukamma Festival', date: 'Sep-Oct', type: 'festival', icon: faGift },
        { name: 'Deccan Festival', date: 'Feb 25-Mar 1', type: 'cultural', icon: faMusic },
        { name: 'Golconda Music Festival', date: 'Dec 15-17', type: 'cultural', icon: faMusic },
        { name: 'Hyderabad International Film Festival', date: 'Mar 15-22', type: 'cultural', icon: faCrown }
      ],
      'GOI': [
        { name: 'Goa Carnival', date: 'Feb 12-15', type: 'festival', icon: faGift },
        { name: 'Sunburn Festival', date: 'Dec 28-31', type: 'entertainment', icon: faMusic },
        { name: 'Shigmo Festival', date: 'Mar 8-21', type: 'festival', icon: faGift },
        { name: 'International Film Festival of India', date: 'Nov 20-28', type: 'cultural', icon: faCrown },
        { name: 'Feast of St. Francis Xavier', date: 'Dec 3', type: 'festival', icon: faCalendarCheck },
        { name: 'Goa Food & Cultural Festival', date: 'Apr 15-17', type: 'cultural', icon: faMusic }
      ],
      'AMD': [
        { name: 'Navratri Festival', date: 'Sep-Oct', type: 'festival', icon: faGift },
        { name: 'International Kite Festival', date: 'Jan 14', type: 'cultural', icon: faCalendarCheck },
        { name: 'Rann Utsav', date: 'Nov-Feb', type: 'cultural', icon: faMusic },
        { name: 'Gujarat Literature Festival', date: 'Jan 12-14', type: 'cultural', icon: faMusic },
        { name: 'Diwali Celebrations', date: 'Oct-Nov', type: 'festival', icon: faGift },
        { name: 'Ahmedabad Heritage Festival', date: 'Dec 20-25', type: 'cultural', icon: faCrown }
      ]
    };

    return events[dest] || events['DEL'];
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return faSun;
      case 'cloudy': return faCloud;
      case 'partly-cloudy': return faCloudSun;
      case 'rainy': return faCloudRain;
      case 'snowy': return faSnowflake;
      default: return faCloudSun;
    }
  };

  const getWeatherColor = (condition) => {
    switch (condition) {
      case 'sunny': return 'text-yellow-500';
      case 'cloudy': return 'text-gray-500';
      case 'partly-cloudy': return 'text-blue-400';
      case 'rainy': return 'text-blue-600';
      case 'snowy': return 'text-blue-200';
      default: return 'text-blue-400';
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
              <FontAwesomeIcon icon={faCloudSun} className="mr-3 text-blue-600" />
              Weather & Travel Insights
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Destination Info */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-2xl text-blue-600 mr-3" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {destinationInfo?.name || weatherData?.current?.name || destination}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400">
                    {destinationInfo?.code && `${destinationInfo.code} • `}Travel destination insights
                  </p>
                </div>
              </div>
              {flightInfo?.date && flightInfo?.time && (
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Arrival</p>
                  <p className="font-bold text-gray-800 dark:text-white">{flightInfo.time}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{flightInfo.date}</p>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('weather')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'weather'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faCloudSun} className="mr-2" />
              Weather Forecast
            </button>
            <button
              onClick={() => setActiveTab('besttime')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'besttime'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              Best Time to Visit
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'events'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
              Local Events
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading insights...</p>
            </div>
          ) : (
            <>
              {/* Weather Forecast Tab */}
              {activeTab === 'weather' && weatherData && (
                <div className="space-y-6">
                  {/* Current Weather */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">Current Weather</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center">
                        <FontAwesomeIcon 
                          icon={getWeatherIcon(weatherData.current.condition)} 
                          className="text-4xl mr-4"
                        />
                        <div>
                          <p className="text-3xl font-bold">{weatherData.current.temp}°C</p>
                          <p className="capitalize">{weatherData.current.condition.replace('-', ' ')}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faUmbrella} className="mr-2" />
                          <span>Humidity: {weatherData.current.humidity}%</span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faWind} className="mr-2" />
                          <span>Wind: {weatherData.current.wind} km/h</span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faEye} className="mr-2" />
                          <span>Visibility: {weatherData.current.visibility} km</span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faThermometerHalf} className="mr-2" />
                          <span>Feels like: {weatherData.current.temp + 2}°C</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 7-Day Forecast */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">7-Day Forecast</h3>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                      {weatherData.forecast.map((day, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                          <p className="font-semibold text-gray-800 dark:text-white">{day.day}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{day.date}</p>
                          <FontAwesomeIcon 
                            icon={getWeatherIcon(day.condition)} 
                            className={`text-2xl mb-2 ${getWeatherColor(day.condition)}`}
                          />
                          <div className="text-sm">
                            <p className="font-bold text-gray-800 dark:text-white">{day.high}°</p>
                            <p className="text-gray-600 dark:text-gray-400">{day.low}°</p>
                          </div>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{day.precipitation}%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Best Time to Visit Tab */}
              {activeTab === 'besttime' && bestTimeData && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 dark:bg-green-900 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">Peak Season</h3>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{bestTimeData.peakSeason}</p>
                      <p className="text-green-700 dark:text-green-300">{bestTimeData.weather}</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200 mb-4">Off Season</h3>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">{bestTimeData.offSeason}</p>
                      <p className="text-orange-700 dark:text-orange-300">Lower prices, fewer crowds</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">Best Months to Visit</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {bestTimeData.bestMonths.map((month, index) => (
                        <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {month}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-purple-50 dark:bg-purple-900 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4">Average Temperatures</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-purple-700 dark:text-purple-300">Winter:</span>
                          <span className="font-semibold text-purple-800 dark:text-purple-200">{bestTimeData.avgTemp.winter}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-700 dark:text-purple-300">Summer:</span>
                          <span className="font-semibold text-purple-800 dark:text-purple-200">{bestTimeData.avgTemp.summer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-700 dark:text-purple-300">Monsoon:</span>
                          <span className="font-semibold text-purple-800 dark:text-purple-200">{bestTimeData.avgTemp.monsoon}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">Recommended Activities</h3>
                      <div className="space-y-2">
                        {bestTimeData.activities.map((activity, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                            <span className="text-indigo-700 dark:text-indigo-300">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Local Events Tab */}
              {activeTab === 'events' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Upcoming Events & Festivals</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eventsData.map((event, index) => (
                      <div key={index} className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900 dark:to-purple-900 rounded-xl p-6 border border-pink-200 dark:border-pink-700">
                        <div className="flex items-start justify-between mb-3">
                          <FontAwesomeIcon icon={event.icon} className="text-2xl text-pink-600 dark:text-pink-400" />
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            event.type === 'cultural' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200' :
                            event.type === 'festival' ? 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-200' :
                            event.type === 'entertainment' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200' :
                            'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                          }`}>
                            {event.type}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{event.name}</h4>
                        <p className="text-pink-600 dark:text-pink-400 font-semibold">{event.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Close Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInsights;