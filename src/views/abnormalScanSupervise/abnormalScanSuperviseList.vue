<template>
    <div class="bodyContent">
        <!--<div class="contentTitle">-->
        <!--异常扫码稽查-->
        <!--</div>-->
        <div class="contentDetail">
            <div class="row">
                <div class="rowInline">
                    <p class="title">经销商</p>
                    <el-input v-model="searchData.distributor" placeholder="请输入"></el-input>
                    <!-- <el-select class="expandSelect" v-model="searchData.distributor" placeholder="请选择"
                               :clearable="clearable">
                    </el-select> -->
                </div>
                <div class="rowInline">
                    <p class="title">所属战区</p>
                    <el-select class="expandSelect" v-model="searchData.warBelong" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in warBelongList"
                                :key="item.war_code"
                                :label="item.war_name"
                                :value="item.war_code">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">异常大类</p>
                    <el-select class="expandSelect" v-model="searchData.abnormalLargeCategory" placeholder="请选择"
                               :clearable="clearable" @change="getAbnormalSmallCategoryList">
                        <el-option
                                v-for="item in abnormalLargeCategoryList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">异常明细</p>
                    <el-select class="expandSelect" v-model="searchData.abnormalSmallCategory" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in abnormalSmallCategoryList"
                                :key="item.abnormal_detail_name"
                                :label="item.abnormal_detail_name"
                                :value="item.abnormal_detail_code">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row">
                <div class="rowInline">
                    <p class="title">核查战区</p>
                    <el-select class="expandSelect" v-model="searchData.warCheck" placeholder="请选择"
                               :clearable="clearable"
                               :disabled="userLevel != 'D' && userLevel != 'DE'">
                        <el-option
                                v-for="item in warCheckList"
                                :key="item.war_code"
                                :label="item.war_name"
                                :value="item.war_code">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline" style="vertical-align: top;">
                    <p class="title">战区负责人</p>
                    <div class="searchLabel" :class="searchData.warCharge ?'has' :'empty'" @click="getDdWarCharge()">
                        {{searchData.warCharge ? searchData.warCharge :'请选择' }}
                        <i class="icon iconfont iconweibiaoti--3"
                           @click.stop.prevent="clearRowSearch(['warCharge','warChargeValue'])"></i>
                    </div>
                </div>
                <div class="rowInline" style="vertical-align: top;">
                    <p class="title">战区执行人</p>
                    <div :class="warOperatorClass()"
                         @click="getDdWarOperator()">
                        {{searchData.warOperator? searchData.warOperator :'请选择' }}
                        <i class="icon iconfont iconweibiaoti--3"
                           @click.stop.prevent="clearRowSearch(['warOperator','warOperatorValue'])"></i>
                    </div>
                </div>
                <div class="rowInline">
                    <p class="title">核查情况</p>
                    <el-select class="expandSelect" v-model="searchData.checkStatus" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in checkStatusList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row">
                <div class="rowInline dateRange">
                    <p class="title">创建日期</p>
                    <el-date-picker
                            class="expandDate"
                            v-model="searchData.createDate"
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
                            v-model="searchData.assignDate"
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
                    <p class="title">截止日期</p>
                    <el-date-picker
                            class="expandDate"
                            v-model="searchData.endDate"
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
                <div class="rowInline">
                    <p class="title">督导负责人</p>
                    <div :class="superviseChargeClass()"
                         @click="getDdSuperviseCharge()">
                        {{searchData.superviseCharge? searchData.superviseCharge :'请选择' }}
                        <i class="icon iconfont iconweibiaoti--3"
                           @click.stop.prevent="clearRowSearch(['superviseCharge','superviseChargeValue'])"></i>
                    </div>
                </div>
                <div class="rowInline">
                    <p class="title">督导情况</p>
                    <el-select class="expandSelect" v-model="searchData.superviseStatus" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in superviseStatusList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline buttonOperate" style="white-space: nowrap;">
                    <div class="cusButton cusRed" @click="searchDataClick">查询</div>
                    <div class="cusButton cusWhite" @click="clearDataClick" style="margin-left: 20px;">重置</div>
                </div>
            </div>
            <hr style="margin-top: 10px; height:2px;border:none;border-top:2px dotted rgb(238,238,238);"/>
            <div class="row">
                <div v-if="buttonControl.warAssignShow" class="cusButton cusWhite operateButton"
                     @click="warAssignClick">
                    战区分派
                </div>
                <div v-if="buttonControl.superviseAssignShow" class="cusButton cusWhite operateButton"
                     @click="superviseAssignClick">
                    督导分派
                </div>
                <div v-if="buttonControl.operatorAssignShow" class="cusButton cusWhite operateButton"
                     @click="appointOperator">
                    指派执行人
                </div>
                <div v-if="buttonControl.exportDataShow" class="cusButton cusWhite operateButton" @click="exportData">
                    导出数据
                </div>
                <div v-if="buttonControl.changeOperatorShow" class="cusButton cusWhite operateButton"
                     @click="changeOperator">
                    调整执行人
                </div>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    @select="handleSelectOne"
                    @select-all="handleSelectAll"
                    empty-text="暂无数据～"
                    @selection-change="handleSelectionChange"
                    border
                    style="width: 100%;margin-top: 16px;">
                <el-table-column
                        type="selection"
                        width="35"
                >
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
                        width="115"
                        align="center"
                        label="异常数">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" placement="top">
                            <template slot="content">
                                <div slot="content">
                                    <span v-if="scope.row.codeA">{{changeAbnormalStatus('codeA')}} ：{{scope.row.codeA}}</span>
                                </div>
                                <div slot="content">
                                    <span v-if="scope.row.codeB">{{changeAbnormalStatus('codeB')}} ：{{scope.row.codeB}}</span>
                                </div>
                                <div slot="content">
                                    <span v-if="scope.row.codeC">{{changeAbnormalStatus('codeC')}} ：{{scope.row.codeC}}</span>
                                </div>
                                <div slot="content">
                                    <span v-if="scope.row.codeD">{{changeAbnormalStatus('codeD')}} ：{{scope.row.codeD}}</span>
                                </div>
                            </template>
                            <div class="tableRowDetail">
                                {{totalAbnormalStatusTotal(scope.row)}}
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
                        prop="checkStartTime"
                        label="分派时间">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="170"
                        prop="checkEndTime"
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
                        prop="superviseCharge"
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
        <warAssign v-if="warAssignShow" v-model="warAssignShow" :warCheckList="warCheckList"
                   :distributors="distributors"></warAssign>
    </div>
