/**
 * Created by DengQian on 2017/11/06.
 */
var express = require('express');
var router = express.Router();

// model
//var model = require('../models/student_model');
var service = require('../services/nrt_service');
var utils = require('gmdp').init_gmdp.core_app_utils;
//var logger = require('../../../common/log/utils/log_util.js').getLogger('service_log');


router.route("/").get(function (req,res,next) {
        /* 常规参数获取 */
        var page = req.query.page;                  //用于分页查询提供当前页数
        var length = req.query.rows;
        var sort= req.query.sort;                   //用于点击列头获取需要以哪一列数据作为排序依据
        var order=req.query.order;                  //用于表示升序排列或者降序排列，只有两个值 'asc' 或者 'desc
        var sortItem={sort:sort,order:order};
        /* 获取请求参数*/
        var rt_bizcity=req.query. rt_bizcity;
        var ownRt_bizname=req.query. ownRt_bizname;
        var otherRt_bizname=req.query. otherRt_bizname;
        var startTime=req.query.startTime;
        var endTime=req.query.endTime;
        var dataType=req.query. dataType;
        if(rt_bizcity===undefined||ownRt_bizname===undefined||otherRt_bizname===undefined||
            startTime===undefined||endTime===undefined||dataType===undefined)
            utils.respJsonData(res,utils.returnMsg(false,null,null, null, null));
        else{
            /*封装请求参数*/
            var condition={
                rt_bizcity: rt_bizcity,
                ownRt_bizname: ownRt_bizname,
                otherRt_bizname: otherRt_bizname,
                startTime:startTime,
                endTime:endTime,
                dataType: dataType
            };
            if(dataType==="day"){
                service.getDayListForEui(page,length,condition,sortItem,function (result) {
                    utils.respJsonData(res,result);
                });
            }else if(dataType==="mon"){
                service.getMonListForEui(page,length,condition,sortItem,function (result) {
                    utils.respJsonData(res,result);
                });
            }else{
                utils.respJsonData(res,utils.returnMsg(false,'0001','数据加载错误', null, null));
            }
        }


});

router.route("/exportExcel").get(function (req,res,next) {
    /* 常规参数获取 */
    var page = req.query.page;                  //用于分页查询提供当前页数
    var length = req.query.rows;
    var sort= req.query.sort;                   //用于点击列头获取需要以哪一列数据作为排序依据
    var order=req.query.order;                  //用于表示升序排列或者降序排列，只有两个值 'asc' 或者 'desc
    var sortItem={sort:sort,order:order};
    /* 获取请求参数*/
    var rt_bizcity=req.query. rt_bizcity;
    var ownRt_bizname=req.query. ownRt_bizname;
    var otherRt_bizname=req.query. otherRt_bizname;
    var startTime=req.query.startTime;
    var endTime=req.query.endTime;
    var dataType=req.query. dataType;

    if(rt_bizcity===undefined||ownRt_bizname===undefined||otherRt_bizname===undefined||
        startTime===undefined||endTime===undefined||dataType===undefined)
        utils.respJsonData(res,utils.returnMsg(false,null,null, null, null));
    else{
        /*封装请求参数*/
        var condition={
            rt_bizcity: rt_bizcity,
            ownRt_bizname: ownRt_bizname,
            otherRt_bizname: otherRt_bizname,
            startTime:startTime,
            endTime:endTime,
            dataType: dataType,
            method:"excel"
        };
        if(dataType==="day"){
            service.getDayListForEui(undefined,undefined,condition,sortItem,function (result) {
               service.creatExcelFile(result.rows,function (result) {
                   utils.respJsonData(res,result);
               });
            });
        }else if(dataType==="mon"){
            service.getMonListForEui(undefined,undefined,condition,sortItem,function (result) {
                service.creatExcelFile(result.rows,function (result) {
                    utils.respJsonData(res,result);
                });
            });
        }else{
            utils.respJsonData(res,utils.returnMsg(false,'0001','数据加载错误', null, null));
        }
    }
});




module.exports = router;