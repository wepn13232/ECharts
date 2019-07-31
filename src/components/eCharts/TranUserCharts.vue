<template>
<!--    总交易用户走势-->
    <div>
        <div class="charts-1" id="tranUserCharts"></div>
    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "TranUserCharts",
        methods: {
            handleResize() {
                this.pieCharts.resize()
            },
        },
        mounted() {
            //封装总用户交易走势
            const _tranUserCharts={
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                // legend: {
                //     icon: 'rectangle',
                //     data: ['违规事件', '违规商户'],
                //     textStyle: {
                //         color: '#E6F7FF',
                //         fontSize: 11
                //     },
                //     right: 17,
                // },
                grid: {
                    containLabel: true,
                    top: 30,
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
                        name:'人',
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
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [121, 222, 311, 434, 590, 620,710, 1123, 1534, 2345, 2831, 3222],
                        // label: {
                        //     normal: {
                        //         show: true,
                        //         position: 'top',
                        //         color: '#fff'
                        //     }
                        // },
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 1, color: 'rgba(0,243,244,0)'},
                                        {offset: 0.5, color: 'rgba(0,179,255,0.51)'},
                                        {offset: 0, color: '#00B3FF'}
                                    ]
                                )
                            }
                        },
                    },
                ]
            }
            this.$nextTick(() => {
                this.pieCharts = this.$echarts.init(document.getElementById('tranUserCharts'))
                this.pieCharts.setOption(_tranUserCharts)
                window.addEventListener('resize', this.handleResize)
            })
        },
    }
</script>

<style scoped>

</style>
