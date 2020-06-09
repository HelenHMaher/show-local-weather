// create an express app
const express = require("express");
const path = require("path");
const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// use the express-static middleware
// app.use(express.static(__dirname));
app.use("/show-local-weather/", express.static(path.join(__dirname, "build")));
app.get("/heartbeat", function (req, res) {
  res.send("<3");
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
