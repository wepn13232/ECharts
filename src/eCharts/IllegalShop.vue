<template>
    <div>
        <div class="charts-1" id="eCharts-4"></div>
    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "IllegalShop",
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
            //违规商户
           const chartsOption4={
                title: {
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
                    // right: 10,
                    top: 30,
                        textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                dataset: {
                    dimensions: ['product', '医院', '药店'],
                        source: [
                        {product: '枫溪区', '医院': 43.3, '药店': 55.8},
                        {product: '潮安区', '医院': 63.3, '药店': 35.8},
                        {product: '饶平县', '医院': 13.3, '药店': 65.8},
                        {product: '湘桥区', '医院': 43.3, '药店': 15.8},
                    ]
                },
                xAxis: {
                    type: 'category',
                        axisLabel: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                        max: 100,
                        axisLabel: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [
                    {
                        type: 'bar',
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
                        barCategoryGap: '40%',
                        itemStyle: {
                            color: '#dfb83f',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                    }
                ]
            }
            this.$nextTick(()=>{
                this.pieCharts = this.$echarts.init(document.getElementById('eCharts-4'))
                this.pieCharts.setOption(chartsOption4)
                window.addEventListener('resize', this.handleResize)
            })
        }
    }
</script>

<style scoped>

</style>