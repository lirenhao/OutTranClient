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
        if (typeof cordova !== 'undefined') {
          this.$store.commit('UPDATE_LOADING', true)
          // 调设备扫二维码
          cordova.plugins.barcodeScanner.scan(
            (result) => {
              if (!result.cancelled) {
                try {
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
                } catch (e) {
                  this.$store.commit('UPDATE_LOADING', false)
                  this.$vux.toast.show({
                    type: 'warn',
                    position: 'default',
                    text: '解析二维码失败'
                  })
                }
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
        } else {
          const contents = '00020101021102164761360000000*1704155123456789123451110123456789012153123456789012341531250003440001034450003445311000126330015SG.COM.DASH.WWW0110000005550127670014A00000076200010120COM.LQDPALLIANCE.WWW021512345678901234503020028660011SG.COM.OCBC0147OCBCP2P629A358D-ECE7-4554-AD56-EBD12D84CA7E4F7329500006SG.EZI013603600006-76bb-4a5a-aa1a-fbcb64d6ecf530850013SG.COM.EZLINK01201234567890123456-1230204SGQR0324A123456,B123456,C12345670404A23X31260008COM.GRAB0110A93FO3230Q32390007COM.DBS011012345678900210123456789033900011SG.COM.NETS01230201401832831128823590002150001118703240000308885872010901199084E5DC3D834430017COM.QQ.WEIXIN.PAY011012345678900204123435660010SG.COM.UOB014845D233507F5E8C306E3871A4E9FACA601A80C114B5645E5D36940009SG.PAYNOW010100216+6212345678901230301004351234567890123456789012345678901234505082020123137270009SG.AIRPAY0110A11BC0000X51860007SG.SGQR0112201803070317020701.0003030608100604020205031380609Counter010708201804075204581453037025802SG5916FOOD XYZ PTE LTD6009SINGAPORE610608100663043320'
          const tags = this.parse(contents)
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
        }
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
