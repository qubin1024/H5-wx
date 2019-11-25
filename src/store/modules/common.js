const state = {
  user: null,
  code: null,
  bargainData: null
};

const getters = {
  userInfo: ({ user }) => user,
  code: ({ code }) => code,
  bargainData: ({ bargainData }) => bargainData
};

const mutations = {
  setUser: (state, payLoad) => {
    state.user = payLoad;
  },
  setCode: (state, payLoad) => {
    state.code = payLoad;
  },
  setBargainData: (state, payLoad) => {
    state.bargainData = payLoad;
  }
};

const actions = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
