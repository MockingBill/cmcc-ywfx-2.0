var http=require('http');
var model = require('../models/day_mon_model');
var utils = require('gmdp').init_gmdp.core_app_utils;
// var schedule = require('node-schedule');
// var getFile = require('../../../../migu_config1');



 var fileJson = {
     "地址":  "117.187.18.28",
    "端口": "6002",
    "方法": "POST",
    "目录": "/mobileDevelopInt_fvu",
    "校验码": "9C528035DFBD2D389E0A81D5F85A1810",
    "接口ID": "mobileSelfDevelopRsService.getNRTSubAppQuality",
    "密码": "odc|odc!234",
    "版本": "v1.0"

};

//分别获取配置文件里的数据
var authKey = getJson('密码',fileJson),
    srvId = getJson('接口ID',fileJson),
    version = getJson('版本',fileJson),
    Authorization = getJson('校验码',fileJson),
    host = getJson('地址',fileJson),
    method = getJson('方法',fileJson),
    port = getJson('端口',fileJson),
    path = getJson('目录',fileJson);


var date=new Date("2017-10-18");
function getYearEachTime() {

    date=new Date(date.getTime()+86400000);
    var ss = date.getFullYear() + "" +
        (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "" +
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    return ss;
}

/*(function schedule() {
    setTimeout(function () {
        var c=getYearEachTime();
        getReqJsonForDay(c,function () {
            console.log(c);
            schedule();
        })
    },10);
}());*/



//创建方法，连接API接口获取数据
function getReqJsonForDay(timeStamp,cb){

    var str2 = "2017/10/12 10:08";
    //获取当前时间以及转换成需要的时间格式
    var _time = new Date(str2).getTime();
    // var _time = new Date().getTime();
    // var time11 =getMyDay(_time);
    var time11 ='20171107';
   //var reqParams = '{' + 'level:day ,timeId:' +time11 + '}';
    var reqParams='{level:"day",timeId:\"'+timeStamp.toString()+'\"}';
console.log(reqParams);
    //传递主要参数
    var body = {
        srvId : srvId,
        authKey:authKey,
        version:version,
        reqParams: reqParams
    };

    //转换成查询需要的字符串
    var bodyString = JSON.stringify(body);

    //传参headers
    var headers = {
        // 'Authorization':'9C528035DFBD2D389E0A81D5F85A1810',
        Authorization:Authorization,
        'Content-Type': 'application/json',
        'Content-Length': bodyString.length
    };

    //传参地址、端口等
    var options = {
        host:host,
        port:port,
        method:method,
        path:path,
        body:bodyString,
        headers: headers
    };

    var responseString = '';
    //创建HTTP连接并传参
    var req=http.request(options,function(res){
        res.setEncoding('utf-8');

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function(res) {
            console.log("向API接口请求数据中...");
            //这里接收的参数是字符串形式,需要格式化成json格式使用
            var response = JSON.parse(responseString);
            var result=JSON.parse(response.result);
            //保存数据到test_migu表
                model.dayMonSchema.create(result.list,function(error){
                    if(error){
                        console.log("保存失败");
                    }else{
                        cb();
                    }
                });
        });

        req.on('error', function(e) {
            console.log('-----error-------',e);
        });
    });

    req.write(bodyString);
    req.end();

}

