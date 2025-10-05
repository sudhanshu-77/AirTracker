import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWallet, 
  faPlane, 
  faQrcode, 
  faDownload,
  faTimes,
  faCalendarAlt,
  faClock,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
// QRCode functionality implemented inline

const BoardingPassWallet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [boardingPasses, setBoardingPasses] = useState([]);
  const [selectedPass, setSelectedPass] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const auth = localStorage.getItem('auth');
    if (auth) {
      setIsLoggedIn(true);
      // Load boarding passes from localStorage
      const savedPasses = localStorage.getItem('boardingPasses');
      if (savedPasses) {
        setBoardingPasses(JSON.parse(savedPasses));
      }
      
      // Load boarding passes from booking history
      loadBoardingPassesFromBookings();
    }
  }, []);

  // Function to load boarding passes from booking history
  const loadBoardingPassesFromBookings = () => {
    const bookings = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
    const existingPasses = JSON.parse(localStorage.getItem('boardingPasses') || '[]');
    
    const newPasses = bookings.map(booking => ({
      id: `${booking.flight?.flightNumber || 'FL001'}-${booking.flight?.source || 'DEL'}-${booking.flight?.destination || 'BOM'}`,
      airline: booking.flight?.airline || 'AirTracker Airlines',
      flightNumber: booking.flight?.flightNumber || 'FL001',
      from: booking.flight?.source || 'DEL',
      to: booking.flight?.destination || 'BOM',
      date: booking.flight?.date || '2024-02-15',
      time: booking.flight?.time || '10:00',
      gate: `A${Math.floor(Math.random() * 20) + 1}`,
      seat: `${Math.floor(Math.random() * 30) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`,
      passenger: 'Passenger Name',
      pnr: booking.id?.substring(0, 6).toUpperCase() || Math.random().toString(36).substring(2, 8).toUpperCase(),
      qrData: `${booking.flight?.flightNumber || 'FL001'}-${booking.flight?.source || 'DEL'}-${booking.flight?.destination || 'BOM'}-${Date.now()}`
    }));
    
    // Merge with existing passes, avoiding duplicates
    const allPasses = [...existingPasses];
    newPasses.forEach(newPass => {
      if (!allPasses.find(pass => pass.id === newPass.id)) {
        allPasses.push(newPass);
      }
    });
    
    setBoardingPasses(allPasses);
    localStorage.setItem('boardingPasses', JSON.stringify(allPasses));
  };

  // Function to add boarding pass after booking
  const addBoardingPass = (flightData) => {
    const newPass = {
      id: `${flightData.flightNumber}-${flightData.departureAirportCode}-${flightData.arrivalAirportCode}`,
      airline: flightData.airlineName,
      flightNumber: flightData.flightNumber,
      from: `${flightData.departureAirportCode}`,
      to: `${flightData.arrivalAirportCode}`,
      date: flightData.departureDateTime?.split('T')[0] || '2024-02-15',
      time: flightData.departureTime,
      gate: `A${Math.floor(Math.random() * 20) + 1}`,
      seat: `${Math.floor(Math.random() * 30) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`,
      passenger: 'Passenger Name',
      pnr: Math.random().toString(36).substring(2, 8).toUpperCase(),
      qrData: `${flightData.flightNumber}-${flightData.departureAirportCode}-${flightData.arrivalAirportCode}-${Date.now()}`
    };
    
    const updatedPasses = [...boardingPasses, newPass];
    setBoardingPasses(updatedPasses);
    localStorage.setItem('boardingPasses', JSON.stringify(updatedPasses));
  };

  // Expose functions globally for booking component to use
  useEffect(() => {
    window.addBoardingPass = addBoardingPass;
    window.loadBoardingPassesFromBookings = loadBoardingPassesFromBookings;
  }, [boardingPasses]);

  const generateQRCode = async (data) => {
    // Mock QR code - in production, use a QR code library
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
        <rect width="150" height="150" fill="white"/>
        <rect x="10" y="10" width="130" height="130" fill="none" stroke="black" stroke-width="2"/>
        <text x="75" y="80" text-anchor="middle" font-family="monospace" font-size="8" fill="black">${data}</text>
      </svg>
    `)}`;
  };

  const downloadPassAsPDF = (pass) => {
    // Create HTML content for PDF
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
            .boarding-pass { background: white; max-width: 600px; margin: 0 auto; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #f97316, #3b82f6); color: white; padding: 30px; text-align: center; }
            .airline { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .flight-number { font-size: 20px; opacity: 0.9; }
            .content { padding: 30px; }
            .route { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
            .airport { text-align: center; }
            .airport-code { font-size: 36px; font-weight: bold; color: #1f2937; }
            .airport-name { color: #6b7280; margin-top: 5px; }
            .plane-icon { font-size: 24px; color: #f97316; }
            .details { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; }
            .detail-item { }
            .detail-label { color: #6b7280; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
            .detail-value { font-size: 18px; font-weight: bold; color: #1f2937; }
            .qr-section { text-align: center; padding: 20px; background: #f9fafb; border-radius: 10px; }
            .qr-placeholder { width: 120px; height: 120px; background: #e5e7eb; margin: 0 auto 10px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #6b7280; }
            .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="boarding-pass">
            <div class="header">
                <div class="airline">${pass.airline}</div>
                <div class="flight-number">${pass.flightNumber}</div>
            </div>
            <div class="content">
                <div class="route">
                    <div class="airport">
                        <div class="airport-code">${pass.from}</div>
                        <div class="airport-name">Departure</div>
                    </div>
                    <div class="plane-icon">✈</div>
                    <div class="airport">
                        <div class="airport-code">${pass.to}</div>
                        <div class="airport-name">Arrival</div>
                    </div>
                </div>
                <div class="details">
                    <div class="detail-item">
                        <div class="detail-label">Date</div>
                        <div class="detail-value">${pass.date}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Time</div>
                        <div class="detail-value">${pass.time}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Gate</div>
                        <div class="detail-value">${pass.gate}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Seat</div>
                        <div class="detail-value">${pass.seat}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Passenger</div>
                        <div class="detail-value">${pass.passenger}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">PNR</div>
                        <div class="detail-value">${pass.pnr}</div>
                    </div>
                </div>
                <div class="qr-section">
                    <div class="qr-placeholder">QR CODE<br/>${pass.qrData.substring(0, 15)}...</div>
                    <div style="font-size: 12px; color: #6b7280;">Scan at airport security and boarding</div>
                </div>
                <div class="footer">
                    Generated by AirTracker • ${new Date().toLocaleDateString()}
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
    
    // Create and download HTML file (acts as PDF alternative)
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boarding-pass-${pass.flightNumber}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Wallet Button - Only show if user is logged in and has boarding passes */}
      {isLoggedIn && boardingPasses.length > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 z-40 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
        >
          <FontAwesomeIcon icon={faWallet} className="text-xl" />
          {boardingPasses.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {boardingPasses.length}
            </span>
          )}
        </button>
      )}

      {/* Wallet Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                  <FontAwesomeIcon icon={faWallet} className="mr-3 text-blue-600" />
                  Boarding Pass Wallet
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              {/* Boarding Passes List */}
              <div className="space-y-4">
                {boardingPasses.map((pass) => (
                  <div
                    key={pass.id}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-xl p-4 border border-blue-200 dark:border-blue-700 cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => setSelectedPass(pass)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white">{pass.airline}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">{pass.flightNumber}</p>
                      </div>
                      <FontAwesomeIcon icon={faPlane} className="text-2xl text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Route</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{pass.from} → {pass.to}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Date & Time</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{pass.date} {pass.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Seat</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{pass.seat}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Gate</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{pass.gate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {boardingPasses.length === 0 && (
                <div className="text-center py-8">
                  <FontAwesomeIcon icon={faWallet} className="text-4xl text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No boarding passes yet</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Book a flight to see your boarding passes here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Boarding Pass Detail Modal */}
      {selectedPass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-sm w-full">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Boarding Pass</h3>
                <button
                  onClick={() => setSelectedPass(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              {/* Pass Details */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-4 mb-4">
                <div className="text-center mb-4">
                  <h4 className="text-2xl font-bold">{selectedPass.airline}</h4>
                  <p className="text-xl">{selectedPass.flightNumber}</p>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <p className="text-sm opacity-80">From</p>
                    <p className="text-lg font-bold">{selectedPass.from}</p>
                  </div>
                  <FontAwesomeIcon icon={faPlane} className="text-2xl" />
                  <div className="text-center">
                    <p className="text-sm opacity-80">To</p>
                    <p className="text-lg font-bold">{selectedPass.to}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="opacity-80">Date</p>
                    <p className="font-semibold">{selectedPass.date}</p>
                  </div>
                  <div>
                    <p className="opacity-80">Time</p>
                    <p className="font-semibold">{selectedPass.time}</p>
                  </div>
                  <div>
                    <p className="opacity-80">Gate</p>
                    <p className="font-semibold">{selectedPass.gate}</p>
                  </div>
                  <div>
                    <p className="opacity-80">Seat</p>
                    <p className="font-semibold">{selectedPass.seat}</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center mb-4">
                <div className="bg-white p-4 rounded-xl inline-block">
                  <QRCodeGenerator data={selectedPass.qrData} />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Scan at airport security and boarding
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedPass(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  Back
                </button>
                <button
                  onClick={() => downloadPassAsPDF(selectedPass)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// QR Code Generator Component
const QRCodeGenerator = ({ data }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const generateQR = async () => {
      // Mock QR code generation
      const mockQR = `data:image/svg+xml;base64,${btoa(`
        <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
          <rect width="150" height="150" fill="white"/>
          <g fill="black">
            <rect x="20" y="20" width="10" height="10"/>
            <rect x="40" y="20" width="10" height="10"/>
            <rect x="60" y="20" width="10" height="10"/>
            <rect x="20" y="40" width="10" height="10"/>
            <rect x="60" y="40" width="10" height="10"/>
            <rect x="20" y="60" width="10" height="10"/>
            <rect x="40" y="60" width="10" height="10"/>
            <rect x="60" y="60" width="10" height="10"/>
            <rect x="80" y="20" width="10" height="10"/>
            <rect x="100" y="40" width="10" height="10"/>
            <rect x="120" y="60" width="10" height="10"/>
          </g>
          <text x="75" y="140" text-anchor="middle" font-family="monospace" font-size="6" fill="black">${data.substring(0, 20)}</text>
        </svg>
      `)}`;
      setQrCodeUrl(mockQR);
    };

    generateQR();
  }, [data]);

  return qrCodeUrl ? (
    <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32" />
  ) : (
    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
      <FontAwesomeIcon icon={faQrcode} className="text-2xl text-gray-400" />
    </div>
  );
};

export default BoardingPassWallet;