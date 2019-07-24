<template>
    <!--    子主题--折线图-->
    <div>
        <div class="charts-1" id="twoLineCharts"></div>
    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "TwoLineChart",
        data() {
            return {
                pieCharts: null,
                blue_LineData: '',
                yellow_LineData:''
            }
        },
        props: ['blueLineData','yellowLineData'],
        //图表自适应刷新
        methods: {
            handleResize() {
                this.pieCharts.resize()
            },
            setData() {
                this.blue_LineData = this.blueLineData
                this.yellow_LineData = this.yellowLineData
            }
        },
        mounted() {
            this.setData()
            //封装折线图
            const LineCharts = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['医院', '商户'],
                    x: 'right',
                    top: 30,
                    textStyle: {
                        color: 'white'
                    }
                },
                grid: {
                    top: 80
                },
                // toolbox: {
                //     show: true,
                //     feature: {
                //         dataZoom: {
                //             yAxisIndex: 'none'
                //         },
                //         dataView: {readOnly: false},
                //         magicType: {type: ['line', 'bar']},
                //         restore: {},
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: 'white'
                        }
                    },
                },
                yAxis: {
                    name: '万元',
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    }
                },
                series: [
                    {
                        name: '医院',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 10,
                        //折线颜色
                        lineStyle: {
                            normal: {
                                color: 'white',
                                width: 3
                            }
                        },
                        //折点颜色
                        itemStyle: {
                            normal: {
                                color: '#2780f4',
                            }
                        },
                        data: this.blue_LineData,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                    },
                    {
                        name: '商户',
                        type: 'line',
                        data: this.yellowLineData,
                        symbol: 'circle',
                        symbolSize: 10,
                        //折现颜色
                        lineStyle: {
                            normal: {
                                color: '#fff',
                                width: 3,
                            }
                        },
                        //折点颜色
                        itemStyle: {
                            normal: {
                                color: '#dfb83f'
                            }
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                    }
                ]
            }
            this.$nextTick(() => {
                this.pieCharts = this.$echarts.init(document.getElementById('twoLineCharts'))
                this.pieCharts.setOption(LineCharts)
                window.addEventListener('resize', this.handleResize)
            })
        },
    }
</script>

<style scoped>

</style>
