// model
var model = require('../models/nrt_model');
var utils = require('gmdp').init_gmdp.core_app_utils;
var xlsx=require('node-xlsx').default;
var fs=require('fs');

exports.getDayListForEui = function (page, size, condition, sortItem, cb) {
    var so = {};
    //将自有业务放入竞对业务组
    condition.otherRt_bizname.push(condition.ownRt_bizname);


    var query = model.$DaySchema.find({
        'rt_starttime':{$gte:dateTranType(condition.startTime),$lte:dateTranType(condition.endTime)},
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
            var queryForLength = model.$DaySchema.find({
                'rt_starttime':{$gte:dateTranType(condition.startTime),$lte:dateTranType(condition.endTime)},
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

exports.getMonListForEui = function (page, size, condition, sortItem, cb) {
    var so = {};
    //将自有业务放入竞对业务组
    condition.otherRt_bizname.push(condition.ownRt_bizname);


    var query = model.$MonthSchema.find({
        'rt_starttime':{$gte:dateTranType(condition.startTime),$lte:dateTranType(condition.endTime)},
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
            var queryForLength = model.$MonthSchema.find({
                'rt_starttime':{$gte:dateTranType(condition.startTime),$lte:dateTranType(condition.endTime)},
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

exports.creatExcelFile = function (resData,cb){
    var data=[];
    data.push(["数据采集时间","地区","业务名","http访问成功率(%)","http平均响应时延(ms)","总上行流量(Byte)","总下行流量(Byte)",
        "http平均下载速率(kbps)","活跃用户数(人)","http访问成功率定界结论","http平均响应时延定界结论","http平均下载速率定界结论"]);
    for(var i in resData){
        data.push([
            resData[i].rt_starttime,
            resData[i].rt_bizcity,
            resData[i].rt_bizname,
            resData[i].rt_httpsuccrate,
            resData[i].rt_httpavgresptime,
            resData[i].rt_ultraffic,
            resData[i].rt_dltraffic,
            resData[i].rt_httpdlrate,
            resData[i].rt_activeusernbr,
            resData[i].rt_httpsuccrate_reason,
            resData[i].rt_httpavgresptime_reason,
            resData[i].rt_httpdlrate_reason
        ]);
    }
    try{
        var buffer = xlsx.build([{name: "data", data: data}]);
        fs.writeFileSync('./public/static/file/YWFX_data.xlsx', buffer, 'binary');
        cb(utils.returnMsg(true, '1009', '创建文件成功。', null, null));
    }catch (err){
        console.log(err);
            cb(utils.returnMsg(false, '1009', '创建文件失败。', err, null));
    }
};


function dateTranType(str) {
    if(str!=null&&str!=undefined&&str!=""){
        var date=new Date(str);
        return date.getFullYear() + "" + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + "0000";
    }else
        return undefined;

}