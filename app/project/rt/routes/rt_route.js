/**
 * Created by ShiHukui on 2016/2/22.
 */
var express = require('express');
var router = express.Router();

// model
//var model = require('../models/student_model');
var service = require('../services/rt_service');
var utils = require('gmdp').init_gmdp.core_app_utils;
//var logger = require('../../../common/log/utils/log_util.js').getLogger('service_log');


router.route('/eui')
// query查询列表
    .get(function(req,res){
        // var page = req.query.page;
        // var length = req.query.rows;
var page = 1;
var length = 10;

        if(page == 0){
            page = 1;
        }

        console.log('分页参数：page='+req.query.page+',length='+req.query.rows);

        service.getStudentListForEui(page, length, function(result){
            utils.respJsonData(res, result);
        });

    });



//
//
// test(1.10);
// function test(a,b) {
//     service.getStudentListForEui(a, b, function(result) {
//         // console.log(result.data);
//         for (var i in result) {
//             console.log(result[i]);
//         }
//     });
//
// }

router.route('/gy')
// query查询列表
    .get(function(req,res){
        var page = req.query.page;
        var length = req.query.rows;
        //start=0&length=10
        //recordsTotal

        if(page == 0){
            page = 1;
        }

        console.log('分页参数：page='+req.query.page+',length='+req.query.rows);

        service.getStudentListForGy(page, length, function(result){
            utils.respJsonData(res, result);
        });

    });

router.route('/zy')
// query查询列表
    .get(function(req,res){
        var page = req.query.page;
        var length = req.query.rows;
        //start=0&length=10
        //recordsTotal

        if(page == 0){
            page = 1;
        }

        console.log('分页参数：page='+req.query.page+',length='+req.query.rows);

        service.getStudentListForZy(page, length, function(result){
            utils.respJsonData(res, result);
        });

    });

router.route('/as')
// query查询列表
    .get(function(req,res){
        var page = req.query.page;
        var length = req.query.rows;
        //start=0&length=10
        //recordsTotal

        if(page == 0){
            page = 1;
        }

        console.log('分页参数：page='+req.query.page+',length='+req.query.rows);

        service.getStudentListForAs(page, length, function(result){
            utils.respJsonData(res, result);
        });

    });

router.route('/qn')
// query查询列表
    .get(function(req,res){
        var page = req.query.page;
        var length = req.query.rows;
        //start=0&length=10
        //recordsTotal

        if(page == 0){
            page = 1;
        }

        console.log('分页参数：page='+req.query.page+',length='+req.query.rows);

        service.getStudentListForQn(page, length, function(result){
            utils.respJsonData(res, result);
        });

    });

router.route('/qdn')
// query查询列表
    .get(function(req,res){
        var page = req.query.page;
        var length = req.query.rows;
        //start=0&length=10
        //recordsTotal

        if(page == 0){
            page = 1;
        }

        console.log('分页参数：page='+req.query.page+',length='+req.query.rows);

        service.getStudentListForQdn(page, length, function(result){
            utils.respJsonData(res, result);
        });

    });

router.route('/tr')
// query查询列表
    .get(function(req,res){
        var page = req.query.page;
        var length = req.query.rows;
        //start=0&length=10
        //recordsTotal

        if(page == 0){
            page = 1;
        }

        console.log('分页参数：page='+req.query.page+',length='+req.query.rows);

        service.getStudentListForTr(page, length, function(result){
            utils.respJsonData(res, result);
        });

    });

router.route('/bj')
// query查询列表
    .get(function(req,res){
        var page = req.query.page;
        var length = req.query.rows;
        //start=0&length=10
        //recordsTotal

        if(page == 0){
            page = 1;
        }

        console.log('分页参数：page='+req.query.page+',length='+req.query.rows);

        service.getStudentListForBj(page, length, function(result){
            utils.respJsonData(res, result);
        });

    });

router.route('/lps')
// query查询列表
    .get(function(req,res){
        var page = req.query.page;
        var length = req.query.rows;
        //start=0&length=10
        //recordsTotal

        if(page == 0){
            page = 1;
        }

        console.log('分页参数：page='+req.query.page+',length='+req.query.rows);

        service.getStudentListForLps(page, length, function(result){
            utils.respJsonData(res, result);
        });

    });

router.route('/qxn')
// query查询列表
    .get(function(req,res){
        var page = req.query.page;
        var length = req.query.rows;
        //start=0&length=10
        //recordsTotal

        if(page == 0){
            page = 1;
        }

        console.log('分页参数：page='+req.query.page+',length='+req.query.rows);

        service.getStudentListForQxn(page, length, function(result){
            utils.respJsonData(res, result);
        });

    });

router.route('/:id')
// update修改
    .put(function(req,res) {
        var id = req.params.id;// where条件
        // 获取提交信息
        var stu_no = req.body.stu_no;
        var stu_name = req.body.stu_name;
        var stu_mobile = req.body.stu_mobile;
        var stu_sex = req.body.stu_sex;
        var stu_age = req.body.stu_age;
        var stu_status = req.body.stu_status;

        // 验证姓名和年龄是否为空
        if(!id) {
            //{'success':false,'code':'2000','msg':'姓名不能为空。'}
            utils.respMsg(res, false, '2000', 'ID不能为空。', null, null);
        }
        if(!stu_no) {
            //{'success':false,'code':'2000','msg':'姓名不能为空。'}
            utils.respMsg(res, false, '2001', '工号不能为空。', null, null);
        }
        else if(!stu_name) {
            //{'success':false,'code':'2000','msg':'姓名不能为空。'}
            utils.respMsg(res, false, '2002', '姓名不能为空。', null, null);
        }
        else if(!stu_mobile) {
            //{'success':false,'code':'2001','msg':'年龄不能为空。'}
            utils.respMsg(res, false, '2003', '手机不能为空。', null, null);
        }
        else if(!stu_sex) {
            //{'success':false,'code':'2001','msg':'年龄不能为空。'}
            utils.respMsg(res, false, '2004', '性别不能为空。', null, null);
        }
        else if(!stu_age) {
            //{'success':false,'code':'2001','msg':'年龄不能为空。'}
            utils.respMsg(res, false, '2005', '年龄不能为空。', null, null);
        }
        else if(!stu_status) {
            //{'success':false,'code':'2001','msg':'年龄不能为空。'}
            utils.respMsg(res, false, '2006', '状态不能为空。', null, null);
        }
        else {

            var studentEntity = {
                stu_no:stu_no,
                stu_name:stu_name,
                stu_mobile:stu_mobile,
                stu_sex:stu_sex,
                stu_age:stu_age,
                stu_status:stu_status
            };

            service.updateStudent(id, studentEntity, function(result){
                utils.respJsonData(res, result);
            });
        }
    })
    // get获取详情
    .get(function(req,res){
        var id = req.params.id;
        if (!id) {
            //{'success': false, 'code': '2000', 'msg': 'id不能为空。'}
            utils.respMsg(res, false, '2000', 'id不能为空。', null, null);
        }
        else {
            service.getStudent(id, function(result){
                utils.respJsonData(res, result);
            });
        }
    })
    // delete删除
    .delete(function(req,res){
        var id = req.params.id;

        if (!id) {
            //{'success': false, 'code': '2000', 'msg': 'id不能为空。'}
            utils.respMsg(res, false, '2000', 'id不能为空。', null, null);
        }
        else {
            service.deleteStudent(id, function(result){
                utils.respJsonData(res, result);
            });
        }
    });

module.exports = router;/**
 * Created by Administrator on 2017/6/5.
 */