//创建方法，连接API获取数据
function getReqJsonForMon(){

    // var str2 = "2017/09/09 10:08";

    //获取当前时间以及转换成需要的时间格式
    var _time = new Date().getTime();
    var time11 =getMyMon(_time);
    var reqParams='{level:"month",timeId:\"'+time11.toString()+'\"}';

    //传递主要参数
    var body = {
        srvId : srvId,
        authKey:authKey,
        version:version,
        reqParams: reqParams
        // reqParams:'{"level":"day","timeId":"20170913"}'
    };

    //转换成查询需要的字符串
    var bodyString = JSON.stringify(body);

    //传参headers
    var headers = {
        // 'Authorization':'9C528035DFBD2D389E0A81D5F85A1810',
        Authorization:Authorization,
        'Content-Type': 'application/json',
        'Content-Length': bodyString.length
    };

    //传参地址、端口等
    var options = {
        host:host,
        port:port,
        method:method,
        path:path,
        body:bodyString,
        headers: headers
    };

    var responseString = '';
    var req=http.request(options,function(res){
        res.setEncoding('utf-8');

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function(res) {
            console.log("向API接口请求数据中...");
            responseString = JSON.parse(responseString);
            responseString = getJson('result',responseString);

                if(responseString!=undefined){
                    var responseJson = JSON.parse(responseString);
                    responseJson  = getJson('list',responseJson);
                    for(var xx=0;xx<responseJson.length;xx++){
                        var aaa = responseJson[xx];
                        model.dayMonSchema(aaa).save(function(error){

                            if(error){
                                console.log("保存失败");
                            }
                        });
                    }
                }

        });

        req.on('error', function(e) {
            console.log('-----error-------',e);
        });
    });
    req.write(bodyString);
    req.end();

}


/**
 * 从前台传入areaId后，获取当前的时间，对数据进行查询和运算，以便对数据进行封装
 * 时间为当前时间，运算后的值为当前时间之前的7天数据，最后得到平均值
 *  例如，当前时间为20170909，那么，得到的数据为3-9日数据
 * @param areaId
 * @param cb
 */
exports.getListByDay = function(areaId,date,input,cb) {

    var time=[];
    var myDay;
    var myData ={rt_httpsuccrate:[],rt_httpavgresptime:[],rt_httpdlrate:[]};

    if(date=='null' || date=='' || date=='undefined') {
        var str2 = "2017/09/27 10:08";
        myDay=new Date(str2);
    }else{
        myDay  = new Date(date);
    }

    if(areaId=='null' || areaId=='' || areaId=='undefined') {
        areaId='贵州';
    }

      for(var i=6;i>=0;i--){

          var cc=myDay - i*86400000;
          var bb =new Date(cc);

          var time11 =getMyDay(bb)  +'0000';
          time.push(time11);

      }

    model.dayMonSchema.find({rt_bizname:{$in:input},rt_starttime:{$in:time},rt_bizcity:areaId},function (err,result) {
        if(err){
            cb(utils.returnMsg(false, '0000', '查询数据失败。', null, err));
        }
        else{

            result=result.sort(compare("rt_starttime"));
            var obj={};

            for(var i in result){
                // console.log(result[i]);
                obj[result[i].rt_bizname]={rt_httpsuccrate:[],
                                            rt_httpavgresptime:[],
                                            rt_httpdlrate:[],
                                            rt_starttime:[],
                                            getScore:[]};

            };
            for(var i in result){
                obj[result[i].rt_bizname].rt_httpsuccrate.push(result[i].rt_httpsuccrate);
                obj[result[i].rt_bizname].rt_httpavgresptime.push(result[i].rt_httpavgresptime);
                obj[result[i].rt_bizname].rt_httpdlrate.push((result[i].rt_httpdlrate/1024).toFixed(2));
                obj[result[i].rt_bizname].rt_starttime.push(result[i].rt_starttime);
                obj[result[i].rt_bizname].getScore.push(doScore(Number(result[i].rt_httpsuccrate),Number(result[i].rt_httpavgresptime),Number(result[i].rt_httpdlrate)));
            }

            // console.log("=====",obj['咪咕音乐'].rt_starttime);
            // console.log(obj);

            cb(utils.returnMsg(true, '1000', '查询数据成功。', obj, null));
        }

    });
};


/**
 * 从前台传入areaId后，获取当前的时间，对数据进行查询和运算，以便对数据进行封装
 * 时间为当前时间，运算后的值为当前时间之前的所有月份数据，最后得到平均值
 * 例如，当前时间为201709，那么，得到的数据为1-9月数据
 * @param areaId
 * @param cb
 */
