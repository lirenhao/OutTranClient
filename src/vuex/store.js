import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const url = window.localStorage.url

const state = {
  isLoading: true,
  url: url ? url : 'http://10.2.53.166:9000'
}

export default new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING(state, status) {
      state.isLoading = status
    },
    UPDATE_URL(state, url) {
      window.localStorage.setItem('url', url)
      state.url = url
    }
  }
})
