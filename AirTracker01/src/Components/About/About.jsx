import React from 'react';

export default function About() {
   return (
      <section className="py-10">
         <div className="container mx-auto flex flex-wrap">
            <div className="w-full md:w-1/2">
               <img
                  src="https://images.unsplash.com/photo-1511068797325-6083f0f872b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="About Us"
                  className="w-full shadow-lg rounded-xl p-6"
               />
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-8 p-5">
               <h2 className="text-3xl font-bold mb-4">About Tevel and Flight Booking</h2>
               <p className="text-gray-700 mb-4">
                  Tevel and Flight Booking is your go-to platform for seamless travel and flight
                  reservations. Whether you're planning a relaxing vacation or a business trip, we
                  provide a hassle-free experience from start to finish.
               </p>
               <p className="text-gray-700 mb-4">
                  Our mission is to make travel accessible to everyone by offering a wide range of
                  travel cards and services. With Tevel and Flight Booking, your journey begins with
                  convenience and ends with unforgettable experiences.
               </p>
            </div>
         </div>

         <div className="container mx-auto mt-10">
            <div className="flex flex-wrap -mx-4">
               {/* Card 1 */}
               <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                  <div className="bg-white rounded-lg shadow-lg p-6 ml-5 border hover:border-orange-700/100">
                     <img
                        src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Travel Card 1"
                        className="w-full mb-4 border-spacing-2 border border-slate-700 hover:border-orange-700/100"
                     />
                     <h3 className="text-xl font-bold mb-2">Explore New Destinations</h3>
                     <p className="text-gray-700">
                        Discover the world with our Travel Card 1. Unlock exclusive deals and discounts
                        on flights, hotels, and activities. Your adventure awaits!
                     </p>
                  </div>
               </div>
               {/* Card 2 */}
               <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                  <div className="bg-white rounded-lg shadow-lg p-6 ml-5 border hover:border-orange-700/100">
                     <img
                        src="https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Travel Card 2"
                        className="w-full mb-4 border-spacing-2 border border-slate-700 hover:border-orange-700/100"
                     />
                     <h3 className="text-xl font-bold mb-2">Relax in Paradise</h3>
                     <p className="text-gray-700">
                        Indulge in luxury with our Travel Card 2. Experience the beauty of exotic
                        destinations with premium accommodations and personalized services.
                     </p>
                  </div>
               </div>
               {/* Card 3 */}
               <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                  <div className="bg-white rounded-lg shadow-lg p-6 ml-5 border hover:border-orange-700/100">
                     <img
                        src="https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Travel Card 3"
                        className="w-full mb-4 border-spacing-2 border border-slate-700 hover:border-orange-700/100"
                     />
                     <h3 className="text-xl font-bold mb-2">Adventure Awaits</h3>
                     <p className="text-gray-700">
                        Embark on thrilling experiences with our Travel Card 3. From outdoor adventures to
                        cultural discoveries, create memories that last a lifetime.
                     </p>
                  </div>
               </div>
               {/* Card 4 */}
               <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                  <div className="bg-white rounded-lg shadow-lg p-6 ml-5 border hover:border-orange-700/100">
                     <img
                        src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Travel Card 4"
                        className="w-full mb-4 border-spacing-2 border border-slate-700 hover:border-orange-700/100"
                     />
                     <h3 className="text-xl font-bold mb-2">Discover Local Delights</h3>
                     <p className="text-gray-700">
                        Immerse yourself in the culture and flavors of your destination with Travel Card 4.
                        Taste the local cuisine and explore hidden gems.
                     </p>
                  </div>
               </div>
               {/* Card 5 */}
               <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                  <div className="bg-white rounded-lg shadow-lg p-6 ml-5 border hover:border-orange-700/100">
                     <img
                        src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Travel Card 5"
                        className="w-full mb-4 border-spacing-2 border border-slate-700 hover:border-orange-700/100"
                     />
                     <h3 className="text-xl font-bold mb-2">Create Unforgettable Memories</h3>
                     <p className="text-gray-700">
                        Make every moment count with Travel Card 5. Capture memories that will last a
                        lifetime and share stories of your adventures.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-4 text-center">About Us</h2>
            <p className="text-gray-700">
               At Tevel and Flight Booking, we believe that every journey is an opportunity to create
               lasting memories. Our team is dedicated to providing you with the best travel
               experience, ensuring your trips are not just about reaching a destination but about
               enjoying the entire adventure.
            </p>
            <p className="text-gray-700">
               Start your travel journey with Tevel and Flight Booking, where every booking is a step
               towards a world of possibilities. Let us be your companion in making your travel dreams
               come true!
            </p>
         </div>
      </section>
   );
}
