<template>
    <div class="home">
        <!--        标题-->
        <common_-title :isHomeIndex="isHome"></common_-title>

        <!--          图表-->
        <div class="container">
            <el-row class="mt1" type="flex" justify="space-around">
                <!--            第一列-->
                <el-col :span="6" class="h942" style="width: 28%;">
                    <!--                1-1-->
                    <div class=" w522 h33 Bg1" style="text-align: center">
                        <span style="line-height: 2.2;font-size: 1vw" class="tc">年度违规交易一览</span>
                        <illegal-operation style="margin-top: 1%"></illegal-operation>
                    </div>
                    <!--                1-2-->
                    <div class=" w522 h33 mt19 Bg1" style="text-align: center">
                        <span style="line-height: 2.2;font-size: 1vw" class="tc">总交易用户走势</span>
                        <tran-user-charts></tran-user-charts>
                    </div>
                    <!--                1-3-->
                    <div class=" w522 h33 mt19 Bg1" style="text-align: center;">
                        <span style="line-height: 2.2;font-size: 1vw" class="tc">总交易笔数走势</span>
                        <tran-sum-charts></tran-sum-charts>
                    </div>
                </el-col>

                <!--            第二列-->
                <el-col :span="10" class="h942">
                    <div class="Bg2" style="width: 100%;height: 100%;text-align: center">
                        <span style="line-height: 2.2;font-size: 1vw" class="tc">潮州地图商户分布图</span>
                        <!--                    总交易金额标题-->
                        <div style="margin-left: 1.4vw">
                            <div class="titleArrow"
                                 style="width: 16px;height: 12px;margin-top: 3px"></div>
                            <div style="color: #00F3F4;position: absolute;margin-left: 1.2%;font-size: 14px;z-index: 3">
                                交易状态监控
                            </div>
                        </div>

                        <div class="titleArrow"
                             style="width: 16px;height: 12px;margin-left: 35.3%;margin-top: 3px"></div>
                        <div style="color: #00F3F4;position: absolute;margin-left: 36.5%;font-size: 14px;z-index: 3">
                            总交易金额
                        </div>
                        <div class="dealNum">
                            <span>￥</span>
                            <span style="font-size: 40px;letter-spacing:4px">{{dealNum}}</span>
                        </div>

                        <div class="titleArrow"
                             style="width: 16px;height: 12px;margin-left: 35.3%;margin-top: 4.7vw"></div>
                        <div style="color: #00F3F4;position: absolute;margin-left: 36.5%;font-size: 14px;z-index: 3;margin-top: 4.5vw">
                            总交易笔数
                        </div>
                        <div class="dealNum" style="margin-top: 5.7vw;margin-left: 19.3vw">
                            <span style="font-size: 32px;margin-right: 4px;letter-spacing: 2px">{{dealSum}}</span>
                            <span style="font-size: 14px">笔</span>
                        </div>
                        <c-z_-map></c-z_-map>
                    </div>
                </el-col>

                <!--            第三列-->
                <el-col :span="6" class="h942" style="width: 28%">
                    <!--                3-1-->
                    <div class=" Bg1" style="width:100%;height: 32.288%;text-align: center">
                        <span style="line-height: 2.2;font-size: 1vw" class="tc">今日实时交易动态</span>
                        <consumption-dynamics></consumption-dynamics>
                    </div>
                    <!--                3-2-->
                    <div class="Bg3 mt19" style="width: 100%;height: 66.2097%;text-align: center">
                        <span style="line-height: 2.2;font-size: 1vw" class="tc">年度交易额TOP10</span>
                        <hospital-top10></hospital-top10>
                    </div>
                </el-col>

            </el-row>
        </div>

    </div>
</template>

<script>

    import IllegalOperation from "../components/eCharts/IllegalOperation";
    import ConsumptionDynamics from "../components/eCharts/ConsumptionDynamics";
    import HospitalTop10 from "../components/eCharts/HospitalTop10";
    import CZ_Map from "../components/eCharts/CZ_Map";
    import TranUserCharts from "../components/eCharts/TranUserCharts";
    import TranSumCharts from "../components/eCharts/TranSumCharts";
    import common_Title from "../components/common/common_Title";

    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts2.dispose()
        },
        name: 'home',
        components: {
            IllegalOperation,
            ConsumptionDynamics, HospitalTop10,
            CZ_Map, TranUserCharts,
            TranSumCharts,
            common_Title,
        },
        data() {
            return {
                nowTime: '',
                nowDay: '',
                nowDate: '',
                pieCharts2: null,
                dealNum: 200000,
                dealSum: 67,
                isHome: true,
            }
        },
        methods: {
            //金额变动动画
            numFun(startNum, maxNum) {
                var that = this
                let numText = startNum;
                let golb; // 为了清除requestAnimationFrame
                function numSlideFun() { // 数字动画
                    numText += 50; // 速度的计算可以为小数 。数字越大，滚动越快
                    if (numText >= maxNum) {
                        numText = maxNum;
                        cancelAnimationFrame(golb);
                    } else {
                        golb = requestAnimationFrame(numSlideFun);
                    }
                    that.dealNum = numText
                }

                setInterval(() => {
                    numSlideFun(); // 调用数字动画
                }, 3 * 1000)
            },
            //交易笔数变换
            sumChange() {
                this.dealSum++
            },
            handleResize() {
                this.pieCharts2.resize()
            },
            toHos() {
                this.$router.push('Hospital')
            },
        }
        ,
        created() {
            this.numFun(this.dealNum, 202500)
            setTimeout(() => {
                this.sumChange()
            }, 3000)
        }
        ,
        mounted() {
            //监听图表变换，自适应页面
            this.$nextTick(() => {
                window.addEventListener('resize', this.handleResize)
            })
            //金额变动，初始值--变动值
            this.numFun(this.dealNum, 202500)
        }
        ,
    }
</script>

<style scoped>

    .dealNum {
        font-family: Din_Self;
        width: 20vw;
        color: white;
        position: absolute;
        margin-left: 21%;
        font-size: 1vw;
        z-index: 3;
        margin-top: 1vw;
        /*overflow: hidden;*/
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis;*/
        text-align: -webkit-right;
        text-align: right;
        text-align: -moz-right;
    }

    .dealSum {
        width: 5.5vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: -webkit-left;
        text-align: left;
        text-align: -moz-left;
    }

    .titleArrow {
        background-image: url("../assets/titleArrow.png");
        background-position: center center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: absolute;
        opacity: 0.2;
        animation: shineTitle 0.5s ease-in-out infinite;
        animation-direction: alternate;
        animation-fill-mode: forwards;
        z-index: 3;
    }

    /*    动态动画*/
    @keyframes shineTitle {
        0% {
            opacity: 20%;
        }
        100% {
            opacity: 1;
        }
    }

    /*    图表进入动画*/
    @keyframes showContanier {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .container {
        width: 99%;
        margin: 0 auto;
        opacity: 0;
        animation: showContanier 0.5s ease-in-out;
        animation-delay: 1.5s;
        animation-fill-mode: forwards;
    }

</style>

<style>
    @import "../assets/css/CommonCss.css";


</style>
