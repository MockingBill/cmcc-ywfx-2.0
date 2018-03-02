/*
var soap=require('soap');
var xml2js = require('xml2js');
var builder = new xml2js.Builder({rootName:"opDetail"});


var wsdlOptions ={
    "soapenv":{
        "Envelops":[{
            "name":"xmlns:soapevn",
            "value":"http://schemas.xmlsoap.org/soap/envelop/"
        },{
            "name":"xmlns:ser",
            "value":'http;//service.webservice.dxsend.eastcom_sw.com/'
        }]
    }
};


var url='http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl';

var soap=require('soap');

soap.createClient(url,function(err,client){
    if(err!==null){
        console.log("err:"+err);
    }else{
        /!*for(var i in client){
            console.log(client[i]);
        }*!/

        client.getWeatherbyCityName ({theCityName :"大连"},function (err,result,raw,heard) {
            if(err){
                console.log(err);
            }else{
                console.log("-----------------");
                console.log(result);
                console.log("-----------------");
                console.log(raw);
                console.log("-----------------");
                console.log(heard);


            }
        });

    }
  //client.setSOAPAction(url);
    /!**!/


});



*/

