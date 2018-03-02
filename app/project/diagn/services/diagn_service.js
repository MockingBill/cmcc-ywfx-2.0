// model
var model = require('../models/diagn_model');
var utils = require('gmdp').init_gmdp.core_app_utils;


exports.getAllForDiagn = function (city, business, timee , cb) {
    var time =new Date(timee);
     timee = time.getFullYear() + "" + (time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)) + "" + (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) ;

 /*   console.log(time);
    console.log(business);
    console.log(city);*/

 //获取诊断记录表内容
    //get diagnosis information
    model.diagnosisSchema.find({ dn_createTime: new RegExp(timee) ,dn_rt_bizcity: {$in: city}, dn_business: { $elemMatch: {$in:business } }}, function (err, result)  {
        if (err) {
            cb(utils.returnMsg(false, '0000',
                '查询数据失败。'
                , err, null));
        } else {

            cb(utils.returnMsg4EasyuiPaging(true, '1000',
                '查询数据成功。',
                result, result.length));
        }
    });

};


