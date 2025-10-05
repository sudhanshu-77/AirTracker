import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimes, faMobile, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show install prompt after 30 seconds if not dismissed
      setTimeout(() => {
        if (!isInstalled && !localStorage.getItem('pwa-install-dismissed')) {
          setShowInstallPrompt(true);
        }
      }, 30000);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      toast.success('AirTracker installed successfully!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast.success('Installing AirTracker...');
    } else {
      toast.info('Installation cancelled');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const dismissInstallPrompt = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
    toast.info('You can install AirTracker anytime from your browser menu');
  };

  if (isInstalled || !showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-2xl shadow-2xl z-50 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faMobile} className="text-2xl mr-3" />
          <div>
            <h3 className="font-bold text-lg">Install AirTracker</h3>
            <p className="text-sm opacity-90">Get the app experience</p>
          </div>
        </div>
        <button
          onClick={dismissInstallPrompt}
          className="text-white/80 hover:text-white p-1"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      
      <div className="mb-4">
        <ul className="text-sm space-y-1 opacity-90">
          <li>• Offline access to your bookings</li>
          <li>• Push notifications for flight updates</li>
          <li>• Faster loading and app-like experience</li>
        </ul>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={handleInstallClick}
          className="flex-1 bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faDownload} className="mr-2" />
          Install App
        </button>
        <button
          onClick={dismissInstallPrompt}
          className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  );
};

export default PWAInstaller;