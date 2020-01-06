const state = {
  user: null,
  code: null,
  bargainData: null,
  jizanData: null,
  pingtuanData: null
};

const getters = {
  userInfo: ({ user }) => user,
  code: ({ code }) => code,
  bargainData: ({ bargainData }) => bargainData,
  jizanData: ({ jizanData }) => jizanData,
  pingtuanData: ({ pingtuanData }) => pingtuanData
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
  },
  setJizanData: (state, payLoad) => {
    state.jizanData = payLoad;
  },
  setPingtuanData: (state, payLoad) => {
    state.pingtuanData = payLoad;
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
