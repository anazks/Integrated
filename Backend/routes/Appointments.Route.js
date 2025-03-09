const express = require("express");
const { AppointmentModel } = require("../models/Appointment.model");

const router = express.Router();

router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const appointments = await AppointmentModel.find(query);
    res.status(200).send(appointments);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/create", async (req, res) => {
  const payload = req.body.BookAppoint;
  try {
    console.log(req.body.BookAppoint)
    const appointment = new AppointmentModel(payload);
    await appointment.save();
    res.send("Appointment successfully booked.");
  } catch (error) {
    res.send(error);
  }
});

router.post("/appointment", async (req, res) => {

  const payload = req.body.selectedAppointment;
  console.log(payload,"payload")
  try {
    const appointment = await AppointmentModel.findByIdAndUpdate(
      { _id: payload.id },
      payload
    );
    if (!appointment) {
      res.status(404).send({ msg: `Appointment with id  not found` });
    }
    res.status(200).send(`Appointment with id  updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});


 router.post('/checStatus', async(req,res)=>{
    try { 
      console.log(req.body)
      let myAppointemnts =  await AppointmentModel.find({email:req.body.statusEmail})
      console.log(myAppointemnts,"appoints")
      res.json(myAppointemnts)
    } catch (error) {
        console.log(error)
        res.json({error})
    }
 })

router.delete("/:appointmentId", async (req, res) => {
  const id = req.params.appointmentId;
  try {
    const appointment = await AppointmentModel.findByIdAndDelete({ _id: id });
    if (!appointment) {
      res.status(404).send({ msg: `Appointment with id ${id} not found` });
    }
    res.status(200).send(`Appointment with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

router.get('/viewAppoinment',async (req,res)=>{
    try {
      let appointment = await AppointmentModel.find({});
      if(!appointment){
        res.status(404).send({ msg: `Appointment not found` });
      }else{
          res.json(appointment)
      }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
