/*
Server.js - Written by Gary Hodgson

Purpose: The entry point for Sensor Data API

 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var port = 3000;

var config = require('config'); //Load the db location from the JSON files

var sensor = require('./routes/sensor');

//db options
var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};

//MongoDb connection
mongoose.connect(config.DBHost, options);
var db = mongoose.connection;

// Error Event
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", function(req, res){
    res.json({message: "Welcome to sensor data from Raspberry Pi 3!"})
});

app.route("/sensordata")
    .get(sensor.getSensorDataPoints);

app.route("/sensordata/100")
    .get(sensor.getLatestSensorDataPoints);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing