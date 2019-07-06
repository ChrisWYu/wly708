<template>
    <div>
        <div class="headerContent">
            <div class="row">
                <div class="rowDescribe">
                    终端名称：
                </div>
                <el-input
                        class="expandInput"
                        placeholder="请输入社会化终端名称"
                        v-model="serviceName">
                </el-input>
            </div>
            <div class="row">
                <div class="rowDescribe">
                    选择战区：
                </div>
                <el-select v-model="warValue" placeholder="请选择战区">
                    <el-option
                            v-for="item in warList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                <div class="rowDescribe">
                    选择基地：
                </div>
                <el-select v-model="baseValue" placeholder="请选择基地">
                    <el-option
                            v-for="item in baseList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                <div class="rowDescribe">
                    任务类型：
                </div>
                <el-select v-model="taskValue" placeholder="请选择任务类型">
                    <el-option
                            v-for="item in taskList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="row">
                <div class="rowDescribe">
                    选择时间：
                </div>
                <el-date-picker
                        v-model="startDate"
                        type="date"
                        placeholder="选择开始日期">
                </el-date-picker>
                —
                <el-date-picker
                        v-model="endDate"
                        type="date"
                        placeholder="选择结束日期">
                </el-date-picker>
            </div>
            <div class="row">
                <el-button type="info">搜索</el-button>
                <div class="searchClear" @click="clearData">清空搜索条件</div>
            </div>
        </div>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="入库终端"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="出库运营商">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="累计扫码入库量">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :current-page="currentPage"
                :total="tableTotal">
        </el-pagination>
        <checkOperateDetail v-if="checkOperateDetailShow" v-model="checkOperateDetailShow"
                            :currentData="currentData"></checkOperateDetail>
    </div>
</template>

<script>
    import checkOperateDetail from './component/checkOperateDetail'

    export default {
        mounted() {
            this.tableTotal = this.tableData.length;
            this.$http.all([this.getWarList(), this.getTaskList()])
                .then(this.$http.spread(function (war, task) {
                    console.log(war);
                    // 两个请求现在都执行完成
                })).catch(function (error) {
                console.log(error)
            });
            // this.getList();
        },
        components: {
            checkOperateDetail
        },
        data: function () {
            return {
                checkOperateDetailShow: false,
                serviceName: '',
                warValue: '',
                warList: [
                    {
                        id: 1,
                        name: '第一战区'
                    },
                    {
                        id: 2,
                        name: '第二战区'
                    }
                ],
                baseValue: '',
                baseList: [
                    {
                        id: 1,
                        name: '河北基地'
                    },
                    {
                        id: 2,
                        name: '江苏基地'
                    }
                ],
                taskValue: '',
                taskList: [
                    {
                        id: 1,
                        name: '五粮液1998'
                    },
                    {
                        id: 2,
                        name: '五粮液1996'
                    },
                    {
                        id: 3,
                        name: '五粮液2002'
                    }
                ],
                startDate: '',
                endDate: '',
                pageSize: 2,
                currentPage: 1,
                tableTotal: 0,
                currentData: {},
                tableData: [{
                    id: 1,
                    date: '2016-05-02',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    id: 2,
                    date: '2016-05-04',
                    name: '王小虎1',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    id: 3,
                    date: '2016-05-01',
                    name: '王小虎3',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    id: 4,
                    date: '2016-05-03',
                    name: '王小虎4',
                    address: '上海市普陀区金沙江路 1516 弄'
                },
                    {
                        id: 5,
                        date: '2016-05-03',
                        name: '王小虎5',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }]
            }
        },
        methods: {
            getWarList: function () {
                return this.$http.post(`/api/ddadapter/openApi/data`, {
                    "code": "111111111",
                    "data": {
                        "test": 'test',
                        "commentUserId": sessionStorage.getItem("tokenid"),
                    }

                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getTaskList: function () {
                return this.$http.post(`/api/ddadapter/openApi/data`, {
                    "code": "111111111",
                    "data": {
                        "test": 'test',
                        "commentUserId": sessionStorage.getItem("tokenid"),
                    }

                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getList: function () {
                this.$http.post("/api/ddadapter/openApi/data", {
                        "code": "",
                        "data": {
                            //终端名称
                            "serviceName": this.serviceName,
                            //战区
                            "warValue": this.warValue,
                            //基地
                            "baseValue": this.baseValue,
                            //任务类型
                            "taskValue": this.taskValue,
                            //开始时间
                            "startDate": this.startDate,
                            //结束时间
                            "endDate": this.endDate,
                            //每页条数
                            "pageSize": this.pageSize,
                            //当前页数
                            "currentPage": this.currentPage
                        }
                    }
                ).then(res => {
                    let obj = {
                        totalSize: '总页数',
                        code: '状态码',
                        errorMsg: '错误信息',
                        data: [
                            {
                                id: 'ID',
                                executeCode: '执行编码',
                                taskType: '任务类型',
                                checkTarget: '稽核对象',
                                executeTime: '执行时间',
                                executePerson: '执行人',
                            }
                        ]
                    }
                }, error => {
                    console.log(error);
                });
            },
            clearData: function () {
                this.serviceName = '';
                this.warValue = '';
                this.baseValue = '';
                this.taskValue = '';
                this.startDate = '';
                this.endDate = '';
            },
            handleClick: function (row) {
                this.currentData = row;
                this.checkOperateDetailShow = !this.checkOperateDetailShow;
            }
        }
    }
</script>
<style>

</style>