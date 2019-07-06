<template>
    <div style="padding: 0px 20px;">
        <el-form :inline="true" :model="infos" style="text-align:left;margin: 20px 10px 0px 0px;">
            <el-row>
                <el-form-item>
                    <el-input @keyup.enter.native="onSubmit()" placeholder="请输入关键词信息，访销员姓名、终端名称"
                        v-model="infos.all_info" style="width:600px;" suffix-icon="el-icon-search">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <estrangsCloseDialogl-button style="background-color:#F13D3D;border: none" type="info" size="medium"
                        @click="getList()">搜索</estrangsCloseDialogl-button>
                </el-form-item>
            </el-row>
            <el-row>
                <!-- 战区 -->
                <el-select v-model="zOptions.warcode" placeholder="请选择战区"
                    style="width:140px;margin: 0px 10px 10px 0px;">
                    <el-option :key="zOptions.warcode" :label="zOptions.warname" :value="zOptions.warcode"></el-option>
                </el-select>
                <!-- 基地 -->
                <el-select v-model="jOptions.basecode" placeholder="请选择基地"
                    style="width:140px;margin: 0px 10px 10px 0px;">
                    <el-option :key="jOptions.basecode" :label="jOptions.basename" :value="jOptions.basecode">
                    </el-option>
                </el-select>
                <!-- 省 -->
                <el-select v-model="sValue" placeholder="请选择省份" v-on:change="sChange"
                    style="width:190px;margin: 0px 10px 10px 0px;">
                    <el-option v-for="item in sOptions" :key="item.provincecode" :label="item.provincename"
                        :value="item.provincecode"></el-option>
                </el-select>
                <!-- 市 -->
                <el-select v-model="cValue" placeholder="请选择市区" @change="cChange()"
                    style="width:210px;margin: 0px 10px 10px 0px;">
                    <el-option v-for="item in cOptions" :key="item.code" :label="item.name" :value="item.code">
                    </el-option>
                </el-select>
                <!-- 区 -->
                <el-select v-model="qValue" placeholder="请选择区/县" @change="qChange()"
                    style="width:210px;margin: 0px 10px 10px 0px;">
                    <el-option v-for="item in qOptions" :key="item.code" :label="item.name" :value="item.code">
                    </el-option>
                </el-select>
                <el-date-picker :clearable="false" v-model="value1" type="daterange" range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
                <el-button @click="toEmpty()" type="text" style="color:#F13D3D;margin-left: 10px;">清空搜索条件</el-button>
            </el-row>
        </el-form>

        <div style="float: left;font-size:16px;color:#333;font-weight:600;line-height:30px; margin: 10px 0px;">
            请选择模版
        </div>
        <el-row>
            <el-col :span="24">
                <el-button type="info" size="medium">全部</el-button>
                <el-button type="info" size="medium">合作终端</el-button>
                <el-button type="info" size="medium">异常报备</el-button>
                <el-button type="info" size="medium">陌生终端</el-button>
            </el-col>
        </el-row>
        <el-row>
            <br>
            <el-button type="info" size="medium" @click="toTemaInterview">合作终端走访</el-button>
            <el-button type="info" size="medium" @click="toAnomalyInfo">异常报备信息</el-button>
            <el-button type="info" size="medium" @click="toStranger">陌生终端信息</el-button>
        </el-row>
        <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
        <el-table :data="tableData" v-loading="loading" tooltip-effect="dark"
            :header-cell-style="{background:'#DBE4F3',color:'#333333'}" style="width: 100%;" border>
            <el-table-column prop="" label="终端编码" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="终端名称" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="走访类型" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="在店时长" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="是否窜货" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="是否低价" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="访销员姓名" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="访店日期" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small">详情</el-button>
                    <!-- <el-button type="text" size="small">建议</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <div class="page_right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="infos.page_size"
                layout="total, sizes, prev, pager, next, jumper" :total="page_num">
            </el-pagination>
        </div>

        <!-- 合作终端走访 -->
        <cooperationTerma :isVisibleCoprtion='isVisibleCoprtion' @coprtionCloseDialog='coprtionCloseDialog' 
            :coprtionData='coprtionData' />
        <!-- 异常报备信息 -->
        <anomaly :isVisibleAnomaly='isVisibleAnomaly' @anomalyCloseDialog='anomalyCloseDialog' 
            :anomalyData='anomalyData' />
        <!-- 陌生终端走访 -->
        <strangsTerma :isVisibleStrangs='isVisibleStrangs' @strangsCloseDialog='strangsCloseDialog' 
            :strangsData='strangsData' />
    </div>
