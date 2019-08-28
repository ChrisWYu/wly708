<template>
    <div>
        <el-dialog
                class="checkBatch"
                title="核查"
                :visible.sync="dialogVisible"
                width="452px"
                :close-on-click-modal="closeOnClickModal"
                :before-close="close"
        >
            <div class="row">日期</div>
            <el-date-picker style="margin-top: 5px;" class="expandDateSelect"
                            v-model="date"
                            type="date"
                            disabled
                            value-format
                            placeholder="请选择">
            </el-date-picker>
            <!--<div class="row" style="margin-top: 20px;">处理结果</div>-->
            <!--<el-input style="margin-top: 10px;" class="expandTextarea" type="textarea" v-model="describe"-->
            <!--placeholder="请输入"></el-input>-->
            <div class="row" style="margin-top: 10px;">核查结果</div>
            <el-select style="margin-top: 5px;" class="expandSelect" v-model="checkResult" placeholder="请选择"
                       :clearable=true>
                <el-option
                        v-for="item in checkResultList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <div class="row" style="margin-top: 10px;">其他核查结果描述</div>
            <el-input style="margin-top: 5px;" class="expandTextarea" type="textarea" v-model="checkResultDescribe"
                      placeholder="请输入" :disabled="checkResult != '4'"></el-input>
            <div class="row" style="margin-top: 10px;">处理结果</div>
            <el-select style="margin-top: 5px;" class="expandSelect" v-model="handleResult" placeholder="请选择"
                       :clearable=true>
                <el-option
                        v-for="item in handleResultList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <div class="row" style="margin-top: 10px;">其他处理结果描述</div>
            <el-input style="margin-top: 5px;" class="expandTextarea" type="textarea" v-model="handleResultDescribe"
                      placeholder="请输入"></el-input>
            <span slot="footer" class="dialog-footer">
                <div class="cusButton cusWhite" @click="close" style="margin-right: 20px;">取消</div>
                <div class="cusButton cusRed" @click="confirm">确定</div>
            </span>
        </el-dialog>
        <loading v-if="loadingStatus" v-model="loadingStatus"></loading>
    </div>
</template>

<script>
    import loading from '../../common/loading'

    export default {
        props: ['checkDataId'],
        mounted() {
            this.date = (new Date()).toLocaleDateString();
        },
        components: {
            loading
        },
        data: function () {
            return {
                closeOnClickModal: false,
                loadingStatus: false,
                dialogVisible: true,
                date: '',
                checkResult: '',
                checkResultList: [
                    {
                        id: '1',
                        name: '经销商（终端）相关人员违规操作',
                    },
                    {
                        id: '2',
                        name: '网络原因',
                    },
                    {
                        id: '3',
                        name: '公司系统原因',
                    },
                    {
                        id: '4',
                        name: '其他',
                    }
                ],
                checkResultDescribe: '',
                handleResult: '',
                handleResultList: [
                    {
                        id: '1',
                        name: '限期整改',
                    },
                    {
                        id: '2',
                        name: '黄牌警告',
                    },
                    {
                        id: '3',
                        name: '战区（联谊会）通报',
                    },
                    {
                        id: '4',
                        name: '调减绑定终端数量',
                    },
                    {
                        id: '5',
                        name: '取消1218评优评级资格',
                    },
                    {
                        id: '6',
                        name: '调整合同计划量',
                    },
                    {
                        id: '7',
                        name: '终止合作',
                    },
                    {
                        id: '8',
                        name: '其它',
                    }
                ],
                handleResultDescribe: ''
            }
        },
        methods: {
            messagePrompt: function (way, info) {
                this.loadingCancel();
                this.$message({message: info, type: way});
                if (way === 'success') {
                    this.$parent.getListInfo();
                    this.close();
                }
            },
            loadingShow: function () {
                this.loadingStatus = true;
            },
            loadingCancel: function () {
                this.loadingStatus = false;
            },
            close() {
                this.$emit('input', false);
            },
            confirm() {
                this.loadingShow();
                if (this.checkResult === '') {
                    this.messagePrompt('warning', '核查结果不能为空！');
                    return;
                }
                if (this.checkResult === '4' && this.checkResultDescribe === '') {
                    this.messagePrompt('warning', '其他核查结果描述不能为空！');
                    return;
                } else {
                    this.checkResultDescribe = '';
                }
                if (this.handleResult === '') {
                    this.messagePrompt('warning', '处理结果不能为空！');
                    return;
                }
                if (this.handleResultDescribe === '') {
                    this.messagePrompt('warning', '其他处理结果描述不能为空！');
                    return;
                }
                let data = {
                    'checkResult': this.checkResult,
                    'dealResult': this.handleResult,
                    'checkOther': this.checkResultDescribe,
                    'dealOther': this.handleResultDescribe,
                    'datetime': this.date,
                    'codeIds': this.checkDataId
                };
                this.$http.post("/api/ddadapter/openApi/data", {
                        "code": "00711ZI09",
                        "data": data
                    }, {
                        headers: {
                            'content-type': 'application/json',
                        },
                    }
                ).then(res => {
                    let way = Number(res.data.statusCode) === 200 ? 'success' : 'error';
                    this.messagePrompt(way, res.data.message)
                }, error => {
                    this.loadingCancel();
                    this.messagePrompt('error', '服务器错误！');
                });
            }
        }
    }
</script>
<style>
    .checkBatch .el-dialog {
        margin-top: -311px !important;
        top: 50%;
    }

    .checkBatch .el-dialog__body {
        padding: 0 22px;
    }

    .checkBatch .expandTextarea textarea {
        min-height: 120px !important;
    }

    .checkBatch .el-textarea__inner:focus {
        border-color: #F13D3D !important
    }
</style>