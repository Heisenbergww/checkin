$(document).ready(function(){
    $.ajax({
        type: 'post',
        url: '/',
        data: 'departmentCode',
        // data: modifyList,
        success: function (res) {
            // var backlist = res.data;
            showDep()
        },
        error:function(res){
            showDep()
        }
    })
    function showDep() {
        var backlist  = [
            {
                'id': '1',
                'department': '人事部'
            },
            {
                'id': '2',
                'department': '事业部'
            },
            {
                'id': '3',
                'department': '宣传部'
            },
        ];
        var depList = [
            {
                'id': '',
                'department': '请选择'
            }
        ]
        for (let line of backlist) {
            depList.push({
                'id': line.id,
                'department': line.department
            })
        }
        var depHTML = ''
        for (let line of depList) {
            depHTML += '<option value="' + line.id + '">' + line.department + '</option>'
        }
        $('#ajax-dep').html(depHTML)
    }

    
})