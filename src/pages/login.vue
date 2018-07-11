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
    <funnyRain></funnyRain>
  </div>  
</template>

<script>
import funnyRain from "components/login/funnyRain.vue";

export default {
  components: {
    funnyRain
  },
  data () {
    return {
      
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
