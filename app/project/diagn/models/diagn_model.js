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

//诊断数据model
var diagnosisSchema = new Schema(
    {   //数据库id
        _id: Schema.Types.ObjectId,

        //诊断包含业务
        dn_business: [],

        //诊断数据日期
        dn_diagnosisTime: String,

        //诊断网络情况
        dn_networkText: String,

        //诊断定界情况
        dn_diagnoiseText: String,

        //诊断人
        dn_persion: {},

        //记录创建时间
        dn_createTime: String,

        //是否处理
        dn_isHandle: String,

        //是否定界
        dn_isDiagnoise:String,

        //诊断地区
        dn_rt_bizcity:String
    },
    //mongodb集合名
    {collection: "dn_diagnosis"}
);

// model
exports.diagnosisSchema = mongoose.model('2diagnosisSchema', diagnosisSchema);
