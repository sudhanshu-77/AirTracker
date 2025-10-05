import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock, faHeadset, faQuestionCircle, faPlane } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all required fields');
            return;
        }
        
        setLoading(true);
        // Simulate form submission
        setTimeout(() => {
            toast.success('Message sent successfully! We\'ll get back to you soon.');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setLoading(false);
        }, 1500);
    };

    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-800 mb-6">
                        <FontAwesomeIcon icon={faHeadset} className="text-orange-600 mr-4" />
                        Contact AirTracker
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Have questions about your booking or need assistance? We're here to help 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                                    <FontAwesomeIcon icon={faPhone} className="text-orange-600 text-xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Call Us</h3>
                            </div>
                            <p className="text-gray-600 mb-2">24/7 Customer Support</p>
                            <p className="text-lg font-semibold text-orange-600">+1 (555) 123-4567</p>
                            <p className="text-sm text-gray-500 mt-2">Toll-free worldwide</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 text-xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Email Us</h3>
                            </div>
                            <p className="text-gray-600 mb-2">General Inquiries</p>
                            <p className="text-lg font-semibold text-blue-600">support@airtracker.com</p>
                            <p className="text-sm text-gray-500 mt-2">Response within 2 hours</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-600 text-xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Visit Us</h3>
                            </div>
                            <p className="text-gray-600 mb-2">Headquarters</p>
                            <p className="text-lg font-semibold text-green-600">123 Aviation Street</p>
                            <p className="text-sm text-gray-500">New Delhi, DL 110001</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                                    <FontAwesomeIcon icon={faClock} className="text-purple-600 text-xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Business Hours</h3>
                            </div>
                            <p className="text-gray-600 mb-2">Customer Service</p>
                            <p className="text-lg font-semibold text-purple-600">24/7 Available</p>
                            <p className="text-sm text-gray-500">Always here for you</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <div className="flex items-center mb-8">
                                <FontAwesomeIcon icon={faPlane} className="text-3xl text-orange-600 mr-4" />
                                <h2 className="text-3xl font-bold text-gray-800">Send us a Message</h2>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your.email@example.com"
                                            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 123-4567"
                                            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject
                                        </label>
                                        <select
                                            name="subject"
                                            id="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors"
                                        >
                                            <option value="">Select a topic</option>
                                            <option value="booking">Booking Assistance</option>
                                            <option value="cancellation">Cancellation/Refund</option>
                                            <option value="technical">Technical Support</option>
                                            <option value="feedback">Feedback</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Please describe how we can help you..."
                                        className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors resize-none"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
                                >
                                    {loading ? 'Sending Message...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <FontAwesomeIcon icon={faQuestionCircle} className="text-4xl text-blue-600 mb-4" />
                        <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">How can I cancel my booking?</h3>
                            <p className="text-gray-600">You can cancel your booking through your profile page or by contacting our support team. Cancellation policies vary by airline.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Is my payment information secure?</h3>
                            <p className="text-gray-600">Yes, we use industry-standard encryption and secure payment gateways to protect your financial information.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Can I modify my flight after booking?</h3>
                            <p className="text-gray-600">Flight modifications depend on the airline's policy. Contact us for assistance with changes to your booking.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Do you offer travel insurance?</h3>
                            <p className="text-gray-600">We partner with leading insurance providers to offer comprehensive travel protection plans during checkout.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}