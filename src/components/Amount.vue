<template>
  <div>
    <logo/>
    <group title="支付金额">
      <x-input title="金额" type="number" placeholder="￥"
               v-model.number="tranAmt" :is-type="validAmt"/>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="click" type="primary" text="支付"/>
    </div>
    <form-preview :body-items="list"/>
  </div>
</template>

<script>
  import Logo from './Logo'
  import {mapState} from 'vuex'
  import {Group, Cell, XInput, XButton, FormPreview} from 'vux'

  export default {
    components: {
      Logo,
      Group,
      Cell,
      XInput,
      XButton,
      FormPreview
    },
    props: ['type', 'param'],
    data: function () {
      return {
        validAmt: function (amt) {
          const isValidAmt = /^\d{0,4}(\.\d{0,2})?$/.test(amt);
          if (amt && isValidAmt)
            return {valid: true}
          else
            return {valid: false, msg: '金额错误'}
        },
        tranAmt: ''
      }
    },
    computed: {
      ...mapState({
        url: state => state.url,
        cardNo: state => state.cardNo
      }),
      list: function () {
        const param = this.$props.param
        param.type = this.$props.type
        return Object.keys(param)
          .map((key) => ({label: key, value: param[key]}))
      }
    },
    methods: {
      click: function () {
        const url = `${this.url}/api/sgqr`
        const param = this.$props.param
        param.type = this.$props.type
        param.tranAmt = this.$data.tranAmt
        param.cardNo = this.cardNo

        const validAmt = this.$data.validAmt(param.tranAmt)
        if (validAmt.valid) {
          this.$store.commit('UPDATE_LOADING', true)
          this.$http.post(url, param)
            .then((resp) => {
              if (resp.status === 200) {
                this.$router.replace({
                  name: 'result',
                  params: resp.data
                })
              } else {
                this.$vux.toast.show({
                  type: 'warn',
                  position: 'default',
                  text: resp.status
                })
              }
            })
            .catch(() => {
              this.$store.commit('UPDATE_LOADING', false)
              this.$vux.toast.show({
                type: 'warn',
                position: 'default',
                text: '发送失败'
              })
            })
        } else {
          this.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: validAmt.msg
          })
        }
      }
    }
  }
</script>

<style scoped>
</style>
