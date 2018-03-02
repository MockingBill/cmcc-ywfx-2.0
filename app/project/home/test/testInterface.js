// var xml2js = require('xml2js');
// var builder = new xml2js.Builder({rootName:"opDetail"});  // JSON->xml
// var http=require('http');
// var opDetail={
//     recordInfo:{
//         fieldInfo:[{fieldChName:"工单标题",fieldEnName:"alarmTitle",fieldContent:"邓千的标题"},
//             {fieldChName:"告警产生时间",fieldEnName:"alarmCreateTime",fieldContent:"2017-10-26 15:21:50"},
//             {fieldChName:"网络分类",fieldEnName:"netType",fieldContent:0},
//             {fieldChName:"网元id",fieldEnName:"neId",fieldContent:0},
//             {fieldChName:"网元名称",fieldEnName:"neName",fieldContent:"一个网元名称"},
//             {fieldChName:"设备厂家",fieldEnName:"alarmVendor",fieldContent:"厂家"},
//             {fieldChName:"省份",fieldEnName:"alarmProvince",fieldContent:"贵州"},
//             {fieldChName:"所属地市",fieldEnName:"alarmRegion",fieldContent:"贵阳"},
//             {fieldChName:"所属区县",fieldEnName:"alarmCity",fieldContent:"观山湖区"},
//             {fieldChName:"告警描述",fieldEnName:"alarmDetail",fieldContent:"撒打算飒飒擦擦"},
//             {fieldChName:"告警级别",fieldEnName:"alarmHandleLevel",fieldContent:1},
//             {fieldChName:"工单创建类型",fieldEnName:"createType",fieldContent:0},
//             {fieldChName:"派单人",fieldEnName:"sodr_staff",fieldContent:"邓千"},
//             {fieldChName:"派单人部门",fieldEnName:"sodr_depart",fieldContent:"贵州移动"},
//             {fieldChName:"派单人联系方式",fieldEnName:"sodrstaff_tel",fieldContent:"18785185684"},
//             {fieldChName:"派单人邮箱",fieldEnName:"sodrstaff_email",fieldContent:"dengqian1@gz.chinamobile.com"},
//             {fieldChName:"要求完成时间",fieldEnName:"limitDatas",fieldContent:10},
//             {fieldChName:"派单环境",fieldEnName:"environment",fieldContent:"test"},
//             {fieldChName:"派单类型",fieldEnName:"alarmFromType",fieldContent:"VOLTE端到端"},
//             {fieldChName:"附件文件名",fieldEnName:"attachName",fieldContent:"文件名"},
//             {fieldChName:"附件地址",fieldEnName:"attachUrl",fieldContent:"ftp：user@password"}
//         ]
//     }
// };
//
//
// var xml=builder.buildObject(opDetail);
// console.log(xml);
// var options={
//     hostname:'10.195.153.236',
//     port:8085,
//     path:'/INAS-SALARM/ws/eastcomSendAlarm?wsdl',
//     method:'POST',
//     headers:{
//         'Content-Type':'application/xml; charset=UTF-8',
//         'Content-Length':xml.length
//     }
// }
// var req=http.request(options, function(res) {
//     console.log('Status:',res.statusCode);
//     console.log('headers:',JSON.stringify(res.headers));
//     res.setEncoding('utf-8');
//     res.on('data',function(chun){
//         console.log('body分隔线---------------------------------\r\n');
//         console.info(chun);
//     });
//     res.on('end',function(){
//         console.log('No more data in response.********');
//     });
// });
// req.on('error',function(err){
//     console.error(err);
// });
// req.write(xml);
// req.end();
//
//
//
//
//
//
//
//
//
//
//
