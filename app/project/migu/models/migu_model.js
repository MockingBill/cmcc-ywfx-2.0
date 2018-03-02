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

var miguSchema = new Schema({
        rt_starttime: Date,
        rt_bizcity: String,
        rt_bizname: String,
        rt_activeusernbr: String,
        rt_ultraffic: String,
        rt_dltraffic: String,
        rt_httpsuccrate: String,
        rt_httpdlrate: String,
        rt_httpavgresptime: String

    },
    {collection: "rt"}//mongodb集合名
);





var interfaceSchema=new Schema({

    //所属系统id
    sys_id:String,

    //接口名称
    in_name:String,

    //接口状态
    in_statsus:String,

    //接口地址
    in_host:String,

    //接口端口
    in_port:String,

    //接口路径
    in_url:String,

    //请求方法
    in_method:String,

    //请求体
    in_body:{
        srvId : String,
        authKey:String,
        version:String,
        reqParams:String
    },
    //请求头
    in_headers:{
        Authorization:String,
        'Content-Type':String,
        'Content-Length':Number
    },
    //出参存表
    in_outTable:String,
    //内容类型
    in_content_type:String,
    //上次结束位置
    in_stopPoint:String,
    //接口执行间隔
    in_execTime:String,
    },
    {collection: "common_interface_define"});

// model
exports.interfaceSchema=mongoose.model('interfaceSchema',interfaceSchema);
exports.miguSchema = mongoose.model('miguSchema', miguSchema);
