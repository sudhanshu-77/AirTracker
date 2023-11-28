import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlane, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const TrustSection = () => {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto">
        <div className="flex justify-around items-center mb-4">
          <div className="flex flex-col items-center mr-8">
            <FontAwesomeIcon icon={faSearch} className="text-4xl text-blue-500" />
            <p className="mt-2 font-bold text-gray-700">One search, all the flights</p>
          </div>
          
          <div className="flex flex-col items-center mr-8">
            <FontAwesomeIcon icon={faPlane} className="text-4xl text-blue-500" />
            <p className="mt-2  font-bold text-gray-700">AirTracker finds cheap flights </p>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faShieldAlt} className="text-4xl text-blue-500" />
            <p className="mt-2 font-bold text-gray-700">Trusted by Millions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;