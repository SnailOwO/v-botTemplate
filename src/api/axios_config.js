//引入axios
import axios from 'axios'

axios.defaults.baseURL = ''   ///api
//设置默认请求头
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 10000

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;
let removePending = (config) => {
  for(let p in promiseArr){
      if(promiseArr[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
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
      pending.push({ u: config.url + '&' + config.method, f: c });  
    });
    return config
}, error => {
    return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response
}, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = this.$t('common.ajaxInfo.400');
          break;
        case 401:
          err.message = '未授权，请重新登录'
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = "连接到服务器失败"
    }
    message.err(err.message)
      return Promise.resolve(err.response)
})
// const api = {};
// let ajaxMethod = ['get', 'post','put'];
// ajaxMethod.forEach((method)=> {
//   //数组取值的两种方式
// });
export const api = (url,data,method = "post") => {
  let promise = new Promise(function (resolve, reject) {
    axios({
      url: uri,
      data: data,
      method: method
    }).then((response)=> {
        console.log(response);
        resolve(response);
      }).catch((error)=> {
        reject(error);
        console.log(error);
      })
  })
  return promise;
}
// export default api;
// const api = axios(config)
export const nativeAxios = axios; 
