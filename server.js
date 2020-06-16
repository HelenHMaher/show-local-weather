const express = require("express");
const favicon = require("express-favicon");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const axios = require("axios");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(favicon(__dirname + "/build/favicon.png"));
app.use("/show-local-weather/", express.static(path.join(__dirname, "build")));
app.get("/heartbeat", function (req, res) {
  res.send("<3 <3");
});

app.get("/show-local-weather/weatherAPI/:lat/:lon/:units", async function (
  req,
  res
) {
  const lat = req.params.lat;
  const lon = req.params.lon;
  const units = req.params.units;
  axios({
    method: "get",
    url:
      "https://cors-anywhere-hhm.herokuapp.com/api.openweathermap.org/data/2.5/weather",
    params: {
      lat: lat,
      lon: lon,
      units: units,
      appid: process.env.API_KEY,
    },
  }).then((data) => {
    res.send(data);
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
//create 2 routes that adds the API key for

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
