const sql = require("./db.js");

const Questionnaire = function (questionnaire) {
    this.patient_id = questionnaire.patient_id,
    this.happiness = questionnaire.happiness,
    this.sleep = questionnaire.sleep,
    this.hours_worked = questionnaire.hours_worked,
    this.unusual_symptoms = questionnaire.unusual_symptoms,
    this.meals = questionnaire.meals,
    this.medication_timing = questionnaire.medication_timing,
    this.smoking_alcohol = questionnaire.smoking_alcohol,
    this.other_medication = questionnaire.other_medication,
    this.water_intake = questionnaire.water_intake,
    this.diagnosis = questionnaire.diagnosis,
    this.image = questionnaire.image
    this.input_date = questionnaire.input_date
};

Questionnaire.create = (newQuestionnaire, result) => {
    sql.query("INSERT INTO phone_app_data SET ?", newQuestionnaire, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      
      console.log("Successfully put a new questionnaire in database!:");
      console.log(newQuestionnaire);
      result(null, null);
    });
};

Questionnaire.put = (newQuestionnaire, patientId, inputTime, result) => {
  sql.query(`UPDATE phone_app_data SET ? WHERE patient_id = '${patientId}' AND input_date = '${inputTime}'`, newQuestionnaire, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    
    console.log("Successfully edit a questionnaire in database!:");
    console.log(newQuestionnaire);
    result(null, null);
  });
};

Questionnaire.getAll = (patientId, result) => {
  sql.query(`SELECT * FROM phone_app_data WHERE patient_id = '${patientId}'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    
    console.log("Successfully getting all the questionnaires:");
    console.log(res);
    result(null, res);
  });
};

Questionnaire.get = (patientId, inputTime, result) => {
  console.log("Received patientId is " + patientId);
  console.log("Received inputTime is");
  console.log(inputTime);

  sql.query(`SELECT * FROM phone_app_data WHERE patient_id = '${patientId}' AND input_date = '${inputTime}'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    
    if (res.length > 1) {
      result("More than one row have the same patiendId and inputTime", null);
      return;
    }
    
    console.log("Successfully getting the specific questionnaire:");
    console.log(res[0]);
    result(null, res[0]);
  });
};

module.exports = Questionnaire;