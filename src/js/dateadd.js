$(document).ready(function(){
    //引入模块
    layui.use(['layer','laydate','form','table','upload','element'],function(){
        var layer = layui.layer,//提示
        laydate = layui.laydate,//日期
        form = layui.form,//表单
        table = layui.table,//表格
        upload = layui.upload;//上传
        element = layui.element;//导航

        $('#dateadd-page').addClass('layui-this');

        laydate.render({
            elem: '#unwork-date'
        });
        laydate.render({
            elem: '#work-date'
        });
        //公休日期添加
        form.on('submit(unworkAdd)', function(data){
            console.log(JSON.stringify(data.field))
            var filterData = data.field
            // var filterData = JSON.stringify(data.field);
            // layer.msg(JSON.stringify(data.field));
            $.ajax({
                type: 'GET',
                // url: '/src/js/var.json',
                data: filterData,
                success: function(res){
                    layer.msg('公休添加成功');
                    var tableData = [{'unwork-date':'2018-9-7'}];
                    table.render({
                        elem: '#unwork-chart',
                        height: 512,   
                        cols: [[ 
                            { field: 'unwork-date', title: '公休日' }                           
                        ]],
                        data:tableData,    
                    });           

                },
                error:function(){
                    layer.msg('公休添加失败'); 
                }
            });
            return false;
        });
        //工作日期添加
        form.on('submit(workAdd)', function(data){
            console.log(JSON.stringify(data.field))
            var filterData = data.field
            // var filterData = JSON.stringify(data.field);
            // layer.msg(JSON.stringify(data.field));
            $.ajax({
                type: 'GET',
                // url: '/src/js/var.json',
                data: filterData,
                success: function(res){
                    layer.msg('工作添加成功');
                    var tableData = [{'work-date':'2018-9-17'}];
                    table.render({
                        elem: '#work-chart',
                        height: 512,   
                        cols: [[ 
                            { field: 'work-date', title: '工作日' }                           
                        ]],
                        data:tableData,    
                    }); 
                },
                error:function(){
                    layer.msg('工作添加失败'); 
                }
            });
            return false;
        });
    })
})