let sl, unsl;
let onlySession = false;
const LOCALSTORAGE = 0,
  SESSIONSTORAGE = 1,
  KEY =
    "SOLUTION " +
    location.hostname +
    " " +
    location.port +
    " storage";
const ls = window.localStorage;
const ss = window.sessionStorage;

const vuexAlong = store => {
  initAlong(store);
  store.subscribe(function(mutation, state) {
    saveLocal(state);
    saveSession(state);
  });
};
export default vuexAlong;

const saveLocal = state => {
  if (onlySession) return;
  setItem(KEY, filter(state), LOCALSTORAGE);
};

const saveSession = state => {
  if (!sl && !unsl && !onlySession) return;
  setItem(KEY, filter(state), SESSIONSTORAGE);
};

const filter = state => {
  return {
    common: state.common,
    i18n: state.i18n
  }; //只持久化common中的数据
};

/**
 * Init this plugin when store init
 */
const initAlong = store => {
  let obj = {};
  if (!onlySession && getItem(KEY, LOCALSTORAGE))
    Object.assign(obj, getItem(KEY, LOCALSTORAGE));
  if (getItem(KEY, SESSIONSTORAGE))
    Object.assign(obj, getItem(KEY, SESSIONSTORAGE));
  store.commit("syncState2Local", obj);
};

const coded = str => {
  return window.btoa(window.encodeURIComponent(str));
};
const encoded = str => {
  return window.decodeURIComponent(window.atob(str));
};

const getItem = (key, type) => {
  let storage = type == LOCALSTORAGE ? ls : ss;
  try {
    return JSON.parse(encoded(storage.getItem(key)));
  } catch (err) {
    return null;
  }
};

const setItem = (key, val, type) => {
  let storage = type == LOCALSTORAGE ? ls : ss;
  storage.setItem(key, coded(JSON.stringify(val)));
};

const removeItem = () => {
  ss.removeItem(KEY);
  ls.removeItem(KEY);
};
vuexAlong.clean = removeItem;
window.cleanVuexAlong = removeItem;
