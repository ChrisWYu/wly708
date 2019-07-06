import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import NotFound from '@/views/404.vue'

import applyList from '@/views/application/applyList.vue'
import alldaily from '@/views/daily/alldaily.vue'
import visitList from '@/views/examineVisit/visitList.vue'
import bute from '@/views/dbcay/bute.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: 's',
            component: Home,
            name: 'supervisorCheckDataDetail',
            title: '督导稽核数据查看',
            leaf: true,
            hidden: true,
            children: [
                {
                    path: 'terminalData',
                    name: 'terminalData',
                    title: '社会化终端扫码入库数量统计',
                    component: () => import('@/views/terminalData/terminalData.vue')
                },
                {
                    path: 'operatorData',
                    name: 'operatorData',
                    title: '运营商入库和销售计划占比统计',
                    component: () => import('@/views/operatorData/operatorData.vue')
                },
                {
                    path: 'areaScan',
                    name: 'areaScan',
                    title: '跨区域扫码入库统计',
                    component: () => import('@/views/areaScan/areaScan.vue')
                },
                {
                    path: 'channelScan',
                    name: 'channelScan',
                    title: '跨渠道扫码入库统计',
                    component: () => import('@/views/channelScan/channelScan.vue')
                },
                {
                    path: 'userScan',
                    name: 'userScan',
                    title: '跨客户扫码入库统计',
                    component: () => import('@/views/userScan/userScan.vue')
                },
            ]
        },
        {
            path: '/',
            component: Home,
            name: 'dataTotal',
            leaf: true,
            title: '数据汇总',
            hidden: true,
            children: [
                {
                    path: 'checkOperateDetail',
                    name: 'checkOperateDetail',
                    title: '稽核执行详情查看',
                    component: () => import('@/views/checkOperateDetail/checkOperateDetail.vue')
                }
            ]
        },
        {
            path: '/',
            component: Home,
            name: 'abnormalScanSupervise',
            leaf: false,
            children: [
                {
                    path: 'abnormalScanSuperviseList',
                    name: 'abnormalScanSuperviseList',
                    icon: '&#xe620;',
                    title: '异常扫码稽查',
                    component: () => import('@/views/abnormalScanSupervise/abnormalScanSuperviseList.vue')
                }
            ]
        },
        {
            hidden: true,
            component: Home,
            path: '/',
            name: '',
            children: [
                {
                    path: 'abnormalScanSuperviseListDetail/:id',
                    name: 'abnormalScanSuperviseList/listDetail',
                    component: () => import('@/views/abnormalScanSupervise/component/listDetail.vue')
                }
            ]
        },
        // {
        //     path: '/',
        //     component: Home,
        //     name: '日志',
        //     leaf: true,
        //     children: [
        //         {path: '/alldaily', component: alldaily, name: '  日  志'},
        //     ]
        // },
        // {
        //     path: '/',
        //     component: Home,
        //     name: 'example',
        //     leaf: true,
        //     children: [
        //         {
        //             path: 'example',
        //             name: '督导稽核',
        //             // redirect:'example/test1',
        //             component: () => import('@/views/example/example.vue'),
        //             children: [
        //                 {
        //                     path: 'test1',
        //                     name: 'test1',
        //                     component: () => import('@/views/example/module/test1.vue')
        //                 },
        //                 {
        //                     path: 'test2',
        //                     name: 'test2',
        //                     component: () => import('@/views/example/module/test2.vue')
        //                 },
        //             ]
        //         },
        //
        //         // {path: '/example', component: () => import('@/views/example/example.vue'), name: '测试' },
        //     ]
        // },
        //   {
        //     path: '/',
        //     component: Home,
        //     name: '',
        //     leaf: true,
        //     children: [
        //       {path: '/visitList', component: visitList, name: '走访轨迹' },
        //     ]
        // },
        // {
        //     path: '/',
        //     component: bute,
        //     name: '',
        //     leaf: true,
        //     hidden: true,
        //     children: [
        //         {path: '/bute', component: bute, name: ''},
        //     ]
        // },
        // {
        //     path: '/',
        //     //  hidden: true,
        //     component: bute,
        //     name: '暂无',
        //     leaf: true,
        // },

        // {
        //     path: '*',
        //     hidden: true,
        //     redirect: { path: '/404' }
        // }
        // {
        //     path: '/',
        //     component: Home,
        //     name: 'bute',
        //     leaf: false,
        // },
        // {
        //     path: '/bute',
        //     component: Home,
        //     name: '暂无',
        //     leaf: true,
        // },

        // {
        //     path: '/',
        //     iconCls:'el-icon-my-applyfor',
        //     加入图片样式：图片的class
        //     component: applyList,
        //     name: '终端店铺分配',
        //     // leaf: true,
        //     // children: [
        //     //   {path: '/applyList', component: applyList, name: '终端店铺分配' },
        //     // ]
        // },
        // {
        //     path: '*',
        //     hidden: true,
        //     redirect: { path: '/404' }
        // }
    ]
})
