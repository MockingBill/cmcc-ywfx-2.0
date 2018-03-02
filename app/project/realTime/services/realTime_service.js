var model = require('../models/realTime_model');
var utils = require('gmdp').init_gmdp.core_app_utils;


exports.getRealTimeData = function (city, business, cb) {


    if (city === null || city === '' || city === undefined) {
        city = '遵义';
    }
    if (business === null || business === '' || business === undefined || business === ['', '']) {
        var aa = [];
        aa.push('咪咕音乐');
        business = aa;
    }

    var dd=new Date();

    var StatisticsData=[];
    model.RtSchema.find({
        rt_bizcity: city,
        rt_bizname: {$in: business},
        rt_starttime: new RegExp(dayTimeTransf(dd))
    }, function (err, resToday) {
        if (err) {
            cb(utils.returnMsg(false, '0000', '查询数据失败。', null, err));
        } else {
            var sumActiveToday=0,sumUltrafficToday=0;
            for(var i in resToday){
                sumActiveToday=sumActiveToday+Number(resToday[i].rt_activeusernbr);
                sumUltrafficToday=sumUltrafficToday+Number(resToday[i].rt_ultraffic)+Number(resToday[i].rt_dltraffic);
            }
            dd=new Date(dd.getTime()-86400*1000);
            model.RtSchema.find({
                    rt_bizcity: city,
                    rt_bizname: {$in: business},
                    rt_starttime: new RegExp(dayTimeTransf(dd))
            }, function (err, resYes) {
                if (err) {
                    cb(utils.returnMsg(false, '0000', '查询数据失败。', null, err));
                }
                else {
                    if(resYes[0]!=null&&resToday[0]!=null&&resYes[0]!=undefined&&resToday[0]!=undefined){
                        var sumActiveYesToday=0,sumUltrafficYesToday=0;
                        for(var i in resYes){
                            sumActiveYesToday=sumActiveYesToday+Number(resYes[i].rt_activeusernbr);
                            sumUltrafficYesToday=sumUltrafficYesToday+Number(resYes[i].rt_ultraffic)+Number(resYes[i].rt_dltraffic);
                        }
                        var avg=(sumActiveToday/resToday.length).toFixed(2);
                        var variance=0;
                        for(var i in resToday){
                            var bg=Number(resToday[i].rt_activeusernbr)-avg;
                            variance=variance+bg*bg;
                        }
                        variance=(variance/resToday.length).toFixed(2);
                        //活跃人数统计数据

                        StatisticsData.push({
                            an:((Math.abs(sumActiveToday-sumActiveYesToday)/sumActiveYesToday)*100).toFixed(2),//同比
                            curr:resToday[0].rt_activeusernbr,//当前值
                            variance:variance});//方差
                        avg=(sumUltrafficToday/resToday.length).toFixed(2);
                        variance=0;
                        for(var i in resToday){
                            var bg=Number(resToday[i].rt_ultraffic)
                                +Number(resToday[i].rt_dltraffic)-avg;
                            variance=variance+bg*bg;
                        }
                        variance=(variance/resToday.length).toFixed(2);
                        //流量数据统计
                        StatisticsData.push({
                            //同比
                            an:((Math.abs((sumUltrafficToday/288)-(sumUltrafficYesToday/288))/sumUltrafficYesToday)*100).toFixed(2),
                            //当前值
                            curr:((Number(resToday[0].rt_ultraffic)+Number(resToday[0].rt_dltraffic))/1024/1024).toFixed(2),
                            variance:(avg/1024/1024).toFixed(2)
                        });

                        //人均流量统计

                        StatisticsData.push({
                            an:((Math.abs((sumUltrafficToday/288)-(sumUltrafficYesToday/288))/sumUltrafficYesToday)*100).toFixed(2),
                            curr:(((Number(resToday[0].rt_ultraffic)+Number(resToday[0].rt_dltraffic))/1024/1024)/sumActiveYesToday).toFixed(2),
                            variance:(avg/1024/1024).toFixed(2)
                        });
                        cb(utils.returnMsg(true, '1000', '查询数据成功。', {res:resToday,sta:StatisticsData}, null));
                    }else{
                        cb(utils.returnMsg(true, '1000', '查询数据成功,数据计算失败', {res:resToday,sta:null}, null));
                    }

                }
            });



        }
    });

};



