const express = require("express");
const favicon = require("express-favicon");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(favicon(__dirname + "/build/favicon.png"));
app.use("/show-local-weather/", express.static(path.join(__dirname, "build")));
app.get("/heartbeat", function (req, res) {
  res.send("<3 <3");
});

app
  .route("/weatherAPI/:lat/:lon/:units")
  .get(
    "https://cors-anywhere-hhm.herokuapp.com/api.openweathermap.org/data/2.5/weather",
    function (req, res) {
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
      });
    }
  );

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
//create 2 routes that adds the API key for

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
