import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

//添加一个请求拦截器
service.interceptors.request.use(
  function(config) {
    //在请求发出之前进行一些操作
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  function(err) {
    //Do something with request error
    console.log(err)
    return Promise.reject(err)
  }
)
//添加一个响应拦截器
service.interceptors.response.use(
  function(res) {
    //在这里对返回的数据进行处理
    const { status, statusText, data } = res
    /**
     * status为非200是抛错，可结合自己业务进行修改
     */
    const errortext = codeMessage[status] || statusText
    if (status !== 200) {
      console.log('message' + errortext)
      return Promise.reject('error')
    } else {
      return res
    }
    return res
  },
  function(err) {
    //Do something with response errore
    /**
     * 对通用错误代码进行统一处理
     */
    const { status, statusText, headers, data } = err.response
    const errortext = codeMessage[status] || statusText

    //this.$router.push({ path: "/" });
    //window.location.href = additionlMessage;
    // 可分别对错误 status 统一处理
    if (status === 401) {
      console.log('>>message:' + errortext)
    }
    // 统一错误弹窗
    Message.error(errortext)
    return Promise.reject(err)
  }
)

export default service
