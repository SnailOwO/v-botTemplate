<template>
  <div id="login">
    <!-- header start -->
    <ul class="login-header">
      <li @click="showRegister">{{ this.$t('login.page.register') }}</li>
      <li @click="showActiveCode">{{ this.$t('login.page.getActiveCode') }}</li>
    </ul>
    <!-- header end -->

    <!-- login start -->
    <div class="login-content">
      <!-- carousel start -->
      <div class="login-carousel">
        <Carousel autoplay v-model="first_index" loop>
          <CarouselItem>
              <div class="carousel-item"><img src="/static/images/advertisement/base_ad1.jpg"></div>
          </CarouselItem>
          <CarouselItem>
              <div class="carousel-item"><img src="/static/images/advertisement/base_ad1.jpg"></div>
          </CarouselItem>
          <CarouselItem>
              <div class="carousel-item"><img src="/static/images/advertisement/base_ad3.jpg"></div>
          </CarouselItem>
          <CarouselItem>
              <div class="carousel-item"><img src="/static/images/advertisement/base_ad3.jpg"></div>
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
    <funnyRain :level="level"></funnyRain>
    <funnyRainCode v-if="isActiveCode" v-model="isActiveCode" :isActiveCode="isActiveCode"></funnyRainCode>
    <!-- register box start -->
    <Modal
      :title="this.$t('login.page.registerDialog.title')"
      v-model="isRegister"
      :mask-closable="false"
      >
      <Steps :current="currentStep">
        <Step :title="this.$t('login.page.registerDialog.firstStep')"></Step>
        <Step :title="this.$t('login.page.registerDialog.secondStep')"></Step>
        <Step :title="this.$t('login.page.registerDialog.thirdStep')"></Step>
        <Step :title="this.$t('login.page.registerDialog.fourthStep')"></Step>
      </Steps>
      <div id="register-box">
        <div class="account-box" v-if="!currentStep">
          <i-input v-model="account" :placeholder="this.$t('login.page.registerDialog.account')"></i-input>
        </div>
        <div class="pwd-box" v-if="currentStep == 1">
          <i-input v-model="registerPwd" type="password" :placeholder="this.$t('login.page.registerDialog.registerPwd')"></i-input>
        </div>
        <div class="pwd-box" v-if="currentStep == 1">
          <i-input v-model="repeatPwd" type="password" :placeholder="this.$t('login.page.registerDialog.repeatPwd')"></i-input>
        </div>
        <div class="email-box" v-if="currentStep == 2">
          <i-input v-model="email" :placeholder="this.$t('login.page.registerDialog.email')"></i-input>
        </div>
        <div class="phone-box" v-if="currentStep == 3">
          <i-input v-model="phone" :placeholder="this.$t('login.page.registerDialog.phone')"></i-input>
        </div>
      </div>
      <div slot="footer">
          <Button v-if="currentStep"  @click="preStep" style="float:left;">{{ this.$t('login.page.registerDialog.preStep') }}</Button>
          <Button type="primary" @click="register">{{ this.$t('login.page.registerDialog.confirm') }}</Button>
      </div>
    </Modal>
    <!-- register box end -->
  </div>  
</template>

<script>
import funnyRain from "components/login/funnyRain.vue";
import funnyRainCode from "components/activeCode/funnyRainCode.vue";

export default {
  components: {
    funnyRain,
    funnyRainCode
  },
  data () {
    return {
      first_index: 0,
      isNoraml: false,   //默认使用账户名登录
      username: '',
      password: '',
      code: '',
      //注册
      isRegister: false,
      account: '',
      registerPwd: '',
      repeatPwd: '',
      email: '',
      phone: '',   //手机号(可以为空)
      currentStep: 0,   //0:account 1:pwd 2:email 3:extra info  
      //邀请码
      level: this.$store.state.level,   //这个是登录页的下落速度
      isActiveCode: false 
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
    },
    showRegister() {
      this.isRegister = true;
    },
    register() {
      if(this.currentStep == 0) {
        if(!this.account) {
          this.$Message.warning(this.$t('login.info.accountIsEmpty'));
          return false;
        }
        if(this.account.length > 32) {
          this.$Message.warning(this.$t('login.info.accountLengthIllegal'));
          return false;
        }
        //todo: 特殊字符判断
      }
      if(this.currentStep == 1) {
        //todo: 密码强度判断
        if(!this.registerPwd) {
          this.$Message.warning(this.$t('login.info.pwdIsEmpty'));
          return false;
        }
        if(this.registerPwd != this.repeatPwd) {
          this.$Message.warning(this.$t('login.info.twicePwdIsWrong'));
          return false;
        }
      }
      if(this.currentStep == 2) {
        if(!this.email) {
          this.$Message.warning(this.$t('login.info.emailIsEmpty'));
          return false;
        }
        let email_reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(!email_reg.test(this.email)) {
          this.$Message.warning(this.$t('login.info.emailIsIllegal'));
          return false;
        }
      }
      if(this.currentStep == 3) {
        if(this.phone) {   //手机号位非必填项
        let phone_reg = /^1\d{10}$/;
          if(!phone_reg.test(this.phone)) {
            this.$Message.warning(this.$t('login.info.phoneIsIllegal'));
            return false;
          }
        }
      }
      //下一步
      if(this.currentStep == 3) {
        alert('注册成功');
      } else {
        this.currentStep += 1;
      }
    },
    preStep() {   //上一步
      if(this.currentStep) {
        this.currentStep -= 1;
        this.currentStep = this.currentStep <= 0 ? 0 : this.currentStep;
      }
    },
    showActiveCode() {   //显示邀请码弹窗
      this.isActiveCode = !this.isActiveCode;
      console.log(this.isActiveCode);
    }
  },
  watch: {
    isNoraml: function() {
      if(this.isNoraml === false) {
        this.username = '';
        this.password = '';
        this.code = '';
      }
    },
    isRegister: function() {
      if(!this.isRegister) {
        this.email = '';
        this.phone = '';  
        this.account = '';
        this.repeatPwd = '';
        this.registerPwd = '';
        this.currentStep = 0;
      }
    }
  },
  props: []
}
</script>
