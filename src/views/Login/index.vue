<!-- login -->
<template>
  <div>
    <button @click="handlerClick">
      测试
    </button>
    <label class="label">
      <span>用户姓名：</span>
      <input v-model="form.uname" type="text">
    </label>
    <label class="label">
      <span>登陆密码：</span>
      <input v-model="form.upwd" type="text">
    </label>
    <button @click="login">登陆</button>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      form: {
        uname: '',
        upwd: ''
      }

    }
  },

  computed: {},

  watch: {},

  created () {},

  methods: {
    handlerClick () {
      console.log(this.$router)
      this.$options.methods.testMethod()
      console.log(process.env.BASE_API)
      console.log(process.env)
      console.log(process)
      // console.log(this)
      // console.log(this.$options)
      // console.log(this.$options.methods)
    },
    testMethod () {
      console.log('i am a test method')
    },
    login () {
      this.$store.dispatch('Login', this.form)
    }
  }
}

</script>
<style rel='stylesheet/scss' lang='scss' scoped>
.label{
  display: block
}
</style>
