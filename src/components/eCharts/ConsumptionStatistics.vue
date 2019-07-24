<template>
    <div>
        <div class="charts-1" id="consumptionStatistics"></div>
    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "ConsumptionStatistics",
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
                    data: ['男', '女'],
                    top: 30,
                    textStyle: {
                        color: 'white'
                    }
                },
                grid: {
                    left: '3%',
                    bottom: '3%',
                    top: 60,
                    containLabel: true
                },
                xAxis: {
                    name:'人',
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    }
                },
                yAxis: {
                    name: '岁',
                    type: 'category',
                    data: ['0-14', '15-35', '36-60', '60以上'],
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    }
                },
                series: [
                    {
                        name: '男',
                        type: 'bar',
                        barCategoryGap: '60%',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color: '#188df0'
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
                        name: '女',
                        barCategoryGap: '60%',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color: '#dfb83f'
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
                this.pieCharts = this.$echarts.init(document.getElementById('consumptionStatistics'))
                this.pieCharts.setOption(cSCharts)
                window.addEventListener('resize', this.handleResize)
            })
        },
    }
</script>

<style scoped>

</style>
