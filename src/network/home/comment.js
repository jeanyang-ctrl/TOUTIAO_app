/**
 * 评论请求模块
 */
import request from "@/network/request";
import store from '@/store'


/**
 * 获取文章评论列表
 */
export const getComments = (params) => {
  return request({
    method: "GET",
    url: "/app/v1_0/comments",
    // GET 参数使用 params 进行传递
    // 我们写的时候是对象，但是最终发给后端的数据是？
    // axios 会把 params 对象转为 key=value?key=value 的格式放到 url 中发送
    params,
  });
};

/**
 * 评论点赞
 */
export const addCommentLike = (target) => {
  return request({
    method: "POST",
    url: "/app/v1_0/comment/likings",
    data: {
      target,
    },
    headers: {
      // 注意：该接口需要授权才能访问
      //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
      Authorization: `Bearer ${store.state.user.token}`,
    },
  });
};

/**
 * 取消评论点赞
 */
export const deleteCommentLike = (target) => {
  return request({
    method: "DELETE",
    url: `/app/v1_0/comment/likings/${target}`,
    headers: {
      // 注意：该接口需要授权才能访问
      //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
      Authorization: `Bearer ${store.state.user.token}`,
    },
  });
};

/**
 * 发布文章评论或评论回复
 */
export const addComment = (data) => {
  return request({
    method: "POST",
    url: "/app/v1_0/comments",
    data,
    headers: {
      // 注意：该接口需要授权才能访问
      //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
      Authorization: `Bearer ${store.state.user.token}`,
    },
  });
};
