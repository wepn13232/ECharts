<template>
    <div>
        <!--        标题-->
        <div class="headerTitle" style="width: 100%;height: 91px;">
            <div class="navbar_left" style="position: absolute;width: 33%;height: 5vw;">
                <span class="tc_title"
                      style="line-height: 5vw;font-size: 1.2vw;margin-left: 20px">{{nowTime}}  {{nowDay}}</span>
                <span style="line-height: 5vw;font-size: 1vw;margin-left: 20px;color: rgba(0,179,255,0.51)">{{nowDate}}</span>
            </div>
            <div class="navbar_title" style="height: 5vw;position: absolute;width: 40%;margin-left: 30%"></div>
            <div class="navbar_right" style="height: 5vw;position: absolute;width: 33%;margin-left: 67%">
                <div class="switchPage" style="margin-top: 4%;cursor: pointer" @click="toHome">
                    <span class="tc_s" id="font1" style="float: right;margin-top: 5.5%">切换至药店医院专题</span>
                    <div class="BgChange" id="fontPic" style="width: 40px;height: 40px;float: right"></div>
                </div>
            </div>


        </div>
        <br>

        <!--        图表-->
        <div class="form">
            <el-row type="flex" justify="space-around">
                <el-col :span="7" class=" bgMid mid_h" style="width: 30%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw;" class="tc">今日医院营业额Top10</span>
                    <hop-top10_2></hop-top10_2>
                </el-col>
                <el-col :span="7" class=" bgMid mid_h" style="width: 30%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw;" class="tc">区域8月社保交易金额</span>
                    <transaction-sum></transaction-sum>
                </el-col>
                <el-col :span="7" class=" bgMid mid_h" style="width: 30%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw;" class="tc">定点机构社保年度交易金额</span>
                    <tran-sum-of-year></tran-sum-of-year>
                </el-col>
            </el-row>
            <br>
            <el-row type="flex" justify="space-around">
                <el-col :span="7" class=" bgMid mid_h" style="width: 30%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw;" class="tc">今日药店营业额TOP10</span>
                    <shop-top10></shop-top10>
                </el-col>
                <el-col :span="7" class=" bgMid mid_h" style="width: 30%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw;" class="tc">8月人群消费统计</span>
                    <people-consumption></people-consumption>
                </el-col>
                <el-col :span="7" class=" bgMid mid_h" style="width: 30%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw;" class="tc">区域社保年度交易金额</span>
                    <spot-tran-sum-of-year></spot-tran-sum-of-year>
                </el-col>
            </el-row>
        </div>



    </div>
</template>

<script>


    import HospitalTop10 from "../components/eCharts/HospitalTop10";
    import PeopleConsumption from "../components/eCharts/PeopleConsumption";
    import TransactionSum from "../components/eCharts/TransactionSum";
    import TranSumOfYear from "../components/eCharts/AreaTranSumOfYear";
    import ShopTop10 from "../components/eCharts/ShopTop10";
    import SpotTranSumOfYear from "../components/eCharts/SpotTranSumOfYear";
    import HopTop10_2 from "../components/eCharts/HopTop10_2";

    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.pieCharts2.dispose()
        },
        name: "Hospital",
        components: {
            HospitalTop10,
            PeopleConsumption,
            TransactionSum,
            TranSumOfYear,
            ShopTop10,
            SpotTranSumOfYear,
            HopTop10_2
        },
        methods: {
            handleResize() {
                this.pieCharts2.resize()
            },
            toHome() {
                this.$router.push('/')
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
        },
        data() {
            return {
                nowTime: '',
                nowDay: '',
                nowDate: '',
            }
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', this.handleResize)
            })
            this.nowTimes();

        },
    }
</script>

<style scoped>
    .navbar_left {
        background-image: url("../assets/navbar_left.png");
        width: 30%;
        background-size: 100%;
        background-repeat: no-repeat;
        /*left: -40%;*/
        /*animation: slideFromLeft 1s ease-in-out;*/
        /*animation-delay: 1s;*/
        /*定义动画后固定状态*/
        /*animation-fill-mode: forwards;*/
    }

    .navbar_title {
        background-image: url("../assets/navbar_title.png");
        width: 45%;
        margin: 0 auto;
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        /*animation-fill-mode: forwards;*/
    }

    .navbar_right {
        background-image: url("../assets/navbar_right.png");
        width: 30%;
        background-size: 100%;
        /*right: -40%;*/
        background-repeat: no-repeat;
        /*animation: slideFromRight 1s ease-in-out;*/
        /*animation-delay: 1s;*/
        /*animation-fill-mode: forwards;*/
    }
    /*.form{*/
    /*    opacity: 0;*/
    /*    animation: opacityIn 1s ease-in-out;*/
    /*    animation-delay: 3s;*/
    /*    animation-fill-mode: forwards;*/
    /*}*/

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

    .bgMid {
        background-image: url("../assets/frame_mid.png");
        background-position: center center;
        height: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .mid_h {
        height: 24vw;
    }

    .headerTitle {
        position: relative;
        overflow: hidden;
        /*animation: slideDown 1s ease-in-out;*/
    }

/*!*    动画效果*!*/
/*    @keyframes slideDown {*/
/*        0%{*/
/*            bottom: 91px;*/
/*        }*/

/*        100%{*/
/*            bottom: 0;*/
/*        }*/
/*    }*/
/*!*    左滑入*!*/
/*    @keyframes slideFromLeft {*/
/*        0%{*/
/*            left: -40%;*/
/*        }*/
/*        100%{*/
/*            left: 0;*/
/*        }*/
/*    }*/
/*!*    右滑入*!*/
/*    @keyframes slideFromRight {*/
/*        0%{*/
/*            right: -40%;*/
/*        }*/
/*        100%{*/
/*            right: 0;*/
/*        }*/
/*    }*/
/*!*    淡入*!*/
/*    @keyframes opacityIn {*/
/*        0%{*/
/*            opacity: 0;*/
/*        }*/
/*        100%{*/
/*            opacity: 1;*/
/*        }*/
/*    }*/
</style>
