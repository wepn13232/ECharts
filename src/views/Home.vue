<template>
    <div class="home">
        <!--        标题-->
        <div class="headerTitle" style="width: 100%;height: 91px;">
            <div class="navbar_left" style="position: absolute;width: 32%;height: 5vw;">
                <span class="tc_title"
                      style="line-height: 5vw;font-size: 1.2vw;margin-left: 20px">{{nowTime}}  {{nowDay}}</span>
                <span style="line-height: 5vw;font-size: 1vw;margin-left: 20px;color: rgba(0,179,255,0.51)">{{nowDate}}</span>
            </div>
            <div class="navbar_title" style="height: 5vw;position: absolute;width: 40%;margin-left: 30%"></div>
            <div class="navbar_right" style="height: 5vw;position: absolute;width: 32%;margin-left: 68%">
                <div class="switchPage" style="margin-top: 4%;cursor: pointer" @click="toHos">
                    <span class="tc_s" id="font1" style="float: right;margin-top: 5.5%">切换至药店医院专题</span>
                    <div class="BgChange" id="fontPic" style="width: 40px;height: 40px;float: right"></div>
                </div>
            </div>

        </div>

        <!--          图表-->
        <el-row class="mt1" type="flex" justify="space-around">
            <!--            第一列-->
            <el-col :span="6" class="h942" style="width: 27%">
                <!--                1-1-->
                <div class=" w522 h33 Bg1" style="text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw" class="tc">年度违规交易一览</span>
                    <illegal-operation style="margin-top: 1%"></illegal-operation>
                </div>
                <!--                1-2-->
                <div class=" w522 h33 mt19 Bg1" style="text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw" class="tc">区域定点商户数量</span>
                    <merchant-num></merchant-num>
                </div>
                <!--                1-3-->
                <div class=" w522 h33 mt19 Bg1" style="text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw" class="tc">区域8月违规商户数量</span>
                    <illegal-merchant></illegal-merchant>
                </div>
            </el-col>

            <!--            第二列-->
            <el-col :span="10" class="h942">
                <div class="Bg2" style="width: 100%;height: 100%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw" class="tc">潮州商户状态分布</span>
                    <div class="charts-map" id="eCharts-2"></div>
                </div>
            </el-col>

            <!--            第三列-->
            <el-col :span="6" class="h942" style="width: 27%">
                <!--                3-1-->
                <div class=" Bg1" style="width:100%;height: 32.0594%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw" class="tc">全区域实时消费动态</span>
                    <consumption-dynamics></consumption-dynamics>
                </div>
                <!--                3-2-->
                <div class="Bg3 mt19" style="width: 100%;height: 67.1297%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw" class="tc">今日营业额排行榜TOP10</span>
                    <hospital-top10></hospital-top10>
                </div>
            </el-col>

        </el-row>

    </div>
</template>

