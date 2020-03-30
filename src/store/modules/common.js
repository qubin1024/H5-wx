const state = {
  user: null,
  code: null,
  bargainData: null,
  jizanData: null,
  zhuliData: null,
  pingtuanData: null,
  qianggouData: null
};

const getters = {
  userInfo: ({ user }) => user,
  code: ({ code }) => code,
  bargainData: ({ bargainData }) => bargainData,
  jizanData: ({ jizanData }) => jizanData,
  zhuliData: ({zhuliData}) => zhuliData,
  pingtuanData: ({ pingtuanData }) => pingtuanData,
  qianggouData: ({ qianggouData }) => qianggouData
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
  setzhuliData: (state, payLoad) => {
    state.zhuliData = payLoad;
  },
  setPingtuanData: (state, payLoad) => {
    state.pingtuanData = payLoad;
  },
  setQianggouData: (state, payLoad) => {
    state.qianggouData = payLoad;
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
