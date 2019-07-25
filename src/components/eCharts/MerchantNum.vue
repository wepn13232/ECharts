<template>
    <!--    区域定点商户数量-->
    <div>
        <span style="color: #FEFF63;font-size: 0.5vw;position: absolute;float: left;margin-left: -10%">全市 500家</span>
        <div class="charts-1" id="merchantNum"></div>
    </div>
</template>

<script>
    var dataMap = {};

    function dataFormatter(obj) {
        var pList = ['枫溪区', '潮安区', '湘桥区', '饶平县'];
        var temp;
        for (var mon = 1; mon <= 12; mon++) {
            var max = 0;
            var sum = 0;
            temp = obj[mon];
            for (var i = 0, l = temp.length; i < l; i++) {
                max = Math.max(max, temp[i]);
                sum += temp[i];
                obj[mon][i] = {
                    name: pList[i],
                    value: temp[i]
                }
            }
            obj[mon + 'max'] = Math.floor(max / 100) * 100;
            obj[mon + 'sum'] = sum;
        }
        return obj;
    }

    //医院
    dataMap.dataHos = dataFormatter({
        //max : 60000,
        1: [16251.93, 11307.28, 24515.76, 11237.55],
        2: [14113.58, 1350.43, 1689.65, 5437.47],
        3: [12153.03, 7521.85, 17235.48, 7358.31],
        4: [11115, 6719.01, 16011.97, 7315.4],
        5: [9846.81, 5252.76, 13607.32, 6024.45],
        6: [8117.78, 4462.74, 11467.6, 4878.61],
        7: [6969.52, 3905.64, 10012.11, 4230.53],
        8: [6033.21, 3110.97, 8477.63, 3571.37],
        9: [5007.21, 2578.03, 6921.29, 2855.23],
        10: [4315, 2150.76, 6018.28, 2324.8],
        11: [4315, 2150.76, 6018.28, 2324.8],
        12: [4315, 2150.76, 6018.28, 2324.8],
    });
    //药店
    dataMap.dataMed = dataFormatter({
        //max : 60000,
        1: [1621.93, 1107.28, 2455.76, 1123],
        2: [1413.58, 1350.43, 169.65, 537.47],
        3: [1253.03, 7521.85, 1735.48, 738.31],
        4: [1115, 6719.01, 1601.97, 7315.4],
        5: [9846.81, 552.76, 13607.32, 604.45],
        6: [8117.78, 4462.74, 1167.6, 4878.61],
        7: [6969.52, 385.64, 1012.11, 4230.53],
        8: [633.21, 311.97, 8477.63, 3571.37],
        9: [5007.21, 2578.03, 691.29, 285.23],
        10: [4315, 2150.76, 601.28, 2324.8],
        11: [4315, 210.76, 601.28, 2324.8],
        12: [4315, 215.76, 6018.28, 224.8],
    });


    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "MerchantNum",
        methods: {
            handleResize() {
                this.pieCharts.resize()
            },
        },
        mounted() {
            //封装定点商户图
            const _merchantNum = {
                baseOption: {
                    timeline: {
                        symbolSize: 5,
                        checkpointStyle: {
                            symbolSize: 5,
                            color: "#00F3F4",
                            borderColor: '#00F3F4'
                        },
                        controlStyle: {
                            // show: false,
                            showPlayBtn: true,
                            showPrevBtn: false,
                            showNextBtn: false,
                            itemSize: 17,
                            position: 'left',
                            color: '#00F3F4',
                            borderColor: '#00F3F4'
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#00F3F4',
                            }
                        },
                        lineStyle: {
                            color: '#00F3F4',
                            width: '1'
                        },
                        y: '85%',
                        x: 80,
                        right: 60,
                        axisType: 'category',
                        autoPlay: true,
                        playInterval: 2000,
                        data: [
                            '1月', '2月', '3月',
                            '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
                        ],
                        label: {
                            position: 7,
                            color: '#00F3F4',
                            fontSize: 10
                        },
                    },
                    tooltip: {},
                    legend: {
                        x: 'right',
                        data: ['医院', '商户'],
                        textStyle: {
                            color: '#E6F7FF',
                            fontSize: 10
                        },
                        itemWidth: 20,
                        itemHeight: 12,
                    },
                    calculable: true,
                    grid: {
                        containLabel: true,
                        bottom: 50,
                        top: 20,
                        left: 20,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                                label: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.value.replace('\n', '');
                                    }
                                }
                            }
                        }
                    },
                    xAxis: [
                        {
                            'type': 'category',
                            'data': [
                                '枫溪区', '潮安区', '湘桥区', '饶平县'
                            ],
                            splitLine: {show: false},
                            axisLine: {
                                lineStyle: {
                                    color: '#00D4FF'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    fontSize: 12,
                                    color: '#E6F7FF'
                                }
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitLine: {show: false},
                            axisLine: {
                                lineStyle: {
                                    color: '#00D4FF'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    fontSize: 12,
                                    color: '#E6F7FF'
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            name: '医院', type: 'bar', itemStyle: {
                                normal: {
                                    color: '#00B3FF'
                                }
                            }
                        },
                        {
                            name: '商户', type: 'bar', itemStyle: {
                                normal: {
                                    color: '#00FFB3'
                                }
                            }
                        },
                    ]
                },
                options: [
                    {
                        series: [
                            {data: dataMap.dataHos['1']},
                            {data: dataMap.dataMed['1']},
                        ]
                    },
                    {
                        series: [
                            {data: dataMap.dataHos['2']},
                            {data: dataMap.dataMed['2']},
                        ]
                    },
                    {
                        series: [
                            {data: dataMap.dataHos['3']},
                            {data: dataMap.dataMed['3']},
                        ]
                    },
                    {
                        series: [
                            {data: dataMap.dataHos['4']},
                            {data: dataMap.dataMed['4']},
                        ]
                    },
                    {
                        series: [
                            {data: dataMap.dataHos['5']},
                            {data: dataMap.dataMed['5']},
                        ]
                    },
                    {
                        series: [
                            {data: dataMap.dataHos['6']},
                            {data: dataMap.dataMed['6']},
                        ]
                    },
                    {
                        series: [
                            {data: dataMap.dataHos['7']},
                            {data: dataMap.dataMed['7']},
                        ]
                    },
                    {
                        series: [
                            {data: dataMap.dataHos['8']},
                            {data: dataMap.dataMed['8']},
                        ]
                    },
                    {
                        series: [
                            {data: dataMap.dataHos['9']},
                            {data: dataMap.dataMed['9']},
                        ]
                    },
                    {
                        series: [
                            {data: dataMap.dataHos['10']},
                            {data: dataMap.dataMed['10']},
                        ]
                    },
                    {
                        series: [
                            {data: dataMap.dataHos['10']},
                            {data: dataMap.dataMed['10']},
                        ]
                    },
                    {
                        series: [
                            {data: dataMap.dataHos['11']},
                            {data: dataMap.dataMed['11']},
                        ]
                    },
                    {
                        series: [
                            {data: dataMap.dataHos['12']},
                            {data: dataMap.dataMed['12']},
                        ]
                    },

                ]
            }
            this.$nextTick(() => {
                this.pieCharts = this.$echarts.init(document.getElementById('merchantNum'))
                this.pieCharts.setOption(_merchantNum)
                window.addEventListener('resize', this.handleResize)
            })
        },
    }
</script>

<style scoped>

</style>
