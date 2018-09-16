$(document).ready(function () {
    layui.use(['layer','laydate','form','table','upload','element'],function(){
        var layer = layui.layer,//提示
        laydate = layui.laydate,//日期
        form = layui.form,//表单
        table = layui.table,//表格
        upload = layui.upload;//上传
        element = layui.element;//导航

        $('#dateadd-page').addClass('layui-this');
        var dateList = []
        var workDateList = []

        //请求本月数据
        $.ajax({
            type: 'GET',
            // url: '/src/js/var.json',
            data: 'date',
            success: function(res){
                // tableData = res.data;
                // console.log(res)
                Daysrender()
                
            },
            error:function(res){
                Daysrender()
            }
        });     

        
        
    
        $('#unwork-check').on('click',function(){
            if($(this).attr('work-state')==0){
                $(this).attr('work-state',1);
            }else{
                $(this).attr('work-state',0);
            }   
            if($('#unwork-check').attr('work-state')==1&&$('#work-check').attr('work-state')==1){
                layer.msg('请只选择公休日或工作日!')
            }      
        })
    
        $('#work-check').on('click',function(){
            if($(this).attr('work-state')==0){
                $(this).attr('work-state',1);
            }else{
                $(this).attr('work-state',0);
            } 
            if($('#unwork-check').attr('work-state')==1&&$('#work-check').attr('work-state')==1){
                layer.msg('请只选择公休日或工作日!')
            }        
        })
    
    
        //删除数组函数
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    
    
        var mySchedule = new Schedule({
            el: '#schedule-box',
            //date: '2018-9-20',
            clickCb: function (y, m, d) {
                if($('#unwork-check').attr('work-state')==1&&$('#work-check').attr('work-state')==0){
                    var newDate
                    // d = Number(d)
                    // console.log(y, m, d)
                    if(m<10&&d<10){
                        newDate = y + '-0' + m + '-0' + d
                    }else if(m<10&&d>=10){
                        newDate = y + '-0' + m + '-' + d
                    }else if(m>=10&&d<10){
                        newDate = y + '-' + m + '-0' + d
                    }else{
                        newDate = y + '-' + m + '-' + d
                    }
    
                    if(dateList.indexOf(newDate)==-1){//首次选中
                        if(workDateList.indexOf(newDate)==-1){
                            dateList.push(newDate)
                        }else{
                            layer.msg('工作日已经选过该项了1')
                        }
                    }else{
                        dateList.remove(newDate)
                    }                
                }  
                if($('#unwork-check').attr('work-state')==0&&$('#work-check').attr('work-state')==1){
                    var newDate
                    // d = Number(d)
                    // console.log(y, m, d)
                    if(m<10&&d<10){
                        newDate = y + '-0' + m + '-0' + d
                    }else if(m<10&&d>=10){
                        newDate = y + '-0' + m + '-' + d
                    }else if(m>=10&&d<10){
                        newDate = y + '-' + m + '-0' + d
                    }else{
                        newDate = y + '-' + m + '-' + d
                    }
    
                    if(workDateList.indexOf(newDate)==-1){//首次选中
                        if(dateList.indexOf(newDate)==-1){
                            workDateList.push(newDate)
                        }else{
                            layer.msg('公休日已经选过该项了2')
                        }
                    }else{
                        workDateList.remove(newDate)
                    }                
                }
                       
                document.querySelector('#h3Ele').innerHTML = '日期：' + y + '-' + m + '-' + d
            },
            nextMonthCb: function (y, m, d) {
                document.querySelector('#h3Ele').innerHTML = '日期：' + y + '-' + m + '-' + d
            },
            nextYeayCb: function (y, m, d) {
                document.querySelector('#h3Ele').innerHTML = '日期：' + y + '-' + m + '-' + d
            },
            prevMonthCb: function (y, m, d) {
                document.querySelector('#h3Ele').innerHTML = '日期：' + y + '-' + m + '-' + d
            },
            prevYearCb: function (y, m, d) {
                document.querySelector('#h3Ele').innerHTML = '日期：' + y + '-' + m + '-' + d
            }
        });
    
        $('#schedule-box').on('click', function () {
            
            for (let onedate of dateList) {
                $(".current-month span[title='" + onedate + "']")
                    .css({
                        "backgroundColor": "#4CAF50",
                        "color": "#ffffff"
                    })                
            }
            for (let onedate of workDateList) {
                $(".current-month span[title='" + onedate + "']")
                    .css({
                        "backgroundColor": "#00BDFF",
                        "color": "#ffffff"
                    })
            }
            Daysrender()
            
        })
        function Daysrender(){
            var showUnwork = []
            var showWork = []
            for(var i =0 ;i<dateList.length;i++){
                var obj={
                    unwork : ''
                }
                obj.unwork = dateList[i];
                showUnwork.push(obj)
            }
            for(var i =0 ;i<workDateList.length;i++){
                var obj={
                    work : ''
                }
                obj.work = workDateList[i];
                showWork.push(obj)
            }            
            table.render({
                elem: '#twodate-chart1',
                // height: 350,
                cols: [[ 
                    { field: 'unwork', title: '公休日', sort:true }             
                ]],
                initSort:{
                    field: 'unwork',
                    type: 'asc'
                },
                data: showUnwork,
            })
            table.render({
                elem: '#twodate-chart2',
                // height: 350,
                cols: [[ 
                    { field: 'work', title: '工作日', sort:true}                
                ]],
                initSort:{
                    field: 'work',
                    type: 'asc'
                },
                data: showWork,
            })
        }

        //同步提交

        var sendDada = {
            'unworkdate':dateList,
            'workdate':workDateList
        }
        $('#update-date').on('click',function(){
            console.log(sendDada)
            $.ajax({
                type: 'GET',
                // url: '/src/js/var.json',
                data: sendDada,
                success: function(res){
                    layer.msg('保存成功');              
                },
                error:function(res){
                    layer.msg('保存失败'); 
                }
            });
        })


    })



    

})