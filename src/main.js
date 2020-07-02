import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {initAllClient} from './io-client'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

router.push({path: '/'})

initAllClient(store)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
