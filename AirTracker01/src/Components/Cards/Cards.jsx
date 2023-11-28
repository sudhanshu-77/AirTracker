import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function Cards({name,name2,path}) {
  
  const [isSwapped, setIsSwapped] = useState(false);
  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

    return(
        <div className="w-50 bg-white rounded-lg shadow-md p-4 m-4 hover:drop-shadow-xl cursor-pointer ">
        <img src={path} alt="Card Image" className="w-full h-32 object-cover mb-4 hover:brightness-90  " />
        <div className="flex justify-between items-center">
          <p className="font-bold">{isSwapped ? name2 : name}</p>
          <span className="text-gray-500 cursor-pointer"onClick={handleSwap}><FontAwesomeIcon icon={faArrowRightArrowLeft} /></span>
          <p className="font-bold">{isSwapped ? name:name2}</p>

        </div>
      </div> 

    ); }