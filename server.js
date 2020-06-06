// create an express app
const express = require("express");
const path = require("path");
const app = express();

// use the express-static middleware
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.get("/heartbeat", function (req, res) {
  res.send("<3");
});
// define the first route
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
