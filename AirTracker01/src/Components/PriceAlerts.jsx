import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faPlus, 
  faTimes, 
  faPlane,
  faDollarSign,
  faCalendarAlt,
  faTrash,
  faBellSlash,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const PriceAlerts = ({ isOpen, onClose, flightRoute }) => {
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    from: flightRoute?.from || '',
    to: flightRoute?.to || '',
    targetPrice: '',
    currentPrice: flightRoute?.price || '',
    email: '',
    active: true
  });

  useEffect(() => {
    loadAlerts();
    if (flightRoute) {
      setNewAlert(prev => ({
        ...prev,
        from: flightRoute.from,
        to: flightRoute.to,
        currentPrice: flightRoute.price
      }));
    }
  }, [flightRoute]);

  const loadAlerts = () => {
    const savedAlerts = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
    setAlerts(savedAlerts);
  };

  const saveAlerts = (updatedAlerts) => {
    localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));
    setAlerts(updatedAlerts);
  };

  const createAlert = () => {
    if (!newAlert.from || !newAlert.to || !newAlert.targetPrice || !newAlert.email) {
      toast.error('Please fill all required fields');
      return;
    }

    const alert = {
      id: Date.now(),
      ...newAlert,
      createdAt: new Date().toISOString(),
      triggered: false,
      priceHistory: [{ price: newAlert.currentPrice, date: new Date().toISOString() }]
    };

    const updatedAlerts = [...alerts, alert];
    saveAlerts(updatedAlerts);
    
    setNewAlert({
      from: '',
      to: '',
      targetPrice: '',
      currentPrice: '',
      email: '',
      active: true
    });

    toast.success('Price alert created! We\'ll notify you when prices drop.');
    
    // Simulate price monitoring
    simulatePriceMonitoring(alert);
  };

  const simulatePriceMonitoring = (alert) => {
    // Simulate price changes every 30 seconds for demo
    const interval = setInterval(() => {
      const currentPrice = parseFloat(alert.currentPrice);
      const priceChange = (Math.random() - 0.5) * 1000; // Random price change
      const newPrice = Math.max(1000, currentPrice + priceChange);
      
      if (newPrice <= parseFloat(alert.targetPrice) && !alert.triggered) {
        triggerPriceAlert(alert, newPrice);
        clearInterval(interval);
      }
    }, 30000);

    // Clear interval after 5 minutes for demo
    setTimeout(() => clearInterval(interval), 300000);
  };

  const triggerPriceAlert = (alert, newPrice) => {
    const updatedAlerts = alerts.map(a => 
      a.id === alert.id 
        ? { ...a, triggered: true, triggeredPrice: newPrice, triggeredAt: new Date().toISOString() }
        : a
    );
    saveAlerts(updatedAlerts);
    
    // Show notification
    if (Notification.permission === 'granted') {
      new Notification('Price Alert!', {
        body: `Flight from ${alert.from} to ${alert.to} is now ₹${newPrice.toLocaleString()}`,
        icon: '/favicon.ico'
      });
    }
    
    toast.success(`🎉 Price Alert! ${alert.from} → ${alert.to} is now ₹${newPrice.toLocaleString()}`);
  };

  const deleteAlert = (id) => {
    const updatedAlerts = alerts.filter(alert => alert.id !== id);
    saveAlerts(updatedAlerts);
    toast.success('Price alert deleted');
  };

  const toggleAlert = (id) => {
    const updatedAlerts = alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    );
    saveAlerts(updatedAlerts);
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <FontAwesomeIcon icon={faBell} className="mr-3 text-orange-600" />
              Price Alerts
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Create New Alert */}
            <div className="bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-900 dark:to-blue-900 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2 text-orange-600" />
                Create Price Alert
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
                    <input
                      type="text"
                      value={newAlert.from}
                      onChange={(e) => setNewAlert({...newAlert, from: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="DEL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
                    <input
                      type="text"
                      value={newAlert.to}
                      onChange={(e) => setNewAlert({...newAlert, to: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="BOM"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Price (₹)</label>
                    <input
                      type="number"
                      value={newAlert.targetPrice}
                      onChange={(e) => setNewAlert({...newAlert, targetPrice: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="5000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Price (₹)</label>
                    <input
                      type="number"
                      value={newAlert.currentPrice}
                      onChange={(e) => setNewAlert({...newAlert, currentPrice: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="7000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email for Notifications</label>
                  <input
                    type="email"
                    value={newAlert.email}
                    onChange={(e) => setNewAlert({...newAlert, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>
                
                <button
                  onClick={createAlert}
                  className="w-full bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faBell} className="mr-2" />
                  Create Alert
                </button>
              </div>
            </div>

            {/* Active Alerts */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <FontAwesomeIcon icon={faChartLine} className="mr-2 text-blue-600" />
                Your Alerts ({alerts.length})
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="text-center py-8">
                    <FontAwesomeIcon icon={faBellSlash} className="text-4xl text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No price alerts yet</p>
                    <p className="text-sm text-gray-500">Create your first alert to get notified of price drops</p>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert.id} className={`bg-white dark:bg-gray-700 rounded-lg p-4 border-l-4 ${
                      alert.triggered ? 'border-green-500' : alert.active ? 'border-orange-500' : 'border-gray-300'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faPlane} className="text-blue-600 mr-2" />
                          <span className="font-semibold text-gray-800 dark:text-white">
                            {alert.from} → {alert.to}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleAlert(alert.id)}
                            className={`p-1 rounded ${alert.active ? 'text-orange-600' : 'text-gray-400'}`}
                          >
                            <FontAwesomeIcon icon={alert.active ? faBell : faBellSlash} />
                          </button>
                          <button
                            onClick={() => deleteAlert(alert.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Target: </span>
                          <span className="font-semibold text-green-600">₹{parseFloat(alert.targetPrice).toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Current: </span>
                          <span className="font-semibold">₹{parseFloat(alert.currentPrice).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {alert.triggered && (
                        <div className="mt-2 p-2 bg-green-100 dark:bg-green-900 rounded text-sm">
                          <span className="text-green-800 dark:text-green-200 font-semibold">
                            🎉 Alert Triggered! Price dropped to ₹{alert.triggeredPrice?.toLocaleString()}
                          </span>
                        </div>
                      )}
                      
                      <div className="mt-2 text-xs text-gray-500">
                        Created: {new Date(alert.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceAlerts;