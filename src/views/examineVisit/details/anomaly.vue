<template>
    <el-dialog :close-on-click-modal="false" title="异常报备" :visible.sync="isVisibleAnomaly" width="60%"
        :before-close="handleClose" style="text-align: center;">
        <div style="text-align: left;">
            <el-row>
                <el-col :span="24"><span>异常原因：其他</span></el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <span>其他异常描述：</span><br>
                <div style="margin-top: 5px;">
                    片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位
                </div>
            </el-row>
            <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
            <el-row style="margin-top: 10px;">
                <span>照片</span><br>
                <div style="margin-top: 5px;">
                        <br><br><br>
                </div>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
    import * as api from '../../../api/api'
    export default {
        name: 'anomaly',
        props: ['isVisibleAnomaly', 'anomalyData'],
        data() {
            return {

            }
        },
        methods:{
            //关闭页面
            handleClose() {
                this.$emit('anomalyCloseDialog');
            },
        }
        

    }
</script>