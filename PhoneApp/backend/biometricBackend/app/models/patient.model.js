const sql = require("./db.js");

// constructor
const Patient = function (patient) {
  this.first_name = patient.first_name,
  this.last_name = patient.last_name,
  this.username = patient.username,
  this.email = patient.email,
  this.gender = patient.gender,
  this.date_of_birth = patient.date_of_birth,
  this.height_cm = patient.height_cm,
  this.image = patient.image
};

Patient.create = (newPatient, result) => {
  sql.query("INSERT INTO patient SET ?", newPatient, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, null);
  });
};

Patient.login = ({email}, result) => {
  sql.query(`SELECT * FROM patient WHERE email = '${email}'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    // if there are more than one row that has the same email, error!
    if (res.length > 1) {
      result("there are more than one row that has the same email, error!", null);
      return;
    }
    result(null, { patientId: res[0].patient_id });
  });
};

Patient.get = ({ patientId }, result) => {
  sql.query(`SELECT * FROM patient WHERE patient_id = '${patientId}'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length > 1) {
      result("there are more than one row that has the same patient id, error!", null);
      return;
    }
    result(null, { ...res[0] });
  });
};

Patient.edit = ({ patientId, updateObj }, result) => {
  console.log("Edit request received as below:")
  console.log(updateObj)
  sql.query(`UPDATE patient SET ? WHERE patient_id = '${patientId}'`, updateObj, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, null);
  });
};

module.exports = Patient;