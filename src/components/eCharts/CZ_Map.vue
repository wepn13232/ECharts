<template>
    <!--    潮州市地图分布-->
    <div>
        <div class="addIcon"
             style="width: 50px;height: 50px;color:white;position: absolute;margin-left: 19vw;margin-top: 19vh;z-index: 3">
            +1
        </div>
        <div class="charts-map" id="cz_Map">
        </div>
    </div>
</template>

<script>
    import CZ from '../../assets/Cz'


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

    //地图商户数据
    var shop = [
        {name: '商户1'},
        {name: '商户2'},
        {name: '商户3'},
        {name: '商户4'},
        {name: '商户5'},
        {name: '商户6'},
        {name: '商户7'},
        {name: '商户8'},
        {name: '商户9'},
        {name: '商户10'},
        {name: '商户11'},
        {name: '商户12'},
        {name: '商户13'},
        {name: '商户14'},
        {name: '商户15'},
        {name: '商户16'},
        {name: '商户17'},
    ]
    var geoSan = {
        '商户1': [116.67931, 23.781012],
        '商户2': [117.0205, 23.658171],
        '商户3': [116.49365, 23.674675],
        '商户4': [116.60872, 23.65159],

    }
    var normalShop = {
        '商户1': [116.64931, 23.761012],
        '商户2': [117.11205, 23.648171],
        '商户3': [116.48365, 23.684675],
        '商户4': [116.61872, 23.62159],
        '商户5': [116.81872, 23.62159],
        '商户6': [116.81872, 23.72159],
        '商户7': [116.81872, 23.82159],
        '商户8': [116.81872, 23.92159],
        '商户9': [116.71872, 23.72159],
        '商户10': [116.91872, 23.72159],
        '商户11': [116.3872, 23.72159],
        '商户12': [116.6872, 23.92159],
        '商户13': [116.5872, 23.72159],
        '商户14': [116.9872, 23.52159],
        '商户15': [116.8872, 24.02159],
        '商户16': [116.8472, 24.12159],
        '商户17': [116.4472, 23.72159],

    }


    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts.dispose()
        },
        name: "CZ_Map",
        data() {
            return {
                pieCharts: null,
                normalShop: [
                    {
                        name: '地图数据1',
                        value: [116.4472, 23.72159]
                    },
                    {
                        name: '地图数据2',
                        value: [117.11205, 23.648171]
                    }
                ]
            }
        },
        methods: {
            handleResize() {
                this.pieCharts.resize()
            },
        },
        mounted() {
            //封装地图数据
            const _Map = {
                // title: {
                //     text: '交易状态监控',
                //     textStyle: {
                //         color: 'white',
                //         fontSize:14
                //     }
                // },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                toolbox: {},
                legend: {
                    align: 'left',
                    orient: 'vertical',
                    left: 10,
                    top: 30,
                    textStyle: {
                        color: []
                    },
                },
                //地图配置
                geo: {
                    show: true,
                    map: 'CZ',
                    label: {
                        normal: {show: true, color: '#fff'},
                        emphasis: {show: true, color: '#fff'}
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#00244F',
                            borderColor: '#00B3FF',
                            borderWidth: 2,
                            // shadowColor:'#00F3F4',
                            // shadowBlur:10,
                            label: {show: true}
                        },
                        emphasis: {areaColor: 'rgba(0,63,139,0.72)', label: {show: true}}
                    },
                    zoom: 1
                },
                series: [
                    {
                        name: '正常点' + ' ' + '600',
                        type: 'scatter',
                        zlevel: 1,
                        data: this.normalShop,
                        itemStyle: {
                            normal: {
                                color: '#00FFB3'
                            }
                        },
                        coordinateSystem: 'geo',
                    },
                    {
                        name: '异常点' + ' ' + '4',
                        type: 'effectScatter',
                        itemStyle: {
                            normal: {
                                color: '#FF4F46'
                            }
                        },
                        coordinateSystem: 'geo',
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        zlevel: 1,
                        data: convertData(shop)
                    },
                ]
            }
            this.$nextTick(() => {
                this.pieCharts = this.$echarts.init(document.getElementById('cz_Map'))
                this.$echarts.registerMap('CZ', CZ)
                this.pieCharts.setOption(_Map)
                window.addEventListener('resize', this.handleResize)
            })
        },
    }
</script>

<style scoped>
    .charts-map {
        height: 47vw;
        width: 97%;
        margin: 0 auto;
    }

    .addIcon {
        opacity: 0;
        animation: addIconToNum 2s ease-in-out;
        animation-delay: 1s;
        animation-fill-mode: forwards;
    }

    /*添加动画*/
    @keyframes addIconToNum {
        0% {
            opacity: 0;
            margin-top: 19vh;
            margin-left: 19vw;
        }
        25% {
            margin-top: 19vh;
            margin-left: 19vw;
        }
        50% {
            margin-top: 19vh;
            margin-left: 19vw;
            opacity: 1;
        }
        100% {
            opacity: 0;
            margin-top: 0;
            margin-left: 36vw;
        }
    }
</style>
