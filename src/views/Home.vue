<template>
    <el-container>
        <el-header><img src="../../src/assets/logo.png" style="height: 34px;margin-top: 8px;margin-left: 35px">
        </el-header>
        <el-container>
            <el-aside style="width: 240px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.05)">
                <el-menu
                        :default-active="default_menu_active" class="el-menu-vertical-demo" @open="handleOpen"
                        @close="handleClose"
                        @select="handleSelect"
                        :collapse="isCollapse"
                        :default-openeds="defaultExpandMenu"
                >
                    <template v-for="(item,index) in left_menu">
                        <template v-if="!item.hidden">
                            <template v-if="item.leaf">
                                <el-submenu :index="item.name" v-if="item.children">
                                    <template slot="title">
                                        <i :class="item.icon"></i>
                                        <span>{{item.title}}</span>
                                    </template>
                                    <el-menu-item-group>
                                        <!--<template slot="title" style="display: none"></template>-->
                                        <el-menu-item v-for="(it,ind) in item.children" :index="it.name"
                                                      :key="it.path">
                                            {{it.title}}
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="item.children[0].name">
                                    <i class="icon iconfont iconweibiaoti--4"></i>
                                    <span slot="title"
                                          style="margin-left: 14px;letter-spacing:1px;vertical-align: top;">{{item.children[0].title}}</span>
                                </el-menu-item>
                            </template>
                        </template>
                    </template>
                </el-menu>
            </el-aside>
            <el-main style="background: #F6F7F8;padding: 24px 24px;">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import * as api from "../api/api";
    import "../assets/fonts/iconfont.css";

    export default {
        computed: {
            left_menu: function () {
                return this.$router.options.routes;
            },
            left_menu_children: function () {
                let left_menu = this.left_menu;
                let left_menu_children = [];
                let temp = [];
                for (let i = 0; i < left_menu.length; i++) {
                    if (left_menu[i].children && left_menu[i].children.length) {
                        left_menu_children = left_menu[i].children;
                        for (let j = 0; j < left_menu_children.length; j++) {
                            temp.push(left_menu_children[j]);
                        }
                    }
                }
                return temp;
            },
            default_menu_active: function () {
                let current_name = this.$route.name;
                let is_hidden = current_name.indexOf("/");
                return is_hidden === -1 ? current_name : current_name.substring(0, is_hidden);
            }
        },
        data() {
            return {
                test: '&#xe620;',
                defaultExpandMenu: [],
                isCollapse: false
            }
        },
        methods: {
            routeGo(e) {
                this.$router.push({
                    name: e,
                });
            },
            handleOpen() {
                //console.log('handleopen');
            },
            handleClose() {
                //console.log('handleclose');
            },
            handleSelect: function (a, b) {
                this.$router.push({
                    name: a,
                });
            },
        },
        mounted() {
            let left_menu = this.left_menu;
            let temp = [];
            for (let i = 0; i < left_menu.length; i++) {
                temp.push(left_menu[i].name);
            }
            let left_menu_children = this.left_menu_children;
            for (let j = 0; j < left_menu_children.length; j++) {
                temp.push(left_menu_children[j].name);
            }
            this.defaultExpandMenu = temp;
        }
    }
