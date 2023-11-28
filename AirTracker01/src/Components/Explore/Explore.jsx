import React from 'react'
import Cards from '../Cards/Cards';
import TrustSection from '../Cards/TrustSection';
export default function Explore() {

  return (


    // <div className="flex  text-gray-700">
    //   <div className="w-1/2 p-4">
    //     <div className=" rounded-lg p-6 ">
    //       <img src="https://images.unsplash.com/photo-1592985684811-6c0f98adb014?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Flight" className="w-full mb-4 rounded-lg" />
    //       <p className=" font-bold text-center text-5xl">Track Your Flight</p>
    //     </div>
    //   </div>
    //   <div className="w-1/2 p-4 ">
    //     <div className="bg-white rounded-lg p-4 shadow-xl pt-10 mt-12 mr-4">
    //       <p className="text-lg font-bold mb-4">Track Your Flights</p>
    //       <div className="mb-4">
    //         <label htmlFor="carrier" className="block mb-2">Select Carrier:</label>
    //         <select id="carrier" className="w-full p-2 border border-gray-700 rounded"


    //         >
    //           <option value="">Select an option</option>
    //           <option value="carrier1">Carrier 1</option>
    //           <option value="carrier2">Carrier 2</option>
    //           <option value="carrier3">Carrier 3</option>
    //           <option value="carrier4">Carrier 4</option>
    //           <option value="carrier5">Carrier 5</option>
    //           <option value="carrier6">Carrier 6</option>
    //         </select>
    //       </div>
    //       <div className="mb-4">
    //         <label htmlFor="flightNo" className="block mb-2">Flight No:</label>
    //         <input type="text" id="flightNo" className="w-full p-2 border border-gray-700 rounded" />
    //       </div>
    //       <div className="mb-4">
    //         <label htmlFor="departureDate" className="block mb-2">Departure Date:</label>
    //         <input type="date" id="departureDate" className="w-full p-2 border border-gray-700 rounded" />
    //       </div>
    //       <button className="bg-orange-500 text-white py-2 px-4 rounded">Track Your Flight</button>
    //     </div>
    //   </div>

    // </div>.


    <section className="bg-gray-200 py-8">
        <TrustSection />

      <div className="container mx-auto">

        <h2 className="text-2xl font-bold mb-4 mt-8 ml-6">Popular Flights</h2>
        <p className="mt-4 mb-4 ml-6">Check these popular routes on AirTracker.com..</p>

        <div className="flex flex-wrap justify-center">
          {/* Render your cards here */}

          <Cards name="Delhi" name2="Mumbai" path="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

          <Cards name="London" name2="Paris" path="https://images.unsplash.com/photo-1520967824495-b529aeba26df?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

          <Cards name="New York" name2="Los Angeles" path="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <Cards name="Bangkok" name2="Chiang" path="https://images.unsplash.com/photo-1580327942498-53a877c6d0ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />


          <Cards name="Goa" name2="Delhi" path="https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

          <Cards name="London" name2="Rome" path="https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

          <Cards name="Singapore" name2="Bankok" path="https://images.unsplash.com/photo-1542114740389-9b46fb1e5be7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

          <Cards name="Dublin" name2="London" path="https://images.unsplash.com/photo-1549918864-48ac978761a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

          <Cards name="Thailand" name2="Mumbai" path="https://images.unsplash.com/photo-1494948949099-1311f3e907a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />





        </div>
        <div className="flex justify-center ">

          <button className="bg-gray-500 hover:bg-orange-700  text-white font-bold py-2 px-4  rounded mt-4">
            Load More
          </button>

        </div>

      </div>

    </section>



  );
}