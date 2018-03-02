/**
 * Created by Administrator on 2017/6/5.
 */
// model
var model = require('../models/rt_model');
var utils = require('gmdp').init_gmdp.core_app_utils;


/**
 * easyui分页查询
 * @param page
 * @param size
 * @param cb
 */
exports.getStudentListForEui = function (page, size, cb) {
    var curr_time = new Date();
    console.log(curr_time);
    var pre_time = new Date();
    pre_time.setHours((pre_time.getHours() + 8), (pre_time.getMinutes() - 35), 0, 0);
    curr_time.setHours((curr_time.getHours() + 8), curr_time.getMinutes() - 31, 59, 999);

    query = model.$RtSchema.find({'rt_starttime': {$gte: pre_time, $lte: curr_time}, 'rt_bizcity': '贵州'});
    query.skip((parseInt(page) - 1) * size);
    query.limit(parseInt(size));
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            //{'success':false,'code':'1000','msg':'根据姓名查询出现异常。','reason':err}
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        } else {
            //计算数据总数
            model.$RtSchema.find({
                'rt_starttime': {$gte: pre_time, $lte: curr_time},
                'rt_bizcity': '贵州'
            }, function (err, result) {
                if (err) {
                    cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                } else {

                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                }
            });
        }
    });
};

exports.getStudentListForGy = function (page, size, cb) {
    var curr_time = new Date();
    var pre_time = new Date();
    pre_time.setHours((pre_time.getHours() + 8), (pre_time.getMinutes() - 35), 0, 0);
    curr_time.setHours((curr_time.getHours() + 8), curr_time.getMinutes() - 31, 59, 999);
    query = model.$RtSchema.find({'rt_starttime': {$gte: pre_time, $lte: curr_time}, 'rt_bizcity': '贵阳'});
    query.skip((parseInt(page) - 1) * size);
    query.limit(parseInt(size));
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            //{'success':false,'code':'1000','msg':'根据姓名查询出现异常。','reason':err}
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        } else {
            //计算数据总数
            model.$RtSchema.find({
                'rt_starttime': {$gte: pre_time, $lte: curr_time},
                'rt_bizcity': '贵阳'
            }, function (err, result) {
                if (err) {
                    cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                } else {
                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                }
            });
        }
    });
};

exports.getStudentListForZy = function (page, size, cb) {
    var curr_time = new Date();
    var pre_time = new Date();
    pre_time.setHours((pre_time.getHours() + 8), (pre_time.getMinutes() - 35), 0, 0);
    curr_time.setHours((curr_time.getHours() + 8), curr_time.getMinutes() - 31, 59, 999);
    query = model.$RtSchema.find({'rt_starttime': {$gte: pre_time, $lte: curr_time}, 'rt_bizcity': '遵义'});
    query.skip((parseInt(page) - 1) * size);
    query.limit(parseInt(size));
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            //{'success':false,'code':'1000','msg':'根据姓名查询出现异常。','reason':err}
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        } else {
            //计算数据总数
            model.$RtSchema.find({
                'rt_starttime': {$gte: pre_time, $lte: curr_time},
                'rt_bizcity': '遵义'
            }, function (err, result) {
                if (err) {
                    cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                } else {
                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                }
            });
        }
    });
};

exports.getStudentListForAs = function (page, size, cb) {
    var curr_time = new Date();
    var pre_time = new Date();
    pre_time.setHours((pre_time.getHours() + 8), (pre_time.getMinutes() - 35), 0, 0);
    curr_time.setHours((curr_time.getHours() + 8), curr_time.getMinutes() - 31, 59, 999);
    query = model.$RtSchema.find({'rt_starttime': {$gte: pre_time, $lte: curr_time}, 'rt_bizcity': '安顺'});
    query.skip((parseInt(page) - 1) * size);
    query.limit(parseInt(size));
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            //{'success':false,'code':'1000','msg':'根据姓名查询出现异常。','reason':err}
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        } else {
            //计算数据总数
            model.$RtSchema.find({
                'rt_starttime': {$gte: pre_time, $lte: curr_time},
                'rt_bizcity': '安顺'
            }, function (err, result) {
                if (err) {
                    cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                } else {
                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                }
            });
        }
    });
};

