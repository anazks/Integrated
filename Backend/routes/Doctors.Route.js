const express = require("express");
const { DoctorModel } = require("../models/Doctor.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'anazksunil2@gmail.com',  // Replace with your email
      pass: 'gefd cyst feti eztk'
  }
});

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const doctors = await DoctorModel.find();
    res.status(200).send(doctors);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingDoctor = await DoctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const newDoctor = new DoctorModel(req.body);
    await newDoctor.save();

    const savedDoctor = await DoctorModel.findOne({ email });

    const mailOptions = {
      from: 'Integrated Patient Care System ',
      to: email,
      subject: "Your Account Has Been Activated",
      text: `Hello,

Your account has been successfully activated. You can now log in to the system using your credentials.

Best regards,
Integrated Patient Care System Team ${savedDoctor}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return res.status(201).json({ data: savedDoctor, message: "Registered successfully" });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { docID, password } = req.body;
  try {
    const doctor = await DoctorModel.findOne({ docID, password });

    if (doctor) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, {
        expiresIn: "24h",
      });
      res.send({ message: "Successful", user: doctor, token: token });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log({ message: "Error" });
    console.log(error);
  }
});

router.patch("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  const payload = req.body;
  try {
    await DoctorModel.findByIdAndUpdate({ _id: id }, payload);
    const doctor = await DoctorModel.findById(id);
    if (!doctor) {
      return res
        .status(404)
        .send({ message: `Doctor with id ${id} not found` });
    }
    res.status(200).send({ message: `Doctor Updated`, user: doctor });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  try {
    const doctor = await DoctorModel.findByIdAndDelete({ _id: id });
    if (!doctor) {
      res.status(404).send({ msg: `Doctor with id ${id} not found` });
    }
    res.status(200).send(`Doctor with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
