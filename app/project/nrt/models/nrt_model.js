/**
 * Created by ShiHukui on 2016/2/22.
 */
//var mongoose = require('mongoose');
// 引入mongoose工具类
var mongoUtils  = require('gmdp').init_gmdp.core_mongoose_utils;
//console.log(mongoose);

var mongoose = mongoUtils.init();

var Schema    = mongoose.Schema;
var ObjectId  = Schema.Types.ObjectId;

var nrtDaySchema = new Schema(
    {
        _id:ObjectId,
        rt_starttime : String,
        rt_bizcity : String,
        rt_bizname : String,
        rt_httpsuccrate : String,
        rt_httpavgresptime : String,
        rt_ultraffic : String,
        rt_dltraffic : String,
        rt_httpdlrate: String,
        rt_activeusernbr : String,
        rt_httpsuccrate_reason : String,
        rt_httpavgresptime_reason : String,
        rt_httpdlrate_reason : String

    },
    {collection: "nrt_day"}//mongodb集合名
);

var nrtMonthSchema = new Schema(
    {
        _id:ObjectId,
        rt_starttime : String,
        rt_bizcity : String,
        rt_bizname : String,
        rt_httpsuccrate : String,
        rt_httpavgresptime : String,
        rt_ultraffic : String,
        rt_dltraffic : String,
        rt_httpdlrate: String,
        rt_activeusernbr : String,
        rt_httpsuccrate_reason : String,
        rt_httpavgresptime_reason : String,
        rt_httpdlrate_reason : String
    },
    {collection: "nrt_month"}//mongodb集合名
);

// model
exports.$DaySchema = mongoose.model('NrtDaySchema', nrtDaySchema);
exports.$MonthSchema = mongoose.model('NrtMonthSchema', nrtMonthSchema);
