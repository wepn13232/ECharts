<template>
    <!--    定点年度社保交易一览-->
    <div>
        <div class="charts-2" id="tranSumOfYear"></div>
    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "TranSumOfYear",
        methods: {
            handleResize() {
                this.pieCharts.resize()
            },
        },
        mounted() {
            //封装年度社保交易折线图
            const _illegalOperation = {

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    icon:'rectangle',
                    data: ['医院', '药店'],
                    textStyle: {
                        color: '#E6F7FF',
                        fontSize:11
                    },
                    top:10,
                    right:20,
                },
                grid: {
                    containLabel: true,
                    top:35,
                    bottom:10,
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
                        axisLine: {
                            lineStyle: {
                                color: '#00D4FF'
                            }
                        },
                        axisLabel:{
                            textStyle:{
                                fontSize:12,
                                color:'#E6F7FF'
                            }
                        },
                    }
                ],
                yAxis: [
                    {
                        name:'万元',
                        min:'0',
                        splitLine: {
                            show: false
                        },
                        axisLabel:{
                            textStyle:{
                                fontSize:12,
                                color:'#E6F7FF'
                            }
                        },
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#00D4FF'
                            }
                        },
                    }
                ],
                series: [
                    {
                        name: '医院',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [12, 12, 101, 134, 90, 20, 10,23,4,45,1,2],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color:'#fff'
                            }
                        },
                        itemStyle:{
                            normal:{
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 1, color: 'rgba(0,243,244,0)'},
                                        {offset: 0.5, color: 'rgba(0,243,244,0.51)'},
                                        {offset: 0, color: '#00F3F4'}
                                    ]
                                )
                            }
                        },
                    },
                    {
                        name: '药店',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [20, 12, 11, 24, 20, 30, 10,12,13,14,55,21],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color:'#fff'
                            }
                        },
                        itemStyle:{
                            normal:{
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 1, color: 'rgba(75,67,251,0)'},
                                        {offset: 0.5, color: 'rgba(75,67,251,0.51)'},
                                        {offset: 0, color: '#4b43fb'}
                                    ]
                                )
                            }
                        }
                    }
                ]
            }
            this.$nextTick(() => {
                this.pieCharts = this.$echarts.init(document.getElementById('tranSumOfYear'))
                this.pieCharts.setOption(_illegalOperation)
                window.addEventListener('resize', this.handleResize)
            })
        }
    }
</script>

<style scoped>
    .charts-2 {
        height: 19vw;
    }
</style>
