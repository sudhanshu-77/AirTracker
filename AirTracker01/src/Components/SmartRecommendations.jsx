import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot, 
  faCalendarAlt, 
  faMapMarkerAlt, 
  faBolt,
  faChevronLeft,
  faChevronRight,
  faPlane
} from '@fortawesome/free-solid-svg-icons';

const SmartRecommendations = ({ budget = 20000, onSelectRecommendation }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // AI-powered destination suggestions based on budget
  const getDestinationsByBudget = (budget) => {
    const destinations = [
      { name: 'Goa', price: 4500, savings: 2000, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300', season: 'Perfect beach weather' },
      { name: 'Bangkok', price: 8500, savings: 3500, image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=300', season: 'Cool season' },
      { name: 'Dubai', price: 12000, savings: 4000, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300', season: 'Pleasant weather' },
      { name: 'Singapore', price: 15000, savings: 5000, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=300', season: 'Year-round destination' },
      { name: 'London', price: 25000, savings: 8000, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300', season: 'Spring season' },
      { name: 'Paris', price: 28000, savings: 7000, image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300', season: 'Romantic spring' }
    ];
    return destinations.filter(dest => dest.price <= budget).slice(0, 4);
  };

  // Generate calendar with price heatmap
  const generateCalendarData = () => {
    const dates = [];
    const today = new Date();
    const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    // Add empty cells for days before month starts
    const startDay = startDate.getDay();
    for (let i = 0; i < startDay; i++) {
      dates.push(null);
    }
    
    // Add all days of the month with mock prices
    for (let day = 1; day <= endDate.getDate(); day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isPast = date < today;
      const basePrice = 8000;
      const variation = Math.sin(day / 7) * 2000 + Math.random() * 1000;
      const price = Math.round(basePrice + variation);
      
      dates.push({
        day,
        date,
        price,
        isPast,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        isCheapest: price < 7000,
        isExpensive: price > 9500
      });
    }
    
    return dates;
  };

  // Alternative airports data
  const alternativeAirports = [
    { main: 'Delhi (DEL)', alternatives: [
      { code: 'DEL', name: 'Indira Gandhi Intl', price: 8500, distance: '0 km' },
      { code: 'GGN', name: 'Gurgaon Airport', price: 7800, distance: '15 km', savings: 700 },
      { code: 'FBD', name: 'Faridabad Airstrip', price: 7200, distance: '25 km', savings: 1300 }
    ]},
    { main: 'Mumbai (BOM)', alternatives: [
      { code: 'BOM', name: 'Chhatrapati Shivaji', price: 9200, distance: '0 km' },
      { code: 'PNQ', name: 'Pune Airport', price: 8100, distance: '150 km', savings: 1100 }
    ]}
  ];

  const calendarData = useMemo(() => generateCalendarData(), [currentMonth]);
  const budgetDestinations = useMemo(() => getDestinationsByBudget(budget), [budget]);

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const getPriceColor = (price) => {
    if (price < 7000) return 'bg-green-500 text-white';
    if (price < 8500) return 'bg-yellow-400 text-gray-800';
    if (price < 9500) return 'bg-orange-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center mb-6">
        <FontAwesomeIcon icon={faRobot} className="text-2xl text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Smart Recommendations</h2>
        <FontAwesomeIcon icon={faBolt} className="text-yellow-500 ml-2" />
      </div>

      {/* AI Destination Suggestions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Perfect destinations for your ₹{budget.toLocaleString()} budget
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {budgetDestinations.map((dest, index) => (
            <div key={index} className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                 onClick={() => onSelectRecommendation?.(dest)}>
              <img src={dest.image} alt={dest.name} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h4 className="font-bold text-lg">{dest.name}</h4>
                <p className="text-sm opacity-90">{dest.season}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold">₹{dest.price.toLocaleString()}</span>
                  <span className="bg-green-500 px-2 py-1 rounded-full text-xs">
                    Save ₹{dest.savings.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flexible Dates Calendar */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-600" />
          Best prices this month
        </h3>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 transition-colors duration-300">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-200 rounded-full">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
            <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-200 rounded-full">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarData.map((dateInfo, index) => (
              <div key={index} className="aspect-square">
                {dateInfo && (
                  <button
                    onClick={() => setSelectedDate(dateInfo)}
                    disabled={dateInfo.isPast}
                    className={`w-full h-full rounded-lg text-xs font-semibold transition-all hover:scale-110 ${
                      dateInfo.isPast 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : getPriceColor(dateInfo.price)
                    } ${selectedDate?.day === dateInfo.day ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div>{dateInfo.day}</div>
                    {!dateInfo.isPast && (
                      <div className="text-xs">₹{Math.round(dateInfo.price/1000)}k</div>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {/* Price Legend */}
          <div className="flex justify-center mt-4 space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
              <span>Cheapest</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded mr-1"></div>
              <span>Good Deal</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
              <span>Average</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
              <span>Expensive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Airports */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-green-600" />
          Save money with nearby airports
        </h3>
        <div className="space-y-4">
          {alternativeAirports.map((airport, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-3">{airport.main}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {airport.alternatives.map((alt, altIndex) => (
                  <div key={altIndex} className={`p-3 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                    alt.savings ? 'border-green-200 bg-green-50 hover:border-green-400' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-gray-800">{alt.code}</div>
                        <div className="text-sm text-gray-600">{alt.name}</div>
                      </div>
                      {alt.savings && (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -₹{alt.savings}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{alt.distance}</span>
                      <span className="font-bold text-gray-800">₹{alt.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartRecommendations;