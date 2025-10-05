import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';

// Skeleton Components
export const FlightCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
      {/* Airline Info Skeleton */}
      <div className="lg:col-span-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
      
      {/* Departure Skeleton */}
      <div className="text-center lg:text-left">
        <div className="h-8 bg-gray-200 rounded w-16 mb-2 mx-auto lg:mx-0"></div>
        <div className="h-5 bg-gray-200 rounded w-12 mb-1 mx-auto lg:mx-0"></div>
        <div className="h-4 bg-gray-200 rounded w-20 mx-auto lg:mx-0"></div>
      </div>
      
      {/* Flight Path Skeleton */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="flex-1 mx-4 h-0.5 bg-gray-200"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
      </div>
      
      {/* Arrival Skeleton */}
      <div className="text-center lg:text-left">
        <div className="h-8 bg-gray-200 rounded w-16 mb-2 mx-auto lg:mx-0"></div>
        <div className="h-5 bg-gray-200 rounded w-12 mb-1 mx-auto lg:mx-0"></div>
        <div className="h-4 bg-gray-200 rounded w-20 mx-auto lg:mx-0"></div>
      </div>
      
      {/* Price & Booking Skeleton */}
      <div className="text-center">
        <div className="bg-gray-100 rounded-xl p-4 mb-4">
          <div className="h-8 bg-gray-200 rounded w-20 mb-2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  </div>
);

export const SearchFormSkeleton = () => (
  <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl animate-pulse">
    <div className="text-center mb-6">
      <div className="h-8 bg-gray-200 rounded w-64 mb-2 mx-auto"></div>
      <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
    </div>
    
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-16 bg-gray-200 rounded-xl"></div>
        <div className="h-16 bg-gray-200 rounded-xl"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-16 bg-gray-200 rounded-xl"></div>
        <div className="h-16 bg-gray-200 rounded-xl"></div>
      </div>
      <div className="h-20 bg-gray-200 rounded-xl"></div>
      <div className="h-14 bg-gray-200 rounded-2xl"></div>
    </div>
  </div>
);

// Loading Animations
export const PlaneLoader = ({ message = "Searching flights..." }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative mb-6">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <FontAwesomeIcon 
        icon={faPlane} 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 text-xl animate-pulse" 
      />
    </div>
    <p className="text-lg font-semibold text-gray-700 mb-2">{message}</p>
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  </div>
);

export const FlightPathLoader = () => (
  <div className="flex items-center justify-center py-8">
    <div className="flex items-center space-x-4">
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
      <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-white animate-pulse" style={{ 
          background: 'linear-gradient(90deg, transparent, white, transparent)',
          animation: 'slide 2s infinite'
        }}></div>
      </div>
      <FontAwesomeIcon 
        icon={faPlane} 
        className="text-orange-600 text-lg animate-bounce" 
        style={{ animationDuration: '1s' }}
      />
      <div className="flex-1 h-0.5 bg-gradient-to-r from-orange-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-white animate-pulse" style={{ 
          background: 'linear-gradient(90deg, transparent, white, transparent)',
          animation: 'slide 2s infinite 1s'
        }}></div>
      </div>
      <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
    </div>
  </div>
);

export const BookingLoader = ({ step = 1, totalSteps = 3 }) => {
  const steps = [
    { id: 1, label: 'Processing Payment', icon: faSpinner },
    { id: 2, label: 'Confirming Booking', icon: faPlane },
    { id: 3, label: 'Generating Ticket', icon: faSpinner }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((s, index) => (
            <React.Fragment key={s.id}>
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                step >= s.id 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {step === s.id ? (
                  <FontAwesomeIcon icon={s.icon} className="animate-spin" />
                ) : (
                  <span className="font-bold">{s.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 transition-all duration-300 ${
                  step > s.id ? 'bg-blue-600' : 'bg-gray-300'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {steps[step - 1]?.label}
      </h3>
      <p className="text-gray-600 text-center max-w-md">
        Please wait while we process your request. This may take a few moments.
      </p>
      
      <div className="mt-6 w-64 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-600 to-orange-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export const PulseLoader = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  const colorClasses = {
    blue: 'bg-blue-600',
    orange: 'bg-orange-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600'
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
          style={{ animationDelay: `${i * 0.2}s` }}
        ></div>
      ))}
    </div>
  );
};

export const ProgressiveImageLoader = ({ src, alt, className, placeholder }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          {placeholder || <PulseLoader size="sm" />}
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Failed to load</span>
        </div>
      )}
    </div>
  );
};

// Page Transition Loader
export const PageTransition = ({ isLoading, children }) => (
  <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
    {isLoading && (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <PlaneLoader message="Loading page..." />
      </div>
    )}
    {children}
  </div>
);

// CSS for animations (add to your global CSS)
const styles = `
@keyframes slide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-slide {
  animation: slide 2s infinite;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}