import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const url = window.localStorage.url
const cardNo = window.localStorage.cardNo

const state = {
  isLoading: true,
  url: url ? url : 'http://172.18.1.161:9999/purchase',
  cardNo: cardNo ? cardNo : '123456789012345678'
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
    },
    UPDATE_CARD_NO(state, cardNo) {
      window.localStorage.setItem('cardNo', cardNo)
      state.cardNo = cardNo
    }
  }
})
