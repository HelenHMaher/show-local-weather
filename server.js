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

app.get("/weatherAPI/:lat/:lon/:units", async function (req, res) {
  const { lat, lon, units } = req.params;
  const { WEATHER_API_KEY } = process.env;

  try {
    const response = await axios({
      method: "get",
      url: "https://api.openweathermap.org/data/2.5/weather",
      params: {
        lat,
        lon,
        units,
        appid: WEATHER_API_KEY,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.log("some shitty error:", error);
  }
});

app.get("/timeZoneAPI/:lat/:long/", async function (req, res) {
  const { lat, long } = req.params;
  const { TIME_ZONE_API_KEY } = process.env;

  try {
    const response = await axios({
      method: "get",
      url: "https://api.ipgeolocation.io/timezone",
      params: {
        lat,
        long,
        apiKey: TIME_ZONE_API_KEY,
      },
    });

    res.send(response.data);
  } catch (error) {
    console.log("some shitty error:", error);
  }
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
