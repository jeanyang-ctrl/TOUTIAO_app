import axios from 'axios'
import JSONBig from 'json-bigint'

export default function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/' ,// 接口的基准路径
    // timeout: 5000
    transformResponse: [function (data) {
      try {
        return JSONBig.parse(data)
      } catch (err) {
        return data
      }
    }]
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 1.比如config中的一些信息不符合服务器的要求
    // 自定义后端返回的原始数据
  // data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
  
    // 2.比如每次发送网络请求时, 都希望在界面中显示一个请求的图标

    // 3.某些网络请求(比如登录(token)), 必须携带一些特殊的信息
    return config
  }, err => {
    console.log(err);
  })

  // // 2.2.响应拦截
  // instance.interceptors.response.use(res => {
  //   // console.log(res);
  //   return res.data
  // }, err => {
  //   console.log(err);
  // })

  // 3.发送真正的网络请求
  return instance(config)
}


