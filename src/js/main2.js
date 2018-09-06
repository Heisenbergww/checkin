var TEST_DATA1 = [
    {
        "field1": "人事司",
        "field2": "20",
        "field3": "180",
        "field4": "206",
        "field5": "26",
        "field6": "",
        "field7": "1.9",
        "field8": "",
        "field9": "0",
        "field10": "",
        "field11": "1.3",
        "field12": "差值",
        "field13": "2",
        "field14": "26",
        "field15": "",
        "field16": "",
        "field17": "4",
        "field18": "0",
        "field19": "",
        "field20": "",
        "field21": ""
    },
    {
        "field1": "外事司",
        "field2": "45",
        "field3": "405",
        "field4": "456",
        "field5": "51",
        "field6": "",
        "field7": "1.4",
        "field8": "",
        "field9": "0.8",
        "field10": "",
        "field11": "1.1",
        "field12": "",
        "field13": "4",
        "field14": "89",
        "field15": "",
        "field16": "",
        "field17": "12",
        "field18": "1",
        "field19": "",
        "field20": "",
        "field21": ""
    }
]

var TEST_DATA2 = [
    {
        "f1":"1",
        "f2":"<a href='https://www.baidu.com/s?ie=UTF-8&wd=datagrid'>张三</a>",
        "f3":"人事司",
        "f4":"",
        "f5":"",
        "f6":"",
        "f7":"",
        "f8":"",
        "f9":"",
        "f10":"",
        "f11":"206.5",
        "f12":"265",
        "f13":"70",
        "f14":"",
        "f15":"40",    
        "f16":"",
        "f17":"4",
        "f18":"2",
        "f19":"0",
    },
    {
        "f1":"2",
        "f2":"李四",
        "f3":"工贸司",
        "f4":"",
        "f5":"",
        "f6":"",
        "f7":"",
        "f8":"",
        "f9":"",
        "f10":"",
        "f11":"302.5",
        "f12":"480",
        "f13":"100",
        "f14":"",
        "f15":"80",    
        "f16":"",
        "f17":"2",
        "f18":"7",
        "f19":"0",
    }
]
var TEST_DATA3 = [
    {
        "f1":"2018.8.1",
        "f2":"7:30",
        "f3":"19:30",
        "f4":"11",
        "f5":"3",
        "f6":"0",
        "f7":"4",
        "f8":"",
        "f9":""
    },
    {
        "f1":"2018.8.2",
        "f2":"8:30",
        "f3":"17:30",
        "f4":"9",
        "f5":"0",
        "f6":"0.5",
        "f7":"18",
        "f8":"",
        "f9":""
    },
]


