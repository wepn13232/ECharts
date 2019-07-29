<template>
    <div class="home">
        <!--        标题-->
        <div class="headerTitle" style="width: 100%;height: 91px;">
            <div class="navbar_left" style="position: absolute;width: 33%;height: 5vw;">
                <span class="tc_title"
                      style="line-height: 5vw;font-size: 1.2vw;margin-left: 20px">{{nowTime}}  {{nowDay}}</span>
                <span style="line-height: 5vw;font-size: 1vw;margin-left: 20px;color: rgba(0,179,255,0.51)">{{nowDate}}</span>
            </div>
            <div class="navbar_title" style="height: 5vw;position: absolute;width: 40%;margin-left: 30%"></div>
            <div class="navbar_right" style="height: 5vw;position: absolute;width: 33%;margin-left: 67%">
                <div class="switchPage" style="margin-top: 4%;cursor: pointer" @click="toHos">
                    <span class="tc_s" id="font1" style="float: right;margin-top: 5.5%">切换至药店医院专题</span>
                    <div class="BgChange" id="fontPic" style="width: 40px;height: 40px;float: right"></div>
                </div>
            </div>

        </div>

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
                            <span style="font-size: 32px;letter-spacing:4px">{{dealNum}}</span>
                        </div>

                        <div class="titleArrow"
                             style="width: 16px;height: 12px;margin-left: 35.3%;margin-top: 4vw"></div>
                        <div style="color: #00F3F4;position: absolute;margin-left: 36.5%;font-size: 14px;z-index: 3;margin-top: 3.8vw">
                            总交易笔数
                        </div>
                        <div class="dealNum" style="margin-top: 5vw;margin-left: 19.7vw">
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

    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts2.dispose()
        },
        name: 'home',
        components: {IllegalOperation, ConsumptionDynamics, HospitalTop10, CZ_Map, TranUserCharts, TranSumCharts},
        data() {
            return {
                nowTime: '',
                nowDay: '',
                nowDate: '',
                pieCharts2: null,
                dealNum: 20,
                dealSum: 67,
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
                }, 2 * 1000)
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
            //获取当前时间
            timeFormate(timeStamp) {
                let year = new Date(timeStamp).getFullYear();
                let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
                let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
                let hh = new Date(timeStamp).getHours() < 10 ? +new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
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
        }
        ,
        created() {
            this.nowTimes();
            this.numFun(this.dealNum, 2077)
            setTimeout(() => {
                this.sumChange()
            }, 2000)
        }
        ,
        mounted() {
            //监听图表变换，自适应页面
            this.$nextTick(() => {
                window.addEventListener('resize', this.handleResize)
            })
            this.nowTimes();
            // this.getDealNumByMin();
            //金额变动，初始值--变动值
            this.numFun(this.dealNum, 2077)
        }
        ,
    }
</script>

<style scoped>
    .navbar_left {
        background-image: url("../assets/navbar_left.png");
        width: 30%;
        background-size: 100%;
        background-repeat: no-repeat;
    }

    .navbar_title {
        background-image: url("../assets/navbar_title.png");
        width: 45%;
        margin: 0 auto;
        background-size: 100%;
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

    .dealNum {
        font-family: Din_Self;
        width: 20vw;
        color: white;
        position: absolute;
        margin-left: 20%;
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

</style>

<style>
    @import "../assets/css/CommonCss.css";

    .container {
        width: 99%;
        margin: 0 auto;
    }
</style>
