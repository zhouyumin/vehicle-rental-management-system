$(function () {
    //获得表单
    var form = $('#timeInput')
    var fromTime = form.find('input[name=fromTime]')
    var toTime = form.find('input[name=toTime]')
    //绑定租金统计
    var mark = new MarkBox(600, 450, '租金统计', $('div.container').get(0))
    $('#charge').click(function () {
        mark.init()
        fromTime.val(today())
        toTime.val(today())
        //查询今日租金
        $.ajax({
            type: 'get',
            url: '/returns/money/' + fromTime.val() + '/' + toTime.val(),
            data: form.serialize(),
            dataType: 'json',
            success: function (result) {
                if (result.length != 0) {
                    $('#rentMoney').text(result[0].rentMoney+'元')
                }
                else {
                    $('#rentMoney').text('0.00元')
                    $('#sumMoney').text('0.00元')
                }
                updateChart(result)
            },
            error: function () {
                alert('error')
            }
        })
    })
    //时间改变，刷新租金统计
    fromTime.change(function () {
        search()
    })
    toTime.change(function () {
        search()
    })
    //查询时间段内的租金
    function search() {
        $.ajax({
            type: 'get',
            url: '/returns/money/' + fromTime.val() + '/' + toTime.val(),
            data: form.serialize(),
            dataType: 'json',
            success: function (result) {
                updateChart(result)
            },
            error: function () {
                alert('error')
            }
        })
    }
    function updateChart(results) {
        var labels = []
        var data = []
        var sum = 0
        results.forEach(element => {
            labels.push(element.returnTime)
            data.push(element.rentMoney)
            sum += parseFloat(element.rentMoney)
        });
        //获得保留两位小数
        var getFloat = (num) => {
            num += ''
            num = num.replace(/[^0-9|\.]/g, '') //清除字符串中的非数字非.字符

            if (/^0+/) //清除字符串开头的0
                num = num.replace(/^0+/, '')
            if (!/\./.test(num)) //为整数字符串在末尾添加.00
                num += '.00'
            if (/^\./.test(num)) //字符以.开头时,在开头添加0
                num = '0' + num
            num += '00'        //在字符串末尾补零
            num = num.match(/\d+\.\d{2}/)[0]
            return num
        }
        sum = getFloat(sum)
        $('#sumMoney').text(sum+'元')
        var lineChartData = {
            labels: labels,
            datasets: [
                {
                    label: '租金',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 10,
                    data: data,
                    spanGaps: false,
                }
            ]
        };

        var ctx = $("#chart").get(0).getContext("2d");
        var LineChart = new Chart(ctx, {
            type: 'line',
            data: lineChartData,
            responsive: true,
            bezierCurve: false,
            options: {
                title: {
                  display: true,
                  text: fromTime.val() + '至' + toTime.val() + "租金统计图",
                  position: 'top'
                }
              }
        });
    }
})