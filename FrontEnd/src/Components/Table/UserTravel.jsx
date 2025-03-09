import React, { useState, useEffect } from 'react';
import { CreditCard, Smartphone, Globe, X, CheckCircle, AlertCircle } from 'lucide-react';

// CSS Styles defined inline - moved to the component scope
function UserTravel({ appointmentStatus }) {
  // Define styles inside the component to ensure it's in scope
  const styles = {
    container: {
      padding: '16px'
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '16px'
    },
    tableContainer: {
      overflowX: 'auto',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px'
    },
    table: {
      width: '100%',
      backgroundColor: 'white',
      borderCollapse: 'collapse'
    },
    tableHead: {
      backgroundColor: '#f3f4f6'
    },
    tableHeader: {
      padding: '12px 16px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    tableRow: {
      borderBottom: '1px solid #e5e7eb',
      transition: 'background-color 0.2s'
    },
    tableRowHover: {
      backgroundColor: '#f9fafb'
    },
    tableCell: {
      padding: '12px 16px',
      fontSize: '14px'
    },
    patientName: {
      fontWeight: '500',
      color: '#111827'
    },
    contactInfo: {
      color: '#6b7280'
    },
    contactEmail: {
      fontSize: '12px'
    },
    payNowButton: {
      padding: '8px 16px',
      backgroundColor: '#22c55e',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    payNowButtonHover: {
      backgroundColor: '#16a34a'
    },
    paymentSection: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      borderRadius: '8px',
      position: 'relative'
    },
    closeButton: {
      position: 'absolute',
      top: '8px',
      right: '8px',
      background: 'none',
      border: 'none',
      color: '#6b7280',
      cursor: 'pointer'
    },
    closeButtonHover: {
      color: '#374151'
    },
    paymentSectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    paymentDetailsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    paymentDetails: {
      flex: '1'
    },
    amountLabel: {
      fontWeight: '500',
      marginBottom: '4px'
    },
    amountValue: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#16a34a',
      marginBottom: '8px'
    },
    paymentOptionsLabel: {
      fontWeight: '500',
      marginBottom: '4px'
    },
    paymentOptionsContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '16px'
    },
    paymentOptionButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      borderRadius: '4px',
      backgroundColor: '#e5e7eb',
      color: '#374151',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    paymentOptionButtonSelected: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    paymentOptionIcon: {
      marginRight: '4px'
    },
    upiIdContainer: {
      marginBottom: '16px'
    },
    upiIdLabel: {
      fontWeight: '500',
      marginBottom: '4px'
    },
    upiIdInput: {
      width: '100%',
      padding: '8px',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      outline: 'none'
    },
    upiIdInputFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.25)'
    },
    upiIdHelp: {
      fontSize: '12px',
      color: '#6b7280',
      marginTop: '4px'
    },
    proceedButton: {
      padding: '8px 16px',
      backgroundColor: '#22c55e',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'background-color 0.2s'
    },
    proceedButtonHover: {
      backgroundColor: '#16a34a'
    },
    proceedButtonDisabled: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed'
    },
    upiAppsLabel: {
      fontSize: '14px',
      fontWeight: '500',
      marginTop: '12px'
    },
    upiAppsContainer: {
      display: 'flex',
      gap: '8px',
      marginTop: '4px'
    },
    upiAppIcon: {
      width: '24px',
      height: '24px'
    },
    qrCodeContainer: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    qrCodeBox: {
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '8px',
      width: '256px',
      height: '256px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    qrCodeImage: {
      width: '160px',
      height: '160px',
      marginBottom: '8px'
    },
    qrCodeText: {
      textAlign: 'center',
      color: '#374151',
      fontWeight: '500'
    },
    orText: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '8px'
    },
    upiAppLink: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '8px 16px',
      backgroundColor: '#3b82f6',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '4px',
      transition: 'background-color 0.2s'
    },
    upiAppLinkHover: {
      backgroundColor: '#2563eb'
    },
    paidStatus: {
      display: 'flex',
      alignItems: 'center',
      color: '#16a34a'
    },
    paidStatusIcon: {
      marginRight: '4px'
    },
    paymentResultContainer: {
      padding: '16px',
      borderRadius: '8px'
    },
    paymentResultSuccess: {
      backgroundColor: '#f0fdf4'
    },
    paymentResultError: {
      backgroundColor: '#fef2f2'
    },
    paymentResultContent: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    paymentResultIcon: {
      marginRight: '8px',
      marginTop: '2px'
    },
    paymentResultTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '2px'
    },
    paymentResultTitleSuccess: {
      color: '#15803d'
    },
    paymentResultTitleError: {
      color: '#b91c1c'
    },
    paymentResultMessage: {
      color: '#374151',
      marginBottom: '8px'
    },
    transactionDetails: {
      backgroundColor: 'white',
      padding: '12px',
      borderRadius: '4px',
      border: '1px solid #e5e7eb',
      marginTop: '8px'
    },
    transactionItem: {
      fontSize: '14px',
      marginBottom: '4px'
    },
    transactionLabel: {
      fontWeight: '500'
    },
    closeResultButton: {
      marginTop: '12px',
      padding: '6px 12px',
      fontSize: '14px',
      backgroundColor: '#e5e7eb',
      color: '#374151',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    closeResultButtonHover: {
      backgroundColor: '#d1d5db'
    },
    emptyMessage: {
      padding: '12px 16px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#6b7280'
    },
    // Media queries would be handled via JavaScript in React
    responsiveContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    responsiveDesktop: {
      display: 'flex',
      flexDirection: 'row',
      gap: '24px'
    },
    gpayButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 16px',
      backgroundColor: '#ffffff',
      color: '#000000',
      border: '1px solid #dadce0',
      borderRadius: '4px',
      cursor: 'pointer',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    gpayButtonHover: {
      backgroundColor: '#f8f9fa'
    }
  };

  const [showPayment, setShowPayment] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState({});
  const [loading, setLoading] = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isGPayAvailable, setIsGPayAvailable] = useState(false);
  
  // Initialize Google Pay
  useEffect(() => {
    // Check if Google Pay is available
    if (typeof window !== 'undefined' && window.google && window.google.payments) {
      const paymentClient = new window.google.payments.api.PaymentsClient({
        environment: 'TEST' // Use 'PRODUCTION' for live environment
      });
      
      const isReadyToPayRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'UPI',
            parameters: {
              payeeVpa: 'merchant-vpa@bank',
              payeeName: 'Your Hospital Name',
              mcc: '8099', // Medical Services code
              referenceUrl: typeof window !== 'undefined' ? window.location.origin : ''
            }
          }
        ]
      };
      
      paymentClient
        .isReadyToPay(isReadyToPayRequest)
        .then(response => {
          setIsGPayAvailable(response.result);
        })
        .catch(error => {
          console.error('Google Pay availability check failed', error);
        });
    }
  }, []);

  const togglePayment = (id) => {
    setShowPayment(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleUpiPayment = (appointmentId) => {
    // Set loading state
    setLoading(prev => ({ ...prev, [appointmentId]: true }));
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(prev => ({ ...prev, [appointmentId]: false }));
      setPaymentStatus(prev => ({ 
        ...prev, 
        [appointmentId]: { 
          status: 'success', 
          message: 'Payment successful! Appointment confirmed.', 
          transactionId: 'UPI' + Math.random().toString(36).substring(2, 10).toUpperCase() 
        } 
      }));
    }, 2000);
  };

  // Process Google Pay payment
  const processGooglePayment = (appointmentId, appointment) => {
    if (typeof window === 'undefined' || !window.google || !window.google.payments) {
      console.error('Google Pay is not available');
      return;
    }

    setLoading(prev => ({ ...prev, [appointmentId]: true }));

    const paymentClient = new window.google.payments.api.PaymentsClient({
      environment: 'TEST' // Use 'PRODUCTION' for live environment
    });

    const paymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'UPI',
          parameters: {
            payeeVpa: 'hospital@upi', // Your UPI VPA
            payeeName: 'Hospital Name',
            mcc: '8099',
            referenceUrl: window.location.origin
          }
        }
      ],
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: '1000.00',
        currencyCode: 'INR',
        countryCode: 'IN'
      },
      merchantInfo: {
        merchantId: 'YOUR_MERCHANT_ID', // Replace with your merchant ID
        merchantName: 'Your Hospital Name'
      },
      callbackIntents: ['PAYMENT_AUTHORIZATION']
    };

    paymentClient
      .loadPaymentData(paymentDataRequest)
      .then(paymentData => {
        // Payment successful
        setLoading(prev => ({ ...prev, [appointmentId]: false }));
        setPaymentStatus(prev => ({
          ...prev,
          [appointmentId]: {
            status: 'success',
            message: 'Google Pay payment successful! Appointment confirmed.',
            transactionId: 'GPAY' + Math.random().toString(36).substring(2, 10).toUpperCase()
          }
        }));
      })
      .catch(error => {
        // Payment failed or was canceled
        setLoading(prev => ({ ...prev, [appointmentId]: false }));
        setPaymentStatus(prev => ({
          ...prev,
          [appointmentId]: {
            status: 'error',
            message: 'Payment failed or canceled. Please try again.',
          }
        }));
        console.error('Google Pay error:', error);
      });
  };

  // Generate UPI payment link
  const getUpiLink = (appointment) => {
    const amount = 1000;
    const merchantId = "YourMerchantID";
    const transactionNote = `Advance for ${appointment.patientName}'s appointment`;
    const merchantName = "HospitalName";
    
    return `upi://pay?pa=${upiId || 'hospital@upi'}&pn=${merchantName}&am=${amount}&tn=${transactionNote}&cu=INR`;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Patient Appointments</h2>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.tableHeader}>Patient Name</th>
              <th style={styles.tableHeader}>Contact</th>
              <th style={styles.tableHeader}>Disease</th>
              <th style={styles.tableHeader}>Department</th>
              <th style={styles.tableHeader}>Appointment</th>
              <th style={styles.tableHeader}>Amount</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointmentStatus && appointmentStatus.length > 0 ? (
              appointmentStatus.map((appointment) => (
                <React.Fragment key={appointment._id.toString()}>
                  <tr 
                    style={{
                      ...styles.tableRow,
                      ...(hoveredRow === appointment._id.toString() ? styles.tableRowHover : {})
                    }}
                    onMouseEnter={() => setHoveredRow(appointment._id.toString())}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={{...styles.tableCell, ...styles.patientName}}>{appointment.patientName}</td>
                    <td style={styles.tableCell}>
                      <div style={styles.contactInfo}>{appointment.mobile}</div>
                      <div style={{...styles.contactInfo, ...styles.contactEmail}}>{appointment.email}</div>
                    </td>
                    <td style={{...styles.tableCell, ...styles.contactInfo}}>{appointment.disease}</td>
                    <td style={{...styles.tableCell, ...styles.contactInfo}}>{appointment.department}</td>
                    <td style={{...styles.tableCell, ...styles.contactInfo}}>
                      <div>{new Date(appointment.date).toLocaleDateString()}</div>
                      <div>{appointment.time}</div>
                    </td>
                    <td style={{...styles.tableCell, ...styles.patientName}}>₹1,000</td>
                    <td style={styles.tableCell}>
                      {paymentStatus[appointment._id.toString()]?.status === 'success' ? (
                        <div style={styles.paidStatus}>
                          <CheckCircle size={16} style={styles.paidStatusIcon} />
                          <span>Paid</span>
                        </div>
                      ) : (
                        <button 
                          onClick={() => togglePayment(appointment._id.toString())}
                          style={styles.payNowButton}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.payNowButtonHover.backgroundColor}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.payNowButton.backgroundColor}
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                  {showPayment[appointment._id.toString()] && !paymentStatus[appointment._id.toString()] && (
                    <tr>
                      <td colSpan="7" style={styles.tableCell}>
                        <div style={styles.paymentSection}>
                          <button 
                            onClick={() => togglePayment(appointment._id.toString())}
                            style={styles.closeButton}
                            onMouseEnter={(e) => e.currentTarget.style.color = styles.closeButtonHover.color}
                            onMouseLeave={(e) => e.currentTarget.style.color = styles.closeButton.color}
                          >
                            <X size={20} />
                          </button>
                          
                          <h3 style={styles.paymentSectionTitle}>Pay Advance Amount</h3>
                          <div style={typeof window !== 'undefined' && window.innerWidth > 768 ? styles.responsiveDesktop : styles.responsiveContainer}>
                            <div style={styles.paymentDetails}>
                              <p style={styles.amountLabel}>Amount:</p>
                              <p style={styles.amountValue}>₹1,000</p>
                              <p style={styles.paymentOptionsLabel}>Payment Options:</p>
                              <div style={styles.paymentOptionsContainer}>
                                <button 
                                  onClick={() => setPaymentMethod('upi')}
                                  style={{
                                    ...styles.paymentOptionButton,
                                    ...(paymentMethod === 'upi' ? styles.paymentOptionButtonSelected : {})
                                  }}
                                >
                                  <Smartphone size={16} style={styles.paymentOptionIcon} />
                                  UPI
                                </button>
                                <button 
                                  onClick={() => setPaymentMethod('card')}
                                  style={{
                                    ...styles.paymentOptionButton,
                                    ...(paymentMethod === 'card' ? styles.paymentOptionButtonSelected : {})
                                  }}
                                >
                                  <CreditCard size={16} style={styles.paymentOptionIcon} />
                                  Card
                                </button>
                                <button 
                                  onClick={() => setPaymentMethod('netbanking')}
                                  style={{
                                    ...styles.paymentOptionButton,
                                    ...(paymentMethod === 'netbanking' ? styles.paymentOptionButtonSelected : {})
                                  }}
                                >
                                  <Globe size={16} style={styles.paymentOptionIcon} />
                                  Net Banking
                                </button>
                              </div>
                              
                              {paymentMethod === 'upi' && (
                                <div style={styles.upiIdContainer}>
                                  <p style={styles.upiIdLabel}>UPI ID:</p>
                                  <input 
                                    type="text" 
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    placeholder="yourname@upi" 
                                    style={styles.upiIdInput}
                                  />
                                  <p style={styles.upiIdHelp}>Enter your UPI ID (e.g., mobilenumber@upi, username@bank)</p>
                                </div>
                              )}
                              
                              <button 
                                onClick={() => handleUpiPayment(appointment._id.toString())}
                                disabled={loading[appointment._id.toString()]}
                                style={{
                                  ...styles.proceedButton,
                                  ...(loading[appointment._id.toString()] ? styles.proceedButtonDisabled : {})
                                }}
                                onMouseEnter={(e) => {
                                  if (!loading[appointment._id.toString()]) {
                                    e.currentTarget.style.backgroundColor = styles.proceedButtonHover.backgroundColor;
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!loading[appointment._id.toString()]) {
                                    e.currentTarget.style.backgroundColor = styles.proceedButton.backgroundColor;
                                  }
                                }}
                              >
                                {loading[appointment._id.toString()] ? 'Processing...' : 'Proceed to Pay'}
                              </button>
                              
                              {paymentMethod === 'upi' && (
                                <div>
                                  <p style={styles.upiAppsLabel}>Pay with:</p>
                                  <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    marginTop: '8px'
                                  }}>
                                    {/* Google Pay Button */}
                                    {isGPayAvailable && (
                                      <button
                                        onClick={() => processGooglePayment(appointment._id.toString(), appointment)}
                                        disabled={loading[appointment._id.toString()]}
                                        style={{
                                          ...styles.gpayButton,
                                          ...(loading[appointment._id.toString()] ? styles.proceedButtonDisabled : {})
                                        }}
                                        onMouseEnter={(e) => {
                                          if (!loading[appointment._id.toString()]) {
                                            e.currentTarget.style.backgroundColor = styles.gpayButtonHover.backgroundColor;
                                          }
                                        }}
                                        onMouseLeave={(e) => {
                                          if (!loading[appointment._id.toString()]) {
                                            e.currentTarget.style.backgroundColor = styles.gpayButton.backgroundColor;
                                          }
                                        }}
                                      >
                                        <img 
                                          src="https://bizglide.in/images/pay/google-pay.jpg" 
                                          alt="Google Pay" 
                                          style={{ marginRight: '8px' }} 
                                        />
                                        Pay with Google Pay
                                      </button>
                                    )}
                                    
                                    <div style={styles.upiAppsContainer}>
                                      <img src= "https://d3pc1xvrcw35tl.cloudfront.net/images/1200x900/payment-app-phone-pay-has-launched-an-aggregator-service-know-here-everything_2023061030257.jpg" alt="Google Pay" style={styles.upiAppIcon} />
                                      <img src="https://static.vecteezy.com/system/resources/previews/017/221/853/original/google-pay-logo-transparent-free-png.png" alt="PhonePe" style={styles.upiAppIcon} />
                                      <img src="https://tse4.mm.bing.net/th?id=OIP.EyGlgQiGfQ1BNGKI0OH_UQHaEK&pid=Api&P=0&h=180" alt="Paytm" style={styles.upiAppIcon} />
                                      <img src="https://tse1.mm.bing.net/th?id=OIP.D5zpdYGd7K0hViAYdpfNwQHaHa&pid=Api&P=0&h=180" alt="BHIM" style={styles.upiAppIcon} />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {paymentMethod === 'upi' && (
                              <div style={styles.qrCodeContainer}>
                                <div style={styles.qrCodeBox}>
                                  <img src="https://bizglide.in/images/pay/google-pay.jpg" alt="UPI QR Code" style={styles.qrCodeImage} />
                                  <p style={styles.qrCodeText}>Scan to pay ₹1,000</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                  <p style={styles.orText}>OR</p>
                                  <a 
                                    href={getUpiLink(appointment)}
                                    style={styles.upiAppLink}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.upiAppLinkHover.backgroundColor}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.upiAppLink.backgroundColor}
                                  >
                                    <Smartphone size={16} style={{ marginRight: '4px' }} />
                                    Pay via UPI App
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                  
                  {paymentStatus[appointment._id.toString()] && (
                    <tr>
                      <td colSpan="7" style={styles.tableCell}>
                        <div style={{
                          ...styles.paymentResultContainer,
                          ...(paymentStatus[appointment._id.toString()].status === 'success' 
                              ? styles.paymentResultSuccess 
                              : styles.paymentResultError)
                        }}>
                          <div style={styles.paymentResultContent}>
                            {paymentStatus[appointment._id.toString()].status === 'success' ? (
                              <CheckCircle 
                                style={{...styles.paymentResultIcon, color: '#16a34a'}} 
                                size={20} 
                              />
                            ) : (
                              <AlertCircle 
                                style={{...styles.paymentResultIcon, color: '#dc2626'}} 
                                size={20} 
                              />
                            )}
                            <div>
                              <h3 style={{
                                ...styles.paymentResultTitle,
                                ...(paymentStatus[appointment._id.toString()].status === 'success' 
                                    ? styles.paymentResultTitleSuccess 
                                    : styles.paymentResultTitleError)
                              }}>
                                {paymentStatus[appointment._id.toString()].status === 'success' 
                                  ? 'Payment Successful' 
                                  : 'Payment Failed'}
                              </h3>
                              <p style={styles.paymentResultMessage}>
                                {paymentStatus[appointment._id.toString()].message}
                              </p>
                              {paymentStatus[appointment._id.toString()].status === 'success' && (
                                <div style={styles.transactionDetails}>
                                  <p style={styles.transactionItem}>
                                    <span style={styles.transactionLabel}>Transaction ID:</span> {paymentStatus[appointment._id.toString()].transactionId}
                                  </p>
                                  <p style={styles.transactionItem}>
                                    <span style={styles.transactionLabel}>Date:</span> {new Date().toLocaleString()}
                                  </p>
                                  <p style={styles.transactionItem}>
                                    <span style={styles.transactionLabel}>Amount:</span> ₹1,000
                                  </p>
                                  <p style={styles.transactionItem}>
                                    <span style={styles.transactionLabel}>Payment Method:</span> 
                                    {paymentStatus[appointment._id.toString()].transactionId?.startsWith('GPAY') ? 'Google Pay' : 'UPI'}
                                  </p>
                                </div>
                              )}
                              <div>
                                <button 
                                  onClick={() => togglePayment(appointment._id.toString())}
                                  style={styles.closeResultButton}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.closeResultButtonHover.backgroundColor}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.closeResultButton.backgroundColor}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={styles.emptyMessage}>No patient data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTravel;