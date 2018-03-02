var http=require('http');
var model = require('../models/migu_model');
var model2=require('../../home/model/home_model');
var model3=require('../../realTime/models/realTime_model');
var utils = require('gmdp').init_gmdp.core_app_utils;


/**
 *
 * 接口自动化所需全局变量的定义
 */
var minStopDate=new Date('2017-12-26 00:00:00');
var dayStopDate=new Date('2017-12-01');
var minInterControl=false;
var dayInterControl=false;

function get5minInter (para,cb) {
    model.interfaceSchema.find({},function (err,data) {
        if(err){
            console.log(err);
        }else{
            cb(data);
        }
    });
};


exports.listInterFace=function (cb) {
    model.interfaceSchema.find({},function (err,result) {
        if(err)
            console.log(err);
        else
            cb(utils.returnMsg4EasyuiPaging(true, '0000', '查询成功', result, result.length));
    });
};

exports.updateInterFace=function (id,data,cb) {

    model.interfaceSchema.findByIdAndUpdate(id,data,null,function (err,data) {
        if(err)
            cb(utils.returnMsg(false, '0000', '更新数据失败。', null, err));
        else
            cb(utils.returnMsg(true, '0000', '更新数据成功。', data, null));
    })
    
};

exports.addInterFace=function (data,cb) {
    model.interfaceSchema.create(data,function (err,data) {
        if(err)
            cb(utils.returnMsg(false, '0000', '更新数据失败。', err, err));
        else
            cb(utils.returnMsg(true, '0000', '更新数据成功。', data, null));
    });

};

exports.delInterFace=function (id,cb) {
    model.interfaceSchema.remove({_id:id},function (err,data) {
        if(err)
            cb(utils.returnMsg(false, '0000', '删除数据失败。', null, err));
        else
            cb(utils.returnMsg(true, '0000', '删除数据成功。', data, null));
    });

};

exports.stopInterFace=function (id,cb) {
    model.interfaceSchema.findById(id, function (err, data) {
        if(err)
            cb(utils.returnMsg(false, '0000', '停止接口失败。', err, null));
        else
        {

            var type=data.in_content_type;
            if(type=='5min'){
                interFaceStatusUpdate(id,"未运行");
                minInterControl=false;
                cb(utils.returnMsg(true, '0000', '5分钟粒度接口停止成功。', null, null));
            }else if(type=='day'){
                interFaceStatusUpdate(id,"未运行");
                dayInterControl=false;
                cb(utils.returnMsg(true, '0000', '日粒度接口停止成功。', null, null));
            }else{
                cb(utils.returnMsg(false, '0000', '未找到该接口对应定时任务句柄。', null, null));
            }
        }
    })
}

exports.execInterFace = function (id, cb) {


    model.interfaceSchema.findById(id, function (err, data) {
        if(err)
            console.log(err)
        else
        {
            var type=data.in_content_type;
            if(type=='5min'){
                minInterControl=true;
                interFaceStatusUpdate(id,"运行中");
                stopTimeFind(id,function(time){
                    minStopDate=new Date(time);
                });
                minTrainInRotation(data,id,function () {
                    cb(utils.returnMsg(true, '0000', '五分钟粒度接口已经停止。', null, null));
                });
            }else if(type=='day'){
                dayInterControl=true;
                interFaceStatusUpdate(id,"运行中");
                stopTimeFind(id,function(time){
                    dayStopDate=new Date(time);
                });
                dayTrainInRotation(data,id,function () {
                    cb(utils.returnMsg(true, '0000', '日粒度接口已经停止。', null, null));
                })

            }else if(type='mounth'){
                var c=data.in_stopPoint;
                var mon=new Date(c);
                var cc=mon.getFullYear()+""+(mon.getMonth() < 9 ? '0' + (mon.getMonth() + 2) : (mon.getMonth() + 2))
                launchRequest(data,cc,function () {
                    cb(utils.returnMsg(true, '0000', cc+'的数据已导入。', null, null));
                })
            }else{
                cb(utils.returnMsg(false, '0000', '未找到该接口对应定时任务句柄。', null, null));

            }


        }
    })
};


/**
 * 五分钟轮转控制函数
 * @param data
 * @param id
 * @param cb
 */
function minTrainInRotation(data,id,cb){
    (function schedule() {
        setTimeout(function(){
            minJudge(data,id,function () {
                if(minInterControl){
                    schedule();
                }
                else{
                    cb();
                }
            })
        },500);
    }());
}

/**
 * 五分钟粒度接口执行与否判断
 * @param data
 * @param id
 * @param cb
 */
function minJudge(data,id,cb) {
    var setTime=300*1000;
    var currentDate=new Date();
    currentDate = new Date(currentDate.getTime() - setTime);//避免接口实时数据获取失败延时五分钟。
    if (minStopDate.getTime() < currentDate.getTime() && (minStopDate.getTime() + setTime) < currentDate.getTime()) {
        minStopDate = new Date(minStopDate.getTime() + setTime);
        stopTimeUpdate(id,minTimeTransf(minTimeTransf(minStopDate)));
        var timeStamp = minTimeTransf(minStopDate);
        launchRequest(data, timeStamp, function () {
            cb();
        })
        } else {
            cb();
    }
}


/**
 * 日粒度轮转函数。可调整},500);控制轮转速度。
 * @param data
 * @param id
 * @param cb
 */
function dayTrainInRotation(data,id,cb){
    (function schedule() {
        setTimeout(function(){
            dayJudge(data,id,function () {
                if(dayInterControl){
                    schedule();
                }
                else{
                    cb();
                }
            })
        },500);
    }());
}