exports.getStudentListForQn = function (page, size, cb) {
    var curr_time = new Date();
    var pre_time = new Date();
    pre_time.setHours((pre_time.getHours() + 8), (pre_time.getMinutes() - 35), 0, 0);
    curr_time.setHours((curr_time.getHours() + 8), curr_time.getMinutes() - 31, 59, 999);
    query = model.$RtSchema.find({'rt_starttime': {$gte: pre_time, $lte: curr_time}, 'rt_bizcity': '都匀'});
    query.skip((parseInt(page) - 1) * size);
    query.limit(parseInt(size));
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            //{'success':false,'code':'1000','msg':'根据姓名查询出现异常。','reason':err}
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        } else {
            //计算数据总数
            model.$RtSchema.find({
                'rt_starttime': {$gte: pre_time, $lte: curr_time},
                'rt_bizcity': '都匀'
            }, function (err, result) {
                if (err) {
                    cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                } else {
                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                }
            });
        }
    });
};

exports.getStudentListForQdn = function (page, size, cb) {
    var curr_time = new Date();
    var pre_time = new Date();
    pre_time.setHours((pre_time.getHours() + 8), (pre_time.getMinutes() - 35), 0, 0);
    curr_time.setHours((curr_time.getHours() + 8), curr_time.getMinutes() - 31, 59, 999);
    query = model.$RtSchema.find({'rt_starttime': {$gte: pre_time, $lte: curr_time}, 'rt_bizcity': '凯里'});
    query.skip((parseInt(page) - 1) * size);
    query.limit(parseInt(size));
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            //{'success':false,'code':'1000','msg':'根据姓名查询出现异常。','reason':err}
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        } else {
            //计算数据总数
            model.$RtSchema.find({
                'rt_starttime': {$gte: pre_time, $lte: curr_time},
                'rt_bizcity': '凯里'
            }, function (err, result) {
                if (err) {
                    cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                } else {
                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                }
            });
        }
    });
};

exports.getStudentListForTr = function (page, size, cb) {
    var curr_time = new Date();
    var pre_time = new Date();
    pre_time.setHours((pre_time.getHours() + 8), (pre_time.getMinutes() - 35), 0, 0);
    curr_time.setHours((curr_time.getHours() + 8), curr_time.getMinutes() - 31, 59, 999);
    query = model.$RtSchema.find({'rt_starttime': {$gte: pre_time, $lte: curr_time}, 'rt_bizcity': '铜仁'});
    query.skip((parseInt(page) - 1) * size);
    query.limit(parseInt(size));
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            //{'success':false,'code':'1000','msg':'根据姓名查询出现异常。','reason':err}
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        } else {
            //计算数据总数
            model.$RtSchema.find({
                'rt_starttime': {$gte: pre_time, $lte: curr_time},
                'rt_bizcity': '铜仁'
            }, function (err, result) {
                if (err) {
                    cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                } else {
                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                }
            });
        }
    });
};

exports.getStudentListForBj = function (page, size, cb) {
    var curr_time = new Date();
    var pre_time = new Date();
    pre_time.setHours((pre_time.getHours() + 8), (pre_time.getMinutes() - 35), 0, 0);
    curr_time.setHours((curr_time.getHours() + 8), curr_time.getMinutes() - 31, 59, 999);
    query = model.$RtSchema.find({'rt_starttime': {$gte: pre_time, $lte: curr_time}, 'rt_bizcity': '毕节'});
    query.skip((parseInt(page) - 1) * size);
    query.limit(parseInt(size));
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            //{'success':false,'code':'1000','msg':'根据姓名查询出现异常。','reason':err}
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        } else {
            //计算数据总数
            model.$RtSchema.find({
                'rt_starttime': {$gte: pre_time, $lte: curr_time},
                'rt_bizcity': '毕节'
            }, function (err, result) {
                if (err) {
                    cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                } else {
                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                }
            });
        }
    });
};