</script>
<style>
    /** 表格公用样式开始 */
    #app .el-input.is-focus .el-input__inner, #app .el-input__inner:focus {
        border-color: #F13D3D !important;
    }

    #app .el-table__empty-text {
        color: #333333;
    }

    #app .el-table th, #app .el-table td {
        padding: 10px 0;
    }

    #app .el-table--group, #app .el-table--border, #app .el-table th.is-leaf, #app .el-table td {
        border-color: #D0D0D0;
    }

    #app .el-table--group::after, #app .el-table--border::after, #app .el-table::before {
        background-color: #D0D0D0;
    }

    #app .el-table .cell {
        padding: 0 20px;
    }

    #app .el-table .el-table-column--selection .cell {
        padding: 0;
        text-align: center;
    }

    #app .el-table thead tr {
        background-color: #F4F7FB;
        color: #333333;
        font-size: 16px;
    }

    #app .el-table thead th {
        background-color: unset;
    }

    #app .el-pagination, #app .el-pagination__total, #app .el-pagination .btn-prev, #app .el-pagination .btn-next, #app .el-input__inner {
        color: #9B9B9B;
    }

    #app .el-pagination__sizes {
        margin-right: 21px;
    }

    #app .el-pagination .el-input__suffix {
        right: -2px;
        height: 32px;
        width: 32px;
        top: -2px;
        background-color: #F13D3D;
    }

    #app .el-pagination .el-select .el-input .el-select__caret {
        font-size: 22px;
        color: #ffffff;
    }

    #app .el-pagination .el-select .el-input {
        width: 85px;
    }

    #app .el-pagination .el-select .el-input .el-input__inner {
        text-align: center;
        padding-right: 25px;
        padding-left: 0;
    }

    /*.el-pagination .btn-prev .el-icon, .el-pagination .btn-next .el-icon {*/
    /*font-size: 16px;*/
    /*}*/

    /*.el-pager {*/
    /*vertical-align: middle;*/
    /*}*/

    #app .el-pager li {
        font-size: 12px;
        padding: 0;
        min-width: 24px;
        height: 24px;
        line-height: 24px;
        margin-top: 4px;
        border-radius: 4px;
    }

    #app .el-pager li:hover {
        color: #F13D3D;
    }

    #app .el-pager li.active {
        background-color: #F13D3D;
        color: #ffffff;
    }

    #app .el-pagination .btn-prev, .el-pagination .btn-next {
        padding-top: 2px;
        font-size: 18px;
    }

    #app .el-pagination {
        margin-top: 9px;
        text-align: right;
        padding: 0 5px;
    }

    #app .el-pagination .routerTo {
        display: inline-block;
        margin-left: 20px;
        padding-top: 2px;
    }

    #app .el-pagination .routerTo .routerToButton {
        text-align: center;
        font-weight: 500;
        cursor: pointer;
        display: inline-block;
        width: 28px;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        font-family: "PingFang SC";
        color: #ffffff;
        background-color: #F13D3D;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    #app .el-pagination .routerTo .routerToInput {
        width: 36px;
        height: 28px;
        float: left;
    }

    #app .el-pagination .routerTo .routerToInput .el-input__inner {
        height: 28px;
        line-height: 28px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        padding: 0;
    }

    /** 表格公用样式结束 */
    #app .el-menu-item {
        height: 44px;
        line-height: 44px;
        margin: 21px 10px 0;
        padding: 0 14px !important;
        font-size: 16px;
        color: #727272;
        border-radius: 2px;
        font-family: "PingFang SC";
    }

    #app .el-menu .el-menu-item.is-active, #app .el-menu .el-menu-item.is-active:hover {
        background-color: rgba(241, 61, 61, 1);
        color: #FFFFFF;
    }

    #app .el-header {
        background-color: #DF0615;
        color: #333;
        line-height: 56px;
        height: 56px !important;
    }

    #app .el-menu-item-group > div {
        padding: 0 !important;
    }

    #app .el-aside {
        border-right: solid 1px #e6e6e6;
    }

    #app .el-menu {
        border-right: 0;
    }

    #app .el-tooltip__popper.is-dark {
        background: rgba(39, 45, 51, 0.7);
    }

    #app .el-range-editor.is-active {
        border-color: #F13D3D !important
    }


    /** 公用样式定义 */
    .row .operateButton {
        margin-left: 20px;
        letter-spacing: 1px;
    }

    .row .operateButton:nth-child(1) {
        margin-left: 0;
    }

    .tableRowTitle {
        display: inline-block;
        cursor: pointer;
        height: 21px;
        color: #3D70B2
    }

    .tableRowTitle:hover {
        color: #F13D3D;
    }

    .tableRowDetail {
        border-bottom: 1px solid #333333;
        display: inline-block;
        cursor: pointer;
        height: 21px;
    }

    .tableButtons {
        display: inline-block;
        white-space: nowrap;
        color: #3D70B2;
        cursor: pointer;
    }

    .tableButtons:hover {
        color: #F13D3D;
    }

    .tableButtons .icon {
        font-size: 14px;
    }

    .tableButtons p {
        display: inline-block;
        margin: 0 0 0 3px;
        font-size: 14px;
    }

    .searchLabel {
        height: 34px;
        line-height: 34px;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        padding: 0 8px;
        font-size: 14px;
        color: #9B9B9B;
        width: calc(100% - 16px);
        position: relative;
        cursor: pointer;
    }

    .searchLabel.disabled {
        cursor: not-allowed;
        color: #C3C7D0;
    }

    .searchLabel.empty, .searchLabel.empty .iconweibiaoti--3 {
        color: #C3C7D0;
    }

    .searchLabel .icon {
        position: absolute;
        right: 10px;
        top: 0;
    }

    .searchLabel.disabled {
        background-color: #F5F7FA;
    }

    .searchLabel:not(.disabled):hover {
        border: 1px solid #C0C4CC;
    }

    .searchLabel.has:not(.disabled) .iconweibiaoti--3:hover:before {
        font-family: "element-icons" !important;
        content: "\e78d";
    }

    .cusButton {
        display: inline-block;
        width: 100px;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        letter-spacing: 4px;
        vertical-align: middle;
    }

    .cusRed {
        background-color: #F13D3D;
        color: #ffffff;
    }

    .cusRed:hover {
        background-color: #C80512;
    }

    .cusWhite {
        border: 1px solid #D0D0D0;
        background-color: #ffffff;
        color: #333333;
    }

    .cusWhite:hover {
        border: 1px solid #F8D1D3;
        background-color: #FBE6E7;
        color: #F13D3D;
    }

    .bodyContent .contentTitle {
        font-size: 14px;
        color: #333333;
        margin-bottom: 19px;
    }

    .bodyContent .contentDetail {
        border-radius: 4px;
        padding: 10px 24px;
        background-color: #ffffff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    }

    .bodyContent .contentDetail .row {
        margin-top: 20px;
    }

    .bodyContent .contentDetail .row:nth-child(1) {
        margin-top: 0;
    }

    .bodyContent .contentDetail .row .rowInline:nth-child(1) {
        margin-left: 0;
    }

    .bodyContent .contentDetail .rowInline {
        display: inline-block;
        margin-left: 48px;
        width: calc((100% - 160px) / 4);
    }

    .bodyContent .contentDetail .rowInline.dateRange {
        width: calc(33% - 33px);
    }

    .bodyContent .contentDetail .rowInline.buttonOperate {
        width: auto;
        float: right;
        margin-top: 32px;
    }

    .bodyContent .contentDetail .rowInline.dateRange .el-range-editor.el-input__inner {
        width: 100%;
    }

    .bodyContent .contentDetail .rowInline .title {
        color: #666666;
        font-size: 14px;
        margin-top: 0;
        margin-bottom: 10px;
        display: inline-block;
    }

    .bodyContent .contentDetail .rowInline .expandSelect {
        width: 100%;
    }

    .bodyContent .contentDetail .rowInline .expandDateSelect {
        width: 100%;
    }

    .bodyContent .contentDetail .rowInline .expandSelect .el-input__inner {
        height: 36px;
        padding: 0 8px;
    }

    .bodyContent .contentDetail .rowInline .expandSelect .el-input__suffix {
        /*right: 0;*/
    }

    .bodyContent .contentDetail .rowInline .expandSelect .el-input .el-select__caret {
        font-size: 16px;
        line-height: 36px;
    }

    /*.row {*/
    /*display: block;*/
    /*}*/

    /*.row .rowDescribe {*/
    /*display: inline-block;*/
    /*}*/

    /*.row .expandInput {*/
    /*width: 400px;*/
    /*}*/

    /*.row .expandSelect {*/
    /*width: 400px;*/
    /*}*/

    /*.row .searchClear {*/
    /*display: inline-block;*/
    /*cursor: pointer;*/
    /*}*/

    .el-pagination .btn-prev .el-icon:before, .el-pagination .btn-next .el-icon:before {
        font-size: 21px;
        font-weight: 100;
    }

    .el-icon-arrow-up, .el-icon-date, .el-icon-arrow-left, .el-icon-arrow-right, .el-icon-close {
        font-family: "iconfont" !important;
    }

    .el-icon-arrow-up:before {
        content: "\e626";
    }

    .el-icon-date:before {
        content: "\e61c";
    }

    .el-icon-arrow-left:before {
        content: "\e624";
    }

    .el-icon-arrow-right:before {
        content: "\e625";
    }

    .el-icon-close:before {
        content: "\e623";
    }
</style>