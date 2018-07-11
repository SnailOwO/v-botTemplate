<template>
  <div id="login">
    <div class="login-content">
      <div class="name-box">
        <i-input :placeholder="this.$t('login.page.username')" class="login-input"></i-input>
      </div>
      <div class="pwd-box">
        <i-input type="password" :placeholder="this.$t('login.page.password')" class="login-input"></i-input>
      </div>
      <div class="login-btn">{{ this.$t('login.page.login') }}</div>
    </div>
  </div>  
</template>

<script>
export default {
  data () {
    return {
      value: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
