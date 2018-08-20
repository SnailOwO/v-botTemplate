<template>
  <div id="header">
    <div class="logo-box">
      <div class="logo"></div>
      <label class="website-name">V-bot</label>
    </div>
    <div class="extra-operate">
      <Poptip placement="left">
        <i class="icon-add-vm icon-size ivu-icon ivu-icon-plus-circled"></i>
        <ul class="extra-menu" slot="content">
          <li>{{ this.$t('common.header.extraMenu.link') }}</li>
        </ul>
      </Poptip>
    </div>
    <div class="user-box">
      <div class="user-head">
        <Avatar :src="headImg" />
      </div>
      <div class="user-name">
        <label>admin</label>
        <i class="dropdown ivu-icon ivu-icon-arrow-down-b"></i>
        <ul class="user-menu">
          <li>{{ this.$t('common.header.userMenu.resetPwd') }}</li>
          <li @click="logout">{{ this.$t('common.header.userMenu.logout') }}</li>
        </ul>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  data () {
    return {
      //随机头像。头像从登录页的滑稽rain中抽取
      extenstion: '.png',  
      baseEmojiPath: '/static/images/funny_rain/',
      headImg: '',
      time: ''
    }
  },
  mounted() {
    this.headImg = this.randomEmoji(1,13);
    if(this.time) {
      clearInterval(this.time);
    }
    this.time = setInterval(() => {
      this.headImg = this.randomEmoji(1,13);
    }, 10000);
  },
  beforeDestroy: function () {
    clearInterval(this.time);
  },
  methods: {
    randomEmoji(min,max) {
      return this.baseEmojiPath + Math.floor(Math.random() * (max - min + 1) + min) + this.extenstion;
    },
    logout() {
      sessionStorage.clear();
      this.$router.push({name: 'login'});
    }
  }
}
</script>