$(document).ready(function(){
    //引入模块
    layui.use(['layer','laydate','form','table','upload','element'],function(){
        var layer = layui.layer,//提示
        laydate = layui.laydate,//日期
        form = layui.form,//表单
        table = layui.table,//表格
        upload = layui.upload;//上传
        element = layui.element;//导航

        laydate.render({
            elem: '#start-date'
        });
        laydate.render({
            elem: '#end-date'
        });

        //上传
        upload.render({
            elem: '#upload-text', //绑定元素
            url: '/upload/',//上传接口
            done: function (res) {
                //上传完毕回调
                layer.msg('上传成功');
            },
            error: function () {
                //请求异常回调
                layer.msg('上传失败');
            }
        });

        //部门表格
        var deTable = table.render({
            elem: '#department-chart',
            height: 312,
            // url: '/hello/',
            request: {
                pageName: 'curr', //页码的参数名称，默认：page
                limitName: 'nums', //每页数据量的参数名，默认：limit
            }, 
            where:{
                token: 'sasasas',
                 id: 123
            },             
            page: false, //开启分页
            cols: [[ 
                { field: 'field1', title: '部门' },
                { field: 'field2', title: '人数'},
                { field: 'field3', title: '应出勤时间',sort:true},
                { field: 'field4', title: '工作时长'},
                { field: 'field5', title: '加班时长'},
                { field: 'field6', title: '加班排名'},
                { field: 'field7', title: '平时加班排名'},
                { field: 'field8', title: '平时加班时长'},
                { field: 'field9', title: '公休日加班时长'},
                { field: 'field10', title: '公休日加班排名'},
                { field: 'field11', title: '司内人均加班时长'},
                { field: 'field12', title: '室人均加班时长（均值）'},
                { field: 'field13', title: '人均加班时长排名'},
                { field: 'field14', title: '原始迟到次数'},
                { field: 'field15', title: '认定迟到次数'},
                { field: 'field16', title: '原始早退次数'},
                { field: 'field17', title: '认定早退次数'},
                { field: 'field18', title: '旷工次数'},
                { field: 'field19', title: '病事假（次）'},
                { field: 'field20', title: '年休假（次）'},
                { field: 'field21', title: '备注（没参加考勤人员）'},
            ]],
            data:TEST_DATA1,    
        });

        //多人表格
        var perTable =table.render({
            elem: '#persons-chart',
            height: 312,
            // url: '/hello/',
            request: {
                pageName: 'curr', //页码的参数名称，默认：page
                limitName: 'nums', //每页数据量的参数名，默认：limit
            }, 
            where:{
                token: 'sasasas',
                 id: 123
            },             
            page: false, //开启分页
            cols: [[ 
                { field: 'f1', title: '序号' },
                { field: 'f2', title: '姓名'},
                { field: 'f3', title: '所在单位'},
                { field: 'f4', title: '原始晚打卡记录（次）'},
                { field: 'f5', title: '认定迟到（次）'},
                { field: 'f6', title: '原始提前离岗记录(次）'},
                { field: 'f7', title: '认定早退（次）'},
                { field: 'f8', title: '旷工（天）'},
                { field: 'f9', title: '病事假（天）'},
                { field: 'f10', title: '年休假（天）'},
                { field: 'f11', title: '应在班时间（小时）'},
                { field: 'f12', title: '实际在班时间（小时）'},
                { field: 'f13', title: '实际在班超出时间（小时）'},
                { field: 'f14', title: '室人均在班超出时间（小时）'},
                { field: 'f15', title: '工作日在班超出时间（小时）'},
                { field: 'f16', title: '公休日在班超出时间（小时）'},
                { field: 'f17', title: '加班排名'},
                { field: 'f18', title: '早晨没打卡（次）'},
                { field: 'f19', title: '下班没打卡（次）'},
            ]],
            data:TEST_DATA2,    
        });
        //个人表格
        var oneTable =table.render({
            elem: '#one-chart',
            height: 512,
            // url: '/hello/',
            request: {
                pageName: 'curr', //页码的参数名称，默认：page
                limitName: 'nums', //每页数据量的参数名，默认：limit
            }, 
            where:{
                token: 'sasasas',
                 id: 123
            },             
            page: true, //开启分页
            cols: [[ 
                { field: 'f1', title: '日期' },
                { field: 'f2', title: '上班时间' },
                { field: 'f3', title: '下班时间' },
                { field: 'f4', title: '工作时长', },
                { field: 'f5', title: '加班时长', },
                { field: 'f6', title: '迟到时间', },
                { field: 'f7', title: '人均加班时长排名', },
                { field: 'f8', title: '休假', },
                { field: 'f9', title: '备注', }
            ]],
            data:TEST_DATA3,    
        });

        // table.on('edit(one-chart)', function (obj) {
        //     var value = obj.value //得到修改后的值
        //         , data = obj.data //得到所在行所有键值
        //         , field = obj.field; //得到字段
        //     layer.msg('[ID: ' + data.id + '] ' + field + ' 字段更改为：' + value);
        // });

        $('#one-edit').on('click', function () {
            table.render({
                elem: '#one-chart',
                height: 512,
                // url: '/hello/',
                request: {
                    pageName: 'curr', //页码的参数名称，默认：page
                    limitName: 'nums', //每页数据量的参数名，默认：limit
                },
                where: {
                    token: 'sasasas',
                    id: 123
                },
                page: true, //开启分页
                cols: [[
                    { field: 'f1', title: '日期', edit: 'text' },
                    { field: 'f2', title: '上班时间', edit: 'text' },
                    { field: 'f3', title: '下班时间', edit: 'text' },
                    { field: 'f4', title: '工作时长', edit: 'text' },
                    { field: 'f5', title: '加班时长', edit: 'text' },
                    { field: 'f6', title: '迟到时间', edit: 'text' },
                    { field: 'f7', title: '人均加班时长排名', edit: 'text' },
                    { field: 'f8', title: '休假', edit: 'text' },
                    { field: 'f9', title: '备注', edit: 'text' }
                ]],
                data: TEST_DATA3,
            })
        })

        $('#one-save').on('click', function () {
            table.render({
                elem: '#one-chart',
                height: 512,
                // url: '/hello/',
                request: {
                    pageName: 'curr', //页码的参数名称，默认：page
                    limitName: 'nums', //每页数据量的参数名，默认：limit 
                },
                where: {
                    token: 'sasasas',
                    id: 123
                },
                page: true, //开启分页
                cols: [[
                    { field: 'f1', title: '日期' },
                    { field: 'f2', title: '上班时间' },
                    { field: 'f3', title: '下班时间' },
                    { field: 'f4', title: '工作时长', },
                    { field: 'f5', title: '加班时长', },
                    { field: 'f6', title: '迟到时间', },
                    { field: 'f7', title: '人均加班时长排名', },
                    { field: 'f8', title: '休假', },
                    { field: 'f9', title: '备注', }
                ]],
                data: TEST_DATA3,
            });
        })



    })

})