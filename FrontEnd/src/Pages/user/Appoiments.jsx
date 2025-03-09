import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { json } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserTravel from '../../Components/Table/UserTravel';
import ViewTransportation from '../../Components/Transpotation/ViewTranspotation'
function Appointments() {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusEmail, setStatusEmail] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState(null);
  const [statusError, setStatusError] = useState('');
  const notify = (text) => toast(text);

  // Common diseases list (placeholder for CommonProblem from MixedObjectData)
  const CommonProblem = [
    { title: "Fever" },
    { title: "Cold & Flu" },
    { title: "Headache" },
    { title: "Stomach Pain" },
    { title: "Diabetes" },
    { title: "Hypertension" },
    { title: "Arthritis" },
    { title: "Asthma" }
  ];

  const InitValue = {
    patientName: "",
    age: "",
    gender: "",
    mobile: "",
    disease: "",
    address: "",
    email: "",
    department: "",
    date: "",
    time: "",
  };

  const [BookAppoint, setBookAppoint] = useState(InitValue);

  const HandleAppointment = (e) => {
    setBookAppoint({ ...BookAppoint, [e.target.name]: e.target.value });
  };

  const HandleOnsubmitAppointment = (e) => {
    e.preventDefault();

    if (BookAppoint.gender === "" || BookAppoint.department === "") {
      return notify("Please fill all the Details");
    }
    setLoading(true);
    
    // Simulating dispatch actions since we don't have the actual implementation
    // In a real app, you would use your actual dispatch functions
    setTimeout(() => {
      notify("Appointment Booked");
      setLoading(false);
      setBookAppoint(InitValue);
    }, 1500);
    localStorage.setItem("email", BookAppoint.email)
    axios.post('http://localhost:5000/appointments/create', {BookAppoint}).then((response => {
            console.log(response)
    }))
    // /* 
    // Actual implementation would be:
    // dispatch(AddPatients({ ...BookAppoint, patientId: Date.now() })).then(
    //   (res) => {
    //     let data = {
    //       ...BookAppoint,
    //       patientId: res.id,
    //     };
    //     dispatch(CreateBooking(data));
    //     notify("Appointment Booked");
    //     setLoading(false);
    //     setBookAppoint(InitValue);
    //   }
    // );
    // */
  };

  const handleEmailChange = (e) => {
    setStatusEmail(e.target.value);
    setAppointmentStatus(null);
    setStatusError('');
  };

  const handleStatusCheck = (e) => {
    e.preventDefault();
    
    if (!statusEmail) {
      return notify("Please enter your email address");
    }

    setStatusLoading(true);
    setStatusError('');
      console.log(statusEmail)
    // Make API call to check appointment status
    axios.post(`http://localhost:5000/Viewappointments/checStatus`,{
      statusEmail
    })
      .then(response => {
        setAppointmentStatus(response.data);
        console.log(response.data)
        setStatusLoading(false);
      })
      .catch(err => {
        console.error('Error fetching appointment status:', err);
        setStatusError('Unable to retrieve appointment status. Please try again later.');
        notify("Error checking appointment status");
        setStatusLoading(false);
      });
  };

  // useEffect(()=>{
  //     let email = localStorage.getItem("email")
  //     if(email){
  //       email = JSON.parse(email)
  //     }
  //     axios.get(`http://localhost:5000/cheStatus/${email}`)
  // })
  return (
    <div className="appointment-page">
      <ToastContainer />
      <header className="header">
        <div className="logo">
          <h1>HealthCare</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Doctors</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Your Health Is Our Priority</h1>
          <p>Book an appointment with our specialists today and take the first step towards better health.</p>
          <a href="#booking-form" className="btn-primary">Book Appointment</a>
          <a href="#status-checker" className="btn-secondary">Check Status</a>
          <a href="#status-checker" className="btn-secondary">View Transpotations </a>

        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🏥</div>
          <h3>Modern Facilities</h3>
          <p>State-of-the-art equipment for accurate diagnosis and treatment</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👨‍⚕️</div>
          <h3>Expert Doctors</h3>
          <p>Experienced specialists providing the best care possible</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⏰</div>
          <h3>24/7 Support</h3>
          <p>Round-the-clock medical assistance for emergencies</p>
        </div>
      </section>

      <section id="status-checker" className="status-checker-section">
        <h2>Check Your Appointment Status</h2>
        <p>Enter your email address to check the status of your appointment</p>
        
        <form onSubmit={handleStatusCheck} className="status-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="inputdiv">
              <input
                type="email"
                placeholder="Enter your email address"
                value={statusEmail}
                onChange={handleEmailChange}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn-submit">
            {statusLoading ? "Checking..." : "Check Status"}
          </button>
        </form>

        {statusError && <div className="error-message">{statusError}</div>}
        
        {appointmentStatus && (
          <div className="status-result">
            <h3>Appointment Details</h3>
            <div className="appointment-details">
              {appointmentStatus.patientName && (
                <p><strong>Patient Name:</strong> {appointmentStatus.patientName}</p>
              )}
              {appointmentStatus.date && (
                <p><strong>Date:</strong> {appointmentStatus.date}</p>
              )}
              {appointmentStatus.time && (
                <p><strong>Time:</strong> {appointmentStatus.time}</p>
              )}
              {appointmentStatus.department && (
                <p><strong>Department:</strong> {appointmentStatus.department}</p>
              )}
              {appointmentStatus.status && (
                <p className={`appointment-status ${appointmentStatus.status.toLowerCase()}`}>
                  <strong>Status:</strong> {appointmentStatus.status}
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      <section id="booking-form" className="booking-section">
        <h2>Book Your Appointment</h2>
        <p>Fill out the form below and we will get back to you within 24 hours.</p>
        
        <form onSubmit={HandleOnsubmitAppointment} className="appointment-form">
          <div className="form-row">
            <div className="form-group">
              <label>Patient Name</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="patientName"
                  value={BookAppoint.patientName}
                  onChange={HandleAppointment}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Age</label>
              <div className="inputdiv">
                <input
                  type="number"
                  placeholder="Age"
                  name="age"
                  value={BookAppoint.age}
                  onChange={HandleAppointment}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <div className="inputdiv">
                <select
                  name="gender"
                  value={BookAppoint.gender}
                  onChange={HandleAppointment}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <div className="inputdiv">
                <input
                  type="number"
                  placeholder="Phone Number"
                  name="mobile"
                  value={BookAppoint.mobile}
                  onChange={HandleAppointment}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <div className="inputdiv">
                <input
                  type="email"
                  placeholder="example@email.com"
                  name="email"
                  value={BookAppoint.email}
                  onChange={HandleAppointment}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Type of Disease</label>
              <div className="inputdiv">
                <select
                  name="disease"
                  value={BookAppoint.disease}
                  onChange={HandleAppointment}
                  required
                >
                  <option value="">Select Disease</option>
                  {CommonProblem.map((ele, i) => (
                    <option key={i} value={ele.title}>
                      {ele.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Address</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="Address line 1"
                  name="address"
                  value={BookAppoint.address}
                  onChange={HandleAppointment}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Department</label>
              <div className="inputdiv">
                <select
                  name="department"
                  value={BookAppoint.department}
                  onChange={HandleAppointment}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="ENT">ENT</option>
                  <option value="Ophthalmologist">Ophthalmologist</option>
                  <option value="Anesthesiologist">Anesthesiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Oncologist">Oncologist</option>
                  <option value="Psychiatrist">Psychiatrist</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row dateofAppointment">
            <div className="form-group">
              <label>Date</label>
              <div className="inputdiv">
                <input
                  type="date"
                  placeholder="Choose Date"
                  name="date"
                  value={BookAppoint.date}
                  onChange={HandleAppointment}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Time</label>
              <div className="inputdiv">
                <input
                  type="time"
                  placeholder="Choose Time"
                  name="time"
                  value={BookAppoint.time}
                  onChange={HandleAppointment}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            {Loading ? "Loading..." : "Book Appointment"}
          </button>
        </form>
      </section>
      <selection>
                    <UserTravel  appointmentStatus={appointmentStatus}/>

                    <ViewTransportation/>
      </selection>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HealthCare</h3>
            <p>Providing quality healthcare services for over 20 years.</p>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>123 Medical Drive, Healthcare City</p>
            <p>Email: info@healthcare.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="footer-section">
            <h3>Hours</h3>
            <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
            <p>Saturday: 9:00 AM - 5:00 PM</p>
            <p>Sunday: Emergency Only</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 HealthCare. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Arial', sans-serif;
        }

        body {
          background-color: #ffffff;
          color: #333;
          line-height: 1.6;
        }

        a {
          text-decoration: none;
          color: #007bff;
        }

        ul {
          list-style: none;
        }

        /* Header Styles */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 5%;
          background-color: #ffffff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
        }

        .logo h1 {
          color: #007bff;
          font-size: 24px;
        }

        .nav ul {
          display: flex;
        }

        .nav ul li {
          margin-left: 30px;
        }

        .nav ul li a {
          color: #333;
          font-weight: 500;
          transition: 0.3s;
        }

        .nav ul li a:hover,
        .nav ul li a.active {
          color: #007bff;
        }

        /* Hero Section */
        .hero {
          height: 500px;
          background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6)), url('https://via.placeholder.com/1920x1080') center/cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 20px;
          margin-top: 70px;
        }

        .hero-content {
          max-width: 800px;
        }

        .hero-content h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #333;
        }

        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          color: #555;
        }

        .btn-primary {
          display: inline-block;
          padding: 12px 30px;
          background-color: #007bff;
          color: white;
          border-radius: 4px;
          font-weight: 500;
          transition: 0.3s;
          margin-right: 15px;
        }

        .btn-secondary {
          display: inline-block;
          padding: 12px 30px;
          background-color: transparent;
          color: #007bff;
          border: 2px solid #007bff;
          border-radius: 4px;
          font-weight: 500;
          transition: 0.3s;
        }

        .btn-primary:hover {
          background-color: #0056b3;
        }

        .btn-secondary:hover {
          background-color: rgba(0, 123, 255, 0.1);
        }

        /* Features Section */
        .features {
          display: flex;
          justify-content: space-between;
          padding: 80px 5%;
          background-color: #f8f9fa;
        }

        .feature-card {
          flex: 1;
          background: white;
          margin: 0 15px;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          text-align: center;
          transition: 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #333;
        }

        .feature-card p {
          color: #666;
        }

        /* Status Checker Section */
        .status-checker-section {
          padding: 80px 5%;
          text-align: center;
          background-color: #f8f9fa;
        }

        .status-checker-section h2 {
          font-size: 2rem;
          margin-bottom: 15px;
          color: #333;
        }

        .status-checker-section > p {
          color: #666;
          margin-bottom: 40px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .status-form {
          max-width: 500px;
          margin: 0 auto;
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          text-align: left;
        }

        .status-result {
          max-width: 500px;
          margin: 30px auto 0;
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          text-align: left;
        }

        .status-result h3 {
          margin-bottom: 20px;
          color: #333;
          text-align: center;
        }

        .appointment-details p {
          margin-bottom: 10px;
          padding: 8px;
          border-bottom: 1px solid #eee;
        }

        .appointment-details p:last-child {
          border-bottom: none;
        }

        .appointment-status {
          font-weight: 500;
        }

        .appointment-status.confirmed {
          color: #28a745;
        }

        .appointment-status.pending {
          color: #ffc107;
        }

        .appointment-status.cancelled {
          color: #dc3545;
        }

        .error-message {
          color: #dc3545;
          margin-top: 20px;
          padding: 10px;
          background-color: rgba(220, 53, 69, 0.1);
          border-radius: 4px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Booking Section */
        .booking-section {
          padding: 80px 5%;
          text-align: center;
        }

        .booking-section h2 {
          font-size: 2rem;
          margin-bottom: 15px;
          color: #333;
        }

        .booking-section > p {
          color: #666;
          margin-bottom: 40px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .appointment-form {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          text-align: left;
        }

        .form-row {
          display: flex;
          margin-bottom: 20px;
        }

        .form-group {
          flex: 1;
          margin: 0 10px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #333;
        }

        .inputdiv {
          width: 100%;
        }

        .inputdiv input,
        .inputdiv select,
        .inputdiv textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

        .inputdiv textarea {
          resize: vertical;
        }

        .dateofAppointment {
          margin-bottom: 20px;
        }

        .btn-submit {
          display: inline-block;
          padding: 12px 30px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-weight: 500;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 20px;
        }

        .btn-submit:hover {
          background-color: #0056b3;
        }

        /* Footer Styles */
        .footer {
          background-color: #f8f9fa;
          padding: 60px 5% 20px;
          margin-top: 80px;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .footer-section {
          flex: 1;
          margin: 0 15px;
        }

        .footer-section h3 {
          font-size: 1.3rem;
          margin-bottom: 20px;
          color: #333;
        }

        .footer-section p {
          color: #666;
          margin-bottom: 10px;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            padding: 20px;
          }

          .nav ul {
            margin-top: 20px;
          }

          .nav ul li {
            margin-left: 15px;
          }

          .hero {
            height: auto;
            padding: 100px 20px 60px;
          }

          .features {
            flex-direction: column;
          }

          .feature-card {
            margin: 15px 0;
          }

          .form-row {
            flex-direction: column;
          }

          .form-group {
            margin: 0 0 20px 0;
          }

          .footer-content {
            flex-direction: column;
          }

          .footer-section {
            margin: 0 0 30px 0;
          }
          
          .btn-primary, .btn-secondary {
            display: block;
            margin: 10px auto;
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
}

export default Appointments;