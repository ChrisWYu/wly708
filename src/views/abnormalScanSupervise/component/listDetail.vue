<template>
    <div class="bodyContent">
        <div class="contentDetail">
            <div class="row">
                <div class="rowInline" style="vertical-align: top">
                    <p class="title">码源经销商</p>
                    <el-tooltip class="item" effect="dark" :content="codeSourceDistributor" placement="top-start">
                        <div class="searchLabel disabled has" style="overflow: hidden;">
                            {{codeSourceDistributor}}
                        </div>
                    </el-tooltip>

                </div>
                <div class="rowInline" style="vertical-align: top">
                    <p class="title">码源战区</p>
                    <div class="searchLabel disabled has">
                        {{codeSourceWar}}
                    </div>
                </div>
                <!--<div class="rowInline" style="vertical-align: top">-->
                <!--<p class="title">码源渠道</p>-->
                <!--<div class="searchLabel disabled has">-->
                <!--{{codeSourceChannel}}-->
                <!--<i class="icon iconfont iconweibiaoti&#45;&#45;3"></i>-->
                <!--</div>-->
                <!--</div>-->
                <div class="rowInline">
                    <p class="title">异常分类</p>
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
                    <p class="title">异常描述</p>
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
                <div class="rowInline" style="vertical-align: top">
                    <p class="title">异常扫码日期</p>
                    <div class="searchLabel disabled has">
                        {{createDate}}
                    </div>
                </div>
                <div class="rowInline">
                    <p class="title">物流码</p>
                    <el-input
                            class="expandInput"
                            placeholder="请输入"
                            v-model="searchData.logisticsCode">
                    </el-input>
                </div>
                <div class="rowInline">
                    <p class="title">扫码出库经销商</p>
                    <el-input v-model="searchData.scanOutDistributor" placeholder="请输入"></el-input>
                </div>
                <div class="rowInline">
                    <p class="title">扫码出库战区</p>
                    <el-select class="expandSelect" v-model="searchData.scanOutWar" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in scanOutWarList"
                                :key="item.war_code"
                                :label="item.war_name"
                                :value="item.war_code">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row">
                <div class="rowInline">
                    <p class="title">是否核查</p>
                    <el-select class="expandSelect" v-model="searchData.isWarCheck" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in isWarCheckList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">是否督导</p>
                    <el-select class="expandSelect" v-model="searchData.isSupervise" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in isSuperviseList"
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
                <div v-if="buttonControl.checkShow"
                     class="cusButton cusWhite operateButton"
                     @click="checkClick">
                    核查
                </div>
                <div v-if="buttonControl.superviseShow" class="cusButton cusWhite operateButton"
                     @click="superviseClick">
                    督导
                </div>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    @select="handleSelectOne"
                    @select-all="handleSelectAll"
                    border
                    empty-text="暂无数据～"
                    style="width: 100%;margin-top: 16px;">
                <el-table-column
                        type="selection"
                        width="35"
                >
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="logisticsCode"
                        label="物流码"
                        width="260">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="125"
                        prop="abnormalLargeCategory"
                        label="异常大类">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="400"
                        prop="abnormalSmallCategory"
                        label="异常明细">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="140"
                        prop="storeName"
                        label="终端名称">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="140"
                        prop="storeWar"
                        label="终端战区">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="140"
                        prop="storeInTime"
                        label="终端扫码时间">
                </el-table-column>
                <!--<el-table-column-->
                <!--show-overflow-tooltip-->
                <!--prop="codeSourceDistributor"-->
                <!--label="码源经销商"-->
                <!--width="140">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--show-overflow-tooltip-->
                <!--width="120"-->
                <!--prop="codeSourceWar"-->
                <!--label="码源战区">-->
                <!--</el-table-column>-->
                <el-table-column
                        show-overflow-tooltip
                        width="140"
                        prop="codeSourceChannel"
                        label="码源渠道">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="155"
                        prop="scanOutDistributor"
                        label="扫码出库经销商">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="140"
                        prop="scanOutWar"
                        label="扫码出库战区">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="140"
                        prop="scanOutChannel"
                        label="扫码出库渠道">
                </el-table-column>
                <!--<el-table-column-->
                <!--show-overflow-tooltip-->
                <!--width="145"-->
                <!--prop="scanOutNumber"-->
                <!--label="扫码出库单号">-->
                <!--</el-table-column>-->
                <el-table-column
                        show-overflow-tooltip
                        width="160"
                        prop="scanOutTime"
                        label="扫码出库时间">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="165"
                        prop="distributorInTime"
                        label="经销商入库时间">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="155"
                        prop="warOperator"
                        label="战区核查执行人">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="160"
                        prop="warCheckTime"
                        label="战区核查时间">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="185"
                        prop="warCheckMsg"
                        label="战区核查结果">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="170"
                        prop="warCheckDeal"
                        label="战区核查处理结果">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="125"
                        prop="superviseCharge"
                        label="督导负责人">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="160"
                        prop="superviseTime"
                        label="督导时间">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="125"
                        prop="superviseMsg"
                        label="督导结果">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="150"
                        prop="superviseDeal"
                        label="督导处理结果">
                </el-table-column>
                <!--<el-table-column-->
                <!--v-if="buttonControl.checkShow || buttonControl.superviseShow"-->
                <!--fixed="right"-->
                <!--label="操作"-->
                <!--width="100">-->
                <!--<template slot-scope="scope">-->
                <!--<div v-if="buttonControl.checkShow"-->
                <!--class="tableButtons"-->
                <!--@click="checkOne(scope.row)"><i-->
                <!--class="icon iconfont iconweibiaoti&#45;&#45;5"></i>-->
                <!--<p>核查</p></div>-->
                <!--<div v-if="buttonControl.superviseShow" class="tableButtons"-->
                <!--@click="superviseOne(scope.row)"><i-->
                <!--class="icon iconfont iconweibiaoti&#45;&#45;6"></i>-->
                <!--<p>督导</p></div>-->
                <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="currentChange"-->
            <!--layout="total, sizes, prev, pager, next, slot"-->
            <!--:page-size="pageSize"-->
            <!--:current-page="currentPage"-->
            <!--:total="tableTotal"-->
            <!--:page-sizes="pageSizes"-->
            <!--&gt;-->
            <!--<div class="routerTo">-->
            <!--<el-input-->
            <!--class="expandInput routerToInput"-->
            <!--v-model="routerToNum"-->
            <!--@blur="blurRouterTo()"-->
            <!--&gt;-->
            <!--</el-input>-->
            <!--<div class="routerToButton" @click="handleRouterTo()">-->
            <!--GO-->
            <!--</div>-->
            <!--</div>-->
            <!--</el-pagination>-->
            <div class="row" style="text-align: center;">
                <div class="cusButton cusWhite" @click="backTolast()" style="margin-right:20px;">返回</div>

                <div v-if="buttonControl.checkShow || buttonControl.superviseShow"
                     class="cusButton cusRed" @click="sureTolast()">提交
                </div>

            </div>
        </div>
        <checkOne v-if="checkOneShow" v-model="checkOneShow"
                  :currentData="currentData"></checkOne>
        <superviseOne v-if="superviseOneShow" v-model="superviseOneShow"
                      :currentData="currentData"></superviseOne>
        <checkBatch v-if="checkBatchShow" v-model="checkBatchShow"
                    :checkDataId="checkDataId"></checkBatch>
        <superviseBatch v-if="superviseBatchShow" v-model="superviseBatchShow"
                        :checkDataId="checkDataId"></superviseBatch>
        <loading v-if="loadingStatus" v-model="loadingStatus"></loading>
    </div>