exports.getStudentListForLps = function (page, size, cb) {
    var curr_time = new Date();
    var pre_time = new Date();
    pre_time.setHours((pre_time.getHours() + 8), (pre_time.getMinutes() - 35), 0, 0);
    curr_time.setHours((curr_time.getHours() + 8), curr_time.getMinutes() - 31, 59, 999);
    query = model.$RtSchema.find({'rt_starttime': {$gte: pre_time, $lte: curr_time}, 'rt_bizcity': '六盘水'});
    query.skip((parseInt(page) - 1) * size);
    query.limit(parseInt(size));
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            //{'success':false,'code':'1000','msg':'根据姓名查询出现异常。','reason':err}
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        } else {
            //计算数据总数
            model.$RtSchema.find({
                'rt_starttime': {$gte: pre_time, $lte: curr_time},
                'rt_bizcity': '六盘水'
            }, function (err, result) {
                if (err) {
                    cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                } else {
                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                }
            });
        }
    });
};

exports.getStudentListForQxn = function (page, size, cb) {
    var curr_time = new Date();
    var pre_time = new Date();
    pre_time.setHours((pre_time.getHours() + 8), (pre_time.getMinutes() - 35), 0, 0);
    curr_time.setHours((curr_time.getHours() + 8), curr_time.getMinutes() - 31, 59, 999);
    query = model.$RtSchema.find({'rt_starttime': {$gte: pre_time, $lte: curr_time}, 'rt_bizcity': '兴义'});
    query.skip((parseInt(page) - 1) * size);
    query.limit(parseInt(size));
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            //{'success':false,'code':'1000','msg':'根据姓名查询出现异常。','reason':err}
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        } else {
            //计算数据总数
            model.$RtSchema.find({
                'rt_starttime': {$gte: pre_time, $lte: curr_time},
                'rt_bizcity': '兴义'
            }, function (err, result) {
                if (err) {
                    cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                } else {
                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                }
            });
        }
    });
};

exports.saveStudent = function (studentEntity, cb) {
    // 实例模型，调用保存方法
    model.$(studentEntity).save(function (error) {
        if (error) {
            //{'success':false,'code':'1000','msg':'添加信息时出现异常。','reason':error}
            cb(utils.returnMsg(false, '1000', '添加信息时出现异常。', null, error));
        }
        else {
            //{'success':true,'code':'0000','msg':'添加信息成功。'}
            cb(utils.returnMsg(true, '0000', '添加信息成功。', null, null));
        }
    });
};

exports.getStudent = function (id, cb) {
    var criteria = {_id: id}; // 查询条件
    var fields = {}; // 待返回的字段
    var options = {};
    model.$.find(criteria, fields, options, function (error, result) {
        if (error) {
            cb(utils.returnMsg(false, '1000', '查询详情出现异常。', null, error));
        }
        else {
            cb(utils.returnMsg(true, '0000', '查询详情成功。', result, null));
        }
    });
};

exports.updateStudent = function (id, studentEntity, cb) {
    var conditions = {_id: id};
    var update = {$set: studentEntity};
    var options = {};
    model.$.update(conditions, update, options, function (error) {
        if (error) {
            //{'success':false,'code':'1000','msg':'修改信息时出现异常。','reason':error}
            cb(utils.returnMsg(false, '1000', '修改信息时出现异常。', null, error));
        }
        else {
            //{'success':true,'code':'0000','msg':'修改信息成功。'}
            cb(utils.returnMsg(true, '0000', '修改信息成功。', null, null));
        }
    });
};

exports.deleteStudent = function (id, cb) {
    var conditions = {_id: id};
    model.$.remove(conditions, function (error) {
        if (error) {
            cb(utils.returnMsg(false, '1000', '删除信息时出现异常。', null, error));
        }
        else {
            cb(utils.returnMsg(true, '0000', '删除信息成功。', null, null));
        }
    });
};