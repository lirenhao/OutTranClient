<template>
  <div>
    <logo/>
    <group title="参数设置">
      <x-input title="地址" :value="url" @input="updateUrl" />
      <x-input title="商户号" :value="merNo" @input="updateMerNo" />
      <x-input title="终端号" :value="termNo" @input="updateTermNo" />
      <x-input title="金额" :value="tranAmt" @input="updateTranAmt" />
    </group>
  </div>
</template>

<script>
  import Logo from './Logo'
  import {mapState} from 'vuex'
  import {Group, Cell, XInput} from 'vux'

  export default {
    components: {
      Logo,
      Group,
      Cell,
      XInput
    },
    computed: {
      ...mapState({
        url: state => state.url,
        merNo: state => state.merNo,
        termNo: state => state.termNo,
        tranAmt: state => state.tranAmt
      })
    },
    methods: {
      updateUrl (url) {
        this.$store.commit('UPDATE_URL', url)
      },
      updateMerNo (merNo) {
        this.$store.commit('UPDATE_MER_NO', merNo)
      },
      updateTermNo (termNo) {
        this.$store.commit('UPDATE_TERM_NO', termNo)
      },
      updateTranAmt (tranAmt) {
        this.$store.commit('UPDATE_TRAN_AMT', tranAmt)
      }
    }
  }
</script>

<style scoped>
</style>
