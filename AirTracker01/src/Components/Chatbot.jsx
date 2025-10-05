import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes, faPaperPlane, faRobot } from '@fortawesome/free-solid-svg-icons';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm AirBot 🤖 How can I help you with AirTracker today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses = {
    'booking': "To book a flight: 1) Go to Home page 2) Enter your departure and destination 3) Select date and passengers 4) Click 'Search Flights' 5) Choose your preferred flight and click 'Book Now' 📱",
    'cancel': "To cancel your booking, please contact our 24/7 support at +1 (555) 123-4567 or email support@airtracker.com. Cancellation policies vary by airline 📞",
    'payment': "We accept all major credit cards, debit cards, UPI, and digital wallets. All payments are secured with bank-level encryption 💳",
    'track': "To track your flight: 1) Go to Explore page 2) Click 'Flight Tracking' tab 3) Enter airline, flight number, and date 4) Click 'Track Flight' ✈️",
    'support': "Our 24/7 customer support is available at:\n📞 Phone: +1 (555) 123-4567\n📧 Email: support@airtracker.com\n📍 Address: New Delhi, India",
    'refund': "Refund processing takes 5-7 business days. Refund amount depends on airline policy and ticket type. Contact support for specific refund queries 💰",
    'baggage': "Baggage allowance varies by airline and ticket type. Check your booking confirmation or airline website for specific baggage policies 🧳",
    'checkin': "Online check-in is usually available 24-48 hours before departure. Check with your airline's website or mobile app for check-in options ✅",
    'deals': "Find best deals on our Explore page under 'Best Deals' tab. We offer up to 30% off on selected routes. Subscribe to our newsletter for exclusive offers 🏷️",
    'cities': "We support 1000+ routes covering major cities worldwide including Delhi, Mumbai, London, New York, Dubai, Singapore, and many more 🌍"
  };

  const quickQuestions = [
    "How to book flights?",
    "Track my flight",
    "Payment methods",
    "Contact support",
    "Best deals"
  ];

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('book') || lowerMessage.includes('reservation')) {
      return predefinedResponses.booking;
    } else if (lowerMessage.includes('cancel')) {
      return predefinedResponses.cancel;
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return predefinedResponses.payment;
    } else if (lowerMessage.includes('track') || lowerMessage.includes('status')) {
      return predefinedResponses.track;
    } else if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('contact')) {
      return predefinedResponses.support;
    } else if (lowerMessage.includes('refund') || lowerMessage.includes('money back')) {
      return predefinedResponses.refund;
    } else if (lowerMessage.includes('baggage') || lowerMessage.includes('luggage')) {
      return predefinedResponses.baggage;
    } else if (lowerMessage.includes('check') || lowerMessage.includes('checkin')) {
      return predefinedResponses.checkin;
    } else if (lowerMessage.includes('deal') || lowerMessage.includes('offer') || lowerMessage.includes('discount')) {
      return predefinedResponses.deals;
    } else if (lowerMessage.includes('cities') || lowerMessage.includes('destination')) {
      return predefinedResponses.cities;
    } else {
      return "I can help you with: flight booking, tracking, payments, support, deals, cancellations, refunds, baggage, and check-in. What would you like to know? 😊";
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessages = [
      ...messages,
      { text: inputMessage, sender: 'user' },
      { text: getResponse(inputMessage), sender: 'bot' }
    ];

    setMessages(newMessages);
    setInputMessage('');
  };

  const handleQuickQuestion = (question) => {
    const newMessages = [
      ...messages,
      { text: question, sender: 'user' },
      { text: getResponse(question), sender: 'bot' }
    ];
    setMessages(newMessages);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 animate-pulse"
        >
          <FontAwesomeIcon icon={faComments} className="text-xl" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-80 h-96 flex flex-col border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faRobot} className="mr-2" />
              <span className="font-bold">AirBot</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 dark:bg-gray-900">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl text-sm ${
                    message.sender === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <div className="text-xs text-gray-500 mb-2">Quick questions:</div>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-700 px-2 py-1 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
              <button
                onClick={handleSendMessage}
                className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full transition-colors"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;