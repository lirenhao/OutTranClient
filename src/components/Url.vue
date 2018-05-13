<template>
  <div>
    <logo/>
    <group title="参数设置">
      <x-input title="地址" :value="url" @input="updateUrl" />
      <x-input title="卡号" :value="cardNo" @input="updateCardNo" type="number"/>
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
        cardNo: state => state.cardNo
      })
    },
    methods: {
      updateUrl (url) {
        this.$store.commit('UPDATE_URL', url)
      },
      updateCardNo (cardNo) {
        this.$store.commit('UPDATE_CARD_NO', cardNo)
      }
    }
  }
</script>

<style scoped>
</style>
