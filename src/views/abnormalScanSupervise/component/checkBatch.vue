<template>
    <div>
        <el-dialog
                title="督导"
                :visible.sync="dialogVisible"
                width="452px"
                :close-on-click-modal="closeOnClickModal"
                :before-close="close"
        >
            <div class="row">日期</div>
            <el-date-picker style="margin-top: 10px;" class="expandDateSelect"
                            v-model="date"
                            type="date"
                            disabled
                            value-format
                            placeholder="请选择">
            </el-date-picker>
            <div class="row" style="margin-top: 20px;">处理结果</div>
            <el-input style="margin-top: 10px;" class="expandTextarea" type="textarea" v-model="describe"
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
                describe: '',
                date: ''
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
                let data = {
                    'retvemo': this.describe,
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
    .el-dialog__body {
        padding: 20px 22px;
    }

    .expandTextarea textarea {
        min-height: 120px !important;
    }
</style>