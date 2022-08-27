const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { track, getIpAddress } = require("./controllers/tracking");

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json());

app.get("/ip-address", async (req, res) => {
    await getIpAddress(req, res);
});
app.post("/tracking", async (req, res) => {
    await track(req, res);
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 5000
app.listen(5000, () => {
    console.log("server started on port 5000");
});
