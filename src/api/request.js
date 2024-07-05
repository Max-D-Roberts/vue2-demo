import axios from 'axios'
import { getToken } from './token.js'
import { tansParams } from './utils.js'
import cache from './cache.js'

let errorCode = {
    401: '认证失败，无法访问系统资源',
    403: '当前操作没有权限',
    404: '访问资源不存在',
    default: '系统未知错误，请反馈给管理员',
}

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.headers['Accept'] = '*/*'
axios.defaults.headers['Accept-Language'] = 'zh-CN,zh;q=0.9'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
console.log('VUE_APP_BASE_API :>> ', process.env.VUE_APP_BASE_API)
console.log('VUE_APP_BASE_API :>> ', process.env.VUE_APP_BASE_API_WEB)
console.log('测试publicPath :>> ')

/* 实操得出  baseURL写法两种
1. '/dev'、'/pro'开发端可以通过vue.config.js配置代理；生产端可以通过Nginx反向代理；
2. 写在.env中 通过全局环境变量引入；但是生产模式无法灵活配置，可以在index.html 引入config.js 中配置的地址 当做全局变量
*/
let baseURL = ''
if (process.env.VUE_APP_BASE_API === '/dev') {
    baseURL = process.env.VUE_APP_BASE_API
} else {
    baseURL = process.env.VUE_APP_BASE_API
}

console.log('baseURL=>', baseURL)
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: baseURL,
    // 超时
    timeout: 10000,
})

// request拦截器
service.interceptors.request.use(
    (config) => {
        // 是否需要设置 token
        const isToken = (config.headers || {}).isToken === false
        // 是否需要防止数据重复提交
        const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
        //  if (config.headers.ContentType) {
        //      config.headers['Content-Type'] = 'multipart/form-data;'
        //   }
        if (getToken() && !isToken) {
            config.headers['Access-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        // get请求映射params参数
        if (config.method === 'get' && config.params) {
            let url = config.url + '?' + tansParams(config.params)
            url = url.slice(0, -1)
            config.params = {}
            config.url = url
        }
        if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
            const requestObj = {
                url: config.url,
                data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
                time: new Date().getTime(),
            }
            const sessionObj = cache.session.getJSON('sessionObj')
            if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
                cache.session.setJSON('sessionObj', requestObj)
            } else {
                const s_url = sessionObj.url // 请求地址
                const s_data = sessionObj.data // 请求数据
                const s_time = sessionObj.time // 请求时间
                const interval = 1000 // 间隔时间(ms)，小于此时间视为重复提交
                if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
                    const message = '数据正在处理，请勿重复提交'
                    console.warn(`[${s_url}]: ` + message)
                    return Promise.reject(new Error(message))
                } else {
                    cache.session.setJSON('sessionObj', requestObj)
                }
            }
        }
        // console.log('config.headers=>', config.headers)

        return config
    },
    (error) => {
        console.log(error)
        Promise.reject(error)
    }
)
// 响应拦截器
service.interceptors.response.use(
    (res) => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode['default']
        // 二进制数据则直接返回
        // console.log('response=>',res);
        if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
            return res.data
        }
        if (code === 401) {
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
            return Promise.reject(new Error(msg))
        } else if (code !== 200) {
            return Promise.reject('error')
        } else {
            return res.data
        }
    },
    (error) => {
        console.log('err' + error)
        let { message } = error
        if (message == 'Network Error') {
            message = '后端接口连接异常'
        } else if (message.includes('timeout')) {
            message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
            message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        //  alert(message)
        return Promise.reject(error)
    }
)

export default service
