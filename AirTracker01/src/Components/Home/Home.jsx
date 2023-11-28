import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../data";
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlane } from "@fortawesome/free-solid-svg-icons";
import TrustSection from "../Cards/TrustSection";

export default function Home() {


  const navigate = useNavigate()
  const [source,setSource] = useState()
  const [destination,setDestination] = useState()
  const [departure,setDeparture] = useState()
  const [adults,setAdults] = useState('1')
  const [children,setChildren] = useState('0')
  const [infants,setInfants] = useState('0')
  const [eclass,seteClass] = useState('Economy')
  const {data,setData} = useData()

   // Rahu : 655e1b03de8b4b8c2c7e1116
  
  // const url = `https://api.flightapi.io/onewaytrip/655ce1d263ab81f6dc0023f9/HEL/OUL/2024-05-20/1/0/0/Economy/INR`;


  const handelsubmit = async(e)=>{
e.preventDefault();
try {
  const url = `https://api.flightapi.io/onewaytrip/655d8e7163ab81f6dc002ac1/${source}/${destination}/${departure}/${adults}/${children}/${infants}/${eclass}/INR`;
  
  const res = await axios.get(url)
  
 
setData(res.data.legs)

  if(res){
    navigate("/result")
  }
} catch (error) {
  console.log(error)
}
  }



return (

  <div className="flex flex-col md:flex-row bg-gray-100">

    
      
      <div className="w-full md:w-1/2 p-4 m-7">
        <div className=" rounded-lg p-6 md:w-full ">
          <img src="https://plus.unsplash.com/premium_photo-1679830513990-82a4280f41b4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image Card" className="w-full rounded-lg md:w-full lg:3/4 " />
          <div className="container mx-auto mt-10  text-gray-700">
          <p className="font-bold text-center text-5xl pt-5 "> 
          <FontAwesomeIcon icon={faPlane} spin  />Fly More, Pay Less 
          <FontAwesomeIcon icon={faPlane} spin  /></p>
          
          
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="  md:p-5 p-4 mt-12 ml-10 ">
        <div className="bg-white rounded-lg p-4 shadow-xl border hover:border-orange-700/100">
          <h2 className="text-2xl font-bold mb-4">Flight Search</h2>
          <form onSubmit={handelsubmit}>
            <div className="mb-4">
              <label htmlFor="source" className="block text-gray-700 font-bold mb-2">Source</label>
              <input type="text" id="source" value={source}
              onChange={(e)=>setSource(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="destination" className="block text-gray-700 font-bold mb-2">Destination</label>
              <input type="text" id="destination" value={destination}
              onChange={(e)=>setDestination(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="departure" className="block text-gray-700 font-bold mb-2">Departure</label>
              <input type="date" id="departure" value={departure}
              onChange={(e)=>setDeparture(e.target.value)}  className="w-full border border-gray-300 rounded-lg p-2" />
            </div>
            <div className="mb-4">
               <label htmlFor="class" className="block text-gray-700 font-bold mb-2">Class</label>
               <select id="class"  className="w-full border border-gray-300 rounded-lg p-2" value={eclass}
              onChange={(e)=>seteClass(e.target.value)}>
                 <option value="economy">Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First</option>
                  <option value="premium">Premium</option>
               </select>
              </div>
            <div className="mb-4">
              <label htmlFor="traveler" className="block text-gray-700 font-bold mb-2">Traveler</label>
              <div className="flex">
                <input type="number" id="adults" value={adults}
              onChange={(e)=>setAdults(e.target.value)} className="w-1/3 border border-gray-300 rounded-lg p-2 mr-2" placeholder="Adults" />
                <input type="number" id="children" value={children}
              onChange={(e)=>setChildren(e.target.value)}  className="w-1/3 border border-gray-300 rounded-lg p-2 mr-2" placeholder="Children" />
                <input type="number" id="infants" value={infants}
              onChange={(e)=>setInfants(e.target.value)}  className="w-1/3 border border-gray-300 rounded-lg p-2" placeholder="Infants" />
              </div>
              </div>
             
            
            <button type="submit" className="bg-orange-700 text-white font-bold py-2 px-4 rounded-lg">Search Flight</button>
          </form>
        </div>
      </div>
     
    </div>
    
        
    

  );
}
