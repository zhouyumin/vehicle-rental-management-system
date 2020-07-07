$(function () {
    //获得表单
    var form = $('#timeInput')
    var fromTime = form.find('input[name=fromTime]')
    fromTime.val(today())
    var toTime = form.find('input[name=toTime]')
    toTime.val(today())
    //查询今日租金
    $.ajax({
        type: 'get',
        url: '/returns/money/' + fromTime.val() + '/' + toTime.val(),
        data: form.serialize(),
        dataType: 'json',
        success: function (result) {
            if (result.length != 0) {
                $('#rentMoney').text(result[0].rentMoney)
                updateChart(result)
            }
            else {
                $('#rentMoney').text('0.00')
                $('#sumMoney').text('0.00')
            }
        },
        error: function () {
            alert('error')
        }
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
            sum+=parseFloat(element.rentMoney)
        });
        $('#sumMoney').text(sum)
        var lineChartData = {
            labels: labels,
            datasets: [
                {
                    label: fromTime.val()+'至'+toTime.val()+"租金统计图",
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
            bezierCurve: false
        });
    }
})