</template>
<script>
    import checkOne from './checkOne'
    import superviseOne from './superviseOne'
    import checkBatch from './checkBatch'
    import superviseBatch from './superviseBatch'
    import loading from '../../common/loading'
    import {powerControlLib} from '../../../assets/lib/powerControl'

    export default {
        components: {
            superviseOne, superviseBatch, checkOne, checkBatch, loading
        },
        mounted() {
            let _this = this;
            this.loadingShow();
            this.buttonControl = powerControlLib(this.userLevel, 'abnormalScanSuperviseList');
            let operateRow = _this.$store.state['abnormalScanSuperviseList'].operateRow;
            this.operateRow = operateRow;
            this.codeSourceDistributor = operateRow.distributor;
            this.createDate = operateRow.createDate;
            this.codeSourceWar = operateRow.warBelong;
            this.codeSourceChannel = operateRow.channelBelong;
            this.$http.all([this.getScanOutWarList(), this.getScanOutChannelList(), this.getDetailList()])
                .then(this.$http.spread(function (scanOutWar, scanOutChannel, list) {
                    _this.tableData = list.data.data.list;
                    _this.tableTotal = list.data.data.total;
                    _this.scanOutWarList = scanOutWar.data.data;
                    _this.scanOutChannelList = scanOutChannel.data.data;
                    _this.loadingCancel();
                    // 两个请求现在都执行完成
                })).catch(function (error) {
                console.log(error);
            });
        },
        computed: {
            expDistributorId: function () {
                return this.$route.params.id;
            },
            userLevel: function () {
                return sessionStorage.roleid;
            },
        },
        watch: {
            currentChange: function () {
                this.getListInfo();
            }
        },
        data: function () {
            return {
                checkOneShow: false,
                checkBatchShow: false,
                superviseOneShow: false,
                superviseBatchShow: false,
                clearable: true,
                loadingStatus: false,
                buttonControl: {},
                /** 查询条件开始 */
                searchData: {
                    logisticsCode: '',
                    abnormalLargeCategory: '',
                    abnormalSmallCategory: '',
                    isWarCheck: '',
                    isSupervise: '',
                    scanOutDistributor: '',
                    scanOutWar: '',
                    scanOutChannel: ''
                },
                searchUseData: {
                    logisticsCode: '',
                    abnormalLargeCategory: '',
                    abnormalSmallCategory: '',
                    isWarCheck: '',
                    isSupervise: '',
                    scanOutDistributor: '',
                    scanOutWar: '',
                    scanOutChannel: ''
                },
                codeSourceDistributor: '',
                codeSourceWar: '',
                codeSourceChannel: '',
                createDate: '',
                abnormalSmallCategoryList: [],
                isWarCheckList: [
                    {
                        id: 2,
                        name: '是'
                    },
                    {
                        id: 1,
                        name: '否'
                    }
                ],
                isSuperviseList: [
                    {
                        id: 2,
                        name: '是'
                    },
                    {
                        id: 1,
                        name: '否'
                    }
                ],
                scanOutWarList: [],
                scanOutChannelList: [],
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
                /** 查询条件结束 */
                /** 分页配置开始 */
                pageSize: 10,
                pageSizes: this.$store.state.pageSizes,
                currentPage: 1,
                tableTotal: 0,
                routerToNum: 1,
                /** 分页配置结束 */
                operateRow: {},
                currentData: {},
                tableData: [],
                checkData: [],
                checkDataId: [],
                timer: {},
                currentPageCheck: [],
            }
        },
        methods: {
            loadingShow: function () {
                this.loadingStatus = true;
            },
            loadingCancel: function () {
                this.loadingStatus = false;
            },
            checkCheckBoxValue() {
                let result = true;
                if (this.checkDataId.length === 0) {
                    this.$message({message: '请勾选需要核查的物流码', type: 'error'});
                    result = false;
                }
                return result;
            },
            checkClick: function () {
                if (!this.checkCheckBoxValue()) {
                    return false;
                }
                this.checkBatchShow = !this.checkBatchShow;
            },
            superviseClick: function () {
                if (!this.checkCheckBoxValue()) {
                    return false;
                }
                this.superviseBatchShow = !this.superviseBatchShow;
            },
            sureTolast: function () {
                this.$http.post("/api/ddadapter/openApi/data", {
                        "code": "00711ZI11",
                        "data": {
                            'expDistributorId': this.$route.params.id,
                            'roleid': sessionStorage.getItem("roleid")
                        }
                    }, {
                        headers: {
                            'content-type': 'application/json',
                        },
                    }
                ).then(res => {
                    let way = Number(res.data.statusCode) === 200 ? 'success' : 'error';
                    // this.messagePrompt(way, res.data.msg)
                    this.backTolast();
                }, error => {
                    console.log(error);
                    this.backTolast();
                });
            },
            backTolast: function () {
                this.$router.push({
                    name: 'abnormalScanSuperviseList'
                });
            },
            searchDataClick: function () {
                this.searchUseData = JSON.parse(JSON.stringify(this.searchData));
                this.checkData = [];
                this.checkDataId = [];
                this.currentChange(1);
            },
            clearDataClick: function () {
                this.searchData.logisticsCode = '';
                this.searchData.abnormalLargeCategory = '';
                this.searchData.abnormalSmallCategory = '';
                this.searchData.isWarCheck = '';
                this.searchData.isSupervise = '';
                this.searchData.scanOutDistributor = '';
                this.searchData.scanOutWar = '';
                this.searchData.scanOutChannel = '';

                this.searchUseData.logisticsCode = '';
                this.searchUseData.abnormalLargeCategory = '';
                this.searchUseData.abnormalSmallCategory = '';
                this.searchUseData.isWarCheck = '';
                this.searchUseData.isSupervise = '';
                this.searchUseData.scanOutDistributor = '';
                this.searchUseData.scanOutWar = '';
                this.searchUseData.scanOutChannel = '';
            },
            superviseOne: function (row) {
                this.currentData = row;
                this.superviseOneShow = !this.superviseOneShow;

            },
            checkOne: function (row) {
                this.currentData = row;
                this.checkOneShow = !this.checkOneShow;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.currentChange(1);
            },
            currentChange: function (e) {
                this.currentPage = e;
                this.getListInfo();
            },
            handleRouterTo: function () {
                this.currentChange(JSON.parse(JSON.stringify(this.routerToNum)));
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
            handleSelectOne: function (ar, ob) {
                let dataIndex = this.checkDataId.indexOf(ob.id);
                if (dataIndex === -1) {
                    this.checkData.push(ob);
                    this.checkDataId.push(ob.id);
                } else {
                    this.checkData.splice(dataIndex, 1);
                    this.checkDataId.splice(dataIndex, 1);
                }
            },
            handleSelectAll: function (ar) {
                let tableData = this.tableData;
                let checkData = JSON.parse(JSON.stringify(this.checkData));
                let checkDataId = JSON.parse(JSON.stringify(this.checkDataId));
                let dataIndex;
                if (ar.length > 0) {
                    for (let i = 0; i < tableData.length; i++) {
                        dataIndex = checkDataId.indexOf(tableData[i].id);
                        if (dataIndex === -1) {
                            checkData.push(tableData[i]);
                            checkDataId.push(tableData[i].id);
                        }
                    }
                } else {
                    for (let i = 0; i < tableData.length; i++) {
                        dataIndex = checkDataId.indexOf(tableData[i].id);
                        if (dataIndex !== -1) {
                            checkData.splice(dataIndex, 1);
                            checkDataId.splice(dataIndex, 1);
                        }
                    }
                }
                this.checkData = checkData;
                this.checkDataId = checkDataId;
            },
            /** 数据请求开始 */
            getScanOutChannelList: function () {
                return this.$http.post("/api/ddadapter/openApi/data", {
                    "code": "15",
                    "data": {
                        expDistributorId: this.expDistributorId,
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getScanOutWarList: function () {
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
            getDetailList: function () {
                let operateRow = this.$store.state['abnormalScanSuperviseList'].operateRow;
                return this.$http.post("/api/ddadapter/openApi/data", {
                        "code": "00711ZI02",
                        "data": {
                            // //当前页数
                            // currentPage: this.currentPage,
                            // //每页条数
                            // pageSize: this.pageSize,
                            //当前页数
                            currentPage: 1,
                            //每页条数
                            pageSize: this.totalAbnormalStatusTotal(operateRow),
                            //物流码
                            logisticsCode: this.searchUseData.logisticsCode,
                            //异常大类
                            abnormalLargeCategory: this.searchUseData.abnormalLargeCategory,
                            //异常明细
                            abnormalSmallCategory: this.searchUseData.abnormalSmallCategory,
                            //战区是否核查
                            isWarCheck: this.searchUseData.isWarCheck,
                            //是否督导
                            isSupervise: this.searchUseData.isSupervise,
                            //扫码出库经销商
                            scanOutDistributor: this.searchUseData.scanOutDistributor,
                            //扫码出库战区
                            scanOutWar: this.searchUseData.scanOutWar,
                            //扫码出库渠道
                            scanOutChannel: this.searchUseData.scanOutChannel,
                            //异常扫码内容id
                            expDistributorId: this.expDistributorId
                        }
                    }, {
                        headers: {
                            'content-type': 'application/json',
                        },
                    }
                );
            },
            totalAbnormalStatusTotal(e) {
                return e.codeA + e.codeB + e.codeC + e.codeD;
            },
            getListInfo() {
                this.loadingShow();
                this.getDetailList().then((res) => {
                    let tableData = res.data.data.list;
                    this.tableTotal = res.data.data.total;
                    this.tableData = tableData;
                    let checkId = JSON.parse(JSON.stringify(this.checkDataId));
                    let currentPageCheck = [];
                    for (let i = 0; i < tableData.length; i++) {
                        if (checkId.indexOf(tableData[i].id) !== -1) {
                            currentPageCheck.push(tableData[i]);
                        }
                    }
                    this.currentPageCheck = currentPageCheck;
                    this.timer = setTimeout(this.renderTableCheck, 100);
                });
            },
            renderTableCheck() {
                let is_check = document.querySelector('.el-checkbox__input.is-checked');
                if (is_check || this.currentPageCheck.length === 0) {
                    clearTimeout(this.timer);
                    this.loadingCancel();
                } else {
                    this.currentPageCheck.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row, true);
                    });
                    this.timer = setTimeout(this.renderTableCheck, 100);
                }
            },
            /** 数据请求结束 */
        }
    }
</script>
<style>

</style>