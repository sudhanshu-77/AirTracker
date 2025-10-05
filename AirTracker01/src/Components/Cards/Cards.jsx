import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faStar, faPlane } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Cards({ name, name2, path, price, duration, rating, description }) {
  const [isSwapped, setIsSwapped] = useState(false);
  const navigate = useNavigate();
  
  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  const handleBookNow = () => {
    navigate('/', { state: { source: isSwapped ? name2 : name, destination: isSwapped ? name : name2 } });
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-4 m-4 hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="relative">
        <img src={path} alt="Destination" className="w-full h-48 object-cover mb-4 rounded-lg" />
        <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded text-sm font-bold">
          ₹{price}
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold text-lg">{isSwapped ? name2 : name}</p>
          <span className="text-orange-600 cursor-pointer hover:text-orange-800" onClick={handleSwap}>
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
          </span>
          <p className="font-bold text-lg">{isSwapped ? name : name2}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span className="flex items-center">
            <FontAwesomeIcon icon={faPlane} className="mr-1" />
            {duration}
          </span>
          <span className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
            {rating}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        
        <button 
          onClick={handleBookNow}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}