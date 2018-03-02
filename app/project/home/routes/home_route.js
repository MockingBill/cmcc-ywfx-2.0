/**
 * Created by dengqian on 2017-10-17
 */
var express = require('express');
var router = express.Router();
var xml2js = require('xml2js');
var builder = new xml2js.Builder({rootName:"opDetail"});
// model
var service = require('../services/home_service.js');
var utils = require('gmdp').init_gmdp.core_app_utils;
var fs=require('fs');
var tree=require('gmdp').init_gmdp.core_tree_utils;
//var logger = require('../../../common/log/utils/log_util.js').getLogger('service_log');
/**
 * 查询当前数据库所有业务
 */
function aa() {
    service.getSingleData("rt_bizname", function (result) {
       var j =0;
       for(var i in result){
           console.log(result[i]);
           j++;
       }
       console.log(j);
    });
}

/**
 * 查询遍历首页数据
 */
router.route('/').get(function (req, res) {
    for(var i in req.query){
        req.query[i];
    }
    var page = req.query.page;                  //用于分页查询提供当前页数
    var length = req.query.rows;
    var sort= req.query.sort;                   //用于点击列头获取需要以哪一列数据作为排序依据
    var order=req.query.order;                  //用于表示升序排列或者降序排列，只有两个值 'asc' 或者 'desc
    var sortItem={sort:sort,order:order};
    var dateType=req.query.dataType;
    var otherRt_bizname=req.query.otherRt_bizname;
    otherRt_bizname.push(req.query.ownRt_bizname);

    var condition = {
        rt_bizcity: req.query.rt_bizcity,
        otherRt_bizname: otherRt_bizname,
        rt_starttime: req.query.queryDate
    };
    //日粒度service
    if(dateType=="day"){
        service.getDayListForEui(page,length,condition,sortItem,function (result) {

            utils.respJsonData(res,result);
        });
    }
    //月粒度service
   else if(dateType=="mon"){
        service.getMonListForEui(page,length,condition,sortItem,function (result) {
            utils.respJsonData(res, result);
        });
    }else{
        utils.respJsonData(res,utils.returnMsg(false,'0001','请求参数错误', null, null));
    }
});

router.route('/').post(function (req, res) {
    var alarmTitle=req.body.alarmTitle,                     //告警标题
        alarmCreateTime=req.body.alarmCreateTime,           //告警产生时间
        netType=req.body.netType,                           //网络分类
        neId=req.body.neId,                                 //网元id
        neName=req.body.neName,                             //网元名称
        alarmVendor=req.body.alarmVendor,                   //设备厂家
        alarmProvince="贵州",                               //省份
        alarmRegion=req.body.alarmRegion,                   //所属地市
        alarmCity=req.body.alarmCity,                       //所属区县
        alarmDetail=req.body.alarmDetail,                   //告警描述
        alarmHandleLevel=1,                                 //告警级别
        createType=0,                                       //工单创建类型
        sodr_staff=req.body.sodr_staff,                     //派单人
        sodr_depart=req.body.sodr_depart,                   //派单人部门
        sodrstaff_tel=req.body.sodrstaff_tel,               //派单人联系方式
        sodrstaff_email=req.body.sodrstaff_email,           //派单人邮箱
        limitDatas=Number(req.body.limitDatas),             //要求完成时间
        environment="test",                                 //派单环境
        alarmFromType=req.body.alarmFromType,               //派单类型
        attachName=req.body.attachName,                     //附件文件名
        attachUrl=req.body.attachUrl;                       //附件地址
    if(isEffect(alarmTitle)){
        utils.respJsonData(res,utils.returnMsg(false,'0003','工单标题不能为空', null, null));
    }else if(isEffect(alarmCreateTime)){
        utils.respJsonData(res,utils.returnMsg(false,'0003','告警产生时间不能为空', null, null));
    }if(isEffect(netType)){
        utils.respJsonData(res,utils.returnMsg(false,'0003','网络分类不能为空', null, null));
    }
    if(isEffect(neId)){
        neId=0;
    }
    else if(isEffect(neName)){
        utils.respJsonData(res,utils.returnMsg(false,'0003','网元名称不能为空', null, null));
    }
    else if(isEffect(alarmVendor)){
        utils.respJsonData(res,utils.returnMsg(false,'0003','设备厂家不能为空', null, null));
    }
    else if(isEffect(alarmRegion)){
        utils.respJsonData(res,utils.returnMsg(false,'0003','所属地市不能为空', null, null));
    }
    if(isEffect(alarmCity)){
        alarmCity="";
    }
    else if(isEffect(alarmDetail)){
        utils.respJsonData(res,utils.returnMsg(false,'0003','告警描述不能为空', null, null));
    }
    if(isEffect(limitDatas)){
        limitDatas=10;
    }
    else if(isEffect(environment)){
        utils.respJsonData(res,utils.returnMsg(false,'0003','工单标题不能为空', null, null));
    }
    else if(isEffect(alarmFromType)){
        utils.respJsonData(res,utils.returnMsg(false,'0003','派单类型不能为空', null, null));
    }
    var data = {
        alarmTitle: alarmTitle,
        alarmCreateTime: alarmCreateTime,
        netType: netType,
        neId: neId,
        neName: neName,
        alarmVendor: alarmVendor,
        alarmProvince: alarmProvince,
        alarmRegion: alarmRegion,
        alarmCity: alarmCity,
        alarmDetail: alarmDetail,
        alarmHandleLevel: alarmHandleLevel,
        createType: createType,
        sodr_staff: sodr_staff,
        sodr_depart: sodr_depart,
        sodrstaff_tel: sodrstaff_tel,
        sodrstaff_email: sodrstaff_email,
        limitDatas: limitDatas,
        environment: environment,
        alarmFromType: alarmFromType,
        attachName: attachName,
        attachUrl: attachUrl
    };

    service.sendWorkOrder(data,function (result) {
        utils.respJsonData(res,result);
    });

});
/**
 * 跳转到诊断页面，并插入体条诊断记录
 */
