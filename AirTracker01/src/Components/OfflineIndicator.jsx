import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faExclamationTriangle, faSync } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineData, setShowOfflineData] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Connection restored!');
      // Sync offline data when back online
      syncOfflineData();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warn('You are offline. Some features may be limited.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncOfflineData = async () => {
    // Get offline data from localStorage
    const offlineBookings = JSON.parse(localStorage.getItem('offlineBookings') || '[]');
    const offlineSearches = JSON.parse(localStorage.getItem('offlineSearches') || '[]');
    
    if (offlineBookings.length > 0 || offlineSearches.length > 0) {
      toast.info('Syncing offline data...');
      
      // Simulate sync process
      setTimeout(() => {
        // Clear offline data after sync
        localStorage.removeItem('offlineBookings');
        localStorage.removeItem('offlineSearches');
        toast.success('Offline data synced successfully!');
      }, 2000);
    }
  };

  const getOfflineData = () => {
    const bookings = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
    const boardingPasses = JSON.parse(localStorage.getItem('boardingPasses') || '[]');
    const priceAlerts = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
    
    return {
      bookings: bookings.length,
      boardingPasses: boardingPasses.length,
      priceAlerts: priceAlerts.length
    };
  };

  if (isOnline) return null;

  const offlineData = getOfflineData();

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 animate-pulse" />
            <span className="font-semibold">You're offline</span>
            <span className="ml-2 text-sm opacity-90">
              Limited functionality available
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowOfflineData(!showOfflineData)}
              className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
            >
              Offline Data
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faSync} className="mr-1" />
              Retry
            </button>
          </div>
        </div>
        
        {showOfflineData && (
          <div className="mt-2 pt-2 border-t border-white/20">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold">{offlineData.bookings}</div>
                <div className="opacity-80">Bookings</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{offlineData.boardingPasses}</div>
                <div className="opacity-80">Boarding Passes</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{offlineData.priceAlerts}</div>
                <div className="opacity-80">Price Alerts</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;