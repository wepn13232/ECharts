<template>
    <!--    区域社保年度交易金额-->
    <div>
        <div class="charts-2" id="spotTranSumOfYear"></div>
    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "SpotTranSumOfYear",
        methods: {
            handleResize() {
                this.pieCharts.resize()
            },
        },
        mounted() {
            //封装定点年度社保交易折线图
            const _spotTranSumOfYear = {
                tooltip: {
                    trigger: 'axis'
                },
                color:['#FF8E55','#E632A2','#00F3F4','#4B43FB'],
                legend: {
                    icon:'roundRect',
                    data: ['枫溪区', '湘桥区', '潮安区', '饶平县'],
                    textStyle: {
                        color: '#E6F7FF'
                    },
                    right:20,
                    top:10,
                },
                grid: {
                    top:55,
                    bottom:10,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
                },
                yAxis: {
                    name: '万元',
                    type: 'value',
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
                    splitLine: {
                        show: false
                    },
                },
                series: [
                    {
                        name: '枫溪区',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210,123,44,12,44,1,245],
                        lineStyle: {
                            color: '#FF8E55'
                        }
                    },
                    {
                        name: '湘桥区',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310,676,123,563,123,43],
                        lineStyle: {
                            color: '#E632A2'
                        }
                    },
                    {
                        name: '潮安区',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410,23,65,88,123,456],
                        lineStyle: {
                            color: '#00F3F4'
                        }
                    },
                    {
                        name: '饶平县',
                        type: 'line',
                        stack: '总量',
                        data: [320, 332, 301, 334, 390, 330, 320,123,234,456,123,34],
                        lineStyle: {
                            color: '#4B43FB'
                        }
                    },
                ]
            }
            this.$nextTick(() => {
                this.pieCharts = this.$echarts.init(document.getElementById('spotTranSumOfYear'))
                this.pieCharts.setOption(_spotTranSumOfYear)
                window.addEventListener('resize', this.handleResize)
            })
        },
    }
</script>

<style scoped>
    .charts-2 {
        height: 19vw;
    }
</style>
