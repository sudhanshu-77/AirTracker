// Application Configuration
export const APP_CONFIG = {
  name: 'AirTracker',
  version: '2.0.0',
  description: 'Modern flight booking platform',
  author: 'Sudhanshu Tripathi',
  repository: 'https://github.com/sudhanshu-77/AirTracker'
};

// API Configuration
export const FLIGHT_API_BASE_URL = 'https://api.flightapi.io';
export const FLIGHT_API_KEY = import.meta.env.VITE_FLIGHT_API_KEY || '655e1b03de8b4b8c2c7e1116';

// Storage Keys
export const STORAGE_KEYS = {
  AUTH: 'auth',
  BOOKING_HISTORY: 'bookingHistory',
  BOARDING_PASSES: 'boardingPasses',
  PRICE_ALERTS: 'priceAlerts',
  FLIGHT_TRACKING: 'flightTrackingHistory',
  THEME: 'theme',
  PWA_DISMISSED: 'pwa-install-dismissed'
};

// Flight Classes
export const FLIGHT_CLASSES = [
  { value: 'Economy', label: 'Economy' },
  { value: 'Business', label: 'Business' },
  { value: 'First', label: 'First Class' },
  { value: 'Premium', label: 'Premium Economy' }
];

// Passenger Types
export const PASSENGER_TYPES = [
  { value: 'Adult', label: 'Adult (12+ years)' },
  { value: 'Child', label: 'Child (2-11 years)' },
  { value: 'Infant', label: 'Infant (0-2 years)' }
];

// Popular airports for autocomplete
export const POPULAR_AIRPORTS = [
  { code: 'DEL', name: 'Delhi', city: 'New Delhi', country: 'India' },
  { code: 'BOM', name: 'Mumbai', city: 'Mumbai', country: 'India' },
  { code: 'BLR', name: 'Bangalore', city: 'Bangalore', country: 'India' },
  { code: 'MAA', name: 'Chennai', city: 'Chennai', country: 'India' },
  { code: 'CCU', name: 'Kolkata', city: 'Kolkata', country: 'India' },
  { code: 'HYD', name: 'Hyderabad', city: 'Hyderabad', country: 'India' },
  { code: 'GOI', name: 'Goa', city: 'Goa', country: 'India' },
  { code: 'COK', name: 'Kochi', city: 'Kochi', country: 'India' },
  { code: 'AMD', name: 'Ahmedabad', city: 'Ahmedabad', country: 'India' },
  { code: 'PNQ', name: 'Pune', city: 'Pune', country: 'India' },
  { code: 'JFK', name: 'New York', city: 'New York', country: 'USA' },
  { code: 'LAX', name: 'Los Angeles', city: 'Los Angeles', country: 'USA' },
  { code: 'LHR', name: 'London', city: 'London', country: 'UK' },
  { code: 'DXB', name: 'Dubai', city: 'Dubai', country: 'UAE' }
];