<template>
    <el-menu class="navbar" mode="horizontal">
      <div class="logo">
        <router-link to="/">
          <img :src="logo" alt="LOGO">
        </router-link>
      </div>
      <div class="link">
        <router-link to="/404">
          登录
        </router-link>
      </div>
    </el-menu> 
</template>
<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
export default {
  name: 'navbar',
  components: {},
  computed: {},
  data() {
    return {
      logo: '/static/logo.png'
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  display: -webkit-box;
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding:10px 5%;
  border-radius: 0px !important;
  .logo {
    display: inline-block;
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .link {
    -webkit-box-flex: 1;
    width: 300px;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
}
</style>

