<template>
    <el-dialog :close-on-click-modal="false" :title="quantesDiaTitle" :visible.sync="quantesIsVisible" width="70%"
        :before-close="quantesHandleClose" :append-to-body="true" style="text-align: center;">
        <el-table :header-row-class-name='header' v-loading="loading" :data="priceData" highlight-current-row
            :header-cell-style="{background:'#DBE4F2',color:'#333333'}" :show-overflow-tooltip="true" border height="400"
            style="width: 100%">
            <el-table-column prop="user_name" label="访销员姓名" min-width="110" align="center">
            </el-table-column>
            <el-table-column prop="user_mobile" label="访销员手机号" min-width="160" align="center">
            </el-table-column>
            <el-table-column prop="start_date" label="开始绑定" min-width="140" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.start_date}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="end_date" label="结束绑定" min-width="140" align="center">
                <!-- <template slot-scope="scope">
                        <span v-show="(scope.row.end_date == '' )"></span>
                        <span v-show="(scope.row.end_date == !'' )">{{scope.row.end_date | FormatDate('yyyy-MM-dd')}}</span>
                    </template> -->
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" min-width="140" align="center">
            </el-table-column>
            <el-table-column prop="create_user" label="创建人姓名" min-width="120" align="center">
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
    import * as api from '../../api/api'
    export default {
        name: 'dialogquantes',
        props: ['quantesIsVisible', 'quantesDiaTitle', 'gquantesDatay'],
        data() {
            return {
                loading: false,
                priceData: [

                ],
            }
        },
        methods: {
            // 标题为剧中
            header: function () {
                return "gggg"
            },
            //关闭弹出层
            quantesHandleClose() {
                // this.$ddapi.
                this.$emit('quantesCloseDialog');
            },
            getList() {
                this.loading = true;
                let storeid = { storeid: this.gquantesDatay }

                console.log("子页面要查询的id为")
                console.log(storeid)

                // api.wlystoreBindlist(storeid).then(res => {
                     api.wlystoreBindlist({
                         "code":"00707SUA02",
                         "data":storeid
                     }).then(res => {
                    console.log(res)
                    // if (res.data.code == "0") {
                    this.priceData = res.data.data;
                    this.loading = false;
                    // }
                });
            },
        },
        created() {
            // console.log("传来的值为:" + gquantesDatay)
            this.getList();
        }
    }
</script>
<style scoped>
    .el-table thead tr.gggg th {
        text-align: center;
    }
</style>