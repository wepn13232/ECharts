<template>
    <!--    总交易笔数走势-->
    <div>
        <div class="charts-1" id="tranSumCharts"></div>

    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        methods: {
            handleResize() {
                this.pieCharts.resize()
            },
        },
        name: "TranSumCharts",
        mounted() {
            //封装总交易笔数走势
            const _tranSumCharts = {
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
                        name: '笔',
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
                        data: [232, 412, 701, 1134, 2390, 4320, 5610, 7623, 7844, 8245, 8761, 8962],
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
                                        {offset: 0.5, color: 'rgba(0,255,179,0.51)'},
                                        {offset: 0, color: '#00FFB3'}
                                    ]
                                )
                            }
                        },
                    },
                ]
            }
            this.$nextTick(() => {
                this.pieCharts = this.$echarts.init(document.getElementById('tranSumCharts'))
                this.pieCharts.setOption(_tranSumCharts)
                window.addEventListener('resize', this.handleResize)
            })
        },
    }
</script>

<style scoped>

</style>
