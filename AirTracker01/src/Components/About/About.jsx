import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faUsers, faGlobe, faShieldAlt, faClock, faHeart, faAward, faHandshake, faStar, faQuoteLeft, faCalendarAlt, faRocket } from '@fortawesome/free-solid-svg-icons';

export default function About() {
   const navigate = useNavigate();
   const [counters, setCounters] = useState({ travelers: 0, airlines: 0, countries: 0, years: 0 });
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      setIsVisible(true);
      const timer = setTimeout(() => {
         setCounters({ travelers: 1000000, airlines: 500, countries: 195, years: 5 });
      }, 500);
      return () => clearTimeout(timer);
   }, []);

   const testimonials = [
      { name: "Sarah Johnson", location: "New York", text: "AirTracker made my European vacation planning effortless. Best prices and amazing support!", rating: 5 },
      { name: "Michael Chen", location: "Singapore", text: "Booked 15+ flights through AirTracker. Never had any issues. Highly recommended!", rating: 5 },
      { name: "Emma Wilson", location: "London", text: "The user interface is so intuitive. Found the perfect flight in minutes!", rating: 5 }
   ];

   const timeline = [
      { year: "2019", title: "Founded", desc: "AirTracker was born with a vision to simplify air travel" },
      { year: "2020", title: "100K Users", desc: "Reached our first major milestone during challenging times" },
      { year: "2022", title: "Global Expansion", desc: "Partnered with 500+ airlines worldwide" },
      { year: "2024", title: "1M+ Travelers", desc: "Celebrating over a million happy customers" }
   ];

   return (
      <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-blue-50 min-h-screen">
         {/* Hero Section */}
         <div className="container mx-auto px-4">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
               <h1 className="text-6xl font-bold text-gray-800 mb-6 animate-pulse">
                  <FontAwesomeIcon icon={faPlane} className="text-orange-600 mr-4 animate-bounce" />
                  About AirTracker
               </h1>
               <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Your trusted partner in making air travel simple, affordable, and accessible to everyone around the world.
               </p>
               <div className="mt-8 flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                     <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-2xl" />
                  ))}
                  <span className="ml-3 text-lg text-gray-600">Trusted by millions worldwide</span>
               </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
               <div className="space-y-6">
                  <img
                     src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                     alt="Modern Airport"
                     className="w-full rounded-2xl shadow-2xl"
                  />
               </div>
               <div className="space-y-8">
                  <div>
                     <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
                     <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        Founded with a vision to revolutionize air travel booking, AirTracker has grown from a simple idea to a comprehensive flight booking platform trusted by millions of travelers worldwide.
                     </p>
                     <p className="text-gray-700 text-lg leading-relaxed">
                        We believe that everyone deserves access to affordable flights and seamless booking experiences, regardless of their destination or budget.
                     </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                     <div className="text-center p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                        <h3 className="text-4xl font-bold mb-2">{counters.travelers.toLocaleString()}+</h3>
                        <p className="text-orange-100">Happy Travelers</p>
                     </div>
                     <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                        <h3 className="text-4xl font-bold mb-2">{counters.airlines}+</h3>
                        <p className="text-blue-100">Airlines Partners</p>
                     </div>
                     <div className="text-center p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                        <h3 className="text-4xl font-bold mb-2">{counters.countries}</h3>
                        <p className="text-green-100">Countries Served</p>
                     </div>
                     <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                        <h3 className="text-4xl font-bold mb-2">{counters.years}+</h3>
                        <p className="text-purple-100">Years Experience</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Our Values */}
            <div className="mb-16">
               <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">Why Choose AirTracker?</h2>
               <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto">Experience the difference with our commitment to excellence</p>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-orange-500">
                     <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={faShieldAlt} className="text-3xl text-white" />
                     </div>
                     <h3 className="text-2xl font-bold mb-4 text-gray-800">Secure Booking</h3>
                     <p className="text-gray-600 leading-relaxed">Bank-level encryption and secure payment processing protect your personal and financial information.</p>
                  </div>
                  
                  <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500">
                     <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={faClock} className="text-3xl text-white" />
                     </div>
                     <h3 className="text-2xl font-bold mb-4 text-gray-800">24/7 Support</h3>
                     <p className="text-gray-600 leading-relaxed">Our dedicated support team is available around the clock to assist with any travel needs or concerns.</p>
                  </div>
                  
                  <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-green-500">
                     <div className="bg-gradient-to-br from-green-400 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={faGlobe} className="text-3xl text-white" />
                     </div>
                     <h3 className="text-2xl font-bold mb-4 text-gray-800">Global Reach</h3>
                     <p className="text-gray-600 leading-relaxed">Access flights to 195+ countries with partnerships across 500+ airlines worldwide.</p>
                  </div>
                  
                  <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-purple-500">
                     <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={faHeart} className="text-3xl text-white" />
                     </div>
                     <h3 className="text-2xl font-bold mb-4 text-gray-800">Best Prices</h3>
                     <p className="text-gray-600 leading-relaxed">AI-powered price comparison ensures you get the best deals and exclusive offers every time.</p>
                  </div>
               </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
               <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-center mb-6">
                     <FontAwesomeIcon icon={faAward} className="text-3xl text-orange-600 mr-4" />
                     <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                     To democratize air travel by providing an intuitive, secure, and affordable platform that connects travelers with their dream destinations while ensuring exceptional customer service at every step of their journey.
                  </p>
               </div>
               
               <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-center mb-6">
                     <FontAwesomeIcon icon={faHandshake} className="text-3xl text-blue-600 mr-4" />
                     <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                     To become the world's most trusted and innovative flight booking platform, empowering millions of travelers to explore the world with confidence, convenience, and unmatched value.
                  </p>
               </div>
            </div>

            {/* Timeline Section */}
            <div className="mb-16">
               <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">Our Journey</h2>
               <p className="text-center text-xl text-gray-600 mb-12">Milestones that shaped our story</p>
               <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400 to-blue-400 rounded-full"></div>
                  {timeline.map((item, index) => (
                     <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                           <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                              <div className="flex items-center mb-3">
                                 <FontAwesomeIcon icon={faCalendarAlt} className="text-orange-600 mr-2" />
                                 <span className="text-2xl font-bold text-gray-800">{item.year}</span>
                              </div>
                              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                              <p className="text-gray-600">{item.desc}</p>
                           </div>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-orange-400 to-blue-400 rounded-full border-4 border-white shadow-lg"></div>
                        <div className="w-1/2"></div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Testimonials */}
            <div className="mb-16">
               <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">What Our Travelers Say</h2>
               <p className="text-center text-xl text-gray-600 mb-12">Real experiences from real customers</p>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                     <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative">
                        <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl text-orange-400 mb-4" />
                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">"{testimonial.text}"</p>
                        <div className="flex items-center justify-between">
                           <div>
                              <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                              <p className="text-gray-600">{testimonial.location}</p>
                           </div>
                           <div className="flex space-x-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                 <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
                              ))}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-3xl shadow-2xl p-12">
               <FontAwesomeIcon icon={faRocket} className="text-6xl mb-6 animate-bounce" />
               <h2 className="text-5xl font-bold mb-6">Ready to Take Off?</h2>
               <p className="text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
                  Join millions of satisfied travelers who trust AirTracker for their journey. Your next adventure is just a click away!
               </p>
               <div className="flex justify-center items-center space-x-12 mb-8">
                  <div className="text-center">
                     <FontAwesomeIcon icon={faUsers} className="text-5xl mb-3" />
                     <p className="text-xl font-semibold">Expert Team</p>
                  </div>
                  <div className="text-center">
                     <FontAwesomeIcon icon={faGlobe} className="text-5xl mb-3" />
                     <p className="text-xl font-semibold">Global Network</p>
                  </div>
                  <div className="text-center">
                     <FontAwesomeIcon icon={faHeart} className="text-5xl mb-3" />
                     <p className="text-xl font-semibold">Customer First</p>
                  </div>
               </div>
               <button 
                  onClick={() => navigate('/home')}
                  className="bg-white text-orange-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-lg"
               >
                  Start Your Journey Today
               </button>
            </div>
         </div>
      </section>
   );
}
