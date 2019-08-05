<template>
    <!--    今日实时交易动态-->
    <div>
        <!--        显示今日交易金额-->
        <div style="margin-top: 2vh;margin-bottom: 2vh">
            <span style="color: #FEFF63;font-size: 14px">今日交易总额:505693.50</span>
            <span style="color: #FEFF63;font-size: 14px;margin-left: 30px">今日交易笔数:68</span>
        </div>
        <div class="charts-1" id="eCharts-5" style="width: 95%;margin: 0 auto;" ref="tableCharts">
            <el-table id="consumptionTable" :header-cell-style="{background:'#051642'}"
                      :data="tableData.slice(0,5)"
                      :row-class-name="tableRowClassName"
                      style="width: 100%;background-color: rgba(223,184,63,0)">
                <el-table-column
                        prop="name"
                        label="商户名称"
                        width="200"
                >
                </el-table-column>
                <el-table-column
                        prop="money"
                        label="金额"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="method"
                        label="支付方式">
                </el-table-column>
            </el-table>
        </div>
    </div>

</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
        },
        name: "ConsumptionDynamics",
        methods: {
            tableRowClassName({rowIndex}) {
                if (rowIndex === 1 || rowIndex === 3 || rowIndex === 5 || rowIndex === 7 || rowIndex === 9) {
                    return 'other-row';
                } else {
                    return 'main-row'
                }
            },
        },
        data() {
            return {
                tableData: [
                    {
                        name: '潮州总社区医院',
                        money: 1000,
                        method: '实体社保卡'
                    },
                    {
                        name: '潮州总社区医院',
                        money: 1000,
                        method: '实体社保卡'
                    },
                    {
                        name: '潮州总社区医院',
                        money: 1000,
                        method: '实体社保卡'
                    },
                    {
                        name: '潮州总社区医院',
                        money: 1000,
                        method: '实体社保卡'
                    },
                    {
                        name: '潮州总社区医院',
                        money: 1000,
                        method: '实体社保卡'
                    },
                    {
                        name: '潮州总社区医院',
                        money: 1000,
                        method: '实体社保卡'
                    },


                ],
                disTable: false,
            }
        },
        mounted() {
        },
    }
</script>
<style scoped>
    @import "../../assets/css/HosTop10.css";

    /*该动画除有自动滑入滑出，配合刷新使用*/
    #consumptionTable /deep/ .el-table__body tr, /deep/ .el-table__body td {
        padding: 2px;
        border: none;
        font-size: 14px;
        bottom: 10vw;
        height: 3vw;
        color: #E6F7FF;
        animation-name: tableAnimate;
        animation-duration: 1.5s, 1.5s;
        animation-delay: 0s, 10s;
        animation-timing-function: ease-in-out, ease-in-out;
        animation-fill-mode: forwards, forwards;
        -webkit-animation: tableAnimate;
        -webkit-animation-duration: 1.5s, 1.5s;
        -webkit-animation-delay: 0s, 10s;
        -webkit-animation-timing-function: ease-in-out, ease-in-out;
        -webkit-animation-fill-mode: forwards, forwards;
    }


    /*    表格动画*/
    /*向下加载进入*/
    @keyframes tableAnimate {
        0% {
            opacity: 0;
        }
        100% {
            bottom: 0;
            opacity: 1;
        }
    }

    /*表格离开动画*/
    @keyframes tableLeaveAnimate {
        0% {
            opacity: 1;
            bottom: 0;
        }
        100% {
            opacity: 0;
            bottom: -10vw;
        }
    }

    #consumptionTable /deep/ .el-table:before {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0 !important;
    }

    #consumptionTable /deep/ .el-table--group:after, /deep/ .el-table--border:after, /deep/ .el-table::before {
        content: '';
        position: absolute;
        /*background-color: #EBEEF5;*/
        display: none;
        z-index: 1;
    }

    #consumptionTable /deep/ .el-table:before {
        border-bottom: 0 solid rgba(204, 204, 204, 0);
        height: 0 !important;
    }

    #consumptionTable /deep/ .el-table__fixed::before, /deep/ .el-table__fixed-right::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0px;
        /*background-color: #EBEEF5;*/
        z-index: 4;
        display: none !important;
    }


</style>
<style>
    #consumptionTable .el-table .other-row {
        background-color: rgb(5, 22, 66);

    }

    .el-table .main-row {
        background: rgba(0, 243, 244, 0.11);
    }


</style>


