module.exports = app => {
  const patient = require("../controllers/patient.controller.js");

  app.post("/patient-account", patient.create);
  app.get("/patient-account/:patientId", patient.get);
  app.post("/patient-account/login", patient.login);
  app.put("/patient-account/:patientId", patient.edit);
};