/**
 *
 */
var express = require('express');
var router = express.Router();
var service = require('../services/realTime_service');
var utils = require('gmdp').init_gmdp.core_app_utils;





router.route('/getAll')

    .get(function(req,res){

        var city = req.query.city;
        var business = req.query.business;

        service.getRealTimeData( city,business, function(result){
            utils.respJsonData(res, result);
        });
    });

router.route('/getAllForReal')

    .get(function(req,res){

        var city = req.query.city;
        service.getAllForReal(city, function(result){
            utils.respJsonData(res, result);
        });
    });



module.exports = router;