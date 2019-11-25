const state = {
  user: null,
  code: null,
  bargainData: {
    id: '',
    activityName: '', //活动名称
    startTime: '', //开始时间
    endTime: '', //结束时间
    originalPrice: '', //原价
    floorPrice: '', //底价
    minReduction: '', //最少砍价
    maxReduction: '', //最多砍价
    targetNum: '',
    restrictTime: '', //砍价间隔时间
    prizeDescription: '', //奖品描述
    activityRule: '', //活动规则
    prizeInfo: '', //领奖信息
    companyDescription: '', //机构介绍
    thumbnail: '', //机构图片
    discount: '',
    updateUser: '', 
    createTime: '', //创建时间
    updateTime: '',
    qrImg: '', //二维码
    gift: '', //礼物图片
    prizeLeft: '',
    latitude: '',
    longitude: '',
    headImage: '',
    footImage: '',
    total_price: '',
    bgImage: '',
    prizeNum: '',
    phone: '',
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    barginNum: '', //砍价次数
    address: ''
  }
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
