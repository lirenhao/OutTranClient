<template>
  <div>
    <logo/>
    <group title="订单详情">
      <form-preview header-label="付款金额" header-value="¥2400.00"
                    :body-items="list" :footer-buttons="buttons"/>
    </group>
  </div>
</template>

<script>
  import Logo from './Logo'
  import {Group, FormPreview} from 'vux'

  export default {
    components: {
      Logo,
      Group,
      FormPreview
    },
    data: function () {
      return {
        list: [{
          label: '商品',
          value: '电动打蛋机'
        }, {
          label: '标题标题',
          value: '名字名字名字'
        }, {
          label: '标题标题',
          value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
        }],
        buttons: [{
          style: 'primary',
          text: '支付完成',
          onButtonClick: () => {
            this.$router.go(-1)
          }
        }]
      }
    }
  }
</script>

<style scoped>
</style>
