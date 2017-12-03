import '@/styles/global.styl'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/app.vue'
import routes from '@/routes'
import store from '@/store/index'

const router = new VueRouter({ mode: 'history', routes })
Vue.use(VueRouter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
  },
  router,
  store,
  render: h => h(App)
})
