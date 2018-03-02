/**
 * Created by dengqian on 2017-10-17
 */
var http = require('http');
var mongoose = require('mongoose');
var model = require('../model/home_model.js');
var xml2js = require('xml2js');
var config = require('../../../../config.js');
var utils = require('gmdp').init_gmdp.core_app_utils;
var soap = require('soap');


exports.getDayListForEui = function (page, size, condition, sortItem, cb) {
    var so = {};

    var query = model.dayModal.find({
        'rt_starttime': {$in: dateTradateArray(condition.rt_starttime)},
        'rt_bizname': {$in: condition.otherRt_bizname},
        'rt_bizcity': condition.rt_bizcity
    });
    if ((page !== undefined && page !== '' && page !== null) && (size !== undefined && size !== '' && size !== null)) {
        if (page == 0)
            page = 1;
        query.skip((parseInt(page) - 1) * size);
        query.limit(parseInt(size));
    }

    //存在排序字段
    if (sortItem.sort != undefined && sortItem.sort != "" && sortItem.sort != null) {
        var ss = sortItem.sort.split(',');
        var oo = sortItem.order.split(',');
        for (var i in ss)
            so[ss[i]] = oo[i];
        query.sort(so);
    } else {
        query.sort({rt_starttime: 1});
    }
    query.exec(function (err, result) {
        if (err) {
            cb(utils.returnMsg(false, '1000', '查询出现异常。', null, err));
        } else {
            var queryForLength = model.dayModal.find({
                'rt_starttime': {$in: dateTradateArray(condition.rt_starttime)},
                'rt_bizname': {$in: condition.otherRt_bizname},
                'rt_bizcity': condition.rt_bizcity
            });
            queryForLength.exec(function (err, resForLength) {
                if (err) {
                    cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
                }
                else {
                    for(var i in result){
                        if(result[i].rt_httpsuccrate==undefined||result[i].rt_httpsuccrate==''||result[i].rt_httpsuccrate==null||result[i].rt_httpavgresptime==undefined||result[i].rt_httpavgresptime==''||result[i].rt_httpavgresptime==null||result[i].rt_httpdlrate==undefined||result[i].rt_httpdlrate==''||result[i].rt_httpdlrate==null){
                            result.splice(i,1);
                        }

                    }

                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', result, resForLength.length));
                }

            });
        }
    });

};

exports.getMonListForEui = function (page, size, condition, sortItem, cb) {
    var so = {};

    var query = model.monModal.find({
        'rt_starttime': {$in: monTradateArray(condition.rt_starttime)},
        'rt_bizname': {$in: condition.otherRt_bizname},
        'rt_bizcity': condition.rt_bizcity
    });
    query.skip((parseInt(page) - 1) * size);
    query.limit(parseInt(size));
    //存在排序字段
    if (sortItem.sort != undefined && sortItem.sort != "" && sortItem.sort != null) {
        so[sortItem.sort] = sortItem.order;
        query.sort(so);
    }
    query.exec(function (err, result) {
        if (err) {
            cb(utils.returnMsg(false, '1000', '查询出现异常。', null, err));
        } else {
            var queryForLength = model.monModal.find({
                'rt_starttime': {$in: monTradateArray(condition.rt_starttime)},
                'rt_bizname': {$in: condition.otherRt_bizname},
                'rt_bizcity': condition.rt_bizcity
            });
            queryForLength.exec(function (err, resForLength) {
                if (err) {
                    cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
                }
                else {
                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', result, resForLength.length));
                }
            });
        }
    });
};

