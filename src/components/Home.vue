<template>
  <div>
    <logo/>
    <group>
      <cell title="连接地址" link="/url">
        <x-icon slot="icon" class="icon" type="link" size="20"/>
      </cell>
      <cell title="扫码支付" link="/pay">
        <x-icon slot="icon" class="icon" type="qr-scanner" size="20"/>
      </cell>
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
    }
  }
</script>

<style scoped>
  .icon {
    display:block;
    margin-right: 15px;
  }
</style>
