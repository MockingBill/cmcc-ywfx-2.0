/**
 * Created by Administrator on 2017/6/5.
 */
/**
 * Created by ShiHukui on 2016/2/22.
 */
//var mongoose = require('mongoose');
// 引入mongoose工具类
var mongoUtils  = require('gmdp').init_gmdp.core_mongoose_utils;
var mongoose = mongoUtils.init();
var Schema    = mongoose.Schema;

var dayMonSchema = new Schema(
    {
        rt_starttime: String,
        rt_bizcity: String,
        rt_bizname: String,
        rt_httpsuccrate: String,
        rt_httpavgresptime: String,
        rt_ultraffic: String,
        rt_dltraffic: String,
        rt_httpdlrate: String,
        rt_activeusernbr: String,
        rt_httpsuccrate_reason:String,
        rt_httpavgresptime_reason: String,
        rt_httpdlrate_reason: String

    },
    {collection: "nrt_day"}//mongodb集合名
);

var dayMonSchema2 = new Schema(
    {
        rt_starttime: String,
        rt_bizcity: String,
        rt_bizname: String,
        rt_httpsuccrate: String,
        rt_httpavgresptime: String,
        rt_ultraffic: String,
        rt_dltraffic: String,
        rt_httpdlrate: String,
        rt_activeusernbr: String,
        rt_httpsuccrate_reason:String,
        rt_httpavgresptime_reason: String,
        rt_httpdlrate_reason: String

    },
    {collection: "nrt_day_"}//mongodb集合名
);


// model
exports.dayMonSchema = mongoose.model('dayMonSchema', dayMonSchema);
exports.dayMonSchema2 = mongoose.model('dayMonSchema2', dayMonSchema2);
