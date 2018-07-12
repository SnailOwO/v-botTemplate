<template>
  <div id="login">
    <!-- login start -->
    <div class="login-content">

      <div class="login-header">
        
      </div>

      <div class="web-name">

      </div>
      <!-- name start -->
      <div class="name-box">
        <i-input :placeholder="this.$t('login.page.username')" class="login-input"></i-input>
      </div>
      <!-- name end -->

      <!-- pwd start -->
      <div class="pwd-box">
        <i-input type="password" :placeholder="this.$t('login.page.password')" class="login-input"></i-input>
      </div>
      <!-- pwd end -->

      <!-- login-btn start -->
      <div class="login-btn">{{ this.$t('login.page.login') }}</div>
      <!-- login-btn end -->
    </div>
    <!-- login end -->
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
