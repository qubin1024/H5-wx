import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as Vant from 'vant';
import 'vant/lib/index.css';
import 'amfe-flexible/index.js';
import Api from './api/index.js';
import {getQueryString} from "@/util";
Vue.use(Vant);
Vue.use(Api);

Vue.config.productionTip = false
import { mapMutations } from 'vuex'

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    let hash = getQueryString('hash');
    this.setCode(getQueryString('code'))
    if(hash != null){
      this.$router.push({path: hash})
    }
  },
  methods: {
    ...mapMutations('common', {
      'setCode': 'setCode'
    })
  }
}).$mount('#app')
