<template>
    <div>
        <el-dialog
                title="详情查看"
                :visible.sync="dialogVisible"
                width="30%">
            <div>稽核对象</div>
            <div>名称：{{currentData.name}}</div>
            <div>编码：221080909</div>
            <div>类型：终端</div>
            <div>地点：{{currentData.address}}</div>
            <div>描述：这是一段简单的测试</div>
            <div class="demo-image">
                <div style="display: inline-block;" v-for="(item,index) in fits" :key="index">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="url"
                            :fit="item"></el-image>
                </div>
            </div>
            <div>
                附件
            </div>
            <div class="annexContent">
                <div class="photo">
                    <img src="./test.jpg" width="40px" height="40px">
                </div>
                <div class="detail">
                    <div class="title">
                        1分钟钉盘入门.pdf
                    </div>
                    <div class="size">
                        529.89KB
                    </div>
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: ['currentData'],
        mounted() {

        },
        components: {},
        data: function () {
            return {
                dialogVisible: true,
                fits: ['contain', 'contain', 'contain', 'contain', 'contain'],
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        },
        methods: {
            close() {
                this.$emit('input', false);
            },
            confirm() {
                this.close();
            }
        }
    }
</script>
<style>
    .el-submenu .el-menu {
        background-color: #fff !important;
    }

    .annexContent {
        float: left;
    }

    .annexContent .photo {
        /*display: inline-block;*/
        float: left;
    }

    .annexContent .detail {
        /*display: inline-block;*/
        float: left;
        margin-left: 10px;
        height: 100%;
    }

    .annexContent .detail .title {
        font-size: 14px;
        font-weight: bold;
    }

    .annexContent .detail .size {
        font-size: 10px;
        margin-top: 6px;
    }
</style>