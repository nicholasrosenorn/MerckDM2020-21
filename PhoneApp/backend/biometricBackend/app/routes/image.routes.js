const sql = require("../models/db.js");

module.exports = app => {
  const upload = require("../controllers/image.controller.js");

  // in the body of the image post request, the key must be "image", and the value is the image data
  const singleUpload = upload.single("image");

  // Create a new Customer
  app.post("/image", (req, res) => {
    console.log("received image")
    singleUpload(req, res, (err) => {
      console.log("the new image url is below:");
      console.log(req.file.location);

      let returnUrl = req.file.location.split("/").pop()
      return res.json({'imageUrl': returnUrl});
    });
  });

};