exports.getDayDiagnosisResult = function (condition, cb) {
    var d = new Date(condition.rt_starttime);
    var c = d.getFullYear() + "" + (d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + "0000";

    var query = model.dayModal.find({
        'rt_starttime': c,
        'rt_bizname': {$in: condition.otherRt_bizname},
        'rt_bizcity': condition.rt_bizcity
    });
    query.exec(function (err, result) {
        if (err) {
            cb(utils.returnMsg(false, '0002', '诊断发生异常', err, null));
        } else {
            var networkText = [];
            var diagnoiseText = [];
            var own_bizname = {};
            for (var i in result) {
                a = new Number(result[i].rt_httpdlrate);
                result[i].rt_httpdlrate = (a / 1024).toFixed(2);
                result[i].rt_httpsuccrate = new Number(result[i].rt_httpsuccrate);
                result[i].rt_httpavgresptime = new Number(result[i].rt_httpavgresptime);
                result[i].rt_ultraffic = (Number(result[i].rt_ultraffic)/1024/1024/1024).toFixed(2);
                result[i].rt_dltraffic =(Number(result[i].rt_dltraffic)/1024/1024/1024).toFixed(2);
                result[i].rt_activeusernbr = new Number(result[i].rt_activeusernbr);

                //找出结果集中的自有业务
                if (result[i].rt_bizname === '咪咕音乐' || result[i].rt_bizname === '咪咕动漫' ||
                    result[i].rt_bizname === '咪咕阅读' || result[i].rt_bizname === '灵犀' ||
                    result[i].rt_bizname === '咪咕游戏')
                    own_bizname = result[i];
            }
            for (var i in result) {
                a = result[i].rt_httpsuccrate - own_bizname.rt_httpsuccrate;
                if (a > 0)
                    networkText.push(own_bizname.rt_bizname + "http访问成功率相比" + result[i].rt_bizname + "落后" + a.toFixed(3) + "个百分点。");
                if (a < 0)
                    networkText.push(own_bizname.rt_bizname + "http访问成功率相比" + result[i].rt_bizname + "领先" + (-a.toFixed(3)) + "个百分点。");
                b = result[i].rt_httpavgresptime - own_bizname.rt_httpavgresptime;
                if (b > 0)
                    networkText.push(own_bizname.rt_bizname + "http平均响应时延相比" + result[i].rt_bizname + "低" + b.toFixed(3) + "毫秒。");
                if (b < 0)
                    networkText.push(own_bizname.rt_bizname + "http平均响应时延相比" + result[i].rt_bizname + "高" + (-b.toFixed(3)) + "毫秒。");
                c = result[i].rt_httpdlrate - own_bizname.rt_httpdlrate;
                if (c > 0)
                    networkText.push(own_bizname.rt_bizname + "http平均下载速率相比" + result[i].rt_bizname + "低出" + c.toFixed(3) + "mbps。");
                if (c < 0)
                    networkText.push(own_bizname.rt_bizname + "http平均下载速率相比" + result[i].rt_bizname + "高出" + (-c.toFixed(3)) + "mbps。");
            }
            if (own_bizname.rt_httpsuccrate < 80) {
                diagnoiseText.push("http请求成功率低于阈值80%");
                if (own_bizname.rt_httpsuccrate_reason == "") {
                    diagnoiseText.push(",且未对该指标进行定界，建议提交工单对该问题进行定界");
                } else {
                    diagnoiseText.push(diagnoiseText + own_bizname.rt_httpsuccrate_reason);
                }
            } else {
                diagnoiseText.push(own_bizname.rt_bizname + "请求成功率属于正常范围。");
                if (own_bizname.rt_httpsuccrate_reason != "") {
                    diagnoiseText.push(own_bizname.rt_httpsuccrate_reason);
                }
            }

            if (own_bizname.rt_httpavgresptime >= 500) {
                diagnoiseText.push("http响应时延高于阈值500ms");
                if (own_bizname.rt_httpavgresptime_reason == "") {
                    diagnoiseText.push(",且未对该指标进行定界，建议提交工单对该问题进行定界");
                } else {
                    diagnoiseText.push(own_bizname.rt_httpavgresptime_reason);
                }
            } else {
                diagnoiseText.push(own_bizname.rt_bizname + "http响应时延属于正常范围。");
                if (own_bizname.rt_httpavgresptime_reason != "") {
                    diagnoiseText.push(own_bizname.rt_httpavgresptime_reason);
                }
            }
            if ((own_bizname.rt_httpdlrate * 1024) < 500) {
                diagnoiseText.push("http平均下载速率低于阈值500kbps");
                if (own_bizname.rt_httpdlrate_reason == "") {
                    diagnoiseText.push(",且未对该指标进行定界，建议提交工单对该问题进行定界");
                } else {
                    diagnoiseText.push(own_bizname.rt_httpdlrate_reason);
                }
            } else {
                diagnoiseText.push(own_bizname.rt_bizname + "http平均下载速率属于正常范围。");
                if (own_bizname.rt_httpdlrate_reason != "") {
                    diagnoiseText.push(own_bizname.rt_httpdlrate_reason);
                }
            }
            insertDiagnosisData({
                condition: condition,
                result: result,
                networkText: networkText,
                diagnoiseText: diagnoiseText,
                dn_isDiagnoise:"0"
            });
            cb(utils.returnMsg(true, '0002', '诊断成功', {
                result: result,
                networkText: networkText,
                diagnoiseText: diagnoiseText
            }, null));
        }
    });


};
exports.getMonDiagnosisResult = function (condition, cb) {
    var d = new Date(condition.rt_starttime);
    var c = d.getFullYear() + "" + (d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + "0000";

    var query = model.dayModal.find({
        'rt_starttime': c,
        'rt_bizname': {$in: condition.otherRt_bizname},
        'rt_bizcity': condition.rt_bizcity
    });
    query.exec(function (err, result) {
        if (err) {
            cb(utils.returnMsg(false, '0002', '诊断发生异常', err, null));
        } else {
            var networkText = [];
            var diagnoiseText = [];
            var own_bizname = {};
            for (var i in result) {
                a = new Number(result[i].rt_httpdlrate);
                result[i].rt_httpdlrate = (a / 1024).toFixed(2);
                result[i].rt_httpsuccrate = new Number(result[i].rt_httpsuccrate);
                result[i].rt_httpavgresptime = new Number(result[i].rt_httpavgresptime);
                result[i].rt_ultraffic = new Number(result[i].rt_ultraffic);
                result[i].rt_dltraffic = new Number(result[i].rt_dltraffic);
                result[i].rt_activeusernbr = new Number(result[i].rt_activeusernbr);

                //找出结果集中的自有业务
                if (result[i].rt_bizname === '咪咕音乐' || result[i].rt_bizname === '咪咕动漫' ||
                    result[i].rt_bizname === '咪咕阅读' || result[i].rt_bizname === '灵犀' ||
                    result[i].rt_bizname === '咪咕游戏')
                    own_bizname = result[i];
            }
            for (var i in result) {
                a = result[i].rt_httpsuccrate - own_bizname.rt_httpsuccrate;
                if (a > 0)
                    networkText.push(own_bizname.rt_bizname + "http访问成功率相比" + result[i].rt_bizname + "落后" + a.toFixed(3) + "个百分点。");
                if (a < 0)
                    networkText.push(own_bizname.rt_bizname + "http访问成功率相比" + result[i].rt_bizname + "领先" + (-a.toFixed(3)) + "个百分点。");
                b = result[i].rt_httpavgresptime - own_bizname.rt_httpavgresptime;
                if (b > 0)
                    networkText.push(own_bizname.rt_bizname + "http平均响应时延相比" + result[i].rt_bizname + "低" + b.toFixed(3) + "毫秒。");
                if (b < 0)
                    networkText.push(own_bizname.rt_bizname + "http平均响应时延相比" + result[i].rt_bizname + "高" + (-b.toFixed(3)) + "毫秒。");
                c = result[i].rt_httpdlrate - own_bizname.rt_httpdlrate;
                if (c > 0)
                    networkText.push(own_bizname.rt_bizname + "http平均下载速率相比" + result[i].rt_bizname + "低出" + c.toFixed(3) + "mbps。");
                if (c < 0)
                    networkText.push(own_bizname.rt_bizname + "http平均下载速率相比" + result[i].rt_bizname + "高出" + (-c.toFixed(3)) + "mbps。");
            }
            if (own_bizname.rt_httpsuccrate < 80) {
                diagnoiseText.push("http请求成功率低于阈值80%");
                if (own_bizname.rt_httpsuccrate_reason == "") {
                    diagnoiseText.push(",且未对该指标进行定界，建议提交工单对该问题进行定界");
                } else {
                    diagnoiseText.push(diagnoiseText + own_bizname.rt_httpsuccrate_reason);
                }
            } else {
                diagnoiseText.push(own_bizname.rt_bizname + "请求成功率属于正常范围。");
                if (own_bizname.rt_httpsuccrate_reason != "") {
                    diagnoiseText.push(own_bizname.rt_httpsuccrate_reason);
                }
            }

            if (own_bizname.rt_httpavgresptime >= 500) {
                diagnoiseText.push("http响应时延高于阈值500ms");
                if (own_bizname.rt_httpavgresptime_reason == "") {
                    diagnoiseText.push(",且未对该指标进行定界，建议提交工单对该问题进行定界");
                } else {
                    diagnoiseText.push(own_bizname.rt_httpavgresptime_reason);
                }
            } else {
                diagnoiseText.push(own_bizname.rt_bizname + "http响应时延属于正常范围。");
                if (own_bizname.rt_httpavgresptime_reason != "") {
                    diagnoiseText.push(own_bizname.rt_httpavgresptime_reason);
                }
            }
            if ((own_bizname.rt_httpdlrate * 1024) < 500) {
                diagnoiseText.push("http平均下载速率低于阈值500kbps");
                if (own_bizname.rt_httpdlrate_reason == "") {
                    diagnoiseText.push(",且未对该指标进行定界，建议提交工单对该问题进行定界");
                } else {
                    diagnoiseText.push(own_bizname.rt_httpdlrate_reason);
                }
            } else {
                diagnoiseText.push(own_bizname.rt_bizname + "http平均下载速率属于正常范围。");
                if (own_bizname.rt_httpdlrate_reason != "") {
                    diagnoiseText.push(own_bizname.rt_httpdlrate_reason);
                }
            }
            insertDiagnosisData({
                condition: condition,
                result: result,
                networkText: networkText,
                diagnoiseText: diagnoiseText,
                dn_isDiagnoise:"0"
            });
            cb(utils.returnMsg(true, '0002', '诊断成功', {
                result: result,
                networkText: networkText,
                diagnoiseText: diagnoiseText
            }, null));
        }
    });
};


/**
 * 用于获取单一表格数据，可去重、查询单独字段等
 */
exports.getSingleData = function (fieldName, cb) {
    var query = {};
    query[fieldName] = 1;
    model.dayModal.find(null, query, function (err, result) {
        if (err) {
            cb(err);
        }
        else {
            var obj = [];
            for (var i in result) {
                obj[result[i][fieldName]] = result[i][fieldName];
            }
            cb(obj);

        }
    });
};

function dateTradateArray(d) {
    var a = new Date(d);
    var cc = [];
    for (var i = 0; i <= 6; i++) {
        var date = new Date(a - i * 86400000);
        cc.push(date.getFullYear() + "" + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + "0000");
    }
    return cc;
}

function monTradateArray(d) {
    var date = new Date(d);
    var cc = [];
    for (var i = 0; i <= 6; i++) {
        cc.push(date.getFullYear() + "" + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1 - i) : (date.getMonth() + 1 - i)) + "" + "010000");
    }
    return cc;
}

