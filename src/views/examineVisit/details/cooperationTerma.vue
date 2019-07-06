<template>
    <el-dialog :close-on-click-modal="false" title="合作终端走访" :visible.sync="isVisibleCoprtion" width="70%"
        :before-close="handleClose" style="text-align: center;">
        <div v-loading="loading">
            <el-form :model="form" ref="form" style="text-align: left;">
                <el-tabs v-model="activeName" :tab-position="tabPosition" style="height: 500px;">
                    <el-tab-pane label="终端信息核查" name="terminal" style="height: 500px; overflow: auto;"> 
                    <el-row>
                        <el-col :span="24">
                            <p>终端门店信息核查</p>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            终端名称是否一致
                        </el-col>
                        <el-col :span="18">
                            <el-switch v-model="form.value1" disabled active-text="否" inactive-tex="是"></el-switch>
                        </el-col>
                    </el-row>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
                    <el-row class="t-row">
                        <el-col :span="12">
                            <span class="t-title">终端门店名称</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="t-title">最新核查终端门店名称</span>
                        </el-col>
                    </el-row>
                    <el-row class="t-row">
                        <el-col :span="12">
                            <span>两江老杨烟酒专卖店</span>
                        </el-col>
                        <el-col :span="12">
                            <span>老杨烟酒专卖店</span>
                        </el-col>
                    </el-row>
                    <el-row class="t-row"> 
                        <el-col :span="12">
                            <span class="t-title">照片信息</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="t-title">照片信息</span>
                        </el-col>
                    </el-row>
                    <el-row class="t-row">
                        <el-col :span="12">
                            <span>照片信息照片信息照片信息照片信息照片信息</span>
                        </el-col>
                        <el-col :span="12">
                            <span>照片信息照片信息照片信息照片信息</span>
                        </el-col>
                    </el-row>
                    <el-row class="t-row">
                        <el-col :span="6">
                            地址信息是否一致
                        </el-col>
                        <el-col :span="18">
                            <el-switch v-model="form.value2" disabled active-text="否" inactive-tex="是"></el-switch>
                        </el-col>
                    </el-row>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
                    <el-row class="t-row">
                        <el-col :span="12">
                            <span class="t-title">终端门店地址</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="t-title">最新核查地址</span>
                        </el-col>
                    </el-row>
                    <el-row class="t-row">
                        <el-col :span="12">
                            <span>四川省 成都市 武侯区重庆市渝北区新牌坊3路93号</span>
                        </el-col>
                        <el-col :span="12">
                            <span>四川省 宜宾市 四川省宜宾市翠屏区五粮液大道488号</span>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row class="t-row">
                        <el-col :span="6">
                            店主姓名是否一致
                        </el-col>
                        <el-col :span="18">
                            <el-switch v-model="form.value3" disabled active-text="否" inactive-tex="是"></el-switch>
                        </el-col>
                    </el-row>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
                    <el-row class="t-row">
                        <el-col :span="12">
                            <span class="t-title">店主姓名</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="t-title">最新核查店主姓名</span>
                        </el-col>
                    </el-row>
                    <el-row class="t-row">
                        <el-col :span="12">
                            <span>李小平</span>
                        </el-col>
                        <el-col :span="12">
                            <span>李明</span>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row class="t-row">
                        <el-col :span="6">
                            店主联系方式是否一致
                        </el-col>
                        <el-col :span="18">
                            <el-switch v-model="form.value3" disabled active-text="否" inactive-tex="是"></el-switch>
                        </el-col>
                    </el-row>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
                    <el-row class="t-row">
                        <el-col :span="12">
                            <span class="t-title">联系电话</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="t-title">最新核查联系电</span>
                        </el-col>
                    </el-row>
                    <el-row class="t-row">
                        <el-col :span="12">
                            <span>18866666661</span>
                        </el-col>
                        <el-col :span="12">
                            <span>15619240987</span>
                        </el-col>
                    </el-row>
                    <el-row class="t-row">
                        <el-col :span="6">
                            社会统一信用代码是否一致<br>
                            <span style="font-size: 6px;">如非三证合一选否</span>
                        </el-col>
                        <el-col :span="18">
                            <el-switch v-model="form.value4" disabled active-text="否" inactive-tex="是"></el-switch>
                        </el-col>
                    </el-row>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
                    <el-row class="t-row">
                        <el-col :span="5">
                            <span>社会统一信用代码</span>
                        </el-col>
                        <el-col :span="5">
                            <span>最新核查社会统一信用代码</span>
                        </el-col>
                        <el-col :span="5">
                            <span>最新核查营业执照号码</span>
                        </el-col>
                        <el-col :span="5">
                            <span>税务登记证号码</span>
                        </el-col>
                        <el-col :span="4">
                            <span>组织机构代码证</span>
                        </el-col>
                    </el-row>
                    <el-row class="t-row">
                        <el-col :span="5">
                            <span>888888888888888</span>
                        </el-col>
                        <el-col :span="5">
                            <span>888888888888888</span>
                        </el-col>
                        <el-col :span="5">
                            <span>888888888888888</span>
                        </el-col>
                        <el-col :span="5">
                            <span>888888888888888</span>
                        </el-col>
                        <el-col :span="4">
                            <span>888888888888888</span>
                        </el-col>
                    </el-row>
                    <br>
                    </el-tab-pane>
                    <el-tab-pane label="本品反馈" name="" style="height: 500px; overflow: auto;">
                    <el-row class="t-title-color">
                        <div style="font-size:14px;color:#333;height: 40px;text-align:left;line-height: 40px;margin-left: 10px;">
                            本品反馈信息  一
                        </div>
                    </el-row>
                    <el-row class="t-row">
                        <span>产品名称：五粮液 1618</span>
                    </el-row>
                    <el-row class="t-row">
                        <span>销售信息</span><br>
                        <div class="t-row-message">
                                销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位
                        </div>
                    </el-row>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
                    <el-row class="t-row">
                        <span>价格信息</span>
                    </el-row>
                    <el-row class="t-row">
                        <span>挂牌价：158 元</span>
                    </el-row>
                    <el-row class="t-row">
                        <span>销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位</span><br>
                        <!-- <div class="t-row-message">
                                
                        </div> -->
                    </el-row>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
                    <el-row class="t-row">
                        <span>实际成交价：158 元</span>
                    </el-row>
                    <el-row class="t-row">
                        <span>销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位销售数据信息占位</span><br>
                        <!-- <div class="t-row-message">
                                
                        </div> -->
                    </el-row>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
                    <el-row class="t-row">
                        <span>折价方式</span>
                    </el-row>
                    <el-row class="t-row">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="直接折价"></el-radio>
                            <el-radio label="赠品折价"></el-radio>
                            </el-radio-group>
                    </el-row>
                    <el-row class="t-row">
                        <span>其他折价</span><br>
                        <div class="t-row-message">
                                其他折价方式信息占位其他折价方式信息占位其他折价方式信息占
                        </div>
                    </el-row>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
                    <el-row class="t-row">
                        <span>陈列信息</span>
                    </el-row>
                    <el-row class="t-row">
                        <span>陈列照片</span><br>
                        <div class="t-row-message">
                                <br><br><br>
                        </div>
                        <span>图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位</span>
                    </el-row>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
                    <el-row class="t-row">
                        <span>窜货信息</span>
                    </el-row>
                    <el-row class="t-row">
                        <span>窜货照片</span><br>
                        <div class="t-row-message">
                                <br><br><br>
                        </div>
                        <span>图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位</span>
                    </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="竞品反馈" name="">
                    <el-row class="t-row">
                        <span>竞品反馈</span>
                    </el-row>
                    <el-row class="t-row">
                        <span>竞品名称:茅台</span>
                    </el-row>
                    <el-row class="t-row">
                        <span>竞品照片</span><br>
                        <div class="t-row-message">
                                <br><br><br>
                        </div>
                        <span>照片描述：</span><br>
                        <span>图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位</span>
                    </el-row>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
                    </el-tab-pane>
                    <el-tab-pane label="政策宣贯反馈" name="">
                    <el-row class="t-row">
                        <span>政策宣贯内容</span>
                    </el-row>
                    <el-row class="t-row">
                        <p>公司活动政策告知</p>
                        <p>终端生动化、标准化、规范化宣传活动实施</p>
                        <p>2019 五粮液对核心终端参加XXX活动的通知</p>
                        <p>2019 五粮液对核心终端的控盘分利政策</p>
                    </el-row>
                    <el-row class="t-row">
                        <span>反馈内容：</span><br>
                        <div class="t-row-message">
                                政策宣贯反馈内容占位政策宣贯反馈内容占位政策宣贯反馈内容占位政策宣贯反馈内容占位政策宣贯反馈内容占位政策宣贯反馈内容占位
                        </div>
                    </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="其他信息" name="">
                    <el-row class="t-row">
                        <span>照片信息</span><br>
                        <div class="t-row-message">
                                <br><br><br>
                        </div>
                        <span>照片描述：</span><br>
                        <span>图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位图片描述信息占位</span>
                    </el-row>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
                    </el-tab-pane>
                    <el-tab-pane label="走访小结" name="">
                        <el-row class="t-row">
                        <span>离店照片</span><br>
                        <div class="t-row-message">
                                <br><br><br>
                        </div>
                        <span>走访小结：</span><br>
                        <span>走访小结占位走访小结占位走访小结占位走访小结占位走访小结占位走访小结占位走访小结占位走访小结占位走访小结占位</span>
                    </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
    import * as api from '../../../api/api'
    export default {
        name: 'cooperationTerma',
        props: ['isVisibleCoprtion', 'coprtionData'],
        data() {
            return {
                loading: false,
                activeName: 'terminal',//默认选中某个页签
                tabPosition: 'left',
                form:{
                    value1:false,//开关默认关闭
                    value2:false,
                    value3:false,
                    value4:false,
                    value5:false,
                },

            }
        },
        methods: {
            //关闭页面
            handleClose() {
                this.$emit('coprtionCloseDialog');
            },
        },



    }
</script>
<style scoped>
    .t-title{
        font-size: 12px;
    }
    .t-row{
        margin-top: 10px;
    }
    .t-title-color{
         background-color: #cbe3e3;
    }
    .t-row-message{
        margin-top: 5px;
    }
</style>
