<template>
    <!--    子主题--折线图-->
    <div>
        <div class="charts-1" id="fourLineCharts"></div>
    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "FourLineCharts",
        data() {
            return {
                pieCharts: null,
                fxqSum: '',
                caqSum:'',
                xqqSum:''
            }
        },
        props: ['fxq','caq','xqq'],
        //图表自适应刷新
        methods: {
            handleResize() {
                this.pieCharts.resize()
            },
            setData() {
                this.fxqSum = this.fxq
                this.caqSum = this.caq
                this.xqqSum = this.xqq
            }
        },
        mounted() {
            this.setData()
            //封装折线图
            const LineCharts = {
                tooltip: {
                    trigger: 'axis'
                },
                color:['#2780f4','#dfb83f','#75df84'],
                legend: {
                    data: ['枫溪区', '潮安区','湘桥区','饶平县'],
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
                        name: '枫溪区',
                        type: 'line',
                        symbolSize: 7,
                        //折线颜色
                        lineStyle: {
                            normal: {
                                color: '#2780f4',
                                width: 3
                            }
                        },
                        itemStyle:{
                          borderType:'dotted'
                        },
                        data: this.fxqSum,
                    },
                    {
                        name: '潮安区',
                        type: 'line',
                        data: this.caqSum,
                        symbolSize: 7,
                        //折线颜色
                        lineStyle: {
                            normal: {
                                color: '#dfb83f',
                                width: 3,
                            }
                        },
                    },
                    {
                        name: '湘桥区',
                        type: 'line',
                        data: this.xqqSum,
                        symbolSize: 7,
                        //折线颜色
                        lineStyle: {
                            normal: {
                                color: '#75df84',
                                width: 3,
                            }
                        },
                     }
                ]
            }
            this.$nextTick(() => {
                this.pieCharts = this.$echarts.init(document.getElementById('fourLineCharts'))
                this.pieCharts.setOption(LineCharts)
                window.addEventListener('resize', this.handleResize)
            })
        },
    }
</script>

<style scoped>

</style>
