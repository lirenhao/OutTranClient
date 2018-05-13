<template>
  <div>
    <logo/>
    <group title="支付方式">
      <cell title="银联支付" @click.native="click('union')" is-link/>
      <cell title="微信支付" @click.native="click('wechat')" is-link/>
      <cell title="S G 支付" @click.native="click('sgqr')" is-link/>
    </group>
  </div>
</template>

<script>
  import Logo from './Logo'
  import {Group, Cell} from 'vux'

  export default {
    components: {
      Logo,
      Group,
      Cell
    },
    methods: {
      click: function (type) {
        // TODO 调设备扫二维码
        // this.$router.push({path: `amount/${type}`})
        this.$router.push({
          name: 'amount',
          params: {
            type,
            param: {
              unionMerNo: '',
              wechatMerNo: '',
              wechatTermNo: '',
              sgqrId: '',
              sgqrPostalCode: '',
              sgqrMiscellaneous: '',
              sgqrUnitNumber: ''
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>
