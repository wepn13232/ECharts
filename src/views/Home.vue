<template>
    <div class="home">
        <div class="title w100 tc" style="font-weight: bolder;">
            <span>——————  潮州社保数据可视化系统  ——————</span>
        </div>
        <a @click="toHos"
           style="float: right;color: white;font-size: 0.5vw;text-decoration: none;cursor: pointer">切换子主题</a>


        <!--          图表-->
        <el-row class="mt6" type="flex" justify="space-between">
            <!--图表一-->
            <el-col :span="8" class="bl" style="width: 32vw">
                <div class="charts-title blue">年度违规交易一览</div>
                <div class="charts-1" id="eCharts-1">
                </div>
            </el-col>


            <!--图表二-->
            <el-col :span="8" style="width: 32vw">
                <div class="charts-1" id="eCharts-2">
                </div>
            </el-col>


            <!--图表三-->
            <el-col :span="8" class="bl3" style="width: 32vw">
                <div class="charts-title gold">区域定点7月商户数量</div>
                <bar4-position></bar4-position>
            </el-col>
        </el-row>

        <br>


        <el-row type="flex" justify="space-between">
            <!--图表一-->
            <el-col :span="8" class="bl" style="width: 32vw">
                <div class="charts-title blue">区域7月违规商户数量</div>
                <div class="charts-1" id="eCharts-4">
                </div>
            </el-col>


            <!--图表二-->
            <el-col :span="8" class="bl" style="width: 32vw">
                <div class="charts-title blue">今日营业额排行榜TOP10</div>
                <hospital-top10 style="padding-top: 2vw"></hospital-top10>
            </el-col>


            <!--                    图表三-->
            <el-col :span="8" class="bl" style="width: 32vw">
                <div class="charts-title blue">全区域实时消费动态</div>
                <div class="charts-1" id="eCharts-6">
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    import CZ from '../assets/Cz'
    import bar4Position from "@/eCharts/bar4Position";
    import HospitalTop10 from "@/eCharts/HospitalTop10";

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoSan[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    var shop = [
        {name: '商户1'},
        {name: '商户2'},
        {name: '商户3'},
        {name: '商户4'},
    ]

    var geoSan = {
        '商户1': [116.67931, 23.781012],
        '商户2': [117.10205, 23.668171],
        '商户3': [116.49365, 23.674675],
        '商户4': [116.60872, 23.65159],
    }

    export default {

        beforeRouteEnter(to, from, next) {
            document.querySelector('body').setAttribute('style', 'background-color:#004060')
            next()
        },
        beforeRouteLeave(to, from, next) {
            document.querySelector('body').setAttribute('style', 'background-color:#fff')
            next()
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: 'home',
        components: {bar4Position, HospitalTop10},
        data() {
            return {
                pieCharts: null,
                //图表1
                chartsOption1: {
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
                },
                //图表2
                chartsOption2: {
                    title: {
                        text: '潮州地区地图',
                        textStyle: {
                            color: 'white'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>{a}'
                    },
                    toolbox: {},
                    legend: {
                        align: 'left',
                        left: 10,
                        top: 30,
                        textStyle: {
                            color: '#fff'
                        },
                        itemStyle: {
                            color: '#2780f4'
                        }
                    },
                    //地图配置
                    geo: {
                        show: true,
                        map: 'CZ',
                        label: {
                            normal: {show: true},
                            emphasis: {show: true}
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#47D1FF',
                                borderColor: '#3B5077',
                                label: {show: true}
                            },
                            emphasis: {areaColor: '#2B91B7', label: {show: true}}
                        },
                        zoom: 1
                    },
                    series: [
                        {
                            name: '异常',
                            type: 'effectScatter',
                            itemStyle: {
                                normal: {
                                    color: '#f4563c'
                                }
                            },
                            coordinateSystem: 'geo',
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            zlevel: 1,
                            data: convertData(shop)
                        },
                        {
                            name: '正常',
                            type: 'scatter',
                            itemStyle: {
                                normal: {
                                    color: '#188df0'
                                }
                            },
                            coordinateSystem: 'geo',
                        }
                    ]
                },
                //图表4
                chartsOption4: {
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
                },
            }
        },
        methods: {
            handleResize() {
                this.pieCharts.resize()
            },
            toHos() {
                this.$router.push('Hospital')
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.pieCharts = this.$echarts.init(document.getElementById('eCharts-1'))
                this.pieCharts2 = this.$echarts.init(document.getElementById('eCharts-2'))
                this.pieCharts4 = this.$echarts.init(document.getElementById('eCharts-4'))
                this.pieCharts.setOption(this.chartsOption1)
                this.$echarts.registerMap('CZ', CZ)
                this.pieCharts2.setOption(this.chartsOption2)
                this.pieCharts4.setOption(this.chartsOption4)
                window.addEventListener('resize', this.handleResize)
            })
        }
    }
</script>

<style scoped>
    .charts-1 {
        height: 400px;
    }

    .charts-title {
        width: 50%;
        height: 3vw;
        text-align: center;
        margin: -20px auto;
        padding: auto 0;
        color: white;
        line-height: 3vw;
        border-radius: 50px 50px;
        font-weight: bolder;
    }

    .title {
        color: white;
        font-size: 2vw;
    }


</style>

<style>
    .charts-1 {
        height: 400px;
    }

    .tc {
        text-align: center;
    }

    .w100 {
        width: 100%;
    }

    .ml2 {
        margin-left: 2vw;
    }

    .h100 {
        height: 100%;
    }

    .bl {
        border: #2780f4 1px solid;
        border-radius: 5%;
    }

    .bl3 {
        border: #dfb83f 1px solid;
        border-radius: 5%;
    }

    .gold {
        background-color: #dfb83f;
    }

    .blue {
        background-color: #2780f4;
    }

    .mt6 {
        margin-top: 6vw;
    }

</style>
