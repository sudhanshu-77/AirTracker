export const generateTicketPDF = (bookingData) => {
  const printWindow = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Flight Ticket - ${bookingData.id}</title>
        <style>
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            line-height: 1.6;
          }
          .ticket {
            max-width: 800px;
            margin: 0 auto;
            border: 2px solid #ea580c;
            border-radius: 10px;
            padding: 30px;
          }
          .header { 
            color: #ea580c; 
            font-size: 28px; 
            font-weight: bold; 
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #ea580c;
            padding-bottom: 15px;
          }
          .section { 
            margin: 20px 0; 
            padding: 15px;
            background: #f9f9f9;
            border-radius: 5px;
          }
          .label { 
            font-weight: bold; 
            color: #ea580c; 
            display: inline-block;
            min-width: 120px;
          }
          .flight-route {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin: 20px 0;
          }
          .passenger { 
            margin: 8px 0;
            padding: 5px;
            background: white;
            border-radius: 3px;
          }
          .total { 
            font-size: 24px; 
            font-weight: bold; 
            color: #16a34a; 
            text-align: center;
            margin-top: 30px;
            padding: 15px;
            background: #f0f9ff;
            border-radius: 5px;
          }
          .print-btn {
            background: #ea580c;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin: 20px auto;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="header">✈️ AirTracker - Flight Ticket</div>
          
          <div class="section">
            <div><span class="label">Booking ID:</span> ${bookingData.id}</div>
            <div><span class="label">Booking Date:</span> ${new Date(bookingData.bookingDate).toLocaleDateString()}</div>
            <div><span class="label">Status:</span> Confirmed</div>
          </div>
          
          <div class="flight-route">
            ${bookingData.flight.source} ✈️ ${bookingData.flight.destination}
          </div>
          
          <div class="section">
            <h3 style="color: #ea580c; margin-top: 0;">Flight Details</h3>
            <div><span class="label">Date:</span> ${bookingData.flight.date}</div>
            <div><span class="label">Departure:</span> ${bookingData.flight.departureTime}</div>
            <div><span class="label">Arrival:</span> ${bookingData.flight.arrivalTime}</div>
            <div><span class="label">Duration:</span> ${bookingData.flight.duration}</div>
            <div><span class="label">Class:</span> ${bookingData.flight.class}</div>
            <div><span class="label">Airline:</span> ${bookingData.flight.airline}</div>
          </div>
          
          <div class="section">
            <h3 style="color: #ea580c; margin-top: 0;">Passenger Details</h3>
            ${bookingData.passengers.map((passenger, index) => 
              `<div class="passenger">
                <strong>${index + 1}. ${passenger.title} ${passenger.firstName} ${passenger.lastName}</strong>
                ${passenger.type ? `<br><small>Type: ${passenger.type}</small>` : ''}
              </div>`
            ).join('')}
          </div>
          
          <div class="total">
            Total Amount Paid: ₹${bookingData.totalPrice.toLocaleString()}
          </div>
          
          <button class="print-btn no-print" onclick="window.print()">Print as PDF</button>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            Thank you for choosing AirTracker! Have a safe flight.
          </div>
        </div>
      </body>
      </html>
    `;
    
    const newWindow = window.open('', '_blank');
    newWindow.document.write(printContent);
    newWindow.document.close();
    
    // Auto-focus and show print dialog
    setTimeout(() => {
      newWindow.focus();
    }, 500);
  };
  
  return {
    save: (filename) => {
      printWindow();
    },
    output: () => null
  };
};