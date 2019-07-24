<template>
    <div class="home">

        <div class="title w100 tc" style="font-weight: bolder;">
            <span>——————  潮州社保数据可视化系统  ——————</span>
        </div>
        <a @click="toHome"
           style="float: right;color: white;font-size: 1vw;text-decoration: none;cursor: pointer">切换子主题</a>


        <!--          图表-->
        <el-row class="mt6" type="flex" justify="space-between">
            <!--图表一-->
            <el-col :span="8" class="bl" style="width: 32vw;">
                <div class="charts-title blue">今日医院营业额TOP10</div>
                <hospital-top10 style="padding-top: 2vw"></hospital-top10>
            </el-col>


            <!--图表二-->
            <el-col :span="8" class="bl3" style="width: 32vw">
                <div class="charts-title gold">区域7月社保交易金额</div>
                <bar4-position></bar4-position>
            </el-col>


            <!--图表三-->
            <el-col :span="8" class="bl" style="width: 32vw">
                <div class="charts-title blue">定点机构社保年度交易金额</div>
                <two-line-chart :blueLineData="blueLineData" :yellowLineData="yellowLineData"></two-line-chart>
            </el-col>
        </el-row>
        <br>

        <!--          图表-->
        <el-row type="flex" justify="space-between">
            <!--图表一-->
            <el-col :span="8" class="bl" style="width: 32vw">
                <div class="charts-title blue">今日药店营业额TOP10</div>
                <div class="charts-1" id="eCharts-4">
                </div>
            </el-col>


            <!--图表二-->
            <el-col :span="8" class="bl3" style="width: 32vw">
                <div class="charts-title gold">7月人群消费统计</div>
                <consumption-statistics></consumption-statistics>
            </el-col>


            <!--图表三-->
            <el-col :span="8" class="bl" style="width: 32vw">
                <div class="charts-title blue">区域社保年度交易金额</div>
                <four-line-charts :fxq="fxqSum" :caq="caqSum" :xqq="xqqSum"></four-line-charts>
            </el-col>
        </el-row>

    </div>
</template>

<script>

    import bar4Position from "@/components/eCharts/bar4Position";
    import HospitalTop10 from "@/components/eCharts/HospitalTop10";
    import TwoLineChart from "@/components/eCharts/TwoLineChart";
    import ConsumptionStatistics from "@/components/eCharts/ConsumptionStatistics";
    import FourLineCharts from "@/components/eCharts/FourLineCharts";

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
        name: "Hospital",
        components: {bar4Position, HospitalTop10, TwoLineChart, ConsumptionStatistics, FourLineCharts},
        methods: {
            toHome() {
                this.$router.push('/')
            }
        },
        data() {
            return {
                blueLineData: [11, 11, 15, 13, 12, 13, 10, 6, 8, 12, 17],
                yellowLineData: [1, 2, 2, 5, 3, 2, 7, 1, 4, 5, 6],
                fxqSum: [11, 11, 15, 13, 12, 13, 10, 6, 8, 12, 17],
                xqqSum: [1, 2, 3, 4, 5, 6, 2, 21, 4, 5, 6, 1],
                caqSum: [1, 2, 2, 5, 7, 7, 7, 1, 4, 5, 6],
            }
        }
    }
</script>

<style scoped>
    .title {
        color: white;
        font-size: 2vw;
    }

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
</style>
