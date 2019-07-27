<template>
    <!--    总交易笔数走势-->
    <div>
        <div class="charts-1" id="illegalMerchant"></div>
    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "IllegalMerchant",
        data() {
            return {
                pieCharts: null,
            }
        },
        //图表自适应刷新
        methods: {
            handleResize() {
                this.pieCharts.resize()
            },
        },
        mounted() {
            const cSCharts = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    right:20,
                    data: ['医院', '药店'],
                    textStyle: {
                        color: 'white',
                        fontSize: 11
                    },
                },
                grid: {
                    left: '3%',
                    bottom: '10%',
                    top: 30,
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
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
                    }
                },
                yAxis: {
                    type: 'category',
                    data: ['饶平县', '枫溪区', '湘桥区', '潮安区'],
                    axisLine: {
                        lineStyle: {
                            color: '#00D4FF'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 12,
                            color: '#E6F7FF'
                        }
                    },
                },
                series: [
                    {
                        name: '医院',
                        type: 'bar',
                        barCategoryGap: '60%',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color: '#00B3FF'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [320, 302, 301, 334]
                    },
                    {
                        name: '药店',
                        barCategoryGap: '60%',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color: '#00FFB3'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [120, 132, 101, 134]
                    },
                ]
            }
            this.$nextTick(() => {
                this.pieCharts = this.$echarts.init(document.getElementById('illegalMerchant'))
                this.pieCharts.setOption(cSCharts)
                window.addEventListener('resize', this.handleResize)
            })
        },
    }
</script>

<style scoped>

</style>
