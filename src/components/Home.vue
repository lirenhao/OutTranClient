<template>
  <div>
    <logo/>
    <group>
      <cell title="参数设置" link="/url">
        <x-icon slot="icon" class="icon" type="settings" size="20"/>
      </cell>
      <cell title="扫码支付" @click.native="toScanPay()" is-link>
        <x-icon slot="icon" class="icon" type="qr-scanner" size="20"/>
      </cell>
    </group>
  </div>
</template>

<script>
import Logo from "./Logo";
import { mapState } from "vuex";
import { Group, Cell } from "vux";
import sign from "../sign";

export default {
  components: {
    Logo,
    Group,
    Cell
  },
  computed: {
    ...mapState({
      url: state => state.url
    })
  },
  methods: {
    toScanPay: function() {
      if (typeof cordova !== "undefined") {
        // 调设备扫二维码
        cordova.plugins.barcodeScanner.scan(
          result => {
            if (!result.cancelled) {
              console.log(result.text);
              const params = {
                msgInfo: {
                  versionNo: "1.0.0",
                  timeStamp: "20190102104538",
                  orgId: "0001"
                },
                trxInfo: {
                  merchantId: "123456789012345",
                  terminalId: "12345678",
                  tranAmt: 100,
                  ccyCode: "702",
                  merTraceNo: "201901021135390001000001",
                  payLoad: result.text
                },
                certificateSignature: {
                  signature: "00000000"
                }
              };
              const signature = sign.sign(
                JSON.stringify(params)
              );
              params.certificateSignature.signature = signature;
              console.log('req', params);
              this.$http.post(this.url, params).then(({ data }) => {
                this.$vux.alert.show({
                  title: '结果',
                  content: JSON.stringify(data)
                });
                console.log('resp', data);
                const signature = params.certificateSignature.signature;
                params.certificateSignature.signature = '00000000'
                console.log(sign.verity(JSON.stringify(data), signature))
              });
            } else {
              this.$store.commit("UPDATE_LOADING", false);
              this.$vux.toast.show({
                type: "warn",
                position: "default",
                text: "扫描已取消"
              });
            }
          },
          error => {
            this.$store.commit("UPDATE_LOADING", false);
            this.$vux.toast.show({
              type: "warn",
              position: "default",
              text: error
            });
          }
        );
      } else {
        this.$vux.toast.show({
          type: "warn",
          position: "default",
          text: "不能调用设备"
        });
      }
    }
  }
};
</script>

<style scoped>
.icon {
  display: block;
  margin-right: 15px;
}
</style>
