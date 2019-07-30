<template>
    <!--    头部大标题组件-->
    <div>
        <!--        标题-->
        <div class="headerTitle" style="width: 100%;height: 5vw;">

            <div class="navbar_left" :class="{'slideRightAnimate':slideRightFirst}"
                 style="position: absolute;width: 33%;height: 5vw;">
                <span class="tc_title"
                      style="line-height: 5vw;font-size: 1.2vw;margin-left: 20px">{{nowTime}}  {{nowDay}}</span>
                <span style="line-height: 5vw;font-size: 1vw;margin-left: 20px;color: rgba(0,179,255,0.51)">{{nowDate}}</span>
            </div>

            <div class="navbar_title" :class="{'slideDownAnimate':slideDownFirst}"
                 style="height: 5vw;position: absolute;width: 40%;margin-left: 30%"
            ></div>

            <div class="navbar_right" :class="{'slideLeftAnimate':slideLeftFirst}"
                 style="height: 5vw;position: absolute;width: 33%;margin-left: 67%">

                <div class="switchPage" style="margin-top: 4%;cursor: pointer" @click="toHos" v-show="isHome">
                    <span class="tc_s" style="float: right;margin-top: 5.5%">切换至药店医院专题</span>
                    <div class="BgChange" style="width: 40px;height: 40px;float: right"></div>
                </div>

                <div class="switchPage" style="margin-top: 4%;cursor: pointer" @click="toHome" v-show="isHos">
                    <span class="tc_s" style="float: right;margin-top: 5.5%">切换至药店医院专题</span>
                    <div class="BgChange" style="width: 40px;height: 40px;float: right"></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        beforeRouteLeave(to, from, next) {
            this.slideDownFirst = false
            next()
        },
        name: "Title",
        data() {
            return {
                nowTime: '',
                nowDay: '',
                nowDate: '',
                isHome: '',
                isHos: '',
                slideDownFirst: false,
                slideRightFirst: false,
                slideLeftFirst: false,
            }
        },
        props: ['isHomeIndex', 'isHosIndex'],
        methods: {
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
            toHome() {
                this.$router.push('/')
                this.isHos = false
            },
            toHos() {
                this.$router.push('/Hospital')
                this.isHome = false
            }
        },
        created() {
            this.nowTimes();
            this.slideDownFirst = true
            this.slideRightFirst = true
            this.slideLeftFirst = true
        },
        mounted() {
            this.nowTimes();
            this.isHome = this.isHomeIndex
            this.isHos = this.isHosIndex
        },
    }
</script>

<style scoped>
    .navbar_left {
        background-image: url("../../assets/navbar_left.png");
        width: 30%;
        left: -40%;
        background-size: 100%;
        background-repeat: no-repeat;
    }

    .navbar_title {
        background-image: url("../../assets/navbar_title.png");
        width: 45%;
        bottom: 7vw;
        margin: 0 auto;
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
    }

    .navbar_right {
        background-image: url("../../assets/navbar_right.png");
        width: 30%;
        right: -40%;
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

    .headerTitle {
        position: relative;
        overflow: hidden;
        /*animation: slideDown 1s ease-in-out;*/
    }

    /*动画封装*/
    /*向下滑入*/
    .slideDownAnimate {
        animation: slideDown 1s ease-in-out;
        animation-fill-mode: forwards;
    }

    /*向右滑入*/
    .slideRightAnimate {
        animation: slideFromLeft 0.5s ease-in-out;
        animation-fill-mode: forwards;
        animation-delay: 1s;
    }

    /*向左滑入*/
    .slideLeftAnimate {
        animation: slideFromRight 0.5s ease-in-out;
        animation-fill-mode: forwards;
        animation-delay: 1s;
    }


    /*    动画效果*/
    @keyframes slideDown {
        0% {
            bottom: 7vw;
        }
        100% {
            bottom: 0;
        }
    }

    /*    左滑入*/
    @keyframes slideFromLeft {
        0% {
            left: -40%;
        }
        100% {
            left: 0;
        }
    }

    /*    右滑入*/
    @keyframes slideFromRight {
        0% {
            right: -40%;
        }
        100% {
            right: 0;
        }
    }

    /*    淡入*/
    @keyframes opacityIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
<style>
    @import "../../assets/css/CommonCss.css";
</style>
