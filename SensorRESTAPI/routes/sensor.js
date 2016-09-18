/**
 * Created by Gary on 18/09/2016.
 */

var mongoose = require('mongoose');
var SensorDataModel = require('../models/sensorModel');

/*
 * GET /sensordata route to retrieve all the data. TODO: Need to limit really!
 */
exports.getSensorDataPoints = function (req, res) {
    //Query the DB and if no errors, send all the sensor data points
    var query = SensorDataModel.find({});

    query.exec(function(err,sensorDataPoints){
        if(err)
        {
            res.send(err);
        }
        else{
            res.json(sensorDataPoints);
        }
    });
};

/*
 * GET /sensordata route to retrieve all the data. TODO: Need to limit really!
 */
exports.getLatestSensorDataPoints = function (req, res) {
    //Query the DB and if no errors, send all the sensor data points
    var last100Query = SensorDataModel.find({}).sort({'TIMESTAMP':-1}).limit(100);

    last100Query.exec(function(err,sensorDataPoints){
        if(err)
        {
            res.send(err);
        }
        else{
            res.json(sensorDataPoints);
        }
    });
};
