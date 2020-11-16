/**
 * 获取频道新闻推荐模块
 */
import request from '@/network/request'
// import store from '@/store'
// console.log(request)
export const getNewChannels = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params,
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}



