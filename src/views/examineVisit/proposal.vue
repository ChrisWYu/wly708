<template>
    <el-dialog :close-on-click-modal="false" title="反馈意见" :visible.sync="isVisibleProposal" width="60%"
        :before-close="handleClose" :append-to-body="true" style="text-align: center;">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-checkbox v-model="form.checked">建议反馈信息将以工作通知的方式发送给访销员</el-checkbox>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="medium" @click="handleClose">取消</el-button>
            <el-button type="primary" size="medium" @click="toConfirm" :disabled="isDisable">确定
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    import * as api from '../../api/api'
    export default {
        name: '',
        props: ['isVisibleProposal','proposalData'],
        data() {
            return {
                form: {
                    checked: true
                },
                isDisable: false,//防止重复提交
            }
        },
        //关闭页面
        handleClose() {
            console.log()
        },

        //确定
        toConfirm() {

        },
    }
</script>