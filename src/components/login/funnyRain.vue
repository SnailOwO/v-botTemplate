<template>
<canvas width="1325" height="943" id="canvas"></canvas>
</template>

<script>
export default {
  data () {
    return {
      width: 0,   //当前屏幕的宽度
      height: 0,   //当前屏幕的高度
      canvas: {},   //画布
      oGc: {},
      emojiNum: 13,
      rainAry: [],
      rainNum: 100,
      extenstion: '.png',
      baseEmojiPath: '/static/images/funny_rain/'
    }
  },
  created() {
  },  
  mounted() {
    //获取当前窗口的宽、高
    this.watchWidth;
    this.watchHeight;
    this.initCanvas();
    this.createRain();
    this.move();
    //todo:全局伸缩页面后，自定义的拓展画布大小
  },
  methods: {
    initCanvas() {
      //定义画布
      this.canvas = document.getElementById('canvas');
      this.canvas.setAttribute('width', this.width);
      this.canvas.setAttribute('height', this.height);
      this.oGc = this.canvas.getContext('2d');
    },
    initRain() {
      let _this = this;
      //每个emoji rain 是一个单独的对象
      let rain = {
        init: function(cxt) {
          this.x = _this.random(0,_this.width);   //随机从x轴降落
          this.y = 0;   //y轴
          this.r = 80;   //每个emoji的大小
          this.speed = _this.random(3,5);
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
      for(let i = 0;i < this.rainNum;i++) {
        setTimeout(() => {
          let oSnow = this.initRain();
          oSnow.init(this.oGc);
          this.rainAry.push(oSnow);
        }, 10 * i);
      }
    },
    move() {
      this.oGc.clearRect(0, 0, this.width, this.height);
      for(var i = 0; i < this.rainAry.length; i++) {
        this.rainAry[i].draw(this.oGc);
      }
      requestAnimationFrame(this.move);
    },
    random(min,max) {
      return Math.random() * (max - min) + min;
    },
    randomEmoji(min,max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  },
  computed: {
    watchWidth: function() {
      return this.width = window.innerWidth;
    },
    watchHeight: function() {
      return this.height = window.innerHeight;
    }
  }
}
</script>
