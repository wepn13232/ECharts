<template>
    <!--    年度交易额TOP10-->
    <div class="charts-1" id="eCharts-5" style="width: 90%;margin: 2vh auto;text-align: center" ref="tableCharts">
        <el-carousel :interval="5000" arrow="never" height="21vw">
            <el-carousel-item v-for="item in 2" :key="item">
                <el-table id="hosTop10" :header-cell-style="{background:'#051642'}"
                          :data="tableData.slice(0,5)"
                          :row-class-name="tableRowClassName"
                          :default-sort="{prop:'sum',order:'descending'}"
                          style="width: 100%;background-color: rgba(223,184,63,0)">
                    <el-table-column align="center" width="60" label="排名">
                        <template slot-scope="scope">
                            <span>No.{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="商户名称"
                            width="210">
                    </el-table-column>
                    <el-table-column
                            prop="sum"
                            sortable
                            label="金额">
                    </el-table-column>
                </el-table>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.$refs.tableCharts.dispose()
        },
        name: "HospitalTop10",
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
            }
        },
        data() {
            return {
                tableData: [
                    {
                        No: 'No.10',
                        name: '潮州总社区医院',
                        sum: 3681
                    },
                    {
                        No: 'No.7',
                        name: '潮州总社区医院',
                        sum: 3694
                    },
                    {
                        No: 'No.8',
                        name: '潮州总社区医院',
                        sum: 3689
                    },
                    {
                        No: 'No.5',
                        name: '潮州总社区医院',
                        sum: 3893
                    },
                    {
                        No: 'No.4',
                        name: '潮州总社区医院',
                        sum: 6893
                    },
                    {
                        No: 'No.1',
                        name: '潮州总社区医院',
                        sum: 36893
                    },
                    {
                        No: 'No.8',
                        name: '潮州总社区医院',
                        sum: 3689
                    },
                    {
                        No: 'No.2',
                        name: '潮州总社区医院',
                        sum: 36793
                    },
                    {
                        No: 'No.5',
                        name: '潮州总社区医院',
                        sum: 3893
                    },
                    {
                        No: 'No.3',
                        name: '潮州总社区医院',
                        sum: 36193
                    }
                ],
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize)
        }
    }
</script>

<style scoped>
    @import "../../assets/css/HosTop10.css";

    #hosTop10 /deep/ .el-table__body tr, /deep/ .el-table__body td {
        padding: 2px;
        border: none;
        bottom: 35vw;
        height: 3.3vw;
        color: #E6F7FF;
        font-size: 14px;
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

    #hosTop10 /deep/ .el-table--group:after, /deep/ .el-table--border:after, /deep/ .el-table::before {
        content: '';
        position: absolute;
        /*background-color: #EBEEF5;*/
        display: none;
        z-index: 1;
    }

    #hosTop10 /deep/ .el-table__fixed::before, /deep/ .el-table__fixed-right::before {
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
    .el-carousel__button {
        background-color: #00F3F4 !important;
    }
</style>

