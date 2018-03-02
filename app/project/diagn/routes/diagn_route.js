var express = require('express');
var router = express.Router();

// model
var service = require('../services/diagn_service');
var utils = require('gmdp').init_gmdp.core_app_utils;
//var logger = require('../../../common/log/utils/log_util.js').getLogger('service_log');

/**
 * 配置获取天的配置路由，当前台传入路由为‘/getDay’时间，便自动进入下一层service
 */
router.route('/').get(function (req,res) {
var city=req.query.city;
var business = req.query.business;
var time = req.query.time;
    if (time === null || time === '' || time === undefined||city === null || city === '' || city === undefined||business === null || business === '' || business === undefined) {
        utils.respJsonData(res, {});
    }
else
    service.getAllForDiagn(city,business,time,function(result){
        utils.respJsonData(res, result);
    });

});



module.exports = router;