$(document).ready(function(){
    //引入模块
    layui.use(['layer','form','table','upload','element'],function(){
        var layer = layui.layer,//提示
        form = layui.form,//表单
        table = layui.table,//表格
        upload = layui.upload;//上传
        element = layui.element;//导航

        var tableData = []  

        $('#index-page').addClass('layui-this');

        //上传组件设置
        var state = 'pending',
        $list = $('#upload-show-part'),
        $btn = $('#upload-begin');
        var uploader = WebUploader.create({

            // swf文件路径
            swf: '/src/module/webuploader/uploader.swf',
        
            // 文件接收服务端。
            server: '/',
        
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#upload-text',
        
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false
        });
        // 当有文件添加进来的时候
        uploader.on('fileQueued', function (file) {
            $list.append('<div id="' + file.id + '" class="item">' +
                '<h4 class="info">' + file.name + '</h4>' +
                '<p class="state">等待上传...</p>' +
                '</div>');
            $list.css({
                'display':"block"
            })
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress .progress-bar');

            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<div class="progress progress-striped active">' +
                    '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                    '</div>' +
                    '</div>').appendTo($li).find('.progress-bar');
            }

            $li.find('p.state').text('上传中');

            $percent.css('width', percentage * 100 + '%');
        });


        var finalFileData = []
        uploader.on('uploadSuccess', function (file,response ) {
            $('#' + file.id).find('p.state').text('已上传');
            finalFileData=respose.res          
        });

        uploader.on('uploadError', function (file) {
            $('#' + file.id).find('p.state').text('上传出错');
        });

        uploader.on('uploadComplete', function (file) {
            $('#' + file.id).find('.progress').fadeOut();
            afterupload(finalFileData);
            // $list.css({
            //     'display':"none"
            // })

        });

        uploader.on('all', function (type) {
            if (type === 'startUpload') {
                state = 'uploading';
            } else if (type === 'stopUpload') {
                state = 'paused';
            } else if (type === 'uploadFinished') {
                state = 'done';
            }

            if (state === 'uploading') {
                $btn.text('暂停上传');
            } else {
                $btn.text('开始上传');
            }
        });

        $btn.on('click', function () {
            if (state === 'uploading') {
                uploader.stop();
            } else {
                uploader.upload();
            }
        });
        //上传结束

        //上传后的渲染函数
        function afterupload(res){
            tableData = []
            for (let line of res) {
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
                obj.id = line.User_ID
                obj.name = line.User_Name
                obj.department = line.Affiliation_name
                obj.f1 = getMyDate(line.date)
                obj.f2 = getMyDate(line.WorkTime)
                obj.f3 = getMyDate(line.OffworkTime)
                obj.f4 = getMyDate(line.Length_Of_TotalTime)
                obj.f5 = getMyDate(line.Lenght_Of_Workday_overtime)
                obj.f6 = 0
                obj.f7 = 0
                obj.f8 = ''
                obj.f9 = ''
                tableData.push(obj)
            }
            beginView();
        }
        

        function beginView(){
            //数据处理
            tableData = TEST_DATA3;
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
        // $('#upload-edit').on('click',function(){
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
        // })
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
                    console.log(res)
                    tableData = res.data;
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
                url: '/src/js/var.json',
                data: filterData,
                success: function(res){
                    tableData = res.data;
                    console.log(res)
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
                        data: res.data,
                    })
                }
            });
            return false;
        });

    })

})