exports.getListByMon = function(areaId,date,input,cb) {

    var time=[];
    var myDay;
    if(date=='null' || date=='' || date=='undefined') {
        myDay=new Date();
    }else{
        myDay  = new Date(date);
    }

    if(areaId=='null' || areaId=='' || areaId=='undefined') {
        areaId='贵州';
    }
    var mon = myDay.getMonth();

        for(var i=1;i<=mon;i++){

            // var str2 = "2017/09/05 10:08";
            // mon = myDay.getMonth()+1;
            var time11 =myDay.getFullYear()+getfull(i)+'010000';
            time.push(time11);
        }


    model.dayMonSchema.find({rt_bizname:{$in:input},rt_starttime:{$in:time},rt_bizcity:areaId},function (err,result) {
        if(err){
            cb(utils.returnMsg(false, '0000', '查询数据失败。', null, err));
        }  else{

            result=result.sort(compare("rt_starttime"));
            var obj={};

            for(var i in result){

                obj[result[i].rt_bizname]={rt_httpsuccrate:[],
                                            rt_httpavgresptime:[],
                                            rt_httpdlrate:[],
                                            rt_starttime:[],
                                            getScore:[]
                                        };
            };
            for(var i in result){

                console.log(result[i].rt_httpsuccrate);
                obj[result[i].rt_bizname].rt_httpsuccrate.push(result[i].rt_httpsuccrate);
                console.log('-----------------'+ result[i].rt_httpavgresptime);
                obj[result[i].rt_bizname].rt_httpavgresptime.push(result[i].rt_httpavgresptime);
                obj[result[i].rt_bizname].rt_httpdlrate.push((result[i].rt_httpdlrate/1024).toFixed(2));
                console.log('================'+result[i].rt_starttime);
                obj[result[i].rt_bizname].rt_starttime.push(result[i].rt_starttime);

                obj[result[i].rt_bizname].getScore.push(doScore(Number(result[i].rt_httpsuccrate),Number(result[i].rt_httpavgresptime),Number(result[i].rt_httpdlrate)));
            }

                // for(var i in obj){
                // console.log(obj[i].getScore);
                // }
            cb(utils.returnMsg(true, '1000', '查询数据成功。', obj, null));
        }

    });
};

/**
 *  * 评分方法，根据http访问成功率、http时延、http下行速率三个
 * 参数综合对一个业务进行评分。其评分规则参考 规则库-评分规则.
 * 依据评分规则对数据进行最小二乘法拟合，拟合曲线与真实数据非常接近。
 *
 * @param x1 http访问成功率
 * @param x2 http延时
 * @param x3 http下行速率
 */
function doScore(x1,x2,x3) {
    var sum1=x1;

    var sum2=5.8722e-27*Math.pow(x2,10)-1.4995e-22*Math.pow(x2,9)+6.4799e-19*Math.pow(x2,8)
        -1.2701e-15*Math.pow(x2,7)+1.3850e-12*Math.pow(x2,6)-8.9667e-10*Math.pow(x2,5)+3.4428e-7*Math.pow(x2,4)
        -7.3614e-5*Math.pow(x2,3)+  0.0074*Math.pow(x2,2)-0.3576*x2+102.4245;

    var sum3;
    if(x3>4000){
        sum3 = 100;
    }else {
         sum3=
            - (911518324661147*Math.pow(x3,10))/1427247692705959881058285969449495136382746624
            + (2344239651361851*Math.pow(x3,9))/174224571863520493293247799005065324265472
            - (2592645603122383*Math.pow(x3,8))/21267647932558653966460912964485513216
            + (3224994937830801*Math.pow(x3,7))/5192296858534827628530496329220096
            - (4953524067843187*Math.pow(x3,6))/2535301200456458802993406410752
            + (1213968282654145*Math.pow(x3,5))/309485009821345068724781056
            - (3036230590435425*Math.pow(x3,4))/604462909807314587353088
            + (1177546056949865*Math.pow(x3,3))/295147905179352825856
            - (8558550983283005*Math.pow(x3,2))/4611686018427387904
            + (8319270413427255*x3)/18014398509481984
            + 5457818969238457/140737488355328;

    }

    if(sum1>100)
        sum1=100;
    else if(sum2>100)
        sum2=100;
    else if(sum3>100)
        sum3=100;
    else if(sum1<0)
        sum1=0;
    else if(sum2<0)
        sum2=0;
    else if(sum3<0)
        sum3=0;
    else
        ;
    // console.log('111111:'+sum1,'22222222:'+sum2,'3333333:'+sum3);
    return ((sum1+sum2+sum3)/3).toFixed(2);
}


