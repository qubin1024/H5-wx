import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common';
import storePersistence from './store-persistence-plugin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    syncState2Local(state, obj) {
      this.replaceState(Object.assign(state, obj));
    },
  },
  actions: {
  },
  modules: {
    common
  },
  plugins: [storePersistence],
  strict: process.env.NODE_ENV !== 'production'
})
