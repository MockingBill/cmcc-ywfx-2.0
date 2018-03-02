/**
 * Created by ShiHukui on 2016/2/22.
 */
var project_url_prefix = "/project";
var config = {
    project:{
        appid:'stnna',
        appname: '自有业务质量监测及竞对分析系统', // App名字
        apptitle: '自有业务质量监测及竞对分析系统', // 网页title
        appdescription: 'obma', // App的描述
        copyright:'©中国移动贵州公司 版权所有',
        keywords: 'cmcc,obma',
        version: '0.0.1',
        theme:'themes/beyond/',// 默认主题，优先显示common_system_info中的sys_theme_layout
        url:'',
        appurl:project_url_prefix,
        appviewurl:'app/',
        password_suffix:'@cmcc',
        captcha_login_enable:false,// 是否开启登陆验证码
        captcha_session_key:'captcha_session_key'
    },
    datas:{
        tree_org:{
            root_node_name:'组织架构'// 机构根节点名称
        },
        tree_menu:{
            root_node_name:'ROOT'// 菜单根节点名称
        },
        tree_param:{
            root_node_name:'全部'// 菜单根节点名称
        }
    },
    session:{
        secret:'gmdp_secret',
        key: 'gmdp_id',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie_maxAge:1800000,  //单位ms，即10分钟后session和相应的cookie失效过期
        resave: false,
        saveUninitialized: false,
        rolling:true,
		mongodb_url:'mongodb://cmccywfx:qwer1234QWER@cmccDBIP:27017/ownbusiness_monanaly',
        mongodb_collection:'common_user_session'
    },
    routes:{
        mount_path:'*/routes/*',// 路由挂载路径
        is_debug:true,// 是否开启调试模式
        mappings: {
            '/project/demo/routes/': project_url_prefix + '/api/demo/',    //demo路由匹配路径,
            '/project/nrt/routes/': project_url_prefix + '/api/nrt/',      //nrt路由匹配路径,
            '/project/rt/routes/': project_url_prefix + '/api/rt/',        //demo路由匹配路径,
            '/project/migu/routes/': project_url_prefix + '/api/migu/',      //实时数据
            '/project/realTime/routes/': project_url_prefix + '/api/realTime/',    //实时数据路由
            '/project/diagn/routes/': project_url_prefix + '/api/diagn/',     //诊断路由
             '/project/home/routes/': project_url_prefix + '/api/home/',//首页路由匹配
        },
        welcome_path:project_url_prefix + '/home/home',
        // 不做权限检查url（支持通配符*，尽量少用）
        exclude_auth_check_urls:[project_url_prefix + '/login',project_url_prefix + '/captcha',project_url_prefix + '/migu/*', project_url_prefix +'/static/*'],
        // 登陆后就能访问的url（无需授权）（支持通配符*，尽量少用）,如：修改个人信息、注销等操作
        logged_can_access_urls:[project_url_prefix + '/public/*', project_url_prefix + '/switchRole/*', project_url_prefix + '/logout', project_url_prefix + '/portal', project_url_prefix + '/api/demo/*']
    },
    mongdb:{
        //url: 'mongodb://192.168.176.132:27017/ownbusiness_monanaly',
        url:'mongodb://cmccywfx:qwer1234QWER@cmccDBIP:27017/ownbusiness_monanaly',
        poolsize:20
    },
    memcached:{
        server_locations:['127.0.0.1:11211'],
        options:{debug: true}
    },
    auth:{
        auth_type:'local',// local：本地认证；cas：单点登录认证
        cas_server_url             : 'http://10.196.11.231/cas',
        cas_server_version         : '2.0',
        cas_client_service_url     : 'http://localhost:3001',
        cas_client_session_name    : 'cas_sso_user',
        password:{
            key_1:'ea5456ffa698a9d7b469bcdd768bc104',
            key_2:'180831b7e2e6daba6ee89dbdf7846293',
            key_3_prefix:'cmcc_gz_'
        },
        password_daily_err_count:5// 密码每日允许错误次数
    },
    //工单接口地址
    interFace:{
       url:"http://10.195.153.236:8085/INAS-SALARM/ws/eastcomSendAlarm?wsdl"
    },
    //ftp服务器地址
    ftp:{
        host: "10.198.103.160",
        port: 21,
        user:'yingyong',
        password:'Yy@wgzx160'
    },
    //提交工单的附件文件在ftp上的存放位置
    ftpDir:"/home/yingyong/"
};
module.exports = config;
