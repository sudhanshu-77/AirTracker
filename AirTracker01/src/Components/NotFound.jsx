import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faHome } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md">
        <div className="mb-6">
          <FontAwesomeIcon 
            icon={faPlane} 
            className="text-8xl text-orange-600 animate-bounce" 
          />
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Flight Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Looks like this flight has been delayed indefinitely. 
          Let's get you back on track!
        </p>
        <Link
          to="/"
          className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;