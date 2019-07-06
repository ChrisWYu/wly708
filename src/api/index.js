import * as api from './api';
import axios from 'axios'
import {road} from '../road.js'
import routerIndex from '../router/index'

let token = "";
// axios.defaults.baseURL = 'http://222.188.80.210';
// axios.defaults.url = '';
// axios.defaults.timeout = 30000;

axios.defaults.withCredentials = false;
axios.defaults.headers.common['token'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头

//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    let user = JSON.parse(window.localStorage.getItem('access-user'));
    if (user) {
      token = user.token;
    }
    config.headers.common['token'] = token;
    //console.dir(config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data && response.data.code) {
      if (parseInt(response.data.code) === 108 || parseInt(response.data.code) === 109) {
        //未登录
        road.$message.error(response.data.msg);
        routerIndex.push('/login');
      }
    }
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });



export default api;