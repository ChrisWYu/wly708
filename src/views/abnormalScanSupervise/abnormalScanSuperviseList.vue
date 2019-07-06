<template>
    <div class="bodyContent">
        <!--<div class="contentTitle">-->
        <!--异常扫码稽查-->
        <!--</div>-->
        <div class="contentDetail">
            <div class="row">
                <div class="rowInline">
                    <p class="title">核查战区</p>
                    <el-select class="expandSelect" v-model="warValue" placeholder="请选择" :clearable="clearable"
                               :disabled="userLevel != 'D' && userLevel != 'DE'">
                        <el-option
                                v-for="item in warCheckList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">战区负责人</p>
                    <el-select class="expandSelect" v-model="warCharge" placeholder="请选择" :clearable="clearable">
                        <el-option
                                v-for="item in warChargeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">战区执行人</p>
                    <el-select class="expandSelect" v-model="warOperator" placeholder="请选择" :clearable="clearable">
                        <el-option
                                v-for="item in warOperatorList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">督导负责人</p>
                    <el-select class="expandSelect" v-model="supervisePersonCharge" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in supervisePersonChargeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row">
                <div class="rowInline">
                    <p class="title">核查情况</p>
                    <el-select class="expandSelect" v-model="checkStatus" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in checkStatusList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">督导情况</p>
                    <el-select class="expandSelect" v-model="superviseStatus" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in superviseStatusList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">所属战区</p>
                    <el-select class="expandSelect" v-model="warBelong" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in warBelongList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">经销商</p>
                    <el-select class="expandSelect" v-model="distributor" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in distributorList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row">
                <div class="rowInline">
                    <p class="title">异常大类</p>
                    <el-select class="expandSelect" v-model="abnormalLargeCategory" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in abnormalLargeCategoryList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">异常小类</p>
                    <el-select class="expandSelect" v-model="abnormalSmallCategory" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in abnormalSmallCategoryList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline dateRange">
                    <p class="title">创建日期</p>
                    <el-date-picker
                            class="expandDate"
                            v-model="createDate"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
            </div>
            <div class="row">
                <div class="rowInline dateRange">
                    <p class="title">截止日期</p>
                    <el-date-picker
                            class="expandDate"
                            v-model="endDate"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div class="rowInline dateRange">
                    <p class="title">分派日期</p>
                    <el-date-picker
                            class="expandDate"
                            v-model="assignDate"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div class="rowInline buttonOperate" style="white-space: nowrap;">
                    <div class="cusButton cusRed" @click="searchData">查询</div>
                    <div class="cusButton cusWhite" @click="clearData" style="margin-left: 20px;">重置</div>
                </div>
            </div>
            <hr style="margin-top: 10px; height:2px;border:none;border-top:2px dotted rgb(238,238,238);"/>
            <div class="row">
                <div v-if="buttonControl.warAssignShow" class="cusButton cusWhite operateButton"
                     @click="warAssignClick">
                    战区分派
                </div>
                <div v-if="buttonControl.superviseAssignShow" class="cusButton cusWhite operateButton"
                     @click="superviseAssignClick">督导分派
                </div>
                <div v-if="buttonControl.operatorAssignShow" class="cusButton cusWhite operateButton"
                     @click="appointOperator">指派执行人
                </div>
                <div v-if="buttonControl.exportDataShow" class="cusButton cusWhite operateButton" @click="exportData">
                    导出数据
                </div>
                <div v-if="buttonControl.changeOperatorShow" class="cusButton cusWhite operateButton"
                     @click="changeOperator">调整执行人
                </div>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    @select="handleSelectOne"
                    @select-all="handleSelectAll"
                    empty-text="暂无数据～"
                    border
                    style="width: 100%;margin-top: 16px;">
                <el-table-column
                        type="selection"
                        width="35">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="distributor"
                        label="经销商"
                        width="140">
                    <template slot-scope="scope">
                        <div @click="handleClick(scope.row)"
                             class="tableRowTitle">
                            {{scope.row.distributor}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="warBelong"
                        label="所属战区"
                        width="140">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="105"
                        align="center"
                        label="异常情况">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content" v-for="item in scope.row.abnormalStatus" :key="item.type">
                                <span>{{item.type}} : {{item.count}}</span>
                            </div>
                            <div class="tableRowDetail">
                                {{totalAbnormalStatus(scope.row.abnormalStatus)}}
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="120"
                        prop="createDate"
                        label="创建日期">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="140"
                        prop="warCheck"
                        label="核查战区">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="170"
                        prop="runStartTime"
                        label="分派时间">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="170"
                        prop="runEndTime"
                        label="截止时间">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="115"
                        prop="checkStatus"
                        label="核查情况">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="125"
                        prop="supervisePersonCharge"
                        label="督导负责人">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="125"
                        prop="superviseStatus"
                        label="督导情况">
                </el-table-column>
            </el-table>
            <el-pagination
                    hide-on-single-page
                    @size-change="handleSizeChange"
                    @current-change="currentChange"
                    layout="total, sizes, prev, pager, next,slot"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    :total="tableTotal"
                    :page-sizes="pageSizes"
            >

                <div class="routerTo">
                    <el-input
                            class="expandInput routerToInput"
                            v-model="routerToNum"
                            @blur="blurRouterTo()"
                    >
                    </el-input>
                    <div class="routerToButton" @click="handleRouterTo()">
                        GO
                    </div>
                </div>
            </el-pagination>
        </div>
        <loading v-if="loadingStatus" v-model="loadingStatus"></loading>
    </div>
</template>

<script>
    import {powerControlLib} from '../../assets/lib/powerControl'
    import loading from '../common/loading'

    export default {
        components: {
            loading
        },
        mounted() {
            this.loadingShow();
            if (this.userLevel != 'D' && this.userLevel != 'DE') {
                this.warValue = sessionStorage.warcode;
            }
            this.buttonControl = powerControlLib(this.userLevel, this.$route.name);
            let _this = this;
            this.$http.all([this.getWarCheckList(), this.getWarChargeList(), this.getWarOperatorList(), this.getSupervisePersonChargeList(), this.getWarBelongList(), this.getDistributorList(), this.getAbnormalLargeCategoryList(), this.getAbnormalSmallCategoryList(), this.getList()])
                .then(this.$http.spread((war, warCharge, warOperator, supervisePersonCharge, warBelong, distributor, abnormalLargeCategory, abnormalSmallCategory, list) => {
                    _this.tableData = list.data.data;
                    _this.tableTotal = list.data.count;
                    _this.warCheckList = war.data.data;
                    _this.warChargeList = warCharge.data.data;
                    _this.warOperatorList = warOperator.data.data;
                    _this.supervisePersonChargeList = supervisePersonCharge.data.data;
                    _this.warBelongList = warBelong.data.data;
                    _this.distributorList = distributor.data.data;
                    _this.abnormalLargeCategoryList = abnormalLargeCategory.data.data;
                    _this.abnormalSmallCategoryList = abnormalSmallCategory.data.data;
                    _this.loadingCancel();
                    // 两个请求现在都执行完成
                })).catch(function (error) {
                console.log(error);
            });
        },
        watch: {
            currentPage: function () {
                this.getListInfo();
            }
        },
        computed: {
            userLevel: function () {
                return sessionStorage.roleid;
            }
        },
        data: function () {
            return {
                loadingStatus: false,
                buttonControl: {},
                /** 查询条件开始 */
                clearable: true,
                warValue: '',
                warCheckList: [],
                warCharge: '',
                warChargeList: [],
                warOperator: '',
                warOperatorList: [],
                supervisePersonCharge: '',
                supervisePersonChargeList: [],
                checkStatus: '',
                checkStatusList: [
                    {
                        id: '1',
                        name: '待督导分派'
                    },
                    {
                        id: '2',
                        name: '待战区分派'
                    },
                    {
                        id: '3',
                        name: '执行中'
                    },
                    {
                        id: '4',
                        name: '部分核查'
                    },
                    {
                        id: '5',
                        name: '全部核查'
                    },
                    {
                        id: '6',
                        name: '未完成'
                    }
                ],
                superviseStatus: '',
                superviseStatusList: [
                    {
                        id: '1',
                        name: '未反馈',
                    },
                    {
                        id: '2',
                        name: '部分反馈',
                    },
                    {
                        id: '3',
                        name: '全部反馈',
                    }
                ],
                warBelong: '',
                warBelongList: [],
                distributor: '',
                distributorList: [],
                abnormalLargeCategory: '',
                abnormalLargeCategoryList: [
                    {
                        id: 'A',
                        name: '作业层级异动',
                    },
                    {
                        id: 'B',
                        name: '跨渠道异动',
                    },
                    {
                        id: 'C',
                        name: '跨客户异动',
                    },
                    {
                        id: 'D',
                        name: '跨区域异动',
                    }
                ],
                abnormalSmallCategory: '',
                abnormalSmallCategoryList: [],
                createDate: [],
                assignDate: [],
                endDate: [],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                /** 查询条件结束 */
                /** 分页配置开始 */
                pageSize: 10,
                pageSizes: [10, 15, 20, 50],
                currentPage: 1,
                tableTotal: 0,
                routerToNum: 1,
                /** 分页配置结束 */
                currentData: {},
                tableData: [],
                checkData: [],
                checkDataId: [],
            }
        },
        methods: {
            //钉钉选人
            dingpeople: function () {
                var t = this;
                dd.biz.contact.complexPicker({
                    title: "选择人员",            //标题
                    corpId: 'ding5da63018b1631f1b35c2f4657eb6378f',              //企业的corpId
                    multiple: false,            //是否多选
                    limitTips: "超出了",          //超过限定人数返回提示
                    maxUsers: 1,            //最大可选人数
                    pickedUsers: [],            //已选用户
                    pickedDepartments: [],          //已选部门
                    disabledUsers: [],            //不可选用户
                    disabledDepartments: [],        //不可选部门
                    requiredUsers: [],            //必选用户（不可取消选中状态）
                    requiredDepartments: [],        //必选部门（不可取消选中状态）
                    appId: 'dinglswrqzsupezvoryy',              //微应用的Id
                    permissionType: "GLOBAL",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
                    responseUserOnly: true,        //返回人，或者返回人和部门
                    startWithDepartmentId: -1,   //仅支持0和-1
                    onSuccess: function (result) {
                        console.log(result);
                        // console.log(result.users[0])
                        // //emplId,name
                        // t.empname = result.users[0].name;
                        // t.emplId = result.users[0].emplId;
                        // console.log(t.empname + "工号：" + t.emplId)
                    },
                    onFail: function (err) {
                        console.log("失败")
                        console.log(err)
                    }
                });
            },
            warAssignClick() {
                this.dingpeople();
            },
            superviseAssignClick() {
                this.dingpeople();
            },
            appointOperator() {
                console.log(123);
                this.dingpeople();
                // this.appointOperatorShow = !this.appointOperatorShow;
            },
            exportData() {

            },
            changeOperator() {
                this.dingpeople();
            },
            loadingShow: function () {
                // this.loadingStatus = true;
            },
            loadingCancel: function () {
                this.loadingStatus = false;
            },
            totalAbnormalStatus(e) {
                let total = 0;
                for (let i = 0; i < e.length; i++) {
                    total = e[i].count + total;
                }
                return total;
            },
            searchData: function () {
                this.getListInfo();
            },
            clearData: function () {
                if (this.userLevel == 'D' || this.userLevel == 'DE') {
                    this.warValue = '';
                }
                this.warList = [];
                this.warCharge = '';
                this.warOperator = '';
                this.supervisePersonCharge = '';
                this.checkStatus = '';
                this.superviseStatus = '';
                this.warBelong = '';
                this.distributor = '';
                this.abnormalLargeCategory = '';
                this.abnormalSmallCategory = '';
                this.createDate = [];
                this.assignDate = [];
                this.endDate = [];
            },
            handleRouterTo: function () {
                this.currentPage = JSON.parse(JSON.stringify(this.routerToNum))
            },
            blurRouterTo: function () {
                let routeToNum = this.routerToNum;
                let num = parseInt(routeToNum, 10);
                let pageSize = this.pageSize;
                let tableTotal = this.tableTotal;
                let max = Math.ceil(tableTotal / pageSize);
                let result = 1;
                if (!isNaN(num)) {
                    if (num > 1) {
                        if (num > max) {
                            result = max;
                        } else {
                            result = num;
                        }
                    }
                }
                this.routerToNum = result;
            },
            handleClick: function (row) {
                this.$router.push(
                    {
                        name: 'abnormalScanSuperviseList/listDetail',
                        params: {
                            id: row.id
                        }
                    }
                );
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getListInfo();
            },
            currentChange: function (e) {
                this.currentPage = e;
                this.getListInfo();
            },
            handleSelectOne: function (ar, ob) {
                // let dataIndex = this.checkDataId.indexOf(ob.id);
                // if (dataIndex === -1) {
                //     this.checkData.push(ob);
                //     this.checkDataId.push(ob.id);
                // } else {
                //     this.checkData.splice(dataIndex, 1);
                //     this.checkDataId.splice(dataIndex, 1);
                // }
            },
            handleSelectAll: function (ar) {

            },
            /** 数据请求开始 */
            getAbnormalSmallCategoryList: function () {
                return this.$http.post(`/api/ddadapter/openApi/data`, {
                    "code": "9",
                    "data": {
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getAbnormalLargeCategoryList: function () {
                return this.$http.post(`/api/ddadapter/openApi/data`, {
                    "code": "8",
                    "data": {
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getDistributorList: function () {
                return this.$http.post(`/api/ddadapter/openApi/data`, {
                    "code": "7",
                    "data": {
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getWarBelongList: function () {
                return this.$http.post(`/api/ddadapter/openApi/data`, {
                    "code": "6",
                    "data": {
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getSupervisePersonChargeList: function () {
                return this.$http.post(`/api/ddadapter/openApi/data`, {
                    "code": "5",
                    "data": {
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getWarOperatorList: function () {
                return this.$http.post(`/api/ddadapter/openApi/data`, {
                    "code": "4",
                    "data": {
                        userid: sessionStorage.userid
                    }

                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getWarCheckList: function () {
                return this.$http.post(`/api/ddadapter/openApi/data`, {
                    "code": "1",
                    "data": {
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getWarChargeList: function () {
                return this.$http.post(`/api/ddadapter/openApi/data`, {
                    "code": "3",
                    "data": {
                        //用户id
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getList: function () {
                // return this.$http.post(`/node/user/test`, {
                return this.$http.post("/api/ddadapter/openApi/data", {
                        "code": "00711ZI01",
                        "data": {
                            //当前页数
                            currentPage: this.currentPage,
                            //每页条数
                            pageSize: this.pageSize,
                            //核查战区
                            warCheck: this.warValue,
                            //战区负责人
                            warCharge: this.warCharge,
                            //战区执行人
                            warOperator: this.warOperator,
                            //督导负责人
                            supervisePersonCharge: this.supervisePersonCharge,
                            //核查情况
                            checkStatus: this.checkStatus,
                            //督导情况
                            superviseStatus: this.superviseStatus,
                            //所属战区
                            warBelong: this.warBelong,
                            //经销商
                            distributor: this.distributor,
                            //异常大类
                            abnormalLargeCategory: this.abnormalLargeCategory,
                            //异常小类
                            abnormalSmallCategory: this.abnormalSmallCategory,
                            //创建日期
                            createDate: this.createDate,
                            //分派日期
                            assignDate: this.assignDate,
                            //截止日期
                            endDate: this.endDate,
                            //用户id
                            userid: sessionStorage.userid
                        }
                    }, {
                        headers: {
                            'content-type': 'application/json',
                        },
                    }
                );
            },
            getListInfo() {
                this.loadingShow();
                this.getList().then((res) => {
                    let tableData = res.data.data;
                    // this.tableData = tableData;
                    // let checkId = JSON.parse(JSON.stringify(this.checkDataId));
                    // let checkData = JSON.parse(JSON.stringify(this.checkData));
                    // let currentPageCheck = [];
                    // console.log(checkId);
                    // for (let i = 0; i < tableData.length; i++) {
                    //     if (checkId.indexOf(tableData[i].id) !== -1) {
                    //         currentPageCheck.push(tableData[i]);
                    //     }
                    // }
                    // tableData.forEach(row => {
                    //     this.$refs.multipleTable.toggleRowSelection(row,true);
                    // });
                    this.tableData = tableData;
                    this.tableTotal = res.data.count;
                    // setTimeout(() => {
                    //     currentPageCheck.forEach(row => {
                    //         this.$refs.multipleTable.toggleRowSelection(row, true);
                    //     });
                    //     this.checkData = checkData;
                    //     this.checkDataId = checkId;
                    // }, 500);

                    this.loadingCancel();
                });
            },
            /** 数据请求结束 */
        }
    }
</script>
<style>

</style>