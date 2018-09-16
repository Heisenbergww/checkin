var excelHTML = 
'<caption id="excel-caption">2018年9月考勤情况表</caption>'+
'<tr>'+
    '<td height="80">序号</td>'+
    '<td>姓名</td>'+
    '<td>所在单位</td>'+
    '<td>原始晚打卡记录（次）</td>'+
    '<td>认定迟到（次）</td>'+
    '<td>原始提前离岗记录(次）</td>'+
    '<td>认定早退（次）</td>'+
    '<td>旷工（天）</td>'+
    '<td>病事假（天）</td>'+
    '<td>年休假（天）</td>'+
    '<td>应在班时间（小时）</td>'+
    '<td>实际在班时间（小时）</td>'+
    '<td>实际在班超出时间（小时）</td>'+
    '<td>室人均在班超出时间（小时）</td>'+
    '<td>工作日在班超出时间（小时）</td>'+
    '<td>公休日在班超出时间（小时）</td>'+
    '<td>加班排名</td>'+
    '<td>早晨没打卡（次）</td>'+
    '<td>下班没打卡（次）</td>'+
'</tr>';

var line = TEST_DATA23;
for(var i=0;i<80;i++){
    excelHTML += '+<tr>'+
    '<td>'+line.f1+'</td>'+
    '<td>'+line.f2+'</td>'+
    '<td>'+line.f3+'</td>'+
    '<td>'+line.f4+'</td>'+
    '<td>'+line.f5+'</td>'+
    '<td>'+line.f6+'</td>'+
    '<td>'+line.f7+'</td>'+
    '<td>'+line.f8+'</td>'+
    '<td>'+line.f9+'</td>'+
    '<td>'+line.f10+'</td>'+
    '<td>'+line.f11+'</td>'+
    '<td>'+line.f12+'</td>'+
    '<td>'+line.f13+'</td>'+
    '<td>'+line.f14+'</td>'+
    '<td>'+line.f15+'</td>'+
    '<td>'+line.f16+'</td>'+
    '<td>'+line.f17+'</td>'+
    '<td>'+line.f18+'</td>'+
    '<td>'+line.f19+'</td>'+
'</tr>'
}
excelHTML+=''
$('#excel-html').html(excelHTML)
// $('#excel-html').css({
//     "display":"none"
// })

excelStyle=
'<style>'+
'#excel-html{'+
	'width:990px;'+
	'font:16px;'+
'}'+
'</style>';

var html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"'+
'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
+'<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>'
+'</x:ExcelWorkbook></xml><![endif]-->'+excelStyle+"</head><body>" + document.getElementById("excel-html").outerHTML + "</body></html>";
// 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
console.log(html)
var blob = new Blob([html], { type: "application/vnd.ms-excel" });
var a = document.getElementsByTagName("a")[0];
// 利用URL.createObjectURL()方法为a元素生成blob URL
a.href = URL.createObjectURL(blob);
// 设置文件名
a.download = "学生成绩表.xls";