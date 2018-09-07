$(document).ready(function(){
    //引入模块
    layui.use(['layer','form','table','upload','element'],function(){
        var layer = layui.layer,//提示
        form = layui.form,//表单
        table = layui.table,//表格
        upload = layui.upload;//上传
        element = layui.element;//导航

        var tableData  
        $('#persons-page').addClass('layui-this');
                
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
                    tableData = TEST_DATA2;
                    console.log(res)
                    var ins1 = table.render({
                        elem: '#persons-chart',
                        id : 'persons',
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
                        data: tableData,
                    })


                    $('#export').on('click', function () {
                        //将上述表格示例导出为 xls文件
                        // console.log(ins1.config.id)
                        table.exportFile(ins1.config.id, ins1.config.data,'xls'); //data 为该实例中的任意数量的数据
                    })
                }
            });
            return false;
        });

        

    })

})