exports.getAllForReal = function (city, cb) {
    // function test(city, business, cb) {



    if (city === null || city === '' || city === undefined) {
        city = '遵义';
    }

    var dd=new Date();
    model.RtSchema.find({rt_bizcity: city, rt_starttime: new RegExp(dayTimeTransf(dd))}, function (err, result) {
        if (err) {
            cb(utils.returnMsg(false, '0000', '查询数据失败。', null, err));
        } else {
            var obj1 = {};
            for (var i in result) {
                obj1[result[i].rt_bizname] = {rt_activeusernbr: [], rt_httpdlrate: []};

            }

            for (var i in result) {
                obj1[result[i].rt_bizname].rt_activeusernbr.push(result[i].rt_activeusernbr);
                obj1[result[i].rt_bizname].rt_httpdlrate.push(result[i].rt_httpdlrate);
            }
            result=tranCurrentTime(result);
            var warnData = [];
            for(var i in result){
                if((result[i].rt_httpsuccrat!=null)&&(result[i].rt_httpsuccrat!="")&&Number(result[i].rt_httpsuccrate) < 80){
                    var bbb = result[i].rt_bizname + '，该业务在' +result[i].rt_starttime.substr(0,4)+"年"+result[i].rt_starttime.substr(4,2)+"月"+ result[i].rt_starttime.substr(6,2)+"日"+result[i].rt_starttime.substr(8,2)+"时"+result[i].rt_starttime.substr(10,2)+"分"+ '的HTTP访问成功率低于告警值，其值为:'+result[i].rt_httpsuccrate+'\n';
                    warnData.push(bbb);
                }else if((result[i].rt_httpavgresptime!=null)&&(result[i].rt_httpavgresptime!="")&&Number(result[i].rt_httpavgresptime) >= 500){
                    var bbb = result[i].rt_bizname + '，该业务在' +result[i].rt_starttime.substr(0,4)+"年"+result[i].rt_starttime.substr(4,2)+"月"+ result[i].rt_starttime.substr(6,2)+"日"+result[i].rt_starttime.substr(8,2)+"时"+result[i].rt_starttime.substr(10,2)+"分" + '的HTTP响应时延低于告警值，其值为:'+result[i].rt_httpavgresptime+'\n';
                    warnData.push(bbb);
                }else if((result[i].rt_httpdlrate!=null)&&(result[i].rt_httpdlrate!="")&&Number(result[i].rt_httpdlrate < 100)){
                    var bbb = result[i].rt_bizname + '，该业务在' +result[i].rt_starttime.substr(0,4)+"年"+result[i].rt_starttime.substr(4,2)+"月"+ result[i].rt_starttime.substr(6,2)+"日"+result[i].rt_starttime.substr(8,2)+"时"+result[i].rt_starttime.substr(10,2)+"分" + '的HTTP下载速率低于告警值，其值为:'+result[i].rt_httpdlrate+'\n';
                    warnData.push(bbb);
                }

            }
            cb(utils.returnMsg(true, '1000', '查询数据成功。', {"obj1":obj1,"warn1":warnData}, null));
        }
    });

};


//对对象里的数据进行排序
function keysort(key, sortType) {
    return function (a, b) {
        return sortType ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
}



//获取需要的时间，时间类型为20170909
function getDayForm1(str) {
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oTime = oYear + getfull(oMonth) + getfull(oDay);//最后拼接时间
    return oTime;
}

//获取需要的时间，时间类型为20170909
function getDayForm2(str) {
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        ohour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oTime = oYear + getfull(oMonth) + getfull(oDay) + getfull(ohour) + getfull(oMin);//最后拼接时间
    return oTime;
}


//获取时间格式补0操作
function getfull(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}

function tranCurrentTime(data) {
    var item=[];
    for(var i=0;i<data.length;i++){
        var date=new Date();
        var  currtime=Number((date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + "" +
            (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()));
        if(Number(data[i].rt_starttime.substring(8,12))<currtime){
            item.push(data[i]);
        }
    }
    return item;
}


function dayTimeTransf(time) {
    if(typeof time=='object'){
        var timeStamp=time.getFullYear() + "" +
            (time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)) + "" +
            (time.getDate() < 10 ? '0' + time.getDate() : time.getDate());
        return timeStamp;
    }else{
        var date=time.substring(0,4)+"-"+time.substring(4,6)+"-"+time.substring(6,8);
        return date;
    }
}