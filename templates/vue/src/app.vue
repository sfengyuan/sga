<template>
<div id="app">
  <p style="background: #CAFF42; color: #49708A; text-align:center">{{ greet }}</p>
  <router-view></router-view>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: mapGetters(['greet'])
}
</script>
<style lang="stylus">
@import './styles/colors.styl'
</style>
