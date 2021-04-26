module.exports = app => {
    const questionnaire = require("../controllers/questionnaire.controller.js");
  
    app.post("/patient-questionnaire", questionnaire.create);
    app.get("/patient-questionnaire", questionnaire.get);
    app.put("/patient-questionnaire", questionnaire.put);
};