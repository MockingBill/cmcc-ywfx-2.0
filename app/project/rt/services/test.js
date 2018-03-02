// var model = require('../models/rt_model');
// var utils = require('gmdp').init_gmdp.core_app_utils;
//
// test();
//
// function test(){
//     var curr_time = new Date('2017/07/22 0:00');
//     var pre_time = new Date('2017/08/22 0:00');
//     pre_time.setHours((pre_time.getHours() + 8),(pre_time.getMinutes() - 35),0,0);
//     curr_time.setHours((curr_time.getHours() + 8),curr_time.getMinutes() - 31,59,999);
//     model.$RtSchema.find({'rt_starttime ':{ $gte:  curr_time, $lte:  pre_time}},function (err,result) {
//         if(result){
//             for(var i in result){
//                 console.log(result[i]);
//             }
//         }else{
//             if(result){
//                 console.log('00000000000000000');
//             }
//         }
//     })
//
//     // { $gte:  ISODate("2017-07-22T10:00:00.000+0000"), $lte:  ISODate("2017-08-22T10:00:00.000+0000")}
//
// }