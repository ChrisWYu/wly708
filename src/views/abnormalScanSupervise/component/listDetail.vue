<template>
    <div class="bodyContent">
        <div class="contentDetail">
            <div class="row">
                <div class="rowInline">
                    <p class="title">物流码</p>
                    <el-input
                            class="expandInput"
                            placeholder="请输入"
                            v-model="logisticsCode">
                    </el-input>
                </div>
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
                    <p class="title">异常明细</p>
                    <el-select class="expandSelect" v-model="abnormalDetail" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in abnormalDetailList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">战区是否核查</p>
                    <el-select class="expandSelect" v-model="warIsCheck" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in warIsCheckList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row">
                <div class="rowInline">
                    <p class="title">是否督导</p>
                    <el-select class="expandSelect" v-model="isSupervise" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in isSuperviseList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">码源经销商</p>
                    <el-select class="expandSelect" v-model="codeSourceDistributor" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in codeSourceDistributorList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">码源战区</p>
                    <el-select class="expandSelect" v-model="codeSourceWar" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in codeSourceWarList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">码源渠道</p>
                    <el-select class="expandSelect" v-model="codeSourceChannel" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in codeSourceChannelList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row">
                <div class="rowInline">
                    <p class="title">扫码出库经销商</p>
                    <el-select class="expandSelect" v-model="scanOutDistributor" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in scanOutDistributorList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">扫码出库战区</p>
                    <el-select class="expandSelect" v-model="scanOutWar" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in scanOutWarList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline">
                    <p class="title">扫码出库渠道</p>
                    <el-select class="expandSelect" v-model="scanOutChannel" placeholder="请选择"
                               :clearable="clearable">
                        <el-option
                                v-for="item in scanOutChannelList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rowInline" style="white-space: nowrap;">
                    <div class="cusButton cusRed" @click="searchData">查询</div>
                    <div class="cusButton cusWhite" @click="clearData" style="margin-left: 20px;">重置</div>
                </div>
            </div>
            <hr style="margin-top: 10px; height:2px;border:none;border-top:2px dotted rgb(238,238,238);"/>
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
                        width="35">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="logisticsCode"
                        label="物流码"
                        width="140">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="codeSourceDistributor"
                        label="码源经销商"
                        width="140">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="120"
                        prop="codeSourceWar"
                        label="码源战区">
                </el-table-column>
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
                <el-table-column
                        show-overflow-tooltip
                        width="145"
                        prop="scanOutNumber"
                        label="扫码出库单号">
                </el-table-column>
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
                        width="125"
                        prop="abnormalLargeCategory"
                        label="异常大类">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="125"
                        prop="abnormalDetail"
                        label="异常明细">
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
                        width="165"
                        prop="warCheckResult"
                        label="战区核查结果">
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
                        prop="superviseResult"
                        label="督导结果">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="170">
                    <template slot-scope="scope">
                        <div v-if="userLevel == 'E'|| userLevel == 'B'" class="tableButtons" @click="checkOne(scope.row)"><i
                                class="icon iconfont iconweibiaoti--5"></i>
                            <p>核查</p></div>
                        <div v-if="userLevel == 'DE'" style="margin-left: 18px;" class="tableButtons"
                             @click="superviseOne(scope.row)"><i
                                class="icon iconfont iconweibiaoti--6"></i>
                            <p>督导</p></div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    hide-on-single-page
                    @size-change="handleSizeChange"
                    @current-change="currentChange"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    :total="tableTotal"
                    :page-sizes="pageSizes"
            >
            </el-pagination>
            <div class="row" style="text-align: center;">
                <div class="cusButton cusWhite" @click="backTolast()">返回</div>
            </div>
        </div>
        <checkOne v-if="checkOneShow" v-model="checkOneShow"
                  :currentData="currentData"></checkOne>
        <superviseOne v-if="superviseOneShow" v-model="superviseOneShow"
                      :currentData="currentData"></superviseOne>
        <loading v-if="loadingStatus" v-model="loadingStatus"></loading>
    </div>
