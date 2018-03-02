/**
 * Created by dengqian on 2017-10-17
 */
//var mongoose = require('mongoose');
// 引入mongoose工具类
var mongoUtils = require('gmdp').init_gmdp.core_mongoose_utils;
var mongoose = mongoUtils.init();
var Schema = mongoose.Schema;
//日粒度数据model
var daySchema = new Schema(
    {
        rt_starttime: String,//记录时间
        rt_bizcity: String,//地区
        rt_bizname: String,//业务名
        rt_httpsuccrate: String,//http访问成功率
        rt_httpavgresptime: String,//http平均响应时延
        rt_ultraffic: String,//总上行流量
        rt_dltraffic: String,//总下行流量
        rt_httpdlrate: String,//平均下载速率
        rt_activeusernbr: String,//在线用户数
        rt_httpsuccrate_reason: String,//http访问成功率定界结论
        rt_httpavgresptime_reason: String,//http响应时延定界结论
        rt_httpdlrate_reason: String//http下行速率定界结论

    },
    {collection: "nrt_day"}//mongodb集合名
);

//月粒度数据model
var monSchema = new Schema(
    {
        rt_starttime: String,//记录时间
        rt_bizcity: String,//地区
        rt_bizname: String,//业务名
        rt_httpsuccrate: String,//http访问成功率
        rt_httpavgresptime: String,//http平均响应时延
        rt_ultraffic: String,//总上行流量
        rt_dltraffic: String,//总下行流量
        rt_httpdlrate: String,//平均下载速率
        rt_activeusernbr: String,//在线用户数
        rt_httpsuccrate_reason: String,//http访问成功率定界结论
        rt_httpavgresptime_reason: String,//http响应时延定界结论
        rt_httpdlrate_reason: String//http下行速率定界结论

    },
    {collection: "nrt_month"}//mongodb集合名
);
//诊断数据model
var diagnosisSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,//数据库id
        dn_business: [],//诊断包含业务
        dn_diagnosisTime: String,//诊断数据日期
        dn_networkText: String,//诊断网络情况
        dn_diagnoiseText: String,//诊断定界情况
        dn_persion: {},//诊断人
        dn_createTime: String,//记录创建时间
        dn_isHandle: String,//是否处理
        dn_isDiagnoise:String,//是否定界
        dn_rt_bizcity:String //诊断地区
    },
    {collection: "dn_diagnosis"}//mongodb集合名
);
//工单数据model
var workOrderSchema = new Schema({
        sheetNo:String,//工单号

    alarmTitle:String,//工单标题

    alarmCreateTime: String,//告警产生时间

    netType: String,//网络分类

    neId: String,//网元id

    neName: String,//网元名称

    alarmVendor: String,//设备厂家

    alarmProvince: String,//省份

    alarmRegion: String,//所属地市

    alarmCity: String,//所属区县

    alarmDetail: String,//告警描述

    alarmHandleLevel: String,//告警级别

    createType: String,//工单创建类型

    sodr_staff: String,//派单人

    sodr_depart: String,//派单人部门

    sodrstaff_tel: String,//派单人联系方式

    sodrstaff_email: String,//派单人邮箱

    limitDatas: String,//要求完成时间

    environment: String,//派单环境

    alarmFromType: String,//派单类型

    attachName: String,//附件文件名

    attachUrl: String//附件地址
},
    {collection: "wo_WorkOrders"}//mongodb集合名
);

/**
 * 实时数据model
 * @type {*|Schema}
 */
var rtSchema = new Schema(
    {
        //sno: {type: ObjectId, default: new mongoose.Types.ObjectId},// objectid类型key
        rt_starttime: String,
        rt_bizcity: String,
        rt_bizname: String,
        rt_httpsuccrate: String,//HTTP访问成功率
        rt_httpavgresptime: String,//HTTP响应平均时延
        rt_ultraffic: String,//上行流量
        rt_dltraffic: String,//下行流量
        rt_httpdlrate: String,//HTTP下行速率
        rt_activeusernbr: String//活跃用户数
    },
    {collection: "rt"}//mongodb集合名
);
/**
 * 用户model，用于当前系统下用户的获取。
 * @type {*|Schema}
 */
var userSchema=new Schema({
    _id:Schema.Types.ObjectId,                   //用户ID
    user_status:Number,                          //用户状态(1、启用 2、禁用)
    user_name:String,                            //用户名称
    user_sys:Schema.Types.ObjectId,              //用户系统ID
    user_org:Schema.Types.ObjectId,              //用户所在部门的组织机构ID
    login_password:String,                       //用户登录密码
    user_photo:String                            //用户照片
},{
    collection:"common_user_info"            //用户对应的集合名
});



// model
exports.$userModel=mongoose.model('userModel',userSchema);
exports.RtSchema = mongoose.model('1oRtSchema', rtSchema);
exports.dayModal = mongoose.model('daySchema', daySchema);
exports.monModal = mongoose.model('monSchema', monSchema);
exports.diagnosisModal = mongoose.model('diagnosisSchema', diagnosisSchema);
exports.workOrderModel=mongoose.model('workOrderSchema',workOrderSchema);