router.route('/toDiagnosis').get(function (req,res) {
    var dataType=req.query.dataType;
    var otherRt_bizname=req.query.otherRt_bizname.split(',');
    otherRt_bizname.push(req.query.ownRt_bizname);
    var condition = {
        rt_bizcity: req.query.rt_bizcity,
        otherRt_bizname: otherRt_bizname,
        rt_starttime: req.query.queryDate,
        dn_persion:req.session.current_user
    };
    //判断时间类型，天粒度与月粒度
    if (dataType == 'day') {
        service.getDayDiagnosisResult(condition, function (result) {
            res.render('app/project/home/diagnosis',{
                //框架参数
                layout:'themes/beyond/layout',
                currentUser: req.session.current_user,
                currentUserRoleMenus: utils.getCurrentUserRoleMenus(req),
                currentUserRole: utils.getCurrentUserRole(req),
                sysmenus: tree.buildSysTree(utils.getCurrentSysMenus(req)),
                //页面参数
                result:result.data.result,
                networkText:result.data.networkText,
                diagnoiseText:result.data.diagnoiseText
            });
        });
    } else if (dataType == 'mon') {
        service.getMonDiagnosisResult(condition, function (result) {
            res.render('app/project/home/diagnosis',{
                //框架参数
                layout:'themes/beyond/layout',
                currentUser: req.session.current_user,
                currentUserRoleMenus: utils.getCurrentUserRoleMenus(req),
                currentUserRole: utils.getCurrentUserRole(req),
                sysmenus: tree.buildSysTree(utils.getCurrentSysMenus(req)),
                //页面参数
                result:result.data.result,
                networkText:result.data.networkText,
                diagnoiseText:result.data.diagnoiseText
            });
        });
    } else {
        res.render('app/project/home/diagnosis',{
            //框架参数
            layout:'themes/beyond/layout',
            currentUser: req.session.current_user,
            currentUserRoleMenus: utils.getCurrentUserRoleMenus(req),
            currentUserRole: utils.getCurrentUserRole(req),
            sysmenus: tree.buildSysTree(utils.getCurrentSysMenus(req)),
            //页面参数
        });
    }
});


/**
 * 作用：文件上传路由、获取文件名称，判断文件是否存在，若存在则在
 * 数据该任务的附加文件字段添加该文件的文件名
 * URL:  /api/pm/pm/upload/+id
 * 该路由均被前台fileupload方法调用。而在对任务信息进行增加和修改
 * 的时候，页面都会先执行基础数据的更新，在成功的回调方法中再基础
 * 对上传的附件文件进行处理。
 */
