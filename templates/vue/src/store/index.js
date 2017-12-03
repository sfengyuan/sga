import Vue from 'vue'
import Vuex from 'vuex'
import site from './module/site.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    site
  }
})
