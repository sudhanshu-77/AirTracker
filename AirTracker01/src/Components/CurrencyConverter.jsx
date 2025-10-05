import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExchangeAlt, 
  faDollarSign, 
  faEuroSign,
  faPoundSign,
  faYenSign,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const CurrencyConverter = ({ price = 10000, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedPrice, setConvertedPrice] = useState(price);

  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', icon: null },
    { code: 'USD', symbol: '$', name: 'US Dollar', icon: faDollarSign },
    { code: 'EUR', symbol: '€', name: 'Euro', icon: faEuroSign },
    { code: 'GBP', symbol: '£', name: 'British Pound', icon: faPoundSign },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', icon: faYenSign },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', icon: null },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', icon: null },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', icon: null }
  ];

  // Mock exchange rates (in production, fetch from API)
  const mockExchangeRates = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    JPY: 1.8,
    AED: 0.044,
    SGD: 0.016,
    CAD: 0.016
  };

  useEffect(() => {
    // In production, fetch real exchange rates from API
    setExchangeRates(mockExchangeRates);
  }, []);

  useEffect(() => {
    if (exchangeRates[selectedCurrency]) {
      const converted = price * exchangeRates[selectedCurrency];
      setConvertedPrice(converted);
      onCurrencyChange?.(selectedCurrency, converted);
    }
  }, [price, selectedCurrency, exchangeRates]);

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency.code);
    setIsOpen(false);
  };

  const formatPrice = (amount, currencyCode) => {
    const currency = currencies.find(c => c.code === currencyCode);
    if (!currency) return amount.toFixed(2);

    if (currencyCode === 'JPY') {
      return `${currency.symbol}${Math.round(amount).toLocaleString()}`;
    }
    return `${currency.symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getCurrentCurrency = () => {
    return currencies.find(c => c.code === selectedCurrency);
  };

  return (
    <div className="relative">
      {/* Currency Display Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        {getCurrentCurrency()?.icon && (
          <FontAwesomeIcon icon={getCurrentCurrency().icon} className="text-green-600" />
        )}
        <span className="font-semibold text-gray-800 dark:text-white">
          {formatPrice(convertedPrice, selectedCurrency)}
        </span>
        <FontAwesomeIcon icon={faExchangeAlt} className="text-gray-400 text-sm" />
      </button>

      {/* Currency Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-50 min-w-64">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-white">Select Currency</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencySelect(currency)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedCurrency === currency.code
                      ? 'bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {currency.icon && (
                      <FontAwesomeIcon icon={currency.icon} className="text-green-600" />
                    )}
                    <div className="text-left">
                      <div className="font-semibold text-gray-800 dark:text-white">
                        {currency.code}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {currency.name}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-800 dark:text-white">
                    {formatPrice(price * (exchangeRates[currency.code] || 1), currency.code)}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Exchange rates updated daily
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Multi-Currency Price Display Component
export const MultiCurrencyPrice = ({ basePrice, baseCurrency = 'INR' }) => {
  const [showAll, setShowAll] = useState(false);
  
  const exchangeRates = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095
  };

  const currencies = [
    { code: 'INR', symbol: '₹' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' }
  ];

  const formatPrice = (amount, currency) => {
    const curr = currencies.find(c => c.code === currency.code);
    return `${curr.symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-2">
      <div className="text-2xl font-bold text-green-600">
        ₹{basePrice.toLocaleString()}
      </div>
      
      {showAll && (
        <div className="space-y-1">
          {currencies.slice(1).map(currency => (
            <div key={currency.code} className="text-sm text-gray-600 dark:text-gray-400">
              {formatPrice(basePrice * exchangeRates[currency.code], currency)}
            </div>
          ))}
        </div>
      )}
      
      <button
        onClick={() => setShowAll(!showAll)}
        className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
      >
        {showAll ? 'Hide' : 'Show'} other currencies
      </button>
    </div>
  );
};

export default CurrencyConverter;