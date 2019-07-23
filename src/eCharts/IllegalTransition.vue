<template>
    <div>
        <div class="charts-1" id="eCharts-1"></div>
    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "Illegal transactions",
        data(){
            return{
                pieCharts:null
            }
        },
        methods:{
            handleResize() {
                this.pieCharts.resize()
            },
        },
        mounted() {
            //违规交易
            const chartsOption1 = {
                    title: {
                        // text: '年度违规交易一览',
                        x: 'center',
                        align: 'right',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    grid: {
                        top: 80
                    },
                    legend: {
                        align: 'right',
                        right: 10,
                        top: 30,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {},
                    dataset: {
                        dimensions: ['product', '违规商户', '违规事件'],
                        source: [
                            {product: '1月', '违规商户': 13.3, '违规事件': 55.8},
                            {product: '2月', '违规商户': 23.3, '违规事件': 85.8},
                            {product: '3月', '违规商户': 63.3, '违规事件': 35.8},
                            {product: '4月', '违规商户': 23.3, '违规事件': 15.8},
                            {product: '5月', '违规商户': 73.3, '违规事件': 75.8},
                            {product: '6月', '违规商户': 83.3, '违规事件': 95.8},
                        ]
                    },
                    xAxis: {
                        type: 'category',
                        barCategoryGap: '40%',
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    yAxis: {
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    series: [
                        {
                            type: 'bar',
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            barCategoryGap: '40%',
                            itemStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                            }
                        },
                        {
                            type: 'bar',
                            itemStyle: {
                                color: '#3d42e4',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                        }
                    ]
                }
                this.$nextTick(()=>{
                    this.pieCharts = this.$echarts.init(document.getElementById('eCharts-1'))
                    this.pieCharts.setOption(chartsOption1)
                    window.addEventListener('resize', this.handleResize)
                })
                }
    }
</script>

<style scoped>

</style>