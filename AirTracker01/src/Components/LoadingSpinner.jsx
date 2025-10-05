import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <FontAwesomeIcon 
        icon={faPlane} 
        className="text-4xl text-orange-600 animate-bounce mb-4" 
      />
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
};

export default LoadingSpinner;