</template>
<script>
    import checkOne from './checkOne'
    import superviseOne from './superviseOne'
    import loading from '../../common/loading'

    export default {
        components: {
            superviseOne, checkOne, loading
        },
        mounted() {
            let _this = this;
            _this.loadingShow();
            this.$http.all([this.getAbnormalLargeCategoryList(), this.getAbnormalDetailList(), this.getCodeSourceDistributorList(), this.getCodeSourceWarList(), this.getCodeSourceChannelList(), this.getScanOutDistributorList(), this.getScanOutWarList(), this.getScanOutChannelList(), this.getDetailList()])
                .then(this.$http.spread(function (abnormalLargeCategory, abnormalDetail, codeSourceDistributor, codeSourceWar, codeSourceChannel, scanOutDistributor, scanOutWar, scanOutChannel, list) {
                    _this.tableData = list.data.data;
                    _this.tableTotal = list.data.count;
                    _this.abnormalLargeCategoryList = abnormalLargeCategory.data.data;
                    _this.abnormalDetailList = abnormalDetail.data.data;
                    _this.codeSourceDistributorList = codeSourceDistributor.data.data;
                    _this.codeSourceWarList = codeSourceWar.data.data;
                    _this.codeSourceChannelList = codeSourceChannel.data.data;
                    _this.scanOutDistributorList = scanOutDistributor.data.data;
                    _this.scanOutWarList = scanOutWar.data.data;
                    _this.scanOutChannelList = scanOutChannel.data.data;
                    _this.loadingCancel();
                    // 两个请求现在都执行完成
                })).catch(function (error) {
                console.log(error);
            });
        },
        computed: {
            abnormalId: function () {
                return this.$route.params.id;
            },
            userLevel: function () {
                return sessionStorage.level;
            },
        },
        watch: {},
        data: function () {
            return {
                checkOneShow: false,
                superviseOneShow: false,
                clearable: true,
                loadingStatus: false,
                /** 查询条件开始 */
                logisticsCode: '',
                abnormalLargeCategory: '',
                abnormalLargeCategoryList: '',
                abnormalDetail: '',
                abnormalDetailList: '',
                warIsCheck: '',
                warIsCheckList: [
                    {
                        id: 1,
                        name: '是'
                    },
                    {
                        id: 2,
                        name: '否'
                    }
                ],
                isSupervise: '',
                isSuperviseList: [
                    {
                        id: 1,
                        name: '是'
                    },
                    {
                        id: 2,
                        name: '否'
                    }
                ],
                codeSourceDistributor: '',
                codeSourceDistributorList: '',
                codeSourceWar: '',
                codeSourceWarList: [],
                codeSourceChannel: '',
                codeSourceChannelList: [],
                scanOutDistributor: '',
                scanOutDistributorList: [],
                scanOutWar: '',
                scanOutWarList: [],
                scanOutChannel: '',
                scanOutChannelList: [],
                /** 查询条件结束 */
                /** 分页配置开始 */
                pageSize: 2,
                pageSizes: [2, 3, 4, 5],
                currentPage: 1,
                tableTotal: 0,
                /** 分页配置结束 */
                currentData: {},
                tableData: []
            }
        },
        methods: {
            loadingShow: function () {
                this.loadingStatus = true;
            },
            loadingCancel: function () {
                this.loadingStatus = false;
            },
            backTolast: function () {
                this.$router.push({
                    name: 'abnormalScanSuperviseList'
                });
            },
            searchData: function () {
                this.getListInfo();
            },
            clearData: function () {
                this.logisticsCode = '';
                this.abnormalLargeCategory = '';
                this.abnormalDetail = '';
                this.warIsCheck = '';
                this.isSupervise = '';
                this.codeSourceDistributor = '';
                this.codeSourceWar = '';
                this.codeSourceChannel = '';
                this.scanOutDistributor = '';
                this.scanOutWar = '';
                this.scanOutChannel = '';
            },
            handleSelectOne: function (ar, ob) {

            },
            handleSelectAll: function (ar) {

            },
            totalAbnormalSituation(e) {
                let total = 0;
                for (let i = 0; i < e.length; i++) {
                    total = e[i].count + total;
                }
                return total;
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
                this.getListInfo();
            },
            currentChange: function (e) {
                this.currentPage = e;
                this.getListInfo();
            },
            /** 数据请求开始 */
            getListInfo() {
                this.loadingShow();
                this.getDetailList().then((res) => {
                    this.tableData = res.data.data;
                    this.tableTotal = res.data.count;
                    this.loadingCancel();
                });
            },
            getScanOutChannelList: function () {
                return this.$http.post("/api/ddadapter/openApi/data", {
                    "code": "15",
                    "data": {
                        abnormalId: this.abnormalId,
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getScanOutWarList: function () {
                return this.$http.post("/api/ddadapter/openApi/data", {
                    "code": "15",
                    "data": {
                        abnormalId: this.abnormalId,
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getScanOutDistributorList: function () {
                return this.$http.post("/api/ddadapter/openApi/data", {
                    "code": "14",
                    "data": {
                        abnormalId: this.abnormalId,
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getCodeSourceChannelList: function () {
                return this.$http.post("/api/ddadapter/openApi/data", {
                    "code": "13",
                    "data": {
                        abnormalId: this.abnormalId,
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getCodeSourceWarList: function () {
                return this.$http.post("/api/ddadapter/openApi/data", {
                    "code": "12",
                    "data": {
                        abnormalId: this.abnormalId,
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getCodeSourceDistributorList: function () {
                return this.$http.post("/api/ddadapter/openApi/data", {
                    "code": "11",
                    "data": {
                        abnormalId: this.abnormalId,
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getAbnormalDetailList: function () {
                return this.$http.post("/api/ddadapter/openApi/data", {
                    "code": "10",
                    "data": {
                        abnormalId: this.abnormalId,
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getAbnormalLargeCategoryList: function () {
                return this.$http.post("/api/ddadapter/openApi/data", {
                    "code": "8",
                    "data": {
                        abnormalId: this.abnormalId,
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            getDetailList: function () {
                return this.$http.post("/api/ddadapter/openApi/data", {
                        "code": "00711ZI02",
                        "data": {
                            //当前页数
                            currentPage: this.currentPage,
                            //每页条数
                            pageSize: this.pageSize,
                            //物流码
                            logisticsCode: this.logisticsCode,
                            //异常大类
                            abnormalLargeCategory: this.abnormalLargeCategory,
                            //异常明细
                            abnormalDetail: this.abnormalDetail,
                            //战区是否核查
                            warIsCheck: this.warIsCheck,
                            //是否督导
                            isSupervise: this.isSupervise,
                            //码源经销商
                            codeSourceDistributor: this.codeSourceDistributor,
                            //码源战区
                            codeSourceWar: this.codeSourceWar,
                            //码源渠道
                            codeSourceChannel: this.codeSourceChannel,
                            //扫码出库经销商
                            scanOutDistributor: this.scanOutDistributor,
                            //扫码出库战区
                            scanOutWar: this.scanOutWar,
                            //扫码出库渠道
                            scanOutChannel: this.scanOutChannel,
                            //异常扫码内容id
                            abnormalId: this.abnormalId
                        }
                    }, {
                        headers: {
                            'content-type': 'application/json',
                        },
                    }
                );
            },
            /** 数据请求结束 */
        }
    }
</script>
<style>

</style>