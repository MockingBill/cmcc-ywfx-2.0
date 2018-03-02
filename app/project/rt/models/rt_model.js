/**
 * Created by Administrator on 2017/6/5.
 */
/**
 * Created by ShiHukui on 2016/2/22.
 */
// 引入mongoose工具类
var mongoUtils  = require('gmdp').init_gmdp.core_mongoose_utils;
var mongoose = mongoUtils.init();
var Schema    = mongoose.Schema;
var ObjectId  = Schema.Types.ObjectId;

var rtSchema = new Schema(
    {
        //sno: {type: ObjectId, default: new mongoose.Types.ObjectId},// objectid类型key
        rt_starttime: Date,
        rt_bizcity: String,
        rt_bizname: String,
        rt_httpsuccrate: Number,//HTTP访问成功率
        rt_httpavgresptime: Number,//HTTP响应平均时延
        rt_ultraffic: Number,//上行流量
        rt_dltraffic: Number,//下行流量
        rt_httpdlrate: Number,//HTTP下行速率
        rt_activeusernbr: Number//活跃用户数
    },
    {collection: "rt"}//mongodb集合名
);


// model
exports.$RtSchema = mongoose.model('RtSchema', rtSchema);
