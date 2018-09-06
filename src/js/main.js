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
    })
})