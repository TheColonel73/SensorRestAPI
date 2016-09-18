/**
 * Created by Gary on 18/09/2016.
 */

var mongoose = require('mongoose'), Schema = mongoose.Schema;

//Sensor schema definition
var SensorDataSchema = new Schema(
    {
        ZONE: { type: String, required: true },
        TEMP_C: { type: Number, required: true },
        HUMIDITY: { type: Number, required: true },
        TIMESTAMP: { type: Date, required: true},
    },{collection:"temperature"}
);

//Exports the SensorDataSchema
module.exports = mongoose.model('sensordata', SensorDataSchema);
