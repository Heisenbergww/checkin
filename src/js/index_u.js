$(document).ready(function(){
    //引入模块
    layui.use(['layer','form','table','upload','element'],function(){
        var layer = layui.layer,//提示
        form = layui.form,//表单
        table = layui.table,//表格
        upload = layui.upload;//上传
        element = layui.element;//导航

        var tableData = [] 

        function tableDataRend(list) {
            tableData = []
            for (let line of list) {
                var obj = {
                    "id": 0,
                    "name": 0,
                    "department": 0,
                    "f1": 0,
                    "f2": 0,
                    "f3": 0,
                    "f4": 0,
                    "f5": 0,
                    "f6": 0,
                    "f7": 0,
                    "f8": 0,
                    "f9": 0
                }
                obj.id = line.user_ID
                obj.name = line.user_Name
                obj.department = line.affiliation_name
                obj.f1 = moment(line.date).format('YYYY-MM-DD')
                obj.f2 = line.workTime == null ? '' : moment(line.workTime).format('HH:mm:ss')
                obj.f3 = line.offworkTime == null ? '' : moment(line.offworkTime).format('HH:mm:ss')
                obj.f4 = line.length_Of_TotalTime
                obj.f5 = line.lenght_Of_TotalOvertime
                obj.f6 = 0
                obj.f7 = 0
                obj.f8 = ''
                obj.f9 = ''
                tableData.push(obj)
            }
        }

        $('#index-page').addClass('layui-this');

        //上传
        upload.render({
            elem: '#upload-text', //绑定元素
            url: 'attendance/informations/uploadfile',//上传接口
            accept: 'file',
            done: function (res) {
                //上传完毕回调
                layer.msg('上传成功');
                tableDataRend(res);                    
                beginView();
            },
            error: function () {
                //请求异常回调
                layer.msg('上传失败');
            }
        }); 
        
        function beginView(){
            //数据处理
            // tableData = TEST_DATA3;
            //按钮显示
            // $('#upload-edit').css('display',"inline-block");
            // $('#upload-save').css('display',"inline-block");
            // $('#upload-text').css('display',"none");
            //渲染表格   
            var oneTable =table.render({
                elem: '#look-chart',
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
                    { field: 'id', title: 'ID' },
                    { field: 'name', title: '姓名' },
                    { field: 'department', title: '部门' },
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
                data:tableData,    
            });           
        }
        

        //编辑表格
        $('#upload-edit').on('click',function(){
            console.log('编辑'+tableData)
            table.render({
                elem: '#look-chart',
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
                    { field: 'id', title: 'ID' },
                    { field: 'name', title: '姓名' },
                    { field: 'department', title: '部门' },
                    { field: 'f1', title: '日期' },
                    { field: 'f2', title: '上班时间', edit: 'text' },
                    { field: 'f3', title: '下班时间', edit: 'text' },
                    { field: 'f4', title: '工作时长', },
                    { field: 'f5', title: '加班时长', },
                    { field: 'f6', title: '迟到时间', },
                    { field: 'f7', title: '人均加班时长排名', },
                    { field: 'f8', title: '休假', edit: 'text' },
                    { field: 'f9', title: '备注', edit: 'text' }
                ]],
                data: tableData,
            })
        })
        //监听
        var modifyListIndex = [];
        var modifyList = [];
        table.on('edit(look-chart)', function (obj) {
            var value = obj.value //得到修改后的值
                , data = obj.data //得到所在行所有键值
                , field = obj.field; //得到字段
                console.log(data);
                console.log($.inArray(data.id, modifyListIndex));
                if($.inArray(data.id, modifyListIndex)==-1){
                    console.log('添加')
                    modifyListIndex.push(data.id);
                    modifyList.push(data);
                }else{
                    for(var i=0;i<modifyList.length;i++){
                        if(modifyList[i]['id']==data.id){
                            console.log('修改')
                            modifyList[i] = data;
                        }
                    }
                    
                }
               
                // modifyList.push(data.id);
            layer.msg('改行改为 ' + data);
        });        
        //保存表格
        $('#upload-save').on('click',function(){
            console.log(modifyList)
            layer.msg('保存成功');
            $.ajax({
                type: 'GET',
                url: '/src/js/var.json',
                data: JSON.stringify(modifyList),
                // data: modifyList,
                success: function(res){
                    tableDataRend(res)
                    table.render({
                        elem: '#look-chart',
                        height: 512,
                        // url: '/src/js/var.json',
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
                            { field: 'id', title: 'ID' },
                            { field: 'name', title: '姓名' },
                            { field: 'department', title: '部门' },
                            { field: 'f1', title: '日期'},
                            { field: 'f2', title: '上班时间'},
                            { field: 'f3', title: '下班时间'},
                            { field: 'f4', title: '工作时长', },
                            { field: 'f5', title: '加班时长', },
                            { field: 'f6', title: '迟到时间', },
                            { field: 'f7', title: '人均加班时长排名',  },
                            { field: 'f8', title: '休假', },
                            { field: 'f9', title: '备注',  }
                        ]],
                        data: tableData,
                    })
                }
            })
        })          
        //过滤
        //监听提交
        form.on('submit(formDemo)', function(data){
            console.log(JSON.stringify(data.field))
            var filterData = data.field
            // var filterData = JSON.stringify(data.field);
            // layer.msg(JSON.stringify(data.field));
            $.ajax({
                type: 'GET',
                url: '',
                data: filterData,
                success: function(res){
                    tableDataRend(res)
                    table.render({
                        elem: '#look-chart',
                        height: 512,
                        // url: '/src/js/var.json',
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
                            { field: 'id', title: 'ID' },
                            { field: 'name', title: '姓名' },
                            { field: 'department', title: '部门' },
                            { field: 'f1', title: '日期'},
                            { field: 'f2', title: '上班时间'},
                            { field: 'f3', title: '下班时间'},
                            { field: 'f4', title: '工作时长', },
                            { field: 'f5', title: '加班时长', },
                            { field: 'f6', title: '迟到时间', },
                            { field: 'f7', title: '人均加班时长排名', },
                            { field: 'f8', title: '休假', },
                            { field: 'f9', title: '备注',  }
                        ]],
                        data: tableData,
                    })
                }
            });
            return false;
        });

    })

})