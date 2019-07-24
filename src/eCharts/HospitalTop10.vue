<template>
<!--    今日医院营业Top10-->
    <div class="charts-1" id="eCharts-5" style="width: 90%;margin: 0 auto;" ref="tableCharts">
        <el-table :header-cell-style="{background:'#004060'}"
                  :data="tableData.slice(0,10)"
                  style="width: 100%;background-color: rgba(223,184,63,0)">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
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
        },
        data() {
            return {
                tableData: [
                    {
                        date: '2016-05-01',
                        name: '潮州总社区医院',
                        address: '36893.5'
                    },
                    {
                        date: '2016-05-01',
                        name: '潮州总社区医院',
                        address: '36893.5'
                    },
                    {
                        date: '2016-05-01',
                        name: '潮州总社区医院',
                        address: '36893.5'
                    },
                    {
                        date: '2016-05-01',
                        name: '潮州总社区医院',
                        address: '36893.5'
                    },
                    {
                        date: '2016-05-01',
                        name: '潮州总社区医院',
                        address: '36893.5'
                    },
                    {
                        date: '2016-05-01',
                        name: '潮州总社区医院',
                        address: '36893.5'
                    },
                    {
                        date: '2016-05-01',
                        name: '潮州总社区医院',
                        address: '36893.5'
                    },
                    {
                        date: '2016-05-01',
                        name: '潮州总社区医院',
                        address: '36893.5'
                    },
                    {
                        date: '2016-05-01',
                        name: '潮州总社区医院',
                        address: '36893.5'
                    },
                    {
                        date: '2016-05-01',
                        name: '潮州总社区医院',
                        address: '36893.5'
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
        height: 35px;
    }

    .el-table__body tr,
    .el-table__body td {
        padding: 0 !important;
        height: 35px;
        background-color: rgb(0, 64, 95);
        color: white;
    }

    .el-table--enable-row-hover .el-table__body tr:hover>td{
        background-color: #2780f4 !important;
    }


</style>
