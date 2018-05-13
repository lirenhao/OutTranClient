<template>
  <div>
    <logo/>
    <group title="订单详情">
      <form-preview header-label="付款金额" :header-value="'¥' + tranAmt"
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
    props: ['resCode', 'resMsg', 'tranAmt', 'tranDate', 'cardNo', 'merNo', 'termNo'],
    computed: {
      list: function () {
        const param = this.$props
        return Object.keys(param)
          .map((key) => ({label: key, value: param[key]}))
      },
      buttons: function () {
        return [{
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
