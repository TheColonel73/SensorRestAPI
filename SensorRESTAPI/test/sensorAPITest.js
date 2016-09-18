/**
 * Created by Gary on 18/09/2016.
 */

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var SensorDataModel = require('../models/sensorModel');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('SensorDataPoints', function() {
     /*
     * Test the /GET route
     */
    describe('/GET Sensor Data', function(){
        it('it should GET all the sensor data points', function(done){
        chai.request(server)
            .get('/sensordata')
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
    /*
     * Test the /GET route Limit 100
     */
    describe('/GET Sensor Data', function(){
        it('it should GET all the sensor data points', function(done){
            chai.request(server)
                .get('/sensordata/100')
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(100);
                    done();
                });
        });
    });
});