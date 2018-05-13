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
        this.$store.commit('UPDATE_LOADING', true)
        // 调设备扫二维码
        cordova.plugins.barcodeScanner.scan(
          (result) => {
            if (!result.cancelled) {
              const tags = this.parse(result.text)
              const wcTags = this.parse(tags['34'].value)
              const sgTags = this.parse(tags['51'].value)
              this.$router.push({
                name: 'amount',
                params: {
                  type,
                  param: {
                    unionMerNo: tags['15'].value.substr(16, 15),
                    wechatMerNo: wcTags['01'].value,
                    wechatTermNo: wcTags['02'].value,
                    sgqrId: sgTags['01'].value,
                    sgqrPostalCode: sgTags['03'].value,
                    sgqrUnitNumber: sgTags['05'].value,
                    sgqrMiscellaneous: sgTags['06'].value
                  }
                }
              })
            } else {
              this.$store.commit('UPDATE_LOADING', false)
              this.$vux.toast.show({
                type: 'warn',
                position: 'default',
                text: '扫描已取消'
              })
            }
          },
          (error) => {
            this.$store.commit('UPDATE_LOADING', false)
            this.$vux.toast.show({
              type: 'warn',
              position: 'default',
              text: error
            })
          }
        );
      },
      parse: function (data) {
        let start = 0
        const tags = {}
        while (start < data.length) {
          const tag = data.substr(start, 2)
          start = start + 2
          const length = parseInt(data.substr(start, 2))
          start = start + 2
          const value = data.substr(start, length)
          start = start + length
          tags[tag] = {tag, length, value}
        }
        return tags
      }
    }
  }
</script>

<style scoped>
</style>
