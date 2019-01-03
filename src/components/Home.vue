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
import {mapState} from 'vuex'
import { Group, Cell } from "vux";

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
        this.$store.commit("UPDATE_LOADING", true);
        // 调设备扫二维码
        cordova.plugins.barcodeScanner.scan(
          result => {
            if (!result.cancelled) {
              console.log(result.text);
              this.$http.post(this.url, {}).then(({data}) => {
                console.log(data);
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
