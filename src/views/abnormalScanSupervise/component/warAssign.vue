<template>
    <div>
        <el-dialog
                title="请选择要分派的战区"
                width="900px"
                height="500px"
                :visible.sync="dialogVisible"
                :close-on-click-modal="closeOnClickModal"
                :before-close="close"
        >
            <el-radio-group v-model="warValue">
                <el-radio class="Selection-radio" v-for="item in warCheckList" :key="item.war_code"
                          :label="item.war_code">{{item.war_name}}
                </el-radio>
            </el-radio-group>
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
        props: ['warCheckList'],
        mounted() {

        },
        components: {
            loading
        },
        data: function () {
            return {
                closeOnClickModal: false,
                loadingStatus: false,
                dialogVisible: true,
                warValue: '',
            }
        },
        methods: {
            messagePrompt: function (way, info) {
                this.loadingCancel();
                this.$message({message: info, type: way});
                if (way === 'success') {
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
                    'describe': this.describe,
                    'date': this.date,
                };
                this.$http.post(`/node/user/test`, {
                        //return this.$http.post("/api/ddadapter/openApi/data", {
                        "code": "18",
                        "data": data
                    }, {
                        headers: {
                            'content-type': 'application/json',
                        },
                    }
                ).then(res => {
                    let way = Number(res.data.code) === 200 ? 'success' : 'error';
                    this.messagePrompt(way, res.data.msg)
                }, error => {
                    console.log(error);
                }).catch(err => {
                    this.loadingCancel();
                })
            }
        }
    }
</script>
<style>
    .el-dialog {
        margin-top: 0 !important;
    }

    .Selection {
        padding: 20px;
        position: fixed;
        z-index: 99999;
        top: calc(50% - 250px);
        left: calc(50% - 450px);
        width: 900px;
        height: 500px;
        border: 1px solid #C80512;
        background: #ffffff;
    }

    .Selection-radio {
        float: left;
        width: 16%;
        margin-top: 5%;
    }
</style>