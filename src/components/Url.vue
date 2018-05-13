<template>
  <div>
    <logo/>
    <group title="服务地址">
      <x-input title="地址" :value="url" @input="updateUrl" />
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
        url: state => state.url
      })
    },
    methods: {
      updateUrl (url) {
        this.$store.commit('UPDATE_URL', url)
      }
    }
  }
</script>

<style scoped>
</style>
