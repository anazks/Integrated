const express = require("express");
const { NurseModel } = require("../models/Nurse.model");
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
    const nurses = await NurseModel.find();
    res.status(200).send(nurses);
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

    const existingNurse = await NurseModel.findOne({ email });
    if (existingNurse) {
      return res.status(400).json({ message: "Nurse already exists" });
    }

    const newNurse = new NurseModel(req.body);
    await newNurse.save();

    const savedNurse = await NurseModel.findOne({ email });
    console.log(savedNurse,email)
    const mailOptions = {
      from: 'Integrated Patient Care System',
      to: email,
      subject: "Your Account Has Been Activated",
      text: `Hello,
          Your account has been successfully activated. You can now log in to the system using your credentials.

          Best regards,
          Integrated Patient Care System Team ${savedNurse}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return res.status(201).json({ data: savedNurse, message: "Registered successfully" });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/login", async (req, res) => {
  const { nurseID, password } = req.body;
  try {
    const nurse = await NurseModel.findOne({ nurseID, password });

    if (nurse) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, {
        expiresIn: "24h",
      });
      res.send({ message: "Successful", user: nurse, token: token });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log({ message: "Error" });
    console.log(error);
  }
});

router.patch("/:nurseId", async (req, res) => {
  const id = req.params.nurseId;
  const payload = req.body;
  try {
    await NurseModel.findByIdAndUpdate({ _id: id }, payload);
    const nurse = await NurseModel.findById(id);
    if (!nurse) {
      return res.status(404).send({ message: `Nurse with id ${id} not found` });
    }
    res.status(200).send({ message: `Nurse Updated`, user: nurse });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:nurseId", async (req, res) => {
  const id = req.params.nurseId;
  try {
    const nurse = await NurseModel.findByIdAndDelete({ _id: id });
    if (!nurse) {
      res.status(404).send({ msg: `Nurse with id ${id} not found` });
    }
    res.status(200).send(`Nurse with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
