<template>
    <!--    年度交易额TOP10-->
    <div class="charts-1" id="eCharts-5" style="width: 90%;margin: 2vh auto;text-align: center" ref="tableCharts">
        <el-carousel :interval="5000" arrow="never" height="21vw">
            <el-carousel-item>
                <el-table id="hosTop10" :header-cell-style="{background:'#051642'}"
                          :default-sort="{prop:'sum',order:'descending'}"
                          :data="tableData.slice(0,5)"
                          :row-class-name="tableRowClassName"
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
            <el-carousel-item>
                <el-table id="hosTop10-2" :header-cell-style="{background:'#051642'}"
                          :data="tableData.slice(6,11)"
                          :row-class-name="tableRowClassName"
                          :default-sort="{prop:'sum',order:'descending'}"
                          style="width: 100%;background-color: rgba(223,184,63,0)">
                    <el-table-column align="center" width="60" label="排名">
                        <template slot-scope="scope">
                            <span>No.{{scope.$index + 6}}</span>
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
                        name: '潮州总社区医院',
                        sum: 13681
                    },
                    {
                        name: '潮州总社区医院',
                        sum: 3681
                    },
                    {
                        name: '潮州总社区医院',
                        sum: 13694
                    },
                    {
                        name: '潮州总社区医院',
                        sum: 3689
                    },
                    {
                        name: '潮州总社区医院',
                        sum: 3893
                    },
                    {
                        name: '潮州总社区医院',
                        sum: 6893
                    },
                    {
                        name: '潮州总社区医院',
                        sum: 6893
                    },
                    {
                        name: '潮州总社区医院',
                        sum: 3689
                    },
                    {
                        name: '潮州总社区医院',
                        sum: 26793
                    },
                    {
                        name: '潮州总社区医院',
                        sum: 3893
                    },
                    {
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
    
    /*------------------------------第二轮播表格-------------------------------*/
    #hosTop10-2 /deep/ .el-table__body tr, /deep/ .el-table__body td {
        padding: 2px;
        border: none;
        bottom: 35vw;
        height: 3.3vw;
        color: #E6F7FF;
        font-size: 14px;
        animation: tableAnimate 1.5s ease-in-out;
        animation-fill-mode: forwards;
    }
    
    #hosTop10-2 /deep/ .el-table--group:after, /deep/ .el-table--border:after, /deep/ .el-table::before {
        content: '';
        position: absolute;
        /*background-color: #EBEEF5;*/
        display: none;
        z-index: 1;
    }
    
    #hosTop10-2 /deep/ .el-table__fixed::before, /deep/ .el-table__fixed-right::before {
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


</style>

<style>
    .el-carousel__button {
        background-color: #00F3F4 !important;
    }
</style>

