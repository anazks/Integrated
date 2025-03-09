import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Tag, InputNumber } from "antd";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Sidebar from "../../GlobalFiles/Sidebar";

function AppointmentsPayment() {
  const { data } = useSelector((store) => store.auth || { data: { isAuthticated: true, user: { userType: "admin" } } });
  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [paymentForm] = Form.useForm();
  const notify = (text) => toast(text);

  // Fetch appointments data from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setFetchLoading(true);
        const response = await axios.get("http://localhost:5000/Viewappointments");
        
        // Transform the API data to match our component's expected format
        const formattedAppointments = response.data.map(appointment => ({
          id: appointment._id,
          patientName: appointment.patientName,
          age: appointment.age.toString(),
          gender: appointment.gender,
          mobile: appointment.mobile.toString(),
          disease: appointment.disease,
          address: appointment.address,
          email: appointment.email,
          department: appointment.department,
          date: appointment.date,
          time: appointment.time,
          status: appointment.status || "Pending", // Use status from API or default to "Pending"
          totalCost: appointment.totalCost || 1500 // Use cost from API or default to 1500
        }));
        
        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        notify("Failed to fetch appointments data");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Payment processing function
  const handlePayment = async (values) => {
    setLoading(true);
    
    try {
      // Make API call to update payment
      console.log(selectedAppointment,"selectedAppointment")
      const response = await axios.post(
        `http://localhost:5000/Viewappointments/appointment`,
        {
          selectedAppointment
        }
      );
      
      // Update the appointment status locally
      const updatedAppointments = appointments.map(app => 
        app.id === selectedAppointment.id 
          ? { 
              ...app, 
              status: "updated   ", 
              paymentMethod: values.paymentMethod, 
              paymentAmount: values.paymentAmount,
              paymentId: response.data.paymentId || `PY${Date.now().toString().substr(-6)}` 
            } 
          : app
      );
      
      setAppointments(updatedAppointments);
      notify("Payment processed successfully!");
    } catch (error) {
      console.error("Error processing payment:", error);
      notify("Failed to process payment");
    } finally {
      setLoading(false);
      setPaymentModal(false);
      paymentForm.resetFields();
    }
  };

  // Open payment modal
  const showPaymentModal = (appointment) => {
    setSelectedAppointment(appointment);
    setPaymentModal(true);
    
    // Set initial form values
    paymentForm.setFieldsValue({
      paymentAmount: appointment.totalCost,
      paymentMethod: "Credit Card"
    });
  };

  // Table columns configuration
  const columns = [
    { 
      title: "Appointment ID", 
      dataIndex: "id", 
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id)
    },
    { 
      title: "Patient Name", 
      dataIndex: "patientName", 
      key: "patientName",
      sorter: (a, b) => a.patientName.localeCompare(b.patientName)
    },
    { 
      title: "Department", 
      dataIndex: "department", 
      key: "department",
      filters: [
        { text: 'Cardiology', value: 'Cardiology' },
        { text: 'Neurology', value: 'Neurology' },
        { text: 'ENT', value: 'ENT' },
        { text: 'Ophthalmologist', value: 'Ophthalmologist' },
        { text: 'Dermatologist', value: 'Dermatologist' },
      ],
      onFilter: (value, record) => record.department === value,
    },
    { 
      title: "Date", 
      dataIndex: "date", 
      key: "date",
      render: (text, record) => `${text} at ${record.time}`
    },
    { 
      title: "Total Cost", 
      dataIndex: "totalCost", 
      key: "totalCost",
      sorter: (a, b) => a.totalCost - b.totalCost,
      render: (cost) => `$${cost.toFixed(2)}`
    },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'Confirmed', value: 'Confirmed' },
        { text: 'Paid', value: 'Paid' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = 'blue';
        if (status === 'Paid') {
          color = 'green';
        } else if (status === 'Pending') {
          color = 'orange';
        }
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button 
          type="primary" 
          onClick={() => showPaymentModal(record)} 
          disabled={record.status === "Paid"}
        >
          {record.status === "Paid" ? "Paid" : "Process Payment"}
        </Button>
      ),
    },
  ];

  // Auth checks
  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user?.userType !== "admin") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="container">
      <Sidebar/>
      <ToastContainer />
      <div className="AfterSideBar">
        <div className="Payment_Page">
          <h1 style={{ marginBottom: "2rem" }}>All Appointments</h1>
          <div className="appointmentBox">
            <Table
              columns={columns}
              dataSource={appointments}
              rowKey="id"
              className="PaymentTable"
              pagination={{ pageSize: 5 }}
              loading={fetchLoading}
            />
          </div>

          {/* Payment Modal */}
          <Modal
            title="Process Payment"
            open={paymentModal}
            onCancel={() => setPaymentModal(false)}
            footer={null}
          >
            {selectedAppointment && (
              <div>
                <div className="payment-details">
                  <h3>Appointment Details</h3>
                  <p><strong>Patient:</strong> {selectedAppointment.patientName}</p>
                  <p><strong>Department:</strong> {selectedAppointment.department}</p>
                  <p><strong>Date & Time:</strong> {selectedAppointment.date} at {selectedAppointment.time}</p>
                  <p><strong>Standard Fee:</strong> ${selectedAppointment.totalCost.toFixed(2)}</p>
                </div>
                
                <Form
                  form={paymentForm}
                  onFinish={handlePayment}
                  layout="vertical"
                >
                  <Form.Item
                    name="paymentAmount"
                    label="Payment Amount"
                    rules={[{ required: true, message: 'Please enter payment amount' }]}
                  >
                    <InputNumber
                      min={1} 
                      prefix="$"
                      style={{ width: '100%' }}
                      precision={2}
                    />
                  </Form.Item>
                  
                  {/* <Form.Item
                    name="paymentMethod"
                    label="Payment Method"
                    rules={[{ required: true, message: 'Please select payment method' }]}
                  >
                    <Select>
                      <Select.Option value="Credit Card">Credit Card</Select.Option>
                      <Select.Option value="Debit Card">Debit Card</Select.Option>
                      <Select.Option value="Cash">Cash</Select.Option>
                      <Select.Option value="Insurance">Insurance</Select.Option>
                      <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
                    </Select>
                  </Form.Item> */}
                  
                  <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <Button onClick={() => setPaymentModal(false)}>
                        Cancel
                      </Button>
                      <Button type="primary" htmlType="submit" loading={loading}>
                        Process Payment
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            )}
          </Modal>
        </div>
      </div>

      <style>{`
        .container {
          display: flex;
          width: 100%;
          min-height: 100vh;
          background: #f8f9fa;
        }
        
        .AfterSideBar {
          flex: 1;
          padding: 2rem;
          background: white;
          margin-left: 250px; /* Adjust based on your sidebar width */
        }
        
        .Payment_Page {
          width: 100%;
        }
        
        .Payment_Page h1 {
          color: #333;
          font-size: 1.8rem;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 0.5rem;
        }
        
        .appointmentBox {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        
        .PaymentTable {
          width: 100%;
        }
        
        .payment-details {
          margin-bottom: 20px;
          padding: 15px;
          background: #f9f9f9;
          border-radius: 5px;
        }
        
        .payment-details h3 {
          color: #333;
          margin-bottom: 10px;
          font-size: 16px;
        }
        
        .payment-details p {
          margin: 5px 0;
          color: #555;
        }
      `}</style>
    </div>
  );
}

export default AppointmentsPayment;