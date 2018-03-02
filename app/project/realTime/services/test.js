/*

var model=require("../models/realTime_model");
var rt_activeusernbr=0;//活跃人数  1-10;
var rt_ultraffic_rand=0;//下载流量  1000-2000;
var rt_dltraffic_rand=0;//上传流量  1000-2000;
var rt_httpsuccrate_rand=0;//访问成功率  70-80
var rt_httpdlrate_rand=0;//下行速率   100-2000
var rt_httpavgresptime=0;//响应时延   50-800

model.RtSchema.find({"rt_starttime" : new RegExp("20170905")},function (err,resu) {
    if(err) {console.log(err);}
    else{
        for(var i  in resu){
            if (isNoEff(resu[i].rt_activeusernbr)) {
                resu[i].rt_activeusernbr=Math.round(Math.random()*10);
            }
            if (isNoEff(resu[i].rt_ultraffic)) {
                resu[i].rt_ultraffic=Math.round(Math.random()*1000+1000);
            }
            if (isNoEff(resu[i].rt_dltraffic)) {
                resu[i].rt_dltraffic=Math.round(Math.random()*1000+1000);
            }
            if (isNoEff(resu[i].rt_httpsuccrate)) {
                resu[i].rt_httpsuccrate=(Math.random()*10+70).toFixed(2);
            }
            if (isNoEff(resu[i].rt_httpdlrate)) {
                resu[i].rt_httpdlrate=(Math.random()*1000+100).toFixed(2);
            }
            if (isNoEff(resu[i].rt_httpavgresptime)) {
                resu[i].rt_httpavgresptime=(Math.random()*300+50).toFixed(2);
            }
        }
        model.RtSchema.create(resu,function (err) {
            if(err)
                console.log(err);
            else
                console.log("success");
        });


    }
});

function isNoEff(data) {
    if(data==null||data==""||data==undefined||data=="0")
        return true;
    else
        return false;
}



*/


//mongodb_url:'mongodb://cmcc_admin:qwer!#$1234qwer@localhost:27017/ownbusiness_monanaly',

// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://cmccywfx:qwer1234QWER@localhost:27017/ownbusiness_monanaly';
/*var selectData = function(db, callback) {
    //连接到表
    var collection = db.collection('rt');
    //查询数据
    var whereStr = {"name":'菜鸟教程'};
    collection.find(whereStr).toArray(function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}*/

// MongoClient.connect(DB_CONN_STR, function(err, db) {
//     if(err)
//         console.log(err);
//     else{
//         console.log("连接成功！");
//     }

    /*selectData(db, function(result) {
        console.log(result);
        db.close();
    });*/
//});









