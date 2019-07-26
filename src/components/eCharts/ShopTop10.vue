<template>
    <!--    今日药店营业Top10-->
    <div class="charts-1" id="eCharts-5" style="width: 90%;margin: 0 auto;text-align: center" ref="tableCharts">
        <span style="color: #FEFF63;font-size: 1vw">今日交易总额：50000元</span>
        <el-table id="shopTop10" :header-cell-style="{background:'#051642'}"
                  :data="tableData.slice(0,10)"
                  :row-class-name="tableRowClassName"
                  :default-sort="{prop:'sum',order:'descending'}"
                  style="width: 100%;background-color: rgba(223,184,63,0)">
            <el-table-column
                    prop="No"
                    label="排名"
                    :data="No"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="商户名称"
                    width="170">
            </el-table-column>
            <el-table-column
                    prop="sum"
                    sortable
                    label="金额">
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
        name: "HospitalTop10",
        methods: {
            handleResize() {
                this.$refs.tableCharts.resize()
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1 || rowIndex === 3 || rowIndex === 5 || rowIndex === 7 || rowIndex === 9) {
                    return 'other-row';
                } else {
                    return 'main-row'
                }
            }
        },
        data() {
            return {
                No: ['No.1', 'No.2', 'No.3', 'No.4', 'No.5', 'No.6', 'No.7', 'No.8', 'No.9', 'No.10'],
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

    #shopTop10 /deep/ .el-table__body tr, /deep/ .el-table__body td {
        padding: 1px;
        border: none;
        font-size: 13px;
        height: 1.7vw;
        color: white;
    }
</style>

