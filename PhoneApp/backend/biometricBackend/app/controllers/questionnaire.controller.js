const Questionnaire = require("../models/questionnaire.model.js");

exports.create = (req, res) => {

    // Validate request
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    let curTime = new Date();
    let curTimeForSQLDB = String(curTime.getFullYear()) + '-' + 
      String(curTime.getMonth() + 1) + '-' + String(curTime.getDate()) + ' ' +
      String(curTime.getHours()) + ':' + String(curTime.getMinutes()) + ':' + String(curTime.getSeconds())
    console.log("A new questionnaire is received at " + curTimeForSQLDB);
    // Create a Questionnaire
    const questionnaire = new Questionnaire ({
        patient_id: req.body.patient_id,
        happiness: req.body.happiness,
        sleep: req.body.sleep,
        hours_worked: req.body.hours_worked,
        unusual_symptoms: req.body.unusual_symptoms,
        meals: req.body.meals,
        medication_timing: req.body.medication_timing,
        smoking_alcohol: req.body.smoking_alcohol,
        other_medication: req.body.other_medication,
        water_intake: req.body.water_intake,
        diagnosis: req.body.diagnosis,
        image: req.body.image,
        input_date: curTimeForSQLDB
    });
  
    // Save Customer in the database
    Questionnaire.create(questionnaire, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the new Questionnaire."
        });
      else res.send(data);
    });
  
};

exports.put = (req, res) => {

  // Validate request
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let patientId = req.query.patientId;
  let inputTime = req.query.dateTime;

  let curTime = new Date();
  let curTimeForSQLDB = String(curTime.getFullYear()) + '-' + 
    String(curTime.getMonth() + 1) + '-' + String(curTime.getDate()) + ' ' +
    String(curTime.getHours()) + ':' + String(curTime.getMinutes()) + ':' + String(curTime.getSeconds())
  console.log("A questionnaire update is received at " + curTimeForSQLDB);

  // Create a Questionnaire
  const questionnaire = new Questionnaire ({
      patient_id: req.body.patient_id,
      happiness: req.body.happiness,
      sleep: req.body.sleep,
      hours_worked: req.body.hours_worked,
      unusual_symptoms: req.body.unusual_symptoms,
      meals: req.body.meals,
      medication_timing: req.body.medication_timing,
      smoking_alcohol: req.body.smoking_alcohol,
      other_medication: req.body.other_medication,
      water_intake: req.body.water_intake,
      diagnosis: req.body.diagnosis,
      image: req.body.image,
      input_date: curTimeForSQLDB
  });

  // Save Customer in the database
  Questionnaire.put(questionnaire, patientId, inputTime, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the Questionnaire."
      });
    else res.send(data);
  });

};

exports.get = (req, res) => {

  let patientId = req.query.patientId;
  let inputTime = req.query.dateTime;

  if (inputTime === undefined) {
    // if inputTime is not specified in query parameter

    // Validate request
    if (patientId === undefined) {
      res.status(400).send({
        message: "Must use query paramater patientID!"
      });
    }

    console.log("Get all the questionnaires for patientId " + patientId);

    // Save Customer in the database
    Questionnaire.getAll(patientId, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while getting the questionnaires for this patient."
        });
      else res.send(data);
    });
  } else {
    // if inputTime is specified in query parameter

    Questionnaire.get(patientId, inputTime, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while getting the questionnaires for this patient."
        });
      else res.send(data);
    });
  }
  
};