const dirPath = "./public/static/file/";
router.route('/upload').post(function (req, res) {

    var file = req.files.dn_enclosure;

    //可以不上传文件、当无法检测文件的时候直接返回相关信息
    if(file===null||file===undefined||file==='')
        utils.respJsonData(res, utils.returnMsg(true, '0000', '未检测到有文件上传。', null, null));
    //只能上传压缩、文档、工作表类型的文件
     else if (file.extension === 'rar' || file.extension === 'zip'||file.extension==='doc'||file.extension==='docx'||file.extension==='xls'||file.extension==='xlsx') {
        //文件最大限制在 20 MB
        if ((file.size / 1024) <= 20480) {

            if (file.name !== null && file.name !== '' && file.name !== undefined && fs.existsSync(dirPath + file.name)) {
                service.uploadFtp(file,dirPath,function (result) {
                    utils.respJsonData(res,result);
                });
                /*utils.respJsonData(res,utils.returnMsg(true, '0000', '上传文件成功。', null, null));*/

            } else {
                //上传出现异常的异常处理是若存在文件则删除、返回异常信息
                if(fs.existsSync(dirPath + file.name))
                    deleteFile(file.name);
                utils.respJsonData(res, utils.returnMsg(false, '0000', '上传文件异常。', null, error));
            }
        } else {
            if(fs.existsSync(dirPath + file.name))
                deleteFile(file.name);
            utils.respJsonData(res, utils.returnMsg(false, '0000', '文件过大。', null, error));
        }
    } else {
        if(fs.existsSync(dirPath + file.name))
            deleteFile(file.name);
        utils.respJsonData(res, utils.returnMsg(false, '0000', '文件类型错误。', null, error));
    }
});

function isEffect(v) {
    if(v!==""&&v!==undefined&&v!==null)
        return false;
    else
        return true;
}


router.route('/listWorkOrder').get(function (req, res) {
    var page = req.query.page;
    var length = req.query.rows;


    var sort= req.query.sort;                   //用于点击列头获取需要以哪一列数据作为排序依据
    var order=req.query.order;                  //用于表示升序排列或者降序排列，只有两个值 'asc' 或者 'desc
    var sortItem={sort:sort,order:order};
    var condition={
        alarmTitle:req.query.alarmTitle
    };
    service.getWorkOrderForEui(page,length,condition,sortItem,function (result) {
        utils.respJsonData(res,result);
    });
});

router.route('/listWarnCord').get(function (req,res) {


    var condtion={rt_bizcity:req.query.rt_bizcity,
        ownRt_bizname:req.query.ownRt_bizname,
        queryDate:req.query.queryDate};
    if(condtion.rt_bizcity===undefined||condtion.ownRt_bizname===undefined||condtion.queryDate===undefined)
        utils.respJsonData(res,utils.returnMsg(true, '0000',"", null, null));
    else
        service.getWarnCordList(condtion,null,function (result) {
            utils.respJsonData(res,result);
        })

});
/**
 * 用户修改密码路由
 */
router.route('/updateUser').post(function (req,res) {
    var user_id=req.session.current_user._id;
    var pa=new RegExp(/^[\w\d]{24,24}$/);
    if(!pa.test(user_id)){
        utils.respJsonData(res,utils.returnMsg(true, '1009', '数据格式异常', {flag:0}, null));
    }
    var fl='1c8062fed38ad48d0545da403a1e0d6e';
    //检查密码合法性，针对拦截修改做出防御
    pa=new RegExp(/^[\w\d]{32,32}$/);

    var oldpass=req.body.oldPass;
    if(!pa.test(oldpass)){
        utils.respJsonData(res,utils.returnMsg(true, '1009', '数据格式异常', {flag:0}, null));
    }

    var newpass=req.body.newPass;
    if(!pa.test(newpass)){
        utils.respJsonData(res,utils.returnMsg(false, '1009', '数据格式异常', {flag:0}, null));
    }
    service.updateUserPass({user_id:user_id,oldpass:oldpass,newpass:newpass},function (result) {
        utils.respJsonData(res,result);
    });
});


/**
 * 删除没用的文件
 * @param fileName
 */
function deleteFile(fileName) {
    fs.unlink(dirPath + fileName, function (err) {
        if (err){
            console.log(err);
        }
        console.log('成功删除');
    });
}

module.exports = router;