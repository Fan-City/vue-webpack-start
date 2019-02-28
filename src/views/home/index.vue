<template>
   <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>role:{{token}}</h1>   
    <ul>
      <li>
        <el-button type="primary" v-on:click="handleLogin1">模拟请求1</el-button>
      </li>
      <li>
        <el-button v-on:click="handleLogin2">模拟请求2</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {},
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      loginForm: {
        username: 'admin',
        password: 'admin'
      }
    }
  },
  methods: {
    handleLogin1() {
      this.$store.dispatch('Login1', this.loginForm).then(response => {
        //业务逻辑
      })
    },
    handleLogin2() {
      this.$store.dispatch('Login2', this.loginForm).then(response => {
        //业务逻辑
        const { status, statusText, headers, data } = response
      })
    }
  },
  computed: {
    ...mapGetters(['token'])
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
