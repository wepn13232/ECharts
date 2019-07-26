<template>
    <!--    区域社保交易金额-->
    <div>
        <div class="charts-2" id="transactionSum"></div>
    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "TransactionSum",
        data() {
            return {
                pieCharts: null
            }
        },
        methods: {
            handleResize() {
                this.pieCharts.resize()
            },
        },
        mounted() {
            const _transcationSum = {
                legend: {
                    textStyle: {
                        color: '#E6F7FF'
                    },
                    right:20,
                    top:10,
                },
                tooltip: {},
                dataset: {
                    source: [
                        ['product', '医院', '药店'],
                        ['枫溪区', 43.3, 85.8],
                        ['潮安区', 83.1, 73.4],
                        ['湘桥区', 86.4, 65.2],
                        ['饶平县', 72.4, 53.9]
                    ]
                },
                xAxis: {
                    type: 'category',
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
                    splitLine:{
                        lineStyle:{
                            color:'rgba(255,255,255,0.51)'
                        }
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
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [
                    {
                        type: 'bar',
                        itemStyle: {color: '#00B3FF'},
                        barWidth: '20%'
                    },
                    {type: 'bar',
                        itemStyle: {color: '#00FFB3'},
                        barWidth: '20%'
                    }
                ]
            }
            this.$nextTick(() => {
                this.pieCharts = this.$echarts.init(document.getElementById('transactionSum'))
                this.pieCharts.setOption(_transcationSum)
                window.addEventListener('resize', this.handleResize)
            })
        },
    }
</script>

<style scoped>

</style>
