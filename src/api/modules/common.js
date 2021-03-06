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

//集赞保存
export function jizanSave(params){
  return request({
    url: requestUrl('gather/save'),
    method: 'post',
    data: requestParam(params)
  })
}
//抢购保存
export function distributionSave(params){
  return request({
    url: requestUrl('distribution/save'),
    method: 'post',
    data: requestParam(params)
  })
}

//集赞参加活动
export function jizanMakeLike(params){
  return request({
    url: requestUrl('gather/makeLike'),
    method: 'post',
    data: requestParam(params)
  })
}
//集赞参加活动
export function gatherLike(params){
  return request({
    url: requestUrl('gather/like'),
    method: 'post',
    data: requestParam(params)
  })
}
export function queryLikeLog(params){
  return request({
    url: requestUrl('gather/queryLikeLog'),
    method: 'post',
    data: requestParam(params)
  })
}


export function queryPrizeLog(params){
  return request({
    url: requestUrl('gather/queryPrizeLog'),
    method: 'post',
    data: requestParam(params)
  })
}
export function grouponSave(params){
  return request({
    url: requestUrl('groupon/save'),
    method: 'post',
    data: requestParam(params)
  })
}

//
export function distributionInfo(params){
  return request({
    url: requestUrl('distribution/info/'),
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

//集赞详情
export function jizanInfo(params){
  return request({
    url: requestUrl('gather/info'),
    method: 'post',
    data: requestParam(params)
  })
}

//拼团详情
export function pingtuanInfo(params){
  return request({
    url: requestUrl('groupon/info'),
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

// 查询用户保存的活动
export function queryActivityByUserId(params){
  return request({
    url: requestUrl('api/activity/queryActivityByUserId'),
    method: 'post',
    data: requestParam(params)
  })
}

// 查询报名表
export function getOrderByActivityId(params){
  return request({
    url: requestUrl('api/order/getOrderByActivityId'),
    method: 'post',
    data: requestParam(params)
  })
}

// 查询报名表
export function sendFlag(params){
  return request({
    url: requestUrl('api/order/sendFlag?orderId=' + params.orderId + "&sendFlag=" + params.sendFlag),
    method: 'get',
    params: {}
  })
}

//复制活动
export function barginCopy(params){
  return request({
    url: requestUrl('bargin/copy'),
    method: 'post',
    data: requestParam(params)
  })
}
//复制活动
export function barginDelete(params){
  return request({
    url: requestUrl('bargin/delete'),
    method: 'post',
    data: JSON.stringify(params)
  })
}
//复制活动
export function orderExport(params){
  return request({
    url: requestUrl('api/order/export'),
    method: 'post',
    data: requestParam(params)
  })
}

//点赞
 
export function updateActivityState(params){
  return request({
    url: requestUrl('api/activity/updateActivityState'),
    method: 'post',
    data: requestParam(params)
  })
}

//查询评论
 
export function queryCommentByActivityId(params){
  return request({
    url: requestUrl('api/activity/queryCommentByActivityId'),
    method: 'post',
    data: requestParam(params)
  })
}

//删除评论
 
export function deleteCommentById(params){
  return request({
    url: requestUrl('api/activity/deleteCommentById'),
    method: 'post',
    data: requestParam(params)
  })
}

//保存评论
 
export function saveComment(params){
  return request({
    url: requestUrl('api/activity/saveComment'),
    method: 'post',
    data: requestParam(params)
  })
}

//groupon/queryGrouponId
export function queryGrouponId(params){
  return request({
    url: requestUrl('groupon/queryGrouponId'),
    method: 'post',
    data: requestParam(params)
  })
}

export function getOrderByUserIdAndActivityId(params){
  return request({
    url: requestUrl('api/order/getOrderByUserIdAndActivityId'),
    method: 'post',
    data: requestParam(params)
  })
}

export function getOrderByFromUserId(params){
  return request({
    url: requestUrl('api/order/getOrderByFromUserId'),
    method: 'post',
    data: requestParam(params)
  })
}

export function save(params){
  return request({
    url: requestUrl('api/order/save'),
    method: 'post',
    data: requestParam(params)
  })
}
