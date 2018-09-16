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

        form.on('submit(personChose)', function(data){
            console.log(JSON.stringify(data.field))
            var filterData = data.field
            // var filterData = JSON.stringify(data.field);
            // layer.msg(JSON.stringify(data.field));
            $.ajax({
                type: 'GET',
                // url: '/src/js/var.json',
                data: filterData,
                success: function(res){
                    // layer.msg('添加成功');   
                    // console.log(res)
                    // tableData = res.data;
                    tableData = TEST_DATA4
                    var tis1 = table.render({
                        elem: '#relation-chart',
                        // height: 512,
                        page: true, //开启分页
                        cols: [[                           
                            { field: 'id', title: 'ID',edit: 'text' },
                            { field: 'name', title: '姓名',edit: 'text' },
                            { field: 'department', title: '部门',edit: 'text' },
                            { field: 'departmentCode', title: '部门ID',edit: 'text' },
                            {fixed: 'right', title:'操作', toolbar: '#barDemo'}
                        ]],
                        data: tableData,
                    }) 
                    table.on('tool(relation-chart)', function (obj) {
                        var data = obj.data;
                        //console.log(obj)
                        if (obj.event === 'del') {
                            layer.confirm('确定要删除吗?', function (index) {
                                console.log(obj)
                                obj.del();
                                layer.close(index);
                                $.ajax({
                                    type: 'GET',
                                    // url: '/src/js/var.json',
                                    data: data.id,
                                    success: function(res){
                                        layer.msg('删除成功');              
                                    },
                                    error:function(res){
                                        layer.msg('删除失败'); 
                                    }
                                });
                            });
                        } else if (obj.event === 'edit') {
                            $.ajax({
                                type: 'GET',
                                // url: '/src/js/var.json',
                                data: data,
                                success: function(res){
                                    layer.msg('编辑成功');              
                                },
                                error:function(res){
                                    layer.msg('编辑失败'); 
                                }
                            });
                            // console.log('编辑结束');
                        }
                    })  
                    
                    // $('#relation-upload').on('click',function(){
                    //     console.log(tis1.config.data)
                        
                    // })

                },
                error:function(){
                    // layer.msg('添加失败'); 
                }
            });
            return false;
        });

    })

})