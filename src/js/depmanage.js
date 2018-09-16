$(document).ready(function(){
    layui.use(['layer','laydate','form','table','upload','element'],function(){
        var layer = layui.layer,//提示
        laydate = layui.laydate,//日期
        form = layui.form,//表单
        table = layui.table,//表格
        upload = layui.upload;//上传
        element = layui.element;//导航

        var departmentList = TEST_DATA5;

        $.ajax({
            type: 'GET',
            // url: '/src/js/var.json',
            data: 'department',
            success: function(res){
                // var departmentList = res.data;
                // var departmentList = TEST_DATA5;
                table.render({
                    elem: '#department-chart',
                    // height: 350,
                    // url: '/hello/',                       
                    page: true, //开启分页
                    cols: [[ 
                        { field: 'departmentCode', title: '部门ID', edit:'text'},
                        { field: 'department', title: '部门名字', edit:'text'},   
                        { field: 'departmentmembers', title: '部门人数', edit:'text'},
                        {fixed: 'right', title:'操作', toolbar: '#barDemo'}          
                    ]],
                    data: departmentList,
                })   
                table.on('tool(department-chart)', function (obj) {
                    var data = obj.data;
                    console.log(obj)
                    if (obj.event === 'del') {
                        layer.confirm('确定要删除吗?', function (index) {
                            console.log(obj)
                            obj.del();
                            layer.close(index);
                            $.ajax({
                                type: 'GET',
                                // url: '/src/js/var.json',
                                data: data.departmentCode,
                                success: function(res){
                                    layer.msg('删除成功');              
                                },
                                error:function(res){
                                    layer.msg('删除失败'); 
                                }
                            });
                        });
                    } else if (obj.event === 'edit') {
                        console.log(obj)
                        var depExisted = false;
                        for(let line of departmentList){
                            console.log(line.department,obj.data.department)
                            if(obj.data.department==line.department){
                                depExisted = true;
                                console.log('存在')
                            }
                        }
                        if (!depExisted) {
                            $.ajax({
                                type: 'GET',
                                // url: '/src/js/var.json',
                                data: data,
                                success: function (res) {
                                    layer.msg('编辑成功');
                                },
                                error: function (res) {
                                    layer.msg('编辑失败');
                                }
                            });
                        }else{
                            layer.msg('该部门名已存在!')
                        }
                        
                    }
                })  
                
            },
            error:function(res){
                
                layer.msy('网络故障，请重试!')
            }
        }); 

        var departmentHTML = 
        '<form class="layui-form open-dep-form" action="">'+
            '<div class="layui-form-item"> '+
                '<div class="layui-inline">'+
                    '<div class="layui-input-inline open-input">'+
                        '<input type="text" name="departmentCode" id="c1"  required lay-verify="" placeholder="请输入部门ID" autocomplete="off" class="layui-input">'+
                    '</div>'+
                '</div>' +
                '<div class="layui-inline">'+
                    '<div class="layui-input-inline open-input">'+
                        '<input type="text" name="departmentName" id="c2" required lay-verify="" placeholder="请输入部门名字" autocomplete="off" class="layui-input">'+
                    '</div>'+
                '</div>'+ 
                '<div class="layui-inline">'+
                    '<a id="department-save" class="layui-btn" lay-submit lay-filter="formDep">确定</a>'+                
                '</div>'+                 
            '</div>'+
        '</form>';

        //添加部门
        $('#department-add').on('click',function(){
            layer.open({
                type: 1,
                skin: 'layui-layer-rim', //加上边框
                area: ['420px', '240px'], //宽高
                content: departmentHTML
            });
            
            $('#department-save').on('click',function(){
                console.log($('#c1').val())
                console.log($('#c2').val())
                var departmentCode = $('#c1').val();
                var department = $('#c2').val();
                var can = true;
                console.log(departmentList)
                if(departmentCode!=''&&department!=''){
                    for(let line of departmentList){
                        if(departmentCode==line.departmentCode||department==line.department){
                            console.log('存在')
                            can = false;
                            break;
                        }
                    }
                    console.log(can)
                    if(can){
                        var filterData= {
                            'depid':$('#c1').val(),
                            'depname':$('#c2').val()
                        }
                        $.ajax({
                            type: 'GET',
                            // url: '/src/js/var.json',
                            data: filterData,
                            success: function(res){
                                layer.msg('添加成功');  
                                setTimeout(function(){
                                    layer.closeAll()
                                  }, 1200);                
                            },
                            error:function(){
                                layer.msg('添加失败'); 
                            }
                        });
                        return false;
                    }else{
                        layer.msg('部门名或id已存在，请重新输入'); 
                    }
                }else{
                    layer.msg('请填写完整表格'); 
                }    
            })
            // form.on('submit(formDep)', function(data){
            //     console.log(JSON.stringify(data.field))
            //     var filterData = data.field;
            //     var can = true;
            //     console.log(departmentList)
            //     for(let line of departmentList){
            //         if(filterData.departmentCode==line.departmentCode||filterData.departmentName==line.department){
            //             console.log('存在')
            //             can = false;
            //             break;
            //         }
            //     }
            //     console.log(can)
            //     if(can){
            //         $.ajax({
            //             type: 'GET',
            //             // url: '/src/js/var.json',
            //             data: filterData,
            //             success: function(res){
            //                 layer.msg('添加成功');  
            //                 setTimeout(function(){
            //                     layer.closeAll()
            //                   }, 1200);                
            //             },
            //             error:function(){
            //                 layer.msg('添加失败'); 
            //             }
            //         });
            //         return false;
            //     }else{
            //         layer.msg('请重新输入'); 
            //     }
                
            // });
        })
    }) 
})