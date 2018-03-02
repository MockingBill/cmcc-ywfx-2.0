var model = require('../models/migu_model');
var in_body={
    srvId :"wsSelfDevelopInterface.getSubAppQuality",
    authKey:"odc|odc!234",
    version:"v1.0",
    reqParams:'{key:String}'
};
var entity={
    sys_id:"自有业务质量监测及竞对分析",
    in_name:"五分钟粒度指标数据获取",
    in_statsus:"启用",
    in_host:"10.195.153.236",
    in_port:"6002",
    in_url:"/mobileDevelopInt_nlj",
    in_method:"POST",
    in_body:in_body,
    in_headers:{
        Authorization:"9C528035DFBD2D389E0A81D5F85A1810",
        'Content-Type':'application/json',
        'Content-Length':in_body.length
    },
    in_outTable:"rt",
    in_content_type:"json",
    in_stopPoint:"2017-9-21",
    in_execTime:"5"
};
// model.interfaceSchema.create(entity,function (err,data) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log("success",data);
//     }
// });
var c=[1,2,3,4];
console.log(Math.max(c));



