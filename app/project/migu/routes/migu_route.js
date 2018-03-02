var express = require('express');
var router = express.Router();
var InterService=require('../services/migu_service.js');

// model
var service = require('../services/day_mon_service');
var utils = require('gmdp').init_gmdp.core_app_utils;
//var logger = require('../../../common/log/utils/log_util.js').getLogger('service_log');

/**
 * 配置获取天的配置路由，当前台传入路由为‘/getDay’时间，便自动进入下一层service
 */
router.route('/getDay').get(function (req,res) {
var area=req.query.area;
var date = req.query.date;
var input = req.query.inputType;
    service.getListByDay(area,date,input,function(result){

            utils.respJsonData(res, result);

    });

});

/**
 * 配置获取月的配置路由，当前台传入路由为‘/getMon’时间，便自动进入下一层service
 */
router.route('/getMon').get(function (req,res) {
    var area=req.query.area;
    var date = req.query.date;
    var input = req.query.inputType;
    service.getListByMon(area,date,input,function(result){
        utils.respJsonData(res, result);

    });

});


/**
-----------------------------------分割线---------------------------------------------------
**/

router.route('/execInterFace').get(function (req,res) {
    var para="";
    InterService.execInter(para,function (result) {
        utils.respJsonData(res, result);
    })
});

router.route('/listInterFace').get(function (req,res) {
    InterService.listInterFace(function (data) {
        utils.respJsonData(res,data);
    })
});

router.route('/:id').put(function (req,res) {
    var data=req.body;
    var id=req.params.id;

if(isFormate(data,res)){
    InterService.updateInterFace(id,data,function (result) {
        utils.respJsonData(res,result);
    })
}
});

router.route('/').post(function (req,res) {
    var data=req.body;
    data['sys_id']="自有业务竟对监测及竞对分析";
    if(isFormate(data,res)){
        InterService.addInterFace(data,function (result) {
            utils.respJsonData(res,result);
        });

    }
});

router.route('/:id').delete(function (req, res) {
    var id = req.params.id;
    if(id!=""&&id!=undefined&&id!=null)
    InterService.delInterFace(id, function (result) {
        utils.respJsonData(res, result);
    });
});



router.route('/exec/:id').get(function (req,res) {
    var id = req.params.id;
    if(id!=""&&id!=undefined&&id!=null)
        InterService.execInterFace(id, function (result) {
            utils.respJsonData(res,result);
        });

});

router.route('/stop/:id').get(function (req,res) {
    var id = req.params.id;
    if(id!=""&&id!=undefined&&id!=null)
    InterService.stopInterFace(id,function (result) {
        utils.respJsonData(res,result);
    });
});




/**
 * 获取添加修改接口的数据，判断请求头与请求体是否时合法的json字符串
 * 判断其他表单参数是否为空
 * @param data
 * @param res
 */
function isFormate(data,res) {
    var flag=true;
    //json转化以及报错处理
    if((typeof data.in_body)=='string'&&(typeof data.in_headers)=='string'&&data.in_body!=""&&data.in_headers!=""){
        try{data.in_body=JSON.parse(data.in_body);
            data.in_headers=JSON.parse(data.in_headers);
        }catch(err){
            flag=false;
            utils.respJsonData(res,utils.returnMsg(false, '0000', '更新数据失败,提交参数不全', null, null));
        }

    }else{
        flag=false;
        utils.respJsonData(res,utils.returnMsg(false, '0000', '更新数据失败,提交参数不全', null, null));
    }

    //数据判空
    for(var i in data){
        if((typeof data[i])=='string'&&data[i]!=''&&data[i]!=null){
            continue;
        }

        else if((typeof data[i])=='object'&&data[i]!=''&&data[i]!=null)
            for(var j in data[i]){
                if((typeof data[i][j])=='string'&&data[i][j]!=null&&data[i][j]!=''){
                    continue;
                }
                else{
                    flag=false;
                    utils.respJsonData(res,utils.returnMsg(false, '0000', '更新数据失败,提交参数不全', null, null));
                }
            }
        else{
            flag=false;
            utils.respJsonData(res,utils.returnMsg(false, '0000', '更新数据失败,提交参数不全', null, null));
        }
    }

    return flag;
}


module.exports = router;