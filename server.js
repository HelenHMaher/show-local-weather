const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const app = express();

app.use(favicon(__dirname + "/build/favicon.png"));
app.use("/show-local-weather/", express.static(path.join(__dirname, "build")));
app.get("/heartbeat", function (req, res) {
  res.send("<3");
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
