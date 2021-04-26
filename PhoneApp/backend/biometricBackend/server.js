const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Merck Biometrics Phone application." });
});

require("./app/routes/patient.routes.js")(app);
require("./app/routes/questionnaire.routes.js")(app);
require("./app/routes/image.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});

