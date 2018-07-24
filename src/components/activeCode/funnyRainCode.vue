<template>
  <!-- code box start -->
  <Modal
    v-model="activeCode"
    :mask-closable="false"
    width="800"
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
      <div class="diffcult-choice-box" v-if="currentStep == 3">
        <label class="questtion-label">{{ this.$t('login.info.questtion') }}</label>
        <i-input v-model="answer" @keyup.native="answerPreg(answer)" :placeholder="this.$t('login.info.answer')" clearable style="width: 80px;"></i-input>
      </div>
    </div> 
    <div slot="footer">
        <p v-if="currentStep == 2">{{ stepTime }}</p>
        <Button v-if="!currentStep && currentStep != 2" @click="preStep" style="float:left;">{{ this.$t('login.page.registerDialog.preStep') }}</Button>
        <Button v-if="currentStep != 2" type="primary" @click="getCode">{{ this.$t('login.page.activeCodeDialog.confirm') }}</Button>
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
        level: '',   //用户选择难度
        levelObj: {},
        extenstion: '.png',  
        baseEmojiPath: '/static/images/funny_rain/',
        codeCanvas: {},   //画布
        codeOgc: {},
        codeRainAry: [],
        width: 0,
        height: 300,
        emojiNum: 13,
        codeRainNum: 30,
        codeTimeOut: '',
        stepTimeOut: '',
        stepTime: 0,   //倒计时
        answer: '',
        animateStop: ''
    }
  },
  created() {}, 
  mounted() {
    let cur_method = this.$store.state.activeCode.method;
    this.levelObj = this.$store.state.activeCode[cur_method];
    console.log(this.levelObj);
  },
  beforeDestroy() {
    clearTimeout(this.codeTimeOut);
    clearTimeout(this.stepTimeOut);
  },
  methods: { 
    initCanvas() {
      //定义画布
      this.codeCanvas = document.getElementById('codeCanvas');
      this.codeCanvas.setAttribute('width', this.width);
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
      //确认当前操作，下一步
      if(this.currentStep == 3) {
        if(!this.answer) {
          this.$Message.warning(this.$t('login.info.illegalAnswer'));
          return false;
        }
      } else {
        this.currentStep += 1;
      }
    },
    answerPreg(data) {
      //通过正则，强制用户只能输入数字
      this.answer = data.replace(/[^0-9]/g,'');
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
          this.speed = base_speed += _this.extraSetting['speed'];
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
            this.init(_this.codeOgc);
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
      this.codeOgc.clearRect(0, 0, this.width,300);
      for(var i = 0; i < this.codeRainAry.length; i++) {
        this.codeRainAry[i].draw(this.codeOgc);
      }
      this.animateStop = requestAnimationFrame(this.move);
    },
    pasued() {   //暂停动画
      window.cancelAnimationFrame(this.animateStop);
    },
    random(min,max) {
      return Math.random() * (max - min) + min;
    },
    randomEmoji(min,max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomEmojiSrc(min,max) {
      return this.baseEmojiPath + this.randomEmoji(min,max) + this.extenstion;
    },
    timeOutMethod() {
      this.stepTimeOut = setTimeout(() => {
        if(this.levelObj[this.level]['time'] <= 0) {
          clearTimeout(this.stepTimeOut);
          // this.currentStep += 1; 
          this.pasued();
          //todo:增加弹窗，不要再跳到下一页了，方便辨认
        } else {
          this.stepTime = this.levelObj[this.level]['time'] -= 1000;
          this.stepTime = this.stepTime / 1000;
          this.stepTimeOut = setTimeout(() => {
            this.timeOutMethod();
          }, 1000);
        }
      }, 1000);
    }
  },
  computed: {
    resizeWidth: function() {
      console.log(this.width);
      return this.width = document.getElementById('rain-code-box').offsetWidth;
    }
  },
  watch: {
    // activeCode: function() {   //当activeCode都为false的时候
    //   if(!activeCode) {
    //     this.level = '';
    //   }
    // }
    currentStep: function() {   
      if(this.currentStep == 2) {
        this.$nextTick(()=>{
          this.resizeWidth;   //动态监听父类宽度
          this.initCanvas();
          this.createRain();
          this.move();
        });
        this.timeOutMethod();
        console.log(this.stepTime);
      }
      // if(this.currentStep == 3) {
      //   clearTimeout(this.stepTimeOut);
      // }
    }
  },
  props: ['activeCode']
}
</script>
