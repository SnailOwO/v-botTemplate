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

      <div class="login-way" v-if="isNoraml">
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
    <funnyRainCode v-if="isActiveCode" v-model="isActiveCode"></funnyRainCode>
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
        <div class="phone-box" v-if="currentStep == 3">
          <i-input v-model="inviteCode" :placeholder="this.$t('login.page.registerDialog.inviteCode')"></i-input>
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
      isNoraml: true,   //默认使用账户名登录
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
      inviteCode: '',   //邀请码、可以为空。为空时，注册的用户为游客，需要超级管理员审核
      currentStep: 0,   //0:account 1:pwd 2:email 3:extra info  
      //邀请码
      isActiveCode: false 
    }
  },
  created() {
   
  },
  mounted() {
    
  },
  methods: {
    login() {
      let obj = {};
      obj.method = this.isNoraml;
      if(this.isNoraml) {   // 账号登录
        if(!this.username) {
          this.$Message.warning(this.$t('login.info.usernameIsEmpty'));
          return false;
        }
        if(!this.password) {
          this.$Message.warning(this.$t('login.info.pwdIsEmpty'));
          return false;
        }
        obj.username = this.username;
        obj.password = this.password;
      } else {   // 邀请码登录
        if(!this.code) {
          this.$Message.warning(this.$t('login.info.codeIsEmpty'));
          return false;
        }
        obj.code = this.code;
      }
      this.$http({url: '/login',data: obj, method: 'post'}, (res) => {
        if(res.status === 200) {
          let data =  res.data.data;
          sessionStorage.setItem('token',data.token);
          sessionStorage.setItem('user_info',data.user_info);   //用户信息
          this.$router.push('/'); 
        }
      }, (error) => {
        if(error.data.msg) {
          this.$Message.warning(error.data.msg);  
        }
        console.log('login',error);
      })
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
        let account_reg = /^[a-zA-Z0-9_]+$/;
        if(!account_reg.test(this.account)) {
          this.$Message.warning(this.$t('login.info.accountIsIllegal'));
          return false;
        }
        //todo: 特殊字符判断
      }
      if(this.currentStep == 1) {
        if(!this.registerPwd) {
          this.$Message.warning(this.$t('login.info.pwdIsEmpty'));
          return false;
        }
        let pwd_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
        if(!pwd_reg.test(this.registerPwd)) {
          this.$Message.warning(this.$t('login.info.pwdIsSimple'));
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
      //下一步
      if(this.currentStep == 3) {
        let obj = {};
        obj.username = this.account;
        obj.password = this.registerPwd;
        obj.password_confirmation = this.repeatPwd;
        obj.email = this.email;
        obj.extra = {
          phone: this.phone,
          inviteCode: this.inviteCode
        };
        this.$http({url: '/register',data: obj, method: 'post'}, (res) => {
          this.$Message.success(res.data.msg);
          this.isRegister = !this.isRegister;
        }, (error) => {
          if(error.data.msg) {
            this.$Message.warning(error.data.msg);  
          }
          console.log('register',error);
        })
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
    showActiveCode() {   //显示邀请码弹窗 todo:动态根据store中，全局设置邀请码的获取方式
      this.isActiveCode = !this.isActiveCode;
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
  computed: {},
  props: []
}
</script>
