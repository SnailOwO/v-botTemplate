<template>
  <div id="login">
    <!-- header start -->
    <ul class="login-header">
      <li>{{ this.$t('login.page.register') }}</li>
      <li>{{ this.$t('login.page.getActiveCode') }}</li>
    </ul>
    <!-- header end -->

    <!-- login start -->
    <div class="login-content">
      <!-- carousel start -->
      <div class="login-carousel">
        <Carousel autoplay v-model="first_index" loop>
          <CarouselItem>
              <div class="carousel-item"><img src="/static/images/funny_rain/13.png"></div>
          </CarouselItem>
          <CarouselItem>
              <div class="carousel-item"><img src="/static/images/funny_rain/1.png"></div>
          </CarouselItem>
          <CarouselItem>
              <div class="carousel-item"><img src="/static/images/funny_rain/3.png"></div>
          </CarouselItem>
          <CarouselItem>
              <div class="carousel-item"><img src="/static/images/funny_rain/6.png"></div>
          </CarouselItem>
        </Carousel>
      </div>
      <!-- carousel end -->

      <!-- switch login way start  -->
      <div class="switch-box">
        <label>{{ this.$t('login.page.loginMethod')}}</label>
        <i-switch v-model="isNoraml"></i-switch>
      </div>
      <!-- switch login way end  -->

      <div class="login-way" v-if="!isNoraml">
         <!-- name start -->
        <div class="name-box">
          <i-input v-model="username" :placeholder="this.$t('login.page.username')" class="login-input"></i-input>
        </div>
        <!-- name end -->
        <!-- pwd start -->
        <div class="pwd-box">
          <i-input v-model="password" type="password" :placeholder="this.$t('login.page.password')" class="login-input"></i-input>
        </div>
        <!-- pwd end -->
      </div>
      <!-- code start -->
      <div class="code-way" v-else>
        <div class="name-box">
          <i-input v-model="code" :placeholder="this.$t('login.page.code')" class="login-input"></i-input>
        </div>
      </div>
      <!-- code end -->
      <!-- login-btn start -->
      <div class="login-btn" @click="login">{{ this.$t('login.page.login') }}</div>
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
      first_index: 0,
      isNoraml: false,   //默认使用账户名登录
      username: '',
      password: '',
      code: ''
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    login() {
      if(!this.isNoraml) {   //当前选择的是，普通用户登录
        if(!this.username) {
          this.$Message.warning(this.$t('login.info.usernameIsEmpty'));
          return false;
        }
        if(!this.password) {
          this.$Message.warning(this.$t('login.info.pwdIsEmpty'));
          return false;
        }
      } else {   //当前选择的是，邀请码登录
        if(!this.code) {
          this.$Message.warning(this.$t('login.info.codeIsEmpty'));
          return false;
        }
      }
      //todo: 发送登录请求
    }
  },
  watch: {
    isNoraml: function() {
      if(this.isNoraml === false) {
        this.username = '';
        this.password = '';
        this.code = '';
      }
    }
  }
}
</script>
