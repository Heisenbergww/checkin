$(document).ready(function(){
    //引入模块
    layui.use(['layer','form','table','upload','element'],function(){
        var layer = layui.layer,//提示
        form = layui.form,//表单
        table = layui.table,//表格
        upload = layui.upload;//上传
        element = layui.element;//导航

        var tableData  
        $('#department-page').addClass('layui-this');
                
        //过滤
        //监听提交
        form.on('submit(formDemo)', function(data){
            console.log(JSON.stringify(data.field))
            var filterData = data.field
            // var filterData = JSON.stringify(data.field);
            // layer.msg(JSON.stringify(data.field));
            $.ajax({
                type: 'GET',
                // url: '/src/js/var.json',
                data: filterData,
                success: function(res){
                    // tableData = res.data;
                    tableData = TEST_DATA1;
                    console.log(res)
                    table.render({
                        elem: '#department-chart',
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
                            { field: 'field1', title: '部门' },
                            { field: 'field2', title: '人数'},
                            { field: 'field3', title: '应出勤时间',sort:true},
                            { field: 'field4', title: '工作时长',sort:true},
                            { field: 'field5', title: '加班时长',sort:true},
                            { field: 'field6', title: '加班排名',sort:true},
                            { field: 'field7', title: '平时加班排名',sort:true},
                            { field: 'field8', title: '平时加班时长',sort:true},
                            { field: 'field9', title: '公休日加班时长',sort:true},
                            { field: 'field10', title: '公休日加班排名',sort:true},
                            { field: 'field11', title: '司内人均加班时长',sort:true},
                            { field: 'field12', title: '室人均加班时长（均值）',sort:true},
                            { field: 'field13', title: '人均加班时长排名',sort:true},
                            { field: 'field14', title: '原始迟到次数',sort:true},
                            { field: 'field15', title: '认定迟到次数',sort:true},
                            { field: 'field16', title: '原始早退次数',sort:true},
                            { field: 'field17', title: '认定早退次数',sort:true},
                            { field: 'field18', title: '旷工次数',sort:true},
                            { field: 'field19', title: '病事假（次）',sort:true},
                            { field: 'field20', title: '年休假（次）',sort:true}
                        ]],
                        data: tableData,
                    })
                }
            });
            return false;
        });

    })

})