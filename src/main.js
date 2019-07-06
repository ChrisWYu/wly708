import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import qs from 'qs'
import axios from 'axios'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
// import 'element-ui/lib/theme-chalk/index.css'
import ddapi from "./ding/ddapi";
import moment from 'moment';
import '../theme/index.css'

Vue.prototype.$moment = moment;
import {
    dingTalkPc //PC端
    //手机端 dingTalkM
} from 'dingtalk-auth'

Vue.config.productionTip = false
Vue.prototype.$ddapi = ddapi
Vue.prototype.$qs = qs
Vue.prototype.$http = axios

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

function formatDate(date, fmt) {
    date = new Date(date);
    if (typeof (fmt) === "undefined") {
        fmt = "yyyy-MM-dd HH:mm:ss";
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length));
        }
    }
    return fmt
};

//定义一个时间过滤器
Vue.filter("FormatDate", function (date, fmt) {
    return formatDate(date, fmt);
});

// /* eslint-disable no-new */


//这个是你需要使用钉钉api就放进去  不是固定不变的`
let jsApiList = [
    'biz.contact.choose', 'biz.contact.complexPicker', 'biz.ding.post', 'biz.util.downloadFile', 'biz.util.previewImage', 'biz.util.uploadImage', 'biz.contact.choose', "biz.user.get", 'device.geolocation.get'
]
dingTalkPc.ddConfig(jsApiList, '/api/ddadapter/dingding/expBarcode/getJsTicketPc').then(re => {
    console.log("开始鉴权")
    console.log(re)
    sessionStorage.setItem("corpId", re.data.corpId);
    // 免登
    dingTalkPc.authLogin(re.data.corpId, '/api/ddadapter/dingding/expBarcode/getUserCode').then(res => {
        console.log("开始免登")
        console.log(res)
        // axios.defaults.headers.common['tokenid'] = res.tokenid; //头文件
        // axios.defaults.headers.common['tokencode'] = res.tokencode; //头文件
        // sessionStorage.setItem("tokencode", res.tokencode);
        sessionStorage.setItem("roleid", res.roleid);
        sessionStorage.setItem("userid", res.userid);
        sessionStorage.setItem("warcode", res.warinfo.warcode);
        // //用户名
        new Vue({
            el: '#app',
            router,
            store,
            template: '<App/>',
            components: {
                App
            }
        })
        router.replace({
            name: 'abnormalScanSuperviseList'
        });
    }, err => {
        console.log(err)
    })
}, err => {
    console.log(err)
})
// new Vue({
//     el: '#app',
//     store,
//     router,
//     components: {
//         App
//     },
//     template: '<App/>'
// })