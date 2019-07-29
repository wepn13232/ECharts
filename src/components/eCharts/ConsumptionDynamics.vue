<template>
    <!--    今日实时交易动态-->
    <div class="charts-1" id="eCharts-5" style="width: 90%;margin: 0 auto;" ref="tableCharts">
        <el-table id="consumptionTable" :header-cell-style="{background:'#051642'}"
                  :data="tableData.slice(0,5)"
                  :row-class-name="tableRowClassName"
                  style="width: 100%;background-color: rgba(223,184,63,0)">
            <el-table-column
                    prop="name"
                    label="商户名称"
                    width="220"
            >
            </el-table-column>
            <el-table-column
                    prop="money"
                    label="金额"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="method"
                    label="支付方式">
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.$refs.tableCharts.dispose()
        },
        name: "ConsumptionDynamics",
        methods: {
            handleResize() {
                this.$refs.tableCharts.resize()
            },
            tableRowClassName({rowIndex}) {
                if (rowIndex === 1 || rowIndex === 3 || rowIndex === 5 || rowIndex === 7 || rowIndex === 9) {
                    return 'other-row';
                } else {
                    return 'main-row'
                }
            },
            tableShowCollapse() {
                this.tableShow = !this.tableShow
            },
        },
        data() {
            return {
                tableShow: false,
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
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize)
            setTimeout(() => {
                this.tableShowCollapse()
            }, 1000)
        },
    }
</script>
<style scoped>
    @import "../../assets/css/HosTop10.css";

    #consumptionTable /deep/ .el-table__body tr, /deep/ .el-table__body td {
        padding: 1px;
        border: none;
        font-size: 13px;
        bottom: 10vw;
        height: 2vw;
        color: white;
        animation: tableAnimate 1.5s ease-in-out;
        animation-fill-mode: forwards;
    }

    /*    表格动画*/
    @keyframes tableAnimate {
        0% {
            opacity: 0;
        }
        100% {
            bottom: 0;
            opacity: 1;
        }
    }


    #consumptionTable /deep/ .el-table:before {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0 !important;
    }
    #consumptionTable /deep/ .el-table--group:after,/deep/ .el-table--border:after,/deep/ .el-table::before {
        content: '';
        position: absolute;
        /*background-color: #EBEEF5;*/
        display: none;
        z-index: 1;
    }
    #consumptionTable /deep/.el-table:before{
        border-bottom:  0 solid rgba(204, 204, 204, 0);
        height: 0 !important;
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


