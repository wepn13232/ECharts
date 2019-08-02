<template>
    <!--    年度违规交易一览-->
    <div>
        <div class="charts-1" id="illegalOperation"></div>
    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "IllegalOperation",
        methods: {
            handleResize() {
                this.pieCharts.resize()
            },
        },
        mounted() {
            //封装违规操作折线图
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
                    icon: 'rectangle',
                    data: ['违规事件', '违规商户'],
                    textStyle: {
                        color: '#E6F7FF',
                        fontSize: 11
                    },
                    right: 17,
                },
                grid: {
                    containLabel: true,
                    top: 25,
                    bottom: 30,
                },
                xAxis: [
                    {
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
                    }
                ],
                yAxis: [
                    {
                        min: '0',
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 12,
                                color: '#E6F7FF'
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
                        name: '违规商户',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [20, 12, 11, 24, 20, 30, 10, 12, 13, 14, 5, 1],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color: '#fff'
                            }
                        },
                        itemStyle: {
                            normal: {
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
                    },
                    {
                        name: '违规事件',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [12, 12, 101, 134, 90, 20, 10, 23, 4, 45, 15, 22],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color: '#fff'
                            }
                        },
                        itemStyle: {
                            normal: {
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
                ]
            }
            this.$nextTick(() => {
                this.pieCharts = this.$echarts.init(document.getElementById('illegalOperation'))
                this.pieCharts.setOption(_illegalOperation)
                window.addEventListener('resize', this.handleResize)
            })
        }
    }
</script>

<style scoped>

</style>
