// create an express app
const express = require("express");
const path = require("path");
const app = express();

// use the express-static middleware
app.use(express.static(path.join(__dirname, "build")));

// define the first route
app.get("/*", function (req, res) {
  res.send(path.join(__dirname, "build", "index.html"));
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