function insertDiagnosisData(data) {

    var id = mongoose.Types.ObjectId();//记录id
    var dn_business = [];//被诊断的业务
    for (var i in data.result) {
        dn_business.push(data.result[i].rt_bizname);
        if(data.result[i].rt_httpsuccrate_reason!==""||data.result[i].rt_httpavgresptime_reason!==""||data.result[i].rt_httpdlrate_reason!=="")
        data.dn_isDiagnoise="1";
    }
    var d = new Date(data.condition.rt_starttime);
    var c = d.getFullYear() + "" + (d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + "0000";
    var dn_diagnosisTime = c;//被诊断的数据的时间
    var dn_networkText = data.networkText;
    var dn_diagnoiseText = data.diagnoiseText;
    d = new Date();
    c = d.getFullYear() + "" + (d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) +
        "" + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + "" + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
    var dn_createTime = c;
    var dn_persion = data.condition.dn_persion;
    var dn_isHandle = '0';
    var entity = {
        _id: id,
        dn_business: dn_business,//诊断包含业务
        dn_diagnosisTime: dn_diagnosisTime,//诊断数据日期
        dn_networkText: dn_networkText,//诊断网络情况
        dn_diagnoiseText: dn_diagnoiseText,//诊断定界情况
        dn_persion: {user_name: dn_persion.user_name, user_id: dn_persion._id},//诊断人
        dn_createTime: dn_createTime,//记录创建时间
        dn_isHandle: dn_isHandle,//是否处理
        dn_isDiagnoise:data.dn_isDiagnoise,//是否定界
        dn_rt_bizcity:data.result[0].rt_bizcity//地区信息
    };
    model.diagnosisModal(entity).save(function (err, data) {
        if (err) {
            return 0;
        } else {
            return 1;
        }
    });
}


exports.sendWorkOrder = function (data, cb) {
    var url = config.interFace.url;

    var xml = {
        opDetail:
        "<?xml version='1.0' encoding='GBK'?>" +
        '<opDetail>' +
        '<recordInfo>' +
        '<fieldInfo><fieldChName>告警标题</fieldChName><fieldEnName>alarmTitle</fieldEnName><fieldContent>' + data.alarmTitle + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>告警产生时间</fieldChName><fieldEnName>alarmCreateTime</fieldEnName><fieldContent>' + data.alarmCreateTime + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>设备类型</fieldChName><fieldEnName>NetType</fieldEnName><fieldContent>' + data.netType + '</fieldContent> </fieldInfo>' +
        '<fieldInfo><fieldChName>网元id</fieldChName><fieldEnName>neId</fieldEnName><fieldContent>' + data.neId + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>网元名称</fieldChName><fieldEnName>neName</fieldEnName><fieldContent>' + data.neName + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>设备厂家</fieldChName><fieldEnName>alarmVendor</fieldEnName><fieldContent>' + data.alarmVendor + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>告警省份</fieldChName><fieldEnName>alarmProvince</fieldEnName><fieldContent>' + data.alarmProvince + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>告警地市</fieldChName><fieldEnName>alarmRegion</fieldEnName><fieldContent>' + data.alarmRegion + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>告警区县</fieldChName><fieldEnName>alarmCity</fieldEnName><fieldContent>' + data.alarmCity + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>告警描述</fieldChName><fieldEnName>alarmDetail</fieldEnName><fieldContent>' + data.alarmDetail + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>告警级别</fieldChName><fieldEnName>alarmHandleLevel</fieldEnName><fieldContent>' + data.alarmHandleLevel + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>工单创建类型</fieldChName><fieldEnName>createType</fieldEnName><fieldContent>' + data.createType + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>派单人</fieldChName><fieldEnName>sodr_staff</fieldEnName><fieldContent>' + data.sodr_staff + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>派单人部门</fieldChName><fieldEnName>sodr_depart</fieldEnName><fieldContent>' + data.sodr_depart + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>派单人联系方式</fieldChName><fieldEnName>sodrstaff_tel</fieldEnName><fieldContent>' + data.sodrstaff_tel + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>派单人邮箱</fieldChName><fieldEnName>sodrstaff_email</fieldEnName><fieldContent>' + data.sodrstaff_email + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>要求完成时间</fieldChName><fieldEnName>limitDatas</fieldEnName><fieldContent>' + data.limitDatas + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>派单环境</fieldChName><fieldEnName>environment</fieldEnName><fieldContent>' + data.environment + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>派单类型</fieldChName><fieldEnName>alarmFromType</fieldEnName><fieldContent>' + data.alarmFromType + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>附件文件名</fieldChName><fieldEnName>attachName</fieldEnName><fieldContent>' + data.attachName + '</fieldContent></fieldInfo>' +
        '<fieldInfo><fieldChName>附件地址</fieldChName><fieldEnName>attachUrl</fieldEnName><fieldContent>' + data.attachUrl + '</fieldContent></fieldInfo>' +
        '</recordInfo>' +
        '</opDetail>'
    };
    soap.createClient(url, function (err, client) {
        if (err) {
            cb(utils.returnMsg(false, '0003', "派单失败，错误原因:" + err, err, null));
        } else {
            client.syncSheetState({arg0: [xml.opDetail]}, function (error, result, raw, soapHeader) {
                if (error) {
                    cb(utils.returnMsg(false, '0003', '提交工单异常', error, null));
                }
               else{
                    var resu = result.return.split(";");
                    var aa=resu[0].split("=");
                    var bb=resu[1].split("=");
                    resu={sheetNo:aa[1],errList:bb[1]};

                    if (resu.sheetNo != null && resu.sheetNo != "") {
                        data["sheetNo"] = resu.sheetNo;
                        model.workOrderModel(data).save(function (errorD) {
                            if (errorD) {
                                cb(utils.returnMsg(true, '0003', '提交工单成功,工单号'+resu.sheetNo+'保存工单失败,原因：'+ errorD, errorD, null));
                            } else {
                                cb(utils.returnMsg(true, '0003', '提交工单成功,保存工单成功，工单号:'+resu.sheetNo, null, null));
                            }
                        });
                    } else if (resu.errList != null && resu.errList != "") {
                        cb(utils.returnMsg(false, '0003', '提交工单失败,原因:'+resu.errList, resu.errList, null));
                    } else {
                        cb(utils.returnMsg(false, '0003', '提交工单异常,原因:'+resu.errList, resu.errList, null));
                    }
                }
            });
        }
    });
};
var Client = require('ftp');
var fs = require('fs');
/*
var client = new Client();
client.connect(config.ftp);
client.on('ready', function () {
    client.put("./public/static/file/YWFX_data.xlsx","/home/ftp/ywfx.xlsx", function (err) {
        if (err){
           console.log(err);
        }
        else{
            console.log("success")
        }

        client.end();
    });
});
*/

exports.uploadFtp=function(file,Dirpath,cb){
    var client = new Client();
        client.connect(config.ftp);
    client.on('ready', function () {
        client.put(Dirpath+file.name, config.ftpDir+file.name, function (err) {
            if (err){
               cb( utils.returnMsg(true, '0000', '上传文件到ftp失败。'+err, err, null));
            }
            else{
                cb(utils.returnMsg(true, '0000', '上传文件成功。',{attachName:file.originalname,attachUrl:"ftp://"+config.ftp.user+":"+config.ftp.password+"@"+config.ftp.host+":"+config.ftp.port+"/home/ftp/"+file.name}, null));
            }

            client.end();
        });
    });
};

exports.getWorkOrderForEui = function (page, size, condition, sortItem, cb) {
    so={};
    var query = model.workOrderModel.find({alarmTitle:new RegExp(condition.alarmTitle)});
    //存在排序字段
    if (sortItem.sort != undefined && sortItem.sort != "" && sortItem.sort != null) {
        var ss = sortItem.sort.split(',');
        var oo = sortItem.order.split(',');
        for (var i in ss)
            so[ss[i]] = oo[i];
        query.sort(so);
    }
    if ((page !== undefined && page !== '' && page !== null) && (size !== undefined && size !== '' && size !== null)) {
        if (page == 0)
            page = 1;
        query.skip((parseInt(page) - 1) * size);
        query.limit(parseInt(size));
    }

    //存在排序字段
    if (sortItem.sort != undefined && sortItem.sort != "" && sortItem.sort != null) {
        var ss = sortItem.sort.split(',');
        var oo = sortItem.order.split(',');
        for (var i in ss)
            so[ss[i]] = oo[i];
        query.sort(so);
    }
    query.exec(function (err, result) {
        if (err) {
            cb(utils.returnMsg(false, '1000', '查询出现异常。', null, err));
        } else {
            var queryForLength = model.workOrderModel.find({});
            queryForLength.exec(function (err, resForLength) {
                if (err) {
                    cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
                }
                else {
                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', result, resForLength.length));
                }

            });
        }
    });

};

exports.getWarnCordList=function (condition,sortItem,cb) {
    var d=new Date(condition.queryDate);
    var c = d.getFullYear() + "" + (d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
    model.RtSchema.find({rt_starttime:new RegExp(c),rt_bizcity:condition.rt_bizcity,'rt_bizname': {$in:condition.ownRt_bizname}}, function (err, result) {
            if (err) {
            cb(utils.returnMsg(false, '0000', '查询数据失败。', null, err));
        } else {
            var warnData = [];
            for(var i in result){
                if(Number(result[i].rt_httpsuccrate) < 80){
                    var bbb = result[i].rt_bizname + '，该业务在' +result[i].rt_starttime + '的HTTP访问成功率低于告警值，其值为:'+result[i].rt_httpsuccrate+'\n';
                    warnData.push({_id : result[i]._id,
                        rt_starttime : result[i].rt_starttime,
                        rt_bizcity : result[i].rt_bizcity,
                        rt_bizname : result[i].rt_bizname,
                        rt_httpsuccrate : result[i].rt_httpsuccrate,
                        rt_httpavgresptime : result[i].rt_httpavgresptime,
                        rt_ultraffic : result[i].rt_ultraffic,
                        rt_dltraffic : result[i].rt_dltraffic,
                        rt_httpdlrate : result[i].rt_httpdlrate,
                        rt_activeusernbr : result[i].rt_activeusernbr,
                        warnText:bbb});
                }else if(Number(result[i].rt_httpavgresptime) >= 500){
                    var bbb = result[i].rt_bizname + '，该业务在' +result[i].rt_starttime + '的HTTP响应时延低于告警值，其值为:'+result[i].rt_httpavgresptime+'\n';
                    warnData.push({_id : result[i]._id,
                        rt_starttime : result[i].rt_starttime,
                        rt_bizcity : result[i].rt_bizcity,
                        rt_bizname : result[i].rt_bizname,
                        rt_httpsuccrate : result[i].rt_httpsuccrate,
                        rt_httpavgresptime : result[i].rt_httpavgresptime,
                        rt_ultraffic : result[i].rt_ultraffic,
                        rt_dltraffic : result[i].rt_dltraffic,
                        rt_httpdlrate : result[i].rt_httpdlrate,
                        rt_activeusernbr : result[i].rt_activeusernbr,
                        warnText:bbb});
                }else if(Number(result[i].rt_httpdlrate < 100)){
                    var bbb = result[i].rt_bizname + '，该业务在' +result[i].rt_starttime + '的HTTP下载速率低于告警值，其值为:'+result[i].rt_httpdlrate+'\n';
                    warnData.push({_id : result[i]._id,
                        rt_starttime : result[i].rt_starttime,
                        rt_bizcity : result[i].rt_bizcity,
                        rt_bizname : result[i].rt_bizname,
                        rt_httpsuccrate : result[i].rt_httpsuccrate,
                        rt_httpavgresptime : result[i].rt_httpavgresptime,
                        rt_ultraffic : result[i].rt_ultraffic,
                        rt_dltraffic : result[i].rt_dltraffic,
                        rt_httpdlrate : result[i].rt_httpdlrate,
                        rt_activeusernbr : result[i].rt_activeusernbr,
                        warnText:bbb});
                }
            }

            cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', warnData, warnData.length));
        }
    });
};
exports.updateUserPass=function (data,cb){
    model.$userModel.findById(data.user_id,function (err,resu) {
        if(err){
            cb(utils.returnMsg(false, '1009', '修改密码出现异常。', {flag:0}, err));
        }else{
            if(data.oldpass===resu.login_password){
                model.$userModel.update({_id:data.user_id},{$set:{login_password:data.newpass}},function (err,result) {
                    if(err){
                        cb(utils.returnMsg(false, '1009', '修改密码出现异常。', {flag:0}, err));
                    }else{
                        cb(utils.returnMsg(true, '0009', '修改密码成功',{flag:1},null));
                    }
                });
            }else{
                cb(utils.returnMsg(false, '1009', '原密码错误', {flag:0}, null));
            }
        }
    });
};







