/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */

// mock 线上地址
let base_url = 'https://www.fastmock.site/mock/a63c09f31c2ed788b5a54059058ca453/saleapi'
// let base_url = 'http://118.190.105.213:8090';
if (process.env.NODE_ENV === 'development') {
  console.log('development')
  base_url = 'api' // 开放环境走mock数据
  // base_url = 'https://api.2048888.xyz'
} else {
  console.log('deploy')
  base_url = 'https://api.2048888.xyz'
}
import { router } from 'umi'
import { extend } from 'umi-request'
import { notification, message } from 'antd'
// import Cookies from "js-cookie";
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

/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response } = error
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText
    const { status, url } = response
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText
    })
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常'
    })
  }
  return response
}
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  timeout: 30000,
  ttl: 1000,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  // getResponse: true,
  // 默认错误处理
  credentials: 'include' // 默认请求是否带上cookie
})
// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  // console.log(options)
  if (url.indexOf('signIn') == -1) {
    options.headers = {
      Authorization: sessionStorage.getItem('token')
    }
  }
  // if (url.indexOf('avatar')) {
  //   delete options.headers['Content-Type'];
  // }
  return {
    url: `${base_url}${url}`,
    options: { ...options, interceptors: true }
  }
})
request.interceptors.response.use((response) => {
  // debugger
  // console.log(response.headers.get('content-disposition'))

  if (response.status == '401') {
    router.replace({
      pathname: '/user/login'
      // search: stringify({
      //   redirect: window.location.href
      // })
    })
  }
  if (response.status == '200') {
    // message.success(response.statusText);
  } else {
    message.error(response.message || '请求错误！')
  }
  return response
})
export default request
