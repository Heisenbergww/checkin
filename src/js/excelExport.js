function downloadExcel(list,filename) {    
    var excelHTML =
        '<caption id="excel-caption">' + filename + '</caption>' +
        '<tr>' +
        '<td height="80">序号</td>' +
        '<td>姓名</td>' +
        '<td>所在单位</td>' +
        '<td>原始晚打卡记录（次）</td>' +
        '<td>认定迟到（次）</td>' +
        '<td>原始提前离岗记录(次）</td>' +
        '<td>认定早退（次）</td>' +
        '<td>旷工（天）</td>' +
        '<td>病事假（天）</td>' +
        '<td>年休假（天）</td>' +
        '<td>应在班时间（小时）</td>' +
        '<td>实际在班时间（小时）</td>' +
        '<td>实际在班超出时间（小时）</td>' +
        '<td>室人均在班超出时间（小时）</td>' +
        '<td>工作日在班超出时间（小时）</td>' +
        '<td>公休日在班超出时间（小时）</td>' +
        '<td>加班排名</td>' +
        '<td>早晨没打卡（次）</td>' +
        '<td>下班没打卡（次）</td>' +
        '</tr>';

    // var line = TEST_DATA23;
    for (let line of list) {
        excelHTML += '+<tr>' +
            '<td>' + line.f1 + '</td>' +
            '<td>' + line.f2 + '</td>' +
            '<td>' + line.f3 + '</td>' +
            '<td>' + line.f4 + '</td>' +
            '<td>' + line.f5 + '</td>' +
            '<td>' + line.f6 + '</td>' +
            '<td>' + line.f7 + '</td>' +
            '<td>' + line.f8 + '</td>' +
            '<td>' + line.f9 + '</td>' +
            '<td>' + line.f10 + '</td>' +
            '<td>' + line.f11 + '</td>' +
            '<td>' + line.f12 + '</td>' +
            '<td>' + line.f13 + '</td>' +
            '<td>' + line.f14 + '</td>' +
            '<td>' + line.f15 + '</td>' +
            '<td>' + line.f16 + '</td>' +
            '<td>' + line.f17 + '</td>' +
            '<td>' + line.f18 + '</td>' +
            '<td>' + line.f19 + '</td>' +
            '</tr>'
    }
    excelHTML += ''
    $('#excel-html').html(excelHTML)
    $('#excel-html').css({
        "display": "none"
    })

    excelStyle =
        '<style>' +
        '#excel-html{' +
        'width:990px;' +
        'font:16px;' +
        '}' +
        '</style>';

    var html = "<html><head><meta charset='utf-8'/>" + excelStyle + "</head><body>" + document.getElementById("excel-html").outerHTML + "</body></html>";
    // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
    // console.log(html)
    var blob = new Blob([html], { type: "application/vnd.ms-excel" });
    var exportBtn = document.getElementById("export");
    // 利用URL.createObjectURL()方法为a元素生成blob URL
    exportBtn.href = URL.createObjectURL(blob);
    // 设置文件名
    exportBtn.download = filename + ".xls";
}