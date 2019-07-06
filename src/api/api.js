import axios from 'axios';

// let base = '/api';

//查询所有终端信息√
// export const wlystoreQuery = function(body,supplier_token,userId){
//     return axios.post(`/api/wlystore/query`,body,{
//         headers: {
//            'content-type': 'application/json',
//            "supplier_token":supplier_token,
//            "userId":userId
//         },
//     }) 
// };
//查询所有终端信息√
export const wlystoreQuery = function(body){
    return axios.post(`/api/ddadapter/openApi/data`,body,{
        headers: {
           'content-type': 'application/json',
        },
    }) 
};

//绑定终端
export const wlystoreBinding = function(body){
    return axios.post(`/api/ddadapter/openApi/data`,body,{
        headers: {
           'content-type': 'application/json',
        },
    }) 
};

//调整终端
export const wlystoreBindMofiy = function(body){
    return axios.post(`/api/ddadapter/openApi/data`,body,{
        headers: {
           'content-type': 'application/json',
        },
    }) 
};

//查看绑定的详情
export const wlystoreBindlist = function(body){
    return axios.post(`/api/ddadapter/openApi/data`,body,{
        headers: {
           'content-type': 'application/json',
        },
    }) 
};

//查看省
export const wlyareaProvince = function(){
    return axios.post(`/api/ddadapter/openApi/data`,body,{
        headers: {
           'content-type': 'application/json',
        },
    }) 
};

//查看市
export const wlyareaCity = function(body){
    return axios.post(`/api/ddadapter/openApi/data`,body,{
        headers: {
           'content-type': 'application/json',
        },
    }) 
};

//查看区
export const wlyareaArea = function(body){
    return axios.post(`/api/ddadapter/openApi/data`,body,{
        headers: {
           'content-type': 'application/json',
        },
    }) 
};