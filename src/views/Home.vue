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
                    <span style="line-height: 2.2;font-size: 1vw" class="tc">总交易用户走势</span>
                    <merchant-num></merchant-num>
                </div>
                <!--                1-3-->
                <div class=" w522 h33 mt19 Bg1" style="text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw" class="tc">总交易笔数走势</span>
                    <illegal-merchant></illegal-merchant>
                </div>
            </el-col>

            <!--            第二列-->
            <el-col :span="10" class="h942">
                <div class="Bg2" style="width: 100%;height: 100%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw" class="tc">潮州地图商户分布图</span>
                    <div style="color: white;position: absolute;margin-left: 30%;font-size: 1vw;font-weight: bolder">总交易金额:￥{{dealNum}}万</div>
                    <div style="color: white;position: absolute;margin-left: 30%;font-size: 1vw;font-weight: bolder;margin-top: 3vh">总交易笔数:67笔</div>
                    <c-z_-map></c-z_-map>
                </div>
            </el-col>

            <!--            第三列-->
            <el-col :span="6" class="h942" style="width: 27%">
                <!--                3-1-->
                <div class=" Bg1" style="width:100%;height: 32.0594%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw" class="tc">今日实时交易动态</span>
                    <consumption-dynamics></consumption-dynamics>
                </div>
                <!--                3-2-->
                <div class="Bg3 mt19" style="width: 100%;height: 67.1297%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw" class="tc">年度交易额TOP10</span>
                    <hospital-top10></hospital-top10>
                </div>
            </el-col>

        </el-row>

    </div>
</template>

<script>

    import IllegalOperation from "../components/eCharts/IllegalOperation";
    import MerchantNum from "../components/eCharts/MerchantNum";
    import IllegalMerchant from "../components/eCharts/IllegalMerchant";
    import ConsumptionDynamics from "../components/eCharts/ConsumptionDynamics";
    import HospitalTop10 from "../components/eCharts/HospitalTop10";
    import CZ_Map from "../components/eCharts/CZ_Map";

    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts2.dispose()
        },
        name: 'home',
        components: {IllegalOperation, MerchantNum, IllegalMerchant, ConsumptionDynamics, HospitalTop10, CZ_Map},
        data() {
            return {
                nowTime: '',
                nowDay: '',
                nowDate: '',
                pieCharts2: null,
                dealNum:20,
                dealSum:'',
                count:0.1,
            }
        },
        methods: {
            handleResize() {
                this.pieCharts2.resize()
            },
            toHos() {
                this.$router.push('Hospital')
            },
            //间隔时间获取一次交易金额
            getDealNumByMin(){
                setInterval(()=>{
                    this.dealNum=this.dealNum+1
                },60*1000)
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
        },
        created() {
            this.nowTimes();
            // this.getDealNumByMin();
        },
        mounted() {
            //监听图表变换，自适应页面
            this.$nextTick(() => {
                window.addEventListener('resize', this.handleResize)
                // this.getDealNumByMin();
            })
            this.nowTimes();
            this.getDealNumByMin();
        },
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


</style>

<style>
    @import "../assets/css/CommonCss.css";
</style>
