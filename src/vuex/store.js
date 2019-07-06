import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    abnormalScanSuperviseList: {
        pageSize: 10,
        currentPage: 1,
        searchData: {}
    },
}

// 定义所需的 mutations
const mutations = {
    changePageSize(state, params) {
        let pageSize = params.pageSize;
        let module = params.module;
        state[module].pageSize = pageSize;
    },
    changeCurrentPage(state, params) {
        let currentPage = params.currentPage;
        let module = params.module;
        state[module].currentPage = currentPage;
    },
    saveSearchData(state, params) {
        state[params['currentRouterName']].searchData = params;
    },
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})