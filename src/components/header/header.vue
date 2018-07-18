<template>
  <div id="header">
    <div class="logo-box">
      <div class="logo"></div>
      <label class="website-name">V-bot</label>
    </div>
    <div class="user-box">
      <div class="user-head">
        <img :src="headImg" :alt="this.$t('common.header.headImage')" />
      </div>
      <div class="user-name">
        <label>admin</label>
        <i class="dropdown ivu-icon ivu-icon-arrow-down-b"></i>
      </div>
      <ul class="user-menu">
        <li>修改密码</li>
        <li>退出登录</li>
      </ul>
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
      headImg: ''
    }
  },
  mounted() {
    this.headImg = this.randomEmoji(1,13);
  },
  methods: {
    randomEmoji(min,max) {
      return this.baseEmojiPath + Math.floor(Math.random() * (max - min + 1) + min) + this.extenstion;
    }
  }
}
</script>

