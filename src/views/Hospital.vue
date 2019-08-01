<template>
    <div>
        <!--        标题-->
        <common_-title :isHosIndex="isHos"></common_-title>
        <br>

        <!--        图表-->
        <div class="form">
            <el-row type="flex" justify="space-around">
                <el-col :span="7" class=" bgMid mid_h" style="width: 32%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw;" class="tc">今日医院营业额Top10</span>
                    <hop-top10_2></hop-top10_2>
                </el-col>
                <el-col :span="7" class=" bgMid mid_h" style="width: 32%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw;" class="tc">区域8月社保交易金额</span>
                    <transaction-sum></transaction-sum>
                </el-col>
                <el-col :span="7" class=" bgMid mid_h" style="width: 32%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw;" class="tc">定点机构社保年度交易金额</span>
                    <tran-sum-of-year></tran-sum-of-year>
                </el-col>
            </el-row>
            <br>
            <el-row type="flex" justify="space-around">
                <el-col :span="7" class=" bgMid mid_h" style="width: 32%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw;" class="tc">今日药店营业额TOP10</span>
                    <shop-top10></shop-top10>
                </el-col>
                <el-col :span="7" class=" bgMid mid_h" style="width: 32%;text-align: center">
                    <span style="line-height: 2.2;font-size: 1vw;" class="tc">8月人群消费统计</span>
                    <people-consumption></people-consumption>
                </el-col>
                <el-col :span="7" class=" bgMid mid_h" style="width: 32%;text-align: center">
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
    import common_Title from "../components/common/common_Title";

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
            HopTop10_2,
            common_Title,
        },
        methods: {
            handleResize() {
                this.pieCharts2.resize()
            },
            toHome() {
                this.$router.push('/')
            },
        },
        created() {
        },
        data() {
            return {
                nowTime: '',
                nowDay: '',
                nowDate: '',
                isHos: true,
            }
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', this.handleResize)
            })
        },
    }
</script>

<style scoped>
    .form {
        width: 99%;
        margin: 0 auto;
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


</style>
