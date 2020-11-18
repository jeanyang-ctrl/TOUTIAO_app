/**
 * 获取搜索模块
 */
import request from "@/network/request";
// import store from '@/store'
// console.log(request)
export const getSearchSuggestions = (q) => {
  return request({
    method: "GET",
    url: "/app/v1_0/suggestion",
    params: {
      q,
    },
  });
};
/**
 * 获取搜索建议
 */

export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
