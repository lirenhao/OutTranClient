import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const url = window.localStorage.url
const merNo = window.localStorage.merNo
const termNo = window.localStorage.termNo
const tranAmt = window.localStorage.tranAmt

const state = {
  isLoading: true,
  url: url ? url : 'http://172.18.1.161:9999/purchase',
  merNo: merNo ? merNo : '104767011000006',
  termNo: termNo ? termNo : '12345678',
  tranAmt: tranAmt ? tranAmt : 100
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
    UPDATE_MER_NO(state, merNo) {
      window.localStorage.setItem('merNo', merNo)
      state.merNo = merNo
    },
    UPDATE_TERM_NO(state, termNo) {
      window.localStorage.setItem('termNo', termNo)
      state.termNo = termNo
    },
    UPDATE_TRAN_AMT(state, tranAmt) {
      window.localStorage.setItem('tranAmt', tranAmt)
      state.termNo = termNo
    }
  }
})