//遍历json数组方法，获取分别的值
function getJson(key,json){
    for(var item in json){
        if(item==key){  //item 表示Json串中的属性，如'name'
            return json[item];
        }
    }
}

//获取需要的时间，时间类型为201709090808
function getMyDate(str){
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oTime = oYear + getfull(oMonth)+ getfull(oDay)+ getfull(oHour)+ getfull(oMin);//最后拼接时间
    return oTime;
}

//获取需要的时间，时间类型为20170909
function getMyDay(str) {
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        oTime = oYear + getfull(oMonth)+ getfull(oDay);//最后拼接时间
    return oTime;
}

//获取需要的时间，时间类型为201709
function getMyMon(str) {
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oTime = oYear + getfull(oMonth);//最后拼接时间
    return oTime;
}

//获取时间格式补0操作
function getfull(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}

//运算类型为天的三个字段平均值，其主要运算value的平均的值，以便对数据进行封装
function getAvgForDay(Array,myDay) {
if(Array.length==0){
    var mydata=[];
    for(var i=6;i>=0;i--){

        var cc=myDay - i*86400000;
        var bb =new Date(cc);

        mydata.push({name:bb.getDate(),value:0,color:getRandomColor()});

    }

    return mydata;
}
    var obj={};
    for(var i in Array){
        obj[Array[i].name]={num:0,len:0};
    }
    for(var i in Array){
        obj[Array[i].name].num=obj[Array[i].name].num+Number(Array[i].value);
        obj[Array[i].name].len++;
    }
    var mydata=[];
    for(var i in obj){
        mydata.push({name:Number(i)+'日',value:(obj[i].num/obj[i].len).toFixed(2),color:getRandomColor()});
    }

    mydata=mydata.sort(keysort("name",false));
    for(var i in mydata){
        mydata[i].name=mydata[i].name.substr(6,2);

    }

    return mydata;
}

//运算类型为月的三个字段平均值，其主要运算value的平均的值，以便对数据进行封装
function getAvgForMon(Array) {

    var obj={};
    for(var i in Array){
        obj[Array[i].name]={num:0,len:0};
    }
    for(var i in Array){
        obj[Array[i].name].num=obj[Array[i].name].num+Number(Array[i].value);
        obj[Array[i].name].len++;
    }
    var mydata=[];
    for(var i in obj){
        mydata.push({name:Number(i)+'日',value:(obj[i].num/obj[i].len).toFixed(2),color:getRandomColor()});
    }

    mydata=mydata.sort(keysort("name",false));
    for(var i in mydata){
        mydata[i].name=mydata[i].name.substr(4,2);
    }
    return mydata;
}

//获取随机颜色，以便对数据进行封装
function getRandomColor(){
    return (function(m,s,c){
        return (c ? arguments.callee(m,s,c-1) : '#') +
            s[m.floor(m.random() * 16)]
    })(Math,'0123456789abcdef',5)
}

//对对象里的数据进行排序
function keysort(key,sortType) {
    return function(a,b){
        return sortType ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
}

//
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        value1=new Number(value1.toString().substr(0,8));
        value2=new Number(value2.toString().substr(0,8));
        return value1 - value2;
    }
}