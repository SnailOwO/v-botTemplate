<template>
  <!-- code box start -->
  <Modal
    v-model="activeCode"
    :mask-closable="false"
    >
    <p slot="header">
      <span @click="close">{{ this.$t('login.page.activeCodeDialog.title') }}</span>
    </p>
    <Steps :current="currentStep">
      <Step :title="this.$t('login.page.activeCodeDialog.firstStep')"></Step>
      <Step :title="this.$t('login.page.activeCodeDialog.secondStep')"></Step>
      <Step :title="this.$t('login.page.activeCodeDialog.thirdStep')"></Step>
      <Step :title="this.$t('login.page.activeCodeDialog.fourthStep')"></Step>
    </Steps>
    <div id="rain-code-box">
      <div class="diffcult-choice-box" v-if="!currentStep">
        <RadioGroup v-model="level">
          <Radio :label="this.$t('login.page.activeCodeDialog.simple')"></Radio>
          <Radio :label="this.$t('login.page.activeCodeDialog.middle')"></Radio>
          <Radio :label="this.$t('login.page.activeCodeDialog.hard')"></Radio>
        </RadioGroup>
      </div>
      <div class="diffcult-choice-box" v-if="currentStep == 1">
        <label>{{ this.$t('login.info.rememberEmoji') }}</label>
        <Avatar :src="randomEmojiSrc(1,13)" />
      </div>
      <div class="diffcult-choice-box" v-if="currentStep == 2">
        <canvas width="293" height="300" id="codeCanvas"></canvas>
      </div>
      <!-- <div class="pwd-box" v-if="currentStep == 1">
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
      </div>-->
    </div> 
    <div slot="footer">
        <Button v-if="currentStep && currentStep != 1" @click="preStep" style="float:left;">{{ this.$t('login.page.registerDialog.preStep') }}</Button>
        <Button v-if="currentStep != 1" type="primary" @click="getCode">{{ this.$t('login.page.activeCodeDialog.confirm') }}</Button>
    </div>
  </Modal>
  <!-- code box end -->
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
        method: this.$store.state.activeCode.method,
        extraSetting: '',   //无论什么方式获取邀请码，这个就是承载该参数的
        currentStep: 0,
        level: '简单',   //默认简单
        levelObj: {
          '简单': 1,
          '中等': 3,
          '困难': 5,
          '极难': 10
        },
        extenstion: '.png',  
        baseEmojiPath: '/static/images/funny_rain/',
        codeCanvas: {},   //画布
        codeOgc: {},
        codeRainAry: [],
        width: 293,
        height: 300,
        emojiNum: 13,
        codeRainNum: 50,
        codeTimeOut: '',
        stepTimeOut: ''
    }
  },
  created() {
 
  }, 
  mounted(){
  
  },
  beforeDestroy() {
    clearTimeout(this.codeTimeOut);
    clearTimeout(this.stepTimeOut);
  },
  methods: { 
    initCanvas() {
      //定义画布
      this.codeCanvas = document.getElementById('codeCanvas');
      // this.codeCanvas.setAttribute('width', this.outerWidth);
      // this.codeCanvas.setAttribute('height', this.outerHeight);
      this.codeOgc = this.codeCanvas.getContext('2d');
    },
    preStep() {   //上一步
      if(this.currentStep) {
        this.currentStep -= 1;
        this.currentStep = this.currentStep <= 0 ? 0 : this.currentStep;
      }
    },
    getCode() {   //下一步
      if(!this.currentStep) {   //选择难度
        if(!this.levelObj[this.level]) {
          this.$Message.warning(this.$t('login.info.illegalDifficulty'));
          return false;
        } else {
          this.extraSetting = this.levelObj[this.level];
        }
      }
      if((this.currentStep + 1) == 2) {  //查看demo表情,然后开始自动跳转至下一步
        //自动跳转到下一步
        this.stepTimeOut = setTimeout(() => {
        this.currentStep += 1;
        }, 3000);
      }   
      if(this.currentStep == 2) {   //弹框中显示滑稽雨
        console.log(2);
        //清除之前的定时器
        clearTimeout(this.stepTimeOut);
        this.initCanvas();
        this.createRain();
        console.log(this.codeRainAry);
        this.move();
      }
      //确认当前操作，下一步
      if(this.currentStep == 3) {
        alert('注册成功');
      } else if(this.currentStep != 1) {
        this.currentStep += 1;
      }
    },
    close() {
      this.$emit("input",false);
    },
    initRain() {
      let _this = this;
      let base_speed = this.random(2,5);
      //每个emoji rain 是一个单独的对象
      let rain = {
        init: function(cxt) {
          this.r = 80;   //每个emoji的大小
          this.x = _this.random(0,(_this.width - this.r));   //随机从x轴降落
          this.y = 0;   //y轴
          this.speed = base_speed += _this.extraSetting;
          //直接绘制出对应的图片
          let cur_emoji = _this.randomEmoji(1,_this.emojiNum);     //随机出一张emoji
          let cur_emoji_path = _this.baseEmojiPath + cur_emoji + _this.extenstion;
          this.img = new Image();
          this.img.src = cur_emoji_path;
          cxt.drawImage(this.img,this.x,this.y);   
        },
        draw: function(cxt) {
          cxt.drawImage(this.img,this.x,this.y);
          //画布上展示出对应的emoji
          this.update(cxt);
        },
        update: function(cxt) {
          if (this.y < (_this.height - this.r)) {
            this.y += this.speed;
          } else {
            this.init(_this.oGc);
          }
        }
      };
      return rain;
    },
    createRain() {
      //通过for循环生成总共的emoji rain
      for(let i = 0;i < this.codeRainNum;i++) {
        this.stepTimeOut = setTimeout(() => {
          let oSnow = this.initRain();
          oSnow.init(this.codeOgc);
          this.codeRainAry.push(oSnow);
        }, 100 * i);
      }
    },
    move() {
      this.codeOgc.clearRect(0, 0, 293,300);
      for(var i = 0; i < this.codeRainAry.length; i++) {
        this.codeRainAry[i].draw(this.codeOgc);
      }
      requestAnimationFrame(this.move);
    },
    random(min,max) {
      return Math.random() * (max - min) + min;
    },
    randomEmoji(min,max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomEmojiSrc(min,max) {
      return this.baseEmojiPath + this.randomEmoji(min,max) + this.extenstion;
    }
  },
  watch: {
    // activeCode: function() {   //当activeCode都为false的时候
    //   if(!activeCode) {
    //     this.level = '';
    //   }
    // }
  },
  props: ['activeCode']
}
</script>
