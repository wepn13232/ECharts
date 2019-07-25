<template>
    <!--    实时消费动态-->
    <div class="charts-1" id="eCharts-5" style="width: 90%;margin: 0 auto;" ref="tableCharts">
        <el-table :header-cell-style="{background:'#051642'}"
                  :data="tableData.slice(0,5)"
                  style="width: 100%;background-color: rgba(223,184,63,0)">
            <el-table-column
                    prop="name"
                    label="商户名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="money"
                    label="金额"
                    width="120">
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
        },
        data() {
            return {
                tableData: [
                    {
                        name:'潮州总社区医院',
                        money:1000,
                        method:'实体社保卡'
                    },
                    {
                        name:'潮州总社区医院',
                        money:1000,
                        method:'实体社保卡'
                    },
                    {
                        name:'潮州总社区医院',
                        money:1000,
                        method:'实体社保卡'
                    },
                    {
                        name:'潮州总社区医院',
                        money:1000,
                        method:'实体社保卡'
                    },
                    {
                        name:'潮州总社区医院',
                        money:1000,
                        method:'实体社保卡'
                    },
                    {
                        name:'潮州总社区医院',
                        money:1000,
                        method:'实体社保卡'
                    },


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
    }

    .el-table__body tr,
    .el-table__body td {
        padding: 0 !important;
        height: 10%;
        background-color: rgb(5, 22, 66);
        color: white;
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #2780f4 !important;
    }
</style>
