//引入axios
import axios from 'axios'

axios.defaults.baseURL = 'http://www.v-bot.loc/api'   // /api
//设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 10000

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
    // headr头中，设置token
    let token  = sessionStorage.getItem('token');
    if(token) {
        config.headers['Authorization'] = token;   //todo: 尚未确定jwt设置header中哪个字段
    }
    return config;
}, error => {
    removePending(config);
    return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    removePending(response.config);
    // try {
    //     let token = response.data.data.token;
    //     if (token) {   //间隔 5分钟之内，可以重新续时token
    //         // 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token
    //         //this.$store.dispatch('refreshToken', token)
    //         sessionStorage.setItem('token',token);
    //     }
    // } catch(e) {
    //     console.log('木有返回token',e);
    // }
    return response;  
}, err => {
    // todo:公用异常处理
    removePending(err.response.config);
    return Promise.resolve(err.response);
    // if(err.response) {
    //     if(err.response.status > 399 && err.response.status < 600) {
    //         return Promise.resolve(err.response);
    //     }
    // }
})

// 导出 axios
export const httpRequest = (config,cb,errorCb) => {
  axios(config).then((response) => {
      if(cb) cb(response);
  }).catch((error) => {
      console.log(error);
      if (errorCb) errorCb(error);
  });
}    
export const nativeAxios = axios; 

