$(document).ready(function(){
    //引入模块
    layui.use(['layer','form','table','upload','element'],function(){
        var layer = layui.layer,//提示
        form = layui.form,//表单
        table = layui.table,//表格
        upload = layui.upload;//上传
        element = layui.element;//导航

        var tableData  
        $('#relation-page').addClass('layui-this');
                
        //过滤
        //监听提交
        form.on('submit(personAdd)', function(data){
            console.log(JSON.stringify(data.field))
            var filterData = data.field
            // var filterData = JSON.stringify(data.field);
            // layer.msg(JSON.stringify(data.field));
            $.ajax({
                type: 'GET',
                // url: '/src/js/var.json',
                data: filterData,
                success: function(res){
                    layer.msg('添加成功');                    
                },
                error:function(){
                    layer.msg('添加失败'); 
                }
            });
            return false;
        });

    })

})