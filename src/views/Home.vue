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
                <illegal-transition></illegal-transition>
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
                <illegal-shop></illegal-shop>
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
    import IllegalTransition from "../eCharts/IllegalTransition";
    import IllegalShop from "../eCharts/IllegalShop";

    //将数据显示至地图（转换
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
            this.pieCharts2.dispose()
        },
        name: 'home',
        components: {bar4Position, HospitalTop10, IllegalTransition,IllegalShop},
        data() {
            return {
                pieCharts2:null,
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
            }
        },
        methods: {
            handleResize() {
                this.pieCharts2.resize()
            },
            toHos() {
                this.$router.push('Hospital')
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.pieCharts2 = this.$echarts.init(document.getElementById('eCharts-2'))
                this.$echarts.registerMap('CZ', CZ)
                this.pieCharts2.setOption(this.chartsOption2)
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
