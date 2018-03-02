/**
 { _id: 5a40b9e8bfdd29061517c7c9,
  sys_id: '自有业务质量监测及竞对分析',
  in_name: '五分钟粒度指标数据获取',
  in_statsus: '未启动',
  in_host: '10.195.153.236',
  in_port: '6002',
  in_url: '/mobileDevelopInt_nlj',
  in_method: 'POST',
  in_outTable: 'rt',
  in_content_type: 'json',
  in_stopPoint: '2017-12-26 11:25:00',
  in_execTime: '5',
  __v: 0,
  in_headers:
   { 'Content-Type': 'application/json',
     Authorization: '9C528035DFBD2D389E0A81D5F85A1810' },
  in_body:
   { reqParams: 'key:201712281500',
     version: 'v1.0',
     authKey: 'odc|odc!234',
     srvId: 'wsSelfDevelopInterface.getSubAppQuality' } }
**/

/**
var str2='{level:"day",timeId:\"'+20171107+'\"}';
var str1='{"key":"'+201712281400+'"}';

var r1='key:201712281500';
var r2='level:day,timeId:20171228';


function formate(str) {
    var resu='';

    var ff=str.split(',');

    if(ff.length==1){
        resu='{"'+str.split(':')[0]+'":"'+str.split(':')[1]+'"}'
    }else if(ff.length==2){
        resu='{'+ff[0].split(':')[0]+':\"'+ff[0].split(':')[1]+'\",'+ff[1].split(':')[0]+':\"'+ff[1].split(':')[1]+'\"}';
    }

    return resu;
}
 **/

// var dayStopDate=new Date('2017-12-27'),currentDate=new Date();
//
// dayStopDate=new Date(dayTimeTransf(dayTimeTransf(dayStopDate)));
// currentDate=new Date(dayTimeTransf(dayTimeTransf(currentDate)));
// console.log(dayStopDate.getTime()<currentDate.getTime());
//
//
//
// function dayTimeTransf(time) {
//     if(typeof time=='object'){
//         var timeStamp=time.getFullYear() + "" +
//             (time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)) + "" +
//             (time.getDate() < 10 ? '0' + time.getDate() : time.getDate());
//         return timeStamp;
//     }else{
//         var date=time.substring(0,4)+"-"+time.substring(4,6)+"-"+time.substring(6,8);
//         return date;
//     }
// }