/**
 * 日粒度接口执行与否判断
 * @param data
 * @param id
 * @param cb
 */
function dayJudge(data,id,cb) {

    var setTime=86400*1000;
    var currentDate=new Date();

    //将两个时间点的小时分钟数据抹去
    dayStopDate=new Date(dayTimeTransf(dayTimeTransf(dayStopDate)));
    currentDate=new Date(dayTimeTransf(dayTimeTransf(currentDate)));
    if ((dayStopDate.getTime() +setTime)< currentDate.getTime()) {
        dayStopDate = new Date(dayStopDate.getTime() + setTime);
        stopTimeUpdate(id,dayTimeTransf(dayTimeTransf(dayStopDate)));
        var timeStamp = dayTimeTransf(dayStopDate);
        launchRequest(data, timeStamp, function () {
            cb();
        })
    } else {
        cb();
    }
}





function testLaunch(data,timeStamp,cb) {
    console.log(timeStamp);
    cb();
}

/**
 * 使用http方法调用接口保存数据
 * @param data
 * @param timeStamp
 * @param cb
 */

function launchRequest(data,timeStamp,cb) {
    var responseString="";
    var body = {
        srvId: data.in_body.srvId,
        authKey: data.in_body.authKey,
        version: data.in_body.version,
        reqParams: formate(data.in_body.reqParams,timeStamp)
    };

    //转换成查询需要的字符串
    var bodyString = JSON.stringify(body);

    //传参headers
    var headers = {
        Authorization: data.in_headers.Authorization,
        'Content-Type': data.in_headers['Content-Type'],
        'Content-Length': bodyString.length
    };
    //传参地址、端口等
    var options = {
        host: data.in_host,
        port: data.in_port,
        method: data.in_method,
        path: data.in_url,
        body: bodyString,
        headers: headers
    };

        //创建HTTP连接并传参
    var req = http.request(options, function (res) {
        res.setEncoding('utf-8');
        res.on('data', function (data) {
            console.log(data);
            responseString += data;
        });
        res.on('end', function (res) {
            console.log("向API接口请求数据中...");
            //这里接收的参数是字符串形式,需要格式化成json格式使用
            responseString = JSON.parse(responseString);
            //得到result字段的值
            responseString = getJson('result', responseString);

            var responseJson = JSON.parse(responseString);
            responseJson = getJson('list', responseJson);

            if (data.in_outTable == 'rt') {
                model3.RtSchema.create(responseJson,function(error){
                    if(error){
                        console.log("保存失败");
                    }
                    else
                        cb();
                });
            }
            else if (data.in_outTable == 'nrt_day') {
                model2.dayModal.create(responseJson,function(error){
                    if(error){
                        console.log("保存失败");
                    }
                    else
                        cb();
                });
            }
            else if (data.in_outTable == 'nrt_month') {
                model2.monModal.create(responseJson,function(error){
                    if(error){
                        console.log("保存失败");
                    }
                    else
                        cb();
                });
            }
            else {
                        cb();
            }
        });

        req.on('error', function (e) {
            console.log('-----error-------', e);
        });
    });
    req.write(bodyString);
    req.end();
}


/**
 * 在接口http请求方法中对不同的请求参数进行分类封装
 * @param str
 * @param timeStamp
 * @returns {string}
 */
function formate(str,timeStamp) {
    var resu='';

    var ff=str.split(',');

    if(ff.length==1){
        resu='{"'+str.split(':')[0]+'":"'+timeStamp+'"}'
    }else if(ff.length==2){
        resu='{'+ff[0].split(':')[0]+':\"'+ff[0].split(':')[1]+'\",'+ff[1].split(':')[0]+':\"'+timeStamp+'\"}';
    }

    return resu;
}

/**
 * 通过接口id查询该接口上次数据读取的时间
 * @param id
 * @param cb
 */
function stopTimeFind(id,cb) {

    model.interfaceSchema.findById(id,function (err,data) {
        if(err){
            cb(err);
        }else{
            cb(data.in_stopPoint);
        }
    })
}

/**
 * 通过接口id更新该接口的上次读取的数据的时间记录
 * @param id
 * @param newStopTime
 */
function stopTimeUpdate(id,newStopTime){
    model.interfaceSchema.findByIdAndUpdate(id,{in_stopPoint:newStopTime},null,function (err) {
        if(err)
            return false;
        else
            return true;
    })
}

/**
 * 用于修改接口状态，在开启和关闭的时候调用
 * @param id
 * @param value
 */

function interFaceStatusUpdate(id,value) {
    model.interfaceSchema.findByIdAndUpdate(id,{in_statsus:value},null,function (err) {
        if(err)
            return false;
        else
            return true;
    })

}


/**
 * 将时间对象转为本系统常用时间戳
 * 将时间戳转换为常规时间字符串
 * @param time
 * @returns {string}
 */
function minTimeTransf(time) {
    if(typeof time=='object'){
        var timeStamp=time.getFullYear() + "" +
            (time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)) + "" +
            (time.getDate() < 10 ? '0' + time.getDate() : time.getDate())+
            (time.getHours() < 10 ? '0' + time.getHours() : time.getHours())+
            (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes());
        return timeStamp;
    }else{
        var date=time.substring(0,4)+"-"+time.substring(4,6)+"-"+time.substring(6,8)+
            " "+time.substring(8,10)+":"+time.substring(10,12)+":00";
        return date;
    }
}


/**
 * 将日的数据类型进行三个状态的转换
 * 两次调用可将日期型转为标准字符串型
 * @param time
 * @returns {string}
 */
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


function getJson(key,json){
    for(var item in json){
        if(item==key){  //item 表示Json串中的属性，如'name'
            return json[item];
        }
    }
}








