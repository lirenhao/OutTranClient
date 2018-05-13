<template>
  <div id="app">
    <loading :show="isLoading"></loading>
    <x-header :title="title" :left-options="leftOptions"></x-header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {XHeader, Loading} from 'vux'
  import {mapState} from 'vuex'

  export default {
    name: 'app',
    components: {
      XHeader,
      Loading
    },
    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      }),
      title() {
        return this.$route.meta.title
      },
      leftOptions: function () {
        return {
          showBack: this.$route.meta.showBack
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }
</style>
