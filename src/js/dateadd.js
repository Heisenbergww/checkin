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
        var predateList = []
        var preworkDateList = []

        function copyArr(arr) {
            let res = []
            for (let i = 0; i < arr.length; i++) {
             res.push(arr[i])
            }
            return res
        }

        //请求本月数据
        $.ajax({
            type: 'GET',
            // url: '/src/js/var.json',
            data: 'date',
            success: function(res){
                // console.log(res)
                var recordList = res.recordList;//右侧操作记录
                recordList = [{'order':'1','record':'将2018-9-8修改为公休日'}]/*此为测试注释*/
                recordRender(recordList)//显示右侧操作记录

                predateList = res.dateList;//获取数据库中标记日期
                preworkDateList = res.workDateList;                
                predateList = ['2018-09-17','2018-09-18']/*此为测试注释*/
                preworkDateList = ['2018-09-12','2018-09-13']/*此为测试注释*/
                dateList = predateList.slice(0)
                workDateList = preworkDateList.slice(0)

                calendarRender(dateList,workDateList)//显示标记日历视图  
                console.log('初始公休日:'+predateList)    /*此为测试注释*/
                console.log('初始工作日:'+preworkDateList)    /*此为测试注释*/      
                
            },
            error:function(res){
                // Daysrender()
                layer.msy('网络故障，请重试!')
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
    
                    // if(dateList.indexOf(newDate)==-1){//首次选中
                    //     if(workDateList.indexOf(newDate)==-1){
                    //         dateList.push(newDate)
                    //     }else{
                    //         workDateList.remove(newDate)                            
                    //         dateList.push(newDate)
                    //         // layer.msg('工作日已经选过该项了!')
                    //     }
                    // }else{
                    //     dateList.remove(newDate)
                    // }    
                    
                    if(dateList.indexOf(newDate)!=-1){   //已存在                     
                    }else{
                        workDateList.remove(newDate)                            
                        dateList.push(newDate)
                    }
                    console.log(dateList)    
                    console.log(workDateList) 
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
    
                    // if(workDateList.indexOf(newDate)==-1){//工作日首次选中
                    //     if(dateList.indexOf(newDate)==-1){//且不为公休日
                    //         workDateList.push(newDate)
                    //     }else{
                    //         dateList.remove(newDate)
                    //         workDateList.push(newDate)
                    //         // layer.msg('公休日已经选过该项了!')
                    //     }
                    // }else{
                    //     workDateList.remove(newDate)
                    // } 
                    if(workDateList.indexOf(newDate)!=-1){   //已存在                     
                    }else{
                        dateList.remove(newDate)                            
                        workDateList.push(newDate)
                    }  
                   
                    console.log(dateList)    
                    console.log(workDateList)              
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
            calendarRender(dateList,workDateList)
        })
        //操作记录视图
        function recordRender(list){
            var showList = []
            for(var i =0 ;i<list.length;i++){
                var obj={
                    order: '',
                    record : ''
                }
                obj.order = list[i]['order'];
                obj.record = list[i]['record'];
                showList.push(obj)
            }      
            table.render({
                elem: '#date-history',
                // height: 350,
                // url: '/hello/',                       
                page: true, //开启分页
                cols: [[ 
                    { field: 'order', title: '序号',width:80 },
                    { field: 'record', title: '修改记录', width:337}             
                ]],
                data: showList,
            })
        }
        //日历标记显示
        function calendarRender(dateList,workDateList){
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
        }

        //同步提交
        
        $('#update-date').on('click',function(){
            //改动数据判断
            var changerecord = []        
            for(let line of dateList){
                console.log(line+'-datelist')
                if(predateList.indexOf(line)!=-1){   //公休日未进行改变      
                    console.log('公休日未改变')    
                    // changerecord.push(new Date()+'将公休日:'+line+'改为工作日')       
                }else{
                    changerecord.push(new Date()+'将公休日:'+line+'改为工作日')
                    console.log('公休日改变')
                }
            }
            for(let line of workDateList){
                console.log(line+'-workDateList')
                if(preworkDateList.indexOf(line)!=-1){   //工作日未进行改变    
                    console.log('工作日未改变')
                    // changerecord.push(new Date()+'将工作日:'+line+'改为公休日')             
                }else{
                    console.log('工作日改变')
                    changerecord.push(new Date()+'将工作日:'+line+'改为公休日')
                }
            }

            var sendDada = {
                'unworkdate':dateList,
                'workdate':workDateList,
                'changerecord':changerecord
            }
            var con = {
                "predateList":predateList,
                "dateList":dateList,
                "preworkDateList":preworkDateList,
                "workDateList":workDateList
            }
            console.log(sendDada)
            console.log(con)
            $.ajax({
                type: 'POST',
                // url: '/src/js/var.json',
                data: sendDada,
                dataType:'json',
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