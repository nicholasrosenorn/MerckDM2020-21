const Patient = require("../models/patient.model.js");

// Create a new patient account
exports.create = (req, res) => {

  // Validate request
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Patient
  const patient = new Patient({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth,
    height_cm: req.body.height_cm,
    image: req.body.image

  });

  // Save patient in the database
  Patient.create(patient, (err, data) => {
    if (err) {
      // error returns 500
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new Patient."
      });
    }
    // this returns 200
    else res.send(data);
  });

};

exports.login = (req, res) => {

  // Validate request
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Patient.login({email: req.body.email}, (err, data) => {
    if (err) {
      // error returns 500
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new Patient."
      });
    }
    // this returns 200
    else {
      console.log("the patient's id who logged in is");
      console.log(data);
      res.send(data);
    }
  });

};

exports.get = (req, res) => {

  let { patientId } = req.params;

  Patient.get({ patientId }, (err, data) => {
    if (err) {
      // error returns 500
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new Patient."
      });
    }
    // this returns 200
    else {
      data.date_of_birth = new Date(data.date_of_birth);
      data.date_of_birth = String(data.date_of_birth.getFullYear()) + '-' + String(data.date_of_birth.getMonth() + 1) + '-' + String(data.date_of_birth.getDate())
      console.log("In Account Profile or Edit Profile page, the displayed data will be");
      console.log(data);
      res.send(data);
    }
  });

};

exports.edit = (req, res) => {

  let { patientId } = req.params;
  let updateObj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth,
    height_cm: req.body.height_cm,
    image: req.body.image
  }
  
  Patient.edit({ patientId, updateObj }, (err, data) => {
    if (err) {
      // error returns 500
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new Patient."
      });
    }
    // this returns 200
    else {
    
      console.log("Edit Profile succeeded");
      res.send(data);
    }
  });

};