</template>

<script>
    import * as api from '../../api/api';
    import cooperationTerma from "@/views/examineVisit/details/cooperationTerma";
    import anomaly from "@/views/examineVisit/details/anomaly";
    import strangsTerma from "@/views/examineVisit/details/strangsTerma";
    import proposal from "@/views/examineVisit/proposal";
    export default {
        components: { cooperationTerma,anomaly,strangsTerma,proposal },
        data() {
            return {
                loading: false,
                tableData: [],
                /**合作终端走访 */
                isVisibleCoprtion:false,
                coprtionData:[],
                /**异常报备信息 */
                isVisibleAnomaly:false,
                anomalyData:[],
                /**陌生终端走访 */
                isVisibleStrangs:false,
                strangsData:[],

                jValue: "",// 基地绑定值
                sValue: "",// 省绑定值
                cValue: "",// 市绑定值
                qValue: "", // 区绑定值
                qdata: [],// 区县json
                cdata: [],// 市json
                zOptions: {},// 市json
                jOptions: {},//基地
                sOptions: [],// 省json 省数组
                cOption: "",
                cOptions: [],// 市数组
                qOptions: [],// 区数组





                value1: '',
                currentPage: 1,
                // total: 0,
                page_num: 0,
                infos: {
                    tokenid: sessionStorage.getItem("tokenid"),
                    page_current: 1,
                    page_size: 10,
                    // all_info: "",
                    // store_type: "",
                    // bind_type: "",
                },
            }
        },
        methods: {
            //打开合作终端走访
            toTemaInterview(){
                this.isVisibleCoprtion = true;
            },
            //打开异常报备信息
            toAnomalyInfo(){
                this.isVisibleAnomaly = true
            },
            //打开陌生终端信息
            toStranger(){
                this.isVisibleStrangs = true
            },

            //清空搜索条件
            toEmpty() {

            },
            // 输入框回车事件
            onSubmit() {
                this.getList();
            },

            getList() {

            },

            // 省选择
            sChange(val) {
                let t = this;
                // 清空市、区
                this.cValue = "";
                this.qValue = "";
                this.qOptions = [];
                this.cOptions = [];
                let sfValue = {
                    "provinceCode": this.sValue,
                    "tokenid": sessionStorage.getItem("tokenid")
                }
                api.wlyareaCity(
                    {
                        "code": "00707SUA05",
                        "data": sfValue
                    }
                ).then(res => {
                    console.log(res)
                    this.cOptions = res.data.data;
                })
            },
            // 市选择
            cChange(val) {
                this.getList();
                // 清空区
                this.qOptions = [];
                this.qValue = "";
                let xcValue = {
                    "provinceCode": this.sValue,
                    "cityCode": this.cValue
                }
                let formF = JSON.stringify(xcValue);
                //  根据市的选择，给区组赋值
                api.wlyareaArea({
                    "code": "00707SUA06",
                    "data": xcValue
                }).then(res => {
                    console.log(res)
                    this.qOptions = res.data.data;
                })
            },
            // 区选择方法
            qChange() {
                this.getList();
            },







            //分页
            handleCurrentChange(size) {
                this.infos.page_current = size;
                this.getList()
            },
            handleSizeChange(val) {
                // 改变每页显示的条数 
                this.infos.page_size = val;
                //在改变每页显示的条数时，要将页码显示到第一页
                // this.currentPage = 1
                this.getList()
            },
            //关闭合作终端走访
            coprtionCloseDialog(){
                this.isVisibleCoprtion = false
            },
            //关闭异常报备信息
            anomalyCloseDialog(){
                this.isVisibleAnomaly = false
            },
            //关闭陌生终端走访
            strangsCloseDialog(){
                this.isVisibleStrangs = false
            },
        },

        created() {

        },
    }
</script>

<style scoped>
    .page_right {
        float: right;
        padding: 10px;
    }
</style>