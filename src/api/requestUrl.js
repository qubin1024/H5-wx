/**
 * 请求地址统一处理／组装
 * @param {*} actionName action方法名称
 */
export default function (actionName) {
  //return '/api/' + actionName;
  return (process.env.NODE_ENV !== 'production' ? '/api/' : 'https://wxp.sharkmeida.cn/') + actionName
  //return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi1/' : "http://127.0.0.1:9999/proxyApi2/") + actionName

}
