<template>
    <el-dialog :close-on-click-modal="false" title="陌生终端走访" :visible.sync="isVisibleStrangs" width="60%"
        :before-close="handleClose" style="text-align: center;">
        <div style="text-align: left;">
            <div>陌生终端信息收集</div>
            <br>
            <el-row class="t-row">
                <span>门头照</span><br>
                <div class="t-row-message">
                    <br><br><br>
                </div>
                <span>图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位</span>
            </el-row>
            <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
            <el-row class="t-row">
                <span>陈列照</span><br>
                <div class="t-row-message">
                    <br><br><br>
                </div>
                <span>图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位</span>
            </el-row>
            <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
            <el-row class="t-row">
                <span>其他</span><br>
                <div class="t-row-message">
                    <br><br><br>
                </div>
                <span>图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位</span>
            </el-row>
            <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
            <el-row class="t-row">
                <el-col :span="12">店主姓名：张占魁</el-col>
                <el-col :span="12">店主手机号： 18898990988</el-col>
            </el-row>
            <el-row class="t-row">
                <el-col :span="12">终端名称：思铭酒水专卖</el-col>
                <el-col :span="12">门店地址：四川省 宜宾市 翠屏区 五粮液大道 028 号</el-col>
            </el-row>
            <el-row class="t-row">
                <el-col :span="24">门店评价：门店极具开发价值</el-col>
            </el-row>
            <el-row class="t-row">
                <el-col :span="24">是否在现场注册：是</el-col>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
    import * as api from '../../../api/api'
    export default {
        name: 'strangsTerma',
        props: ['isVisibleStrangs', 'strangsData'],
        data() {
            return {

            }
        },

        methods: {
            //关闭页面
            handleClose() {
                this.$emit('strangsCloseDialog');
            },
        }


    }
</script>
<style scoped>
    .t-row {
        margin-top: 10px;
    }

    .t-row-message {
        margin-top: 5px;
    }
</style>