import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'

// 获取手机验证码
export function sendMessage(params){
  return request({
    url: requestUrl('sys/sendMessage'),
    method: 'post',
    data: requestParam(params)
  })
}

// 注册接口
export function signIn(params){
  return request({
    url: requestUrl('sys/signIn'),
    method: 'post',
    data: requestParam(params)
  })
}

// 登录
export function login(params){
  return request({
    url: requestUrl('sys/login'),
    method: 'post',
    data: requestParam(params)
  })
}

// 登出
export function logout(params){
  return request({
    url: requestUrl('sys/logout'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 改密
export function changePassword(params){
  return request({
    url: requestUrl('sys/changePassword'),
    method: 'post',
    data: requestParam(params)
  })
}

// 查询行业类别
export function queryByType(params){
  return request({
    url: requestUrl('api/dict/queryByType'),
    method: 'post',
    data: requestParam(params)
  })
}

// 查询模板
export function queryAllTemplate(params){
  return request({
    url: requestUrl('api/activity/queryAllTemplate'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 查询模板
export function tempaleSave(params){
  return request({
    url: requestUrl('api/dict/save'),
    method: 'post',
    data: requestParam(params)
  })
}

//上传图片
export function upload(params){
  return request({
    url: requestUrl('distribution/upload'),
    method: 'post',
    headers: { "Content-Type": "multipart/form-data" },
    data: params
  })
}

//砍价保存
export function barginSave(params){
  return request({
    url: requestUrl('bargin/save'),
    method: 'post',
    data: requestParam(params)
  })
}
//砍价详情
export function barginInfo(params){
  return request({
    url: requestUrl('bargin/info'),
    method: 'post',
    data: requestParam(params)
  })
}

//获取用户详情
export function getUserInfo(params){
  return request({
    url: requestUrl('api/wxpay/getUserInfo'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

//根据url获取wxinfo
export function initwxjs(params){
  return request({
    url: requestUrl('api/wxpay/initwxjs?url=' + params.url),
    method: 'post',
    data: {}
  })
}

//getOrderByOrderId
export function getOrderByOrderId(params){
  return request({
    url: requestUrl('api/order/getOrderByOrderId'),
    method: 'post',
    data: requestParam(params)
  })
}

//保存活动
export function saveOrder(params){
  return request({
    url: requestUrl('api/order/saveOrder'),
    method: 'post',
    data: requestParam(params)
  })
}

//查询砍价信息
export function queryBarginLog(params){
  return request({
    url: requestUrl('bargin/queryBarginLog'),
    method: 'post',
    data: requestParam(params)
  })
}

//砍价
export function bargin(params){
  return request({
    url: requestUrl('bargin/bargin'),
    method: 'post',
    data: requestParam(params)
  })
}