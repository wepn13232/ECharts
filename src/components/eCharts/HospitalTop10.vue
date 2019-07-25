<template>
    <!--    今日医院营业Top10-->
    <div class="charts-1" id="eCharts-5" style="width: 90%;margin: 0 auto;text-align: center" ref="tableCharts">
        <span style="color: #FEFF63;font-size: 0.5vw">今日交易总额：50000元</span>
        <el-table :header-cell-style="{background:'#051642'}"
                  :data="tableData.slice(0,10)"
                  :row-class-name="tableRowClassName"
                  :default-sort="{prop:'sum',order:'descending'}"
                  style="width: 100%;background-color: rgba(223,184,63,0)">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
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
                }else{
                    return 'main-row'
                }
            }
        },
        data() {
            return {
                tableData: [
                    {
                        date: '2016-05-01',
                        name: '潮州总社区医院',
                        sum: 3681
                    },
                    {
                        date: '2016-05-02',
                        name: '潮州总社区医院',
                        sum: 3694
                    },
                    {
                        date: '2016-05-03',
                        name: '潮州总社区医院',
                        sum: 3689
                    },
                    {
                        date: '2016-05-01',
                        name: '潮州总社区医院',
                        sum: 3893
                    },
                    {
                        date: '2016-05-07',
                        name: '潮州总社区医院',
                        sum: 6893
                    },
                    {
                        date: '2016-05-11',
                        name: '潮州总社区医院',
                        sum: 36893
                    },
                    {
                        date: '2016-05-21',
                        name: '潮州总社区医院',
                        sum: 3689
                    },
                    {
                        date: '2016-05-09',
                        name: '潮州总社区医院',
                        sum: 36793
                    },
                    {
                        date: '2016-05-06',
                        name: '潮州总社区医院',
                        sum: 3893
                    },
                    {
                        date: '2016-05-31',
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



<style>
    .el-table__header tr,
    .el-table__header th {
        padding: 0 !important;
        height: 30px;
        background-color: rgb(5, 22, 66);
        color: #00B3FF;
    }

    .el-table__body tr,
    .el-table__body td {
        padding: 0 !important;
        border: none;
        height: 30%;
        color: white;
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #2780f4 !important;
    }


    .el-table .other-row {
        background: rgba(0, 243, 244, 0.11);
    }
    .el-table .main-row {
        background-color: rgb(5, 22, 66);
        /*opacity: 10%;*/
    }
    .el-table--border, .el-table--group{
        border: none;
    }
    .el-table__header-wrapper th:nth-last-of-type(2){
        border-right: none;
    }
    .el-table--border::after, .el-table--group::after{
        width: 0;
    }

</style>
