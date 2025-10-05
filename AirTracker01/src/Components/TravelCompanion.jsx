import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faPlus, 
  faTimes, 
  faShare, 
  faCreditCard,
  faCalendarAlt,
  faPlane,
  faUserFriends,
  faMoneyBillWave,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const TravelCompanion = ({ isOpen, onClose, flightData }) => {
  const [activeTab, setActiveTab] = useState('group');
  const [groupMembers, setGroupMembers] = useState([]);
  const [splitPayments, setSplitPayments] = useState([]);
  const [sharedItinerary, setSharedItinerary] = useState(null);
  const [newMemberEmail, setNewMemberEmail] = useState('');

  useEffect(() => {
    if (flightData) {
      initializeGroupBooking();
    }
  }, [flightData]);

  const initializeGroupBooking = () => {
    const currentUser = JSON.parse(localStorage.getItem('auth') || '{}');
    setGroupMembers([{
      id: 1,
      name: currentUser.user?.displayName || 'You',
      email: currentUser.user?.email || 'user@example.com',
      isOrganizer: true,
      confirmed: true
    }]);
  };

  const addGroupMember = () => {
    if (!newMemberEmail) {
      toast.error('Please enter an email address');
      return;
    }

    const newMember = {
      id: Date.now(),
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail,
      isOrganizer: false,
      confirmed: false
    };

    setGroupMembers([...groupMembers, newMember]);
    setNewMemberEmail('');
    toast.success('Member added to group');
  };

  const removeMember = (memberId) => {
    setGroupMembers(groupMembers.filter(member => member.id !== memberId));
  };

  const calculateSplitPayment = () => {
    const totalAmount = flightData?.price * groupMembers.length || 0;
    const perPerson = totalAmount / groupMembers.length;
    
    const splits = groupMembers.map(member => ({
      ...member,
      amount: perPerson,
      paid: member.isOrganizer
    }));
    
    setSplitPayments(splits);
  };

  const createSharedItinerary = () => {
    const itinerary = {
      id: `itinerary-${Date.now()}`,
      flight: flightData,
      members: groupMembers,
      createdBy: groupMembers.find(m => m.isOrganizer)?.name,
      createdAt: new Date().toISOString(),
      shareCode: Math.random().toString(36).substring(2, 8).toUpperCase()
    };
    
    setSharedItinerary(itinerary);
    localStorage.setItem('sharedItinerary', JSON.stringify(itinerary));
    toast.success('Shared itinerary created!');
  };

  const shareItinerary = () => {
    if (sharedItinerary) {
      const shareText = `Join my flight booking!\nFlight: ${flightData?.source} → ${flightData?.destination}\nDate: ${flightData?.date}\nShare Code: ${sharedItinerary.shareCode}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Flight Booking Invitation',
          text: shareText,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(shareText);
        toast.success('Itinerary details copied to clipboard!');
      }
    }
  };

  const sendInvitations = () => {
    groupMembers.filter(m => !m.isOrganizer).forEach(member => {
      // Simulate email invitation
      console.log(`Sending invitation to ${member.email}`);
    });
    toast.success('Invitations sent to all members!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <FontAwesomeIcon icon={faUserFriends} className="mr-3 text-blue-600" />
              Travel Companion
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Flight Info */}
          {flightData && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                    {flightData.source} → {flightData.destination}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400">{flightData.date} • {flightData.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">₹{flightData.price?.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">per person</p>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('group')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'group'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Group Booking
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'payment'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
              Split Payment
            </button>
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'itinerary'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faShare} className="mr-2" />
              Shared Itinerary
            </button>
          </div>

          {/* Group Booking Tab */}
          {activeTab === 'group' && (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter member's email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={addGroupMember}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add
                </button>
              </div>

              <div className="space-y-2">
                {groupMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {member.name} {member.isOrganizer && '(Organizer)'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{member.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        member.confirmed 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {member.confirmed ? 'Confirmed' : 'Pending'}
                      </span>
                      {!member.isOrganizer && (
                        <button
                          onClick={() => removeMember(member.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={sendInvitations}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Send Invitations
              </button>
            </div>
          )}

          {/* Split Payment Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-4">
              <button
                onClick={calculateSplitPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                Calculate Split Payment
              </button>

              {splitPayments.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Payment Split</h3>
                  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                    <p className="text-lg font-bold text-blue-800 dark:text-blue-200">
                      Total: ₹{(flightData?.price * groupMembers.length)?.toLocaleString()}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Per person: ₹{(flightData?.price)?.toLocaleString()}
                    </p>
                  </div>
                  
                  {splitPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{payment.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{payment.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800 dark:text-white">₹{payment.amount?.toLocaleString()}</p>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.paid 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {payment.paid ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Shared Itinerary Tab */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              <button
                onClick={createSharedItinerary}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Create Shared Itinerary
              </button>

              {sharedItinerary && (
                <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    Shared Itinerary Created
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Share Code:</strong> {sharedItinerary.shareCode}</p>
                    <p><strong>Created by:</strong> {sharedItinerary.createdBy}</p>
                    <p><strong>Members:</strong> {sharedItinerary.members.length}</p>
                  </div>
                  
                  <button
                    onClick={shareItinerary}
                    className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faShare} className="mr-2" />
                    Share Itinerary
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.success('Group booking initiated!');
                onClose();
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Continue Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCompanion;