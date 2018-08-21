//引入axios
import axios from 'axios'
import Vue from 'vue'
import iView from 'iview'
import i18n from 'langs/lang'

axios.defaults.baseURL = 'http://www.v-bot.loc/api'   // /api
//设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 10000

axios.validateStatus = (status) => {
    return status >= 200 && status < 300; // 默认的
};

let promiseArr = []
const CancelToken = axios.CancelToken;
let removePending = (config) => {
  for(let p in promiseArr){
      if(promiseArr[p].u === config.url + '&' + config.method) { //当前请求在数组中存在时执行函数体
        promiseArr[p].f(); //执行取消操作
        promiseArr.splice(p, 1); //把这条记录从数组中移除
      }
  }
}
//请求拦截器
axios.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    removePending(config);
    config.cancelToken = new CancelToken((c)=>{
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      promiseArr.push({ u: config.url + '&' + config.method, f: c });  
    });
    // header头中，设置token
    if(sessionStorage.getItem('token')) {
        config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');  
    }
    return config;
}, error => {
    removePending(config);
    return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    console.log(response.headers);
    if(response.headers.hasOwnProperty('Authorization')){
        console.log(response.headers);
        sessionStorage.setItem('token',response.headers['Authorization']);            
    }
    return response;  
}, error => {
    switch (error.response.status) {
        case 401:   // Token失效
            sessionStorage.clear();
            break
        default:
            console.log(error.response);
      }
      let msg = error.response.data.msg;
      if(msg) {
        iView.Message.warning(msg);  
      } else {
        iView.Message.warning(this.$t('common.info.systemBusy')); 
      }
    return Promise.reject(error.response);
})

// 导出 axios
export const httpRequest = (config,cb,errorCb) => {
  axios(config).then((response) => {
      if(cb) cb(response);
  }).catch((error) => {
      if (errorCb) errorCb(error);  
  });
}    
export const nativeAxios = axios; 