</template>

<script>
    import {powerControlLib} from '../../assets/lib/powerControl'
    import {EventUtil} from '../../assets/lib/util'
    import loading from '../common/loading'
    import warAssign from './component/warAssign'

    export default {
        components: {
            loading,
            warAssign
        },
        mounted() {
            let _this = this;
            EventUtil.add(window, 'scroll', this.windowScroll);
            this.loadingShow();
            if (this.userLevel != 'D' && this.userLevel != 'DE') {
                this.searchData.warCheck = sessionStorage.warcode;
                this.searchUseData.warCheck = sessionStorage.warcode;
            }
            if (this.userLevel == 'B' || this.userLevel == 'E' || this.userLevel == 'WE' || this.userLevel == 'KE' || this.userLevel == 'TE') {
                this.searchData.warOperatorValue = sessionStorage.userid;
                this.searchUseData.warOperatorValue = sessionStorage.userid;
                this.searchData.warOperator = sessionStorage.username;
                this.searchUseData.warOperator = sessionStorage.username;
            }
            if (this.userLevel == 'DE') {
                this.searchData.superviseCharge = sessionStorage.username;
                this.searchUseData.superviseCharge = sessionStorage.username;
                this.searchData.superviseChargeValue = sessionStorage.userid;
                this.searchUseData.superviseChargeValue = sessionStorage.userid;
            }
            this.buttonControl = powerControlLib(this.userLevel, this.$route.name);
            let searchUseData = _this.$store.state[_this.searchUseData.currentRouterName].searchUseData;
            for (let ke in searchUseData) {
                _this.searchUseData[ke] = searchUseData[ke];
            }
            this.$http.all([this.getWarCheckList(), this.getWarBelongList(), this.getDistributorList(), this.getList()])
                .then(this.$http.spread((war, warBelong, distributor, list) => {
                    _this.tableData = list.data.data.list;
                    _this.tableTotal = list.data.data.total;
                    _this.warCheckList = war.data.data;
                    _this.warBelongList = warBelong.data.data;
                    _this.distributorList = distributor.data.data;
                    let searchData = _this.$store.state[_this.searchData.currentRouterName].searchData;
                    let scrollY = _this.$store.state[_this.searchData.currentRouterName].scrollY;
                    setTimeout(function () {
                        for (let key in searchData) {
                            _this.searchData[key] = searchData[key];
                        }
                        _this.scrollToHistory(scrollY);
                        _this.loadingCancel();
                    }, 500);
                    // 两个请求现在都执行完成
                })).catch(function (error) {
                console.log(error);
            });
        },
        beforeDestroy() {
            this.$store.commit('saveSearchData', this.searchData);
            this.$store.commit('saveSearchUseData', this.searchData);
            this.$store.commit('scrollToY', {module: this.searchData.currentRouterName, scrollY: this.scrollInfo['y']});
            EventUtil.remove(window, 'scroll', this.windowScroll);
        },
        watch: {},
        computed: {
            userLevel: function () {
                return sessionStorage.roleid;
            },
            pageSize: function () {
                return this.$store.state[this.searchData.currentRouterName].pageSize;
            },
            currentPage: function () {
                return this.$store.state[this.searchData.currentRouterName].currentPage;
            }
        },
        data: function () {
            return {
                multipleSelection: [],
                distributors: [],
                loadingStatus: false,
                warAssignShow: '',
                buttonControl: {},
                scrollInfo: {},
                /** 查询条件开始 */
                searchData: {
                    currentRouterName: JSON.parse(JSON.stringify(this.$route.name)),
                    warCheck: '',
                    warCharge: '',
                    warChargeValue: '',
                    warOperator: '',
                    warOperatorValue: '',
                    superviseCharge: '',
                    superviseChargeValue: '',
                    checkStatus: '',
                    superviseStatus: '',
                    warBelong: '',
                    distributor: '',
                    abnormalLargeCategory: '',
                    abnormalSmallCategory: '',
                    createDate: [],
                    assignDate: [],
                    endDate: [],
                },
                searchUseData: {
                    currentRouterName: JSON.parse(JSON.stringify(this.$route.name)),
                    warCheck: '',
                    warCharge: '',
                    warChargeValue: '',
                    warOperator: '',
                    warOperatorValue: '',
                    superviseCharge: '',
                    superviseChargeValue: '',
                    checkStatus: '',
                    superviseStatus: '',
                    warBelong: '',
                    distributor: '',
                    abnormalLargeCategory: '',
                    abnormalSmallCategory: '',
                    createDate: [],
                    assignDate: [],
                    endDate: [],
                },
                clearable: true,
                warCheckList: [],
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
                warBelongList: [],
                distributorList: [],
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
                abnormalSmallCategoryList: [],
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
                pageSizes: [10, 15, 20, 50],
                tableTotal: 0,
                routerToNum: 1,
                /** 分页配置结束 */
                currentData: {},
                tableData: [],
                checkData: [],
                checkDataId: [],
                focusTime: 0,
            }
        },
        methods: {
            loadingShow: function () {
                this.loadingStatus = true;
            },
            loadingCancel: function () {
                this.loadingStatus = false;
            },
            messagePrompt: function (way, info) {
                this.loadingCancel();
                this.$message({message: info, type: way});
                this.getListInfo();
            },
            warOperatorClass() {
                let temp_class = 'searchLabel';
                temp_class += this.searchData.warOperator ? ' has' : ' empty';
                if (this.userLevel == 'B' || this.userLevel == 'E' || this.userLevel == 'WE' || this.userLevel == 'KE' || this.userLevel == 'TE') {
                    temp_class += ' disabled';
                }
                return temp_class;
            },
            superviseChargeClass() {
                let temp_class = 'searchLabel';
                temp_class += this.searchData.superviseCharge ? ' has' : ' empty';
                if (this.userLevel == 'DE') {
                    temp_class += ' disabled';
                }
                return temp_class;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                let distributors = [];
                this.multipleSelection.map(item => {
                    distributors.push(item.id);
                })
                this.distributors = distributors;
            },
            windowScroll: function () {
                if (window.pageXOffset) {
                    this.scrollInfo = {
                        x: window.pageXOffset,
                        y: window.pageYOffset
                    }
                } else {
                    this.scrollInfo = {
                        x: document.body.scrollLeft + document.documentElement.scrollLeft,
                        y: document.body.scrollTop + document.documentElement.scrollTop
                    }
                }
            },
            scrollToHistory: function (y) {
                document.documentElement.scrollTop = y;
            },
            warAssignClick() {
                // 战区分派
                this.warAssignShow = !this.warAssignShow;
            },
            getDdWarOperator() {
                if (!(this.userLevel == 'B' || this.userLevel == 'E' || this.userLevel == 'WE' || this.userLevel == 'KE' || this.userLevel == 'TE')) {
                    this.getddPersonInfo('changeSearchWarOperator');
                }
            },
            changeSearchWarOperator(userInfo) {
                let users = userInfo.users[0];
                this.searchData.warOperator = users.name;
                this.searchData.warOperatorValue = users.emplId;
            },
            getDdWarCharge() {
                this.getddPersonInfo('changeSearchWarCharge');
            },
            changeSearchWarCharge(userInfo) {
                let users = userInfo.users[0];
                this.searchData.warCharge = users.name;
                this.searchData.warChargeValue = users.emplId;
            },
            getDdSuperviseCharge() {
                if (!this.userLevel == 'DE') {
                    this.getddPersonInfo('changeSearchSuperviseCharge');
                }
            },
            changeSearchSuperviseCharge(userInfo) {
                let users = userInfo.users[0];
                this.searchData.superviseCharge = users.name;
                this.searchData.superviseChargeValue = users.emplId;
            },
            getddPersonInfo(func) {
                var _this = this;
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
                        _this[func](result);
                    },
                    onFail: function (err) {

                    }
                });
            },
            superviseAssignHandle(result) {
                let superviseChargeName = result.users[0].name;
                let superviseChargeId = result.users[0].emplId;
                this.$http.post(`/api/ddadapter/openApi/data`, {
                    "code": "00711ZI07",
                    "data": {
                        'superviseChargeId': superviseChargeId,
                        'superviseChargeName': superviseChargeName,
                        'distributors': this.distributors
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                }).then(res => {
                    let way = Number(res.data.statusCode) === 200 ? 'success' : 'error';
                    this.messagePrompt(way, res.data.message);
                });
            },
            appointOperatorHandle(result) {
                let warOperatorName = result.users[0].name;
                let warOperatorId = result.users[0].emplId;
                this.$http.post(`/api/ddadapter/openApi/data`, {
                    "code": "00711ZI08",
                    "data": {
                        'warOperatorId': warOperatorId,
                        'warOperatorName': warOperatorName,
                        'distributors': this.distributors
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                }).then(res => {
                    let way = Number(res.data.statusCode) === 200 ? 'success' : 'error';
                    this.messagePrompt(way, res.data.message);
                });
            },
            superviseAssignClick() {
                this.getddPersonInfo('superviseAssignHandle');
            },
            appointOperator() {
                this.getddPersonInfo('appointOperatorHandle');
            },
            exportData() {
                console.log(this.windowScroll())
            },
            changeOperator() {

            },
            totalAbnormalStatusTotal(e) {
                return e.codeA + e.codeB + e.codeC + e.codeD;
            },
            changeAbnormalStatus(obj) {
                let codeResult = {codeA: '作业层级异动', codeB: '跨渠道异动', codeC: '跨客户异动', codeD: '跨区域异动'};
                return codeResult[obj];
            },
            searchDataClick: function () {
                this.searchUseData = JSON.parse(JSON.stringify(this.searchData));
                this.currentChange(1);
            },
            clearRowSearch(t) {
                for (let i = 0; i < t.length; i++) {
                    if (t[i] == 'warOperator' || t[i] == 'warOperatorValue') {
                        if (!(this.userLevel == 'B' || this.userLevel == 'E' || this.userLevel == 'WE' || this.userLevel == 'KE' || this.userLevel == 'TE')) {
                            this.searchData[t[i]] = '';
                        }
                    }else if(t[i] == 'superviseCharge' || t[i] == 'superviseChargeValue'){
                        if(!this.userLevel == 'DE'){
                            this.searchData[t[i]] = '';
                        }
                    } else {
                        this.searchData[t[i]] = '';
                    }
                }
            },
            clearDataClick: function () {
                if (this.userLevel == 'D' || this.userLevel == 'DE') {
                    this.searchData.warCheck = '';
                    this.searchUseData.warCheck = '';
                }
                this.searchData.warCharge = '';
                this.searchUseData.warCharge = '';
                this.searchData.warChargeValue = '';
                this.searchUseData.warChargeValue = '';
                if (!(this.userLevel == 'B' || this.userLevel == 'E' || this.userLevel == 'WE' || this.userLevel == 'KE' || this.userLevel == 'TE')) {
                    this.searchData.warOperator = '';
                    this.searchUseData.warOperator = '';
                    this.searchData.warOperatorValue = '';
                    this.searchUseData.warOperatorValue = '';
                }
                if (!this.userLevel == 'DE') {
                    this.searchData.superviseCharge = '';
                    this.searchUseData.superviseCharge = '';
                    this.searchData.superviseChargeValue = '';
                    this.searchUseData.superviseChargeValue = '';
                }
                this.searchData.checkStatus = '';
                this.searchUseData.checkStatus = '';
                this.searchData.superviseStatus = '';
                this.searchUseData.superviseStatus = '';
                this.searchData.warBelong = '';
                this.searchUseData.warBelong = '';
                this.searchData.distributor = '';
                this.searchUseData.distributor = '';
                this.searchData.abnormalLargeCategory = '';
                this.searchUseData.abnormalLargeCategory = '';
                this.searchData.abnormalSmallCategory = '';
                this.searchUseData.abnormalSmallCategory = '';
                this.searchData.createDate = [];
                this.searchUseData.createDate = [];
                this.searchData.assignDate = [];
                this.searchUseData.assignDate = [];
                this.searchData.endDate = [];
                this.searchUseData.endDate = [];
            },
            handleRouterTo: function () {
                let routerToNum = JSON.parse(JSON.stringify(this.routerToNum));
                this.$store.commit('changeCurrentPage', {
                    module: this.searchData.currentRouterName,
                    currentPage: routerToNum
                });
                this.currentChange(routerToNum);
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
                this.$store.commit('saveOperateRow', {
                    module: this.searchData.currentRouterName,
                    operateRow: row
                });
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
                this.$store.commit('changePageSize', {
                    module: this.searchData.currentRouterName,
                    pageSize: val
                });
                this.currentChange(1);
            },
            currentChange: function (val) {
                this.$store.commit('changeCurrentPage', {
                    module: this.searchData.currentRouterName,
                    currentPage: val
                });
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
                this.abnormalSmallCategoryList = [];
                this.searchData.abnormalSmallCategory = '';
                this.$http.post(`/api/ddadapter/openApi/data`, {
                    "code": "00711ZI05",
                    "data": {
                        abnormal_type: this.searchData.abnormalLargeCategory
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                }).then(res => {
                    this.abnormalSmallCategoryList = res.data.data;
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
                    "code": "00711ZI03",
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
                    "code": "00711ZI03",
                    "data": {
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
                            warCheck: this.searchUseData.warCheck,
                            //战区负责人
                            warCharge: this.searchUseData.warChargeValue,
                            //战区执行人
                            warOperator: this.searchUseData.warOperatorValue,
                            //督导负责人
                            superviseCharge: this.searchUseData.superviseChargeValue,
                            //核查情况
                            checkStatus: this.searchUseData.checkStatus,
                            //督导情况
                            superviseStatus: this.searchUseData.superviseStatus,
                            //所属战区
                            warBelong: this.searchUseData.warBelong,
                            //经销商
                            distributor: this.searchUseData.distributor,
                            //异常大类
                            abnormalLargeCategory: this.searchUseData.abnormalLargeCategory,
                            //异常小类
                            abnormalSmallCategory: this.searchUseData.abnormalSmallCategory,
                            //创建日期
                            createDate: this.searchUseData.createDate,
                            //分派日期
                            checkStartTime: this.searchUseData.assignDate,
                            //截止日期
                            checkEndTime: this.searchUseData.endDate,
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
                    let tableData = res.data.data.list;
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
                    this.tableTotal = res.data.data.total;
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