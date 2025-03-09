import React from 'react';
import './ViewTransportation.css'; // Make sure to create this CSS file

function ViewTransportation() {
  // Sample transportation data
  const transportationData = [
    {
      "_id": "67cc5ee7034f81401cd45260",
      "type": "none",
      "charges": 1500,
      "ambulanceID": 1212,
      "ambulanceDriver": "Jithin",
      "number": 8097887654,
      "__v": 0
    },
    {
      "_id": "67cc5f89034f81401cd45262",
      "type": "none",
      "charges": 1500,
      "ambulanceID": 1212,
      "ambulanceDriver": "Jithin",
      "number": 8097887654,
      "__v": 0
    },
    {
      "_id": "67cc605d034f81401cd45275",
      "type": "Collective Ambulance",
      "charges": 200,
      "ambulanceID": 12111,
      "ambulanceDriver": "Jithu",
      "number": 78776768,
      "__v": 0
    }
  ];

  // Function to open WhatsApp with the driver's number
  const openWhatsApp = (number) => {
    // WhatsApp API URL format
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${number}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container">
      <h1 className="page-title">Transportation Details</h1>
      <div className="table-container">
        <table className="transport-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Charges</th>
              <th>Ambulance ID</th>
              <th>Driver</th>
              <th>Contact Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transportationData.map((item) => (
              <tr key={item._id}>
                <td>{item.type === "none" ? "Standard Ambulance" : item.type}</td>
                <td>₹{item.charges}</td>
                <td>{item.ambulanceID}</td>
                <td>{item.ambulanceDriver}</td>
                <td>{item.number}</td>
                <td className="action-buttons">
                  
                  <button 
                    className="whatsapp-button" 
                    onClick={() => openWhatsApp(item.number)}
                  >
                    WhatsApp
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewTransportation;