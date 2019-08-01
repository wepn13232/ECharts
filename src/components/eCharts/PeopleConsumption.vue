<template>
    <!--    消费人群统计-->
    <div>
        <div class="charts-2" id="peopleConsumption"></div>
    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "PeopleConsumption",
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
            //封装图表
            const cSCharts = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['男', '女'],
                    textStyle: {
                        color: 'white',
                    },
                    right: 20,
                    top: 10,
                },
                grid: {
                    left: '3%',
                    top: 55,
                    bottom: 10,
                    containLabel: true,
                },
                xAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#00D4FF',
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
                    name: '岁',
                    type: 'category',
                    data: ['0-14', '15-35', '36-60', '60以上'],
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
                        name: '男',
                        type: 'bar',
                        barCategoryGap: '60%',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color: '#0044FF'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [120, 102, 101, 34]
                    },
                    {
                        name: '女',
                        barCategoryGap: '60%',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color: '#E632A2'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [120, 52, 101, 14]
                    },
                ]
            }
            this.$nextTick(() => {
                this.pieCharts = this.$echarts.init(document.getElementById('peopleConsumption'))
                this.pieCharts.setOption(cSCharts)
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
