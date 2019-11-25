import * as common from './modules/common'
export default {
  install(Vue) {
    Vue.prototype.$api = {
      common
    }
  },
  common
}
