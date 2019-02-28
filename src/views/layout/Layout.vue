<template>
  <div class="app-wrapper">
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from './components'
export default {
  data() {
    return {}
  },
  name: 'layout',
  components: {
    Navbar,
    AppMain
  },
  computed: {},
  created() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