<script>
    import CZ from '../assets/Cz'

    import IllegalOperation from "../components/eCharts/IllegalOperation";
    import MerchantNum from "../components/eCharts/MerchantNum";
    import IllegalMerchant from "../components/eCharts/IllegalMerchant";
    import ConsumptionDynamics from "../components/eCharts/ConsumptionDynamics";
    import HospitalTop10 from "../components/eCharts/HospitalTop10";

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
    //转换正常商户
    var convertNormalData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = normalShop[data[i].name];
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
        {name: '商户5'},
        {name: '商户6'},
        {name: '商户7'},
        {name: '商户8'},
        {name: '商户9'},
        {name: '商户10'},
        {name: '商户11'},
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

    }

    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts2.dispose()
        },
        name: 'home',
        components: {IllegalOperation, MerchantNum, IllegalMerchant, ConsumptionDynamics, HospitalTop10},
        data() {
            return {
                nowTime: '',
                nowDay: '',
                nowDate: '',
                pieCharts2: null,
                //潮州地图设置
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
                        orient: 'vertical',
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
                            name: '异常',
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
                        {
                            name: '正常',
                            type: 'scatter',
                            zlevel: 1,
                            data: convertNormalData(shop),
                            itemStyle: {
                                normal: {
                                    color: '#00FFB3'
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
            },
            //获取当前时间
            timeFormate(timeStamp) {
                let year = new Date(timeStamp).getFullYear();
                let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
                let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
                let hh = new Date(timeStamp).getHours() < 10 ?  + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
                let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
                let dd = new Date(timeStamp).getDay() < 10 ? "0" + new Date(timeStamp).getDay() : new Date(timeStamp).getDay();
                if (dd == 1) {
                    this.nowDay = "星期一"
                } else if (dd == 2) {
                    this.nowDay = "星期二"
                } else if (dd == 3) {
                    this.nowDay = "星期三"
                } else if (dd == 4) {
                    this.nowDay = "星期四"
                } else if (dd == 5) {
                    this.nowDay = "星期五"
                } else if (dd == 6) {
                    this.nowDay = "星期六"
                } else {
                    this.nowDay = "星期日"
                }
                // this.nowDay = "星期" + dd
                this.nowDate = year + "年" + month + "月" + date + "日"
                this.nowTime = +" " + hh + ":" + mm;
            },
            // 定时器函数
            nowTimes() {
                this.timeFormate(new Date());
                setInterval(this.nowTimes, 30 * 1000);
            },
        },
        created() {
            this.nowTimes();
        },
        mounted() {
            this.$nextTick(() => {
                this.pieCharts2 = this.$echarts.init(document.getElementById('eCharts-2'))
                this.$echarts.registerMap('CZ', CZ)
                this.pieCharts2.setOption(this.chartsOption2)
                window.addEventListener('resize', this.handleResize)
            })
            this.nowTimes();
        }
    }
</script>

<style scoped>
    .charts-map {
        height: 47vw;
        width: 97%;
        margin: 0 auto;
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
        font-size: 1.1vw;
    }

    .navbar_left {
        background-image: url("../assets/navbar_left.png");
        width: 30%;
        background-size: 100% ;
        background-repeat: no-repeat;
    }

    .navbar_title {
        background-image: url("../assets/navbar_title.png");
        width: 45%;
        margin: 0 auto;
        background-size: 100% ;
        background-position: center;
        background-repeat: no-repeat;
    }

    .navbar_right {
        background-image: url("../assets/navbar_right.png");
        width: 30%;
        background-size: 100%;
        background-repeat: no-repeat;
    }

    .switchPage {
        width: 190px;
        height: 30px;
        /*background-color: #dfb83f;*/
        margin-left: 50%;
        opacity: .5;
        transition: all 0.4s;
    }

    .switchPage:hover {
        opacity: 1;
        /*color: #00F3F4;*/
    }


</style>

<style>
    .charts-1 {
        height: 14vw;
    }
    .charts-2 {
        height: 19vw;
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

    .tc {
        color: #00F3F4;
    }

    .mt119 {
        margin-top: 119px;
    }

    .h942 {
        height: 50vw;
    }

    .w802 {
        width: 802px;
    }

    .w522 {
        width: 542px;
    }

    .h302 {
        height: 302px;
    }

    .Bg1 {
        background-image: url("../assets/frame_small1.png");
        width: 100%;
        /*background-position: center center;*/
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .Bg2 {
        background-image: url("../assets/frame_big1.png");
        width: 800px;
        height: 100%;
        background-position: center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .Bg3 {
        background-image: url("../assets/frame_big2.png");
        width: 100%;
        height: 100%;
        /*background-position: center center;*/
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .BgChange {
        background-image: url("../assets/icon_switch.png");
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
    }

    .mt1 {
        margin-top: 1%;
    }

    .mt1 {
        margin-top: 1vw;
    }

    .mt19 {
        margin-top: 7px;
    }

    .pb1 {
        padding-bottom: 1vw;
    }

    .w27 {
        width: 27%;
    }

    .h33 {
        height: 32.888%;
    }

    .tc_s {
        color: rgb(0, 243, 244);
        font-size: 14px;
    }

    .tc_title {
        color: #00B3FF;
    }

</style>
