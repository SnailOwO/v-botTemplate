<template>

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
      rainNum: 1
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
    requestAnimationFrame(this.move);
    console.log(this.rainAry);
  },
  methods: {
    initCanvas() {
      //通过js 生成一个画布，而不是在页面上直接定义好一个画布
      this.canvas = document.createElement("canvas");
      this.canvas.setAttribute('width', this.width);
      this.canvas.setAttribute('height', this.height);
      this.canvas.setAttribute('id', 'canvas');
      document.body.appendChild(this.canvas);
      this.oGc = this.canvas.getContext('2d');
    },
    initRain() {
      let _this = this;
      //每个emoji rain 是一个单独的对象
      let rain = {
        init: function() {
          this.x = _this.random(0,_this.width);   //随机从x轴降落
          this.y = 100;   //y轴
          this.r = 82;   //每个emoji的大小。这个是默认值
          this.speed = _this.random(3,5);
        },
        draw: function(cxt) {
          //随机出一张emoji
          let extenstion = '.png';
          let cur_emoji = _this.randomEmoji(1,_this.emojiNum);
          let cur_emoji_path = '../images/funny_rain/' + cur_emoji + extenstion;
          console.log('emoji',cur_emoji);
          let img = new Image();
          img.src = cur_emoji_path;
          //画布上展示出对应的emoji
          cxt.beginPath();
          // cxt.fillStyle = 'white';
          // cxt.arc(this.x, this.y + this.r, this.r, 0, Math.PI * 2, false);
          cxt.drawImage(img,0,0);
          cxt.fill();
          cxt.closePath();  
          _this.updateRain(cxt);
        },
        update: function(cxt) {
          if (_this.rain.y < (_this.height - this.r)) {
            _this.rain.y += _this.rain.speed;
          } else {
            _this.initRain();
          }
        }
      };
      return rain;
    },
    createRain() {
      let _this = this;
      //通过for循环生成总共的emoji rain
      for(let i = 0;i < this.rainNum;i++) {
        setTimeout(function () {
            let oSnow = _this.initRain();
            // console.log('233333',oSnow);
            oSnow.init();
            _this.rainAry.push(oSnow);
        }, 10 * i);
      }
    },
    move() {
      this.oGc.clearRect(0, 0, this.width, this.height);
      for(var i = 0; i < this.rainAry.length; i++) {
        this.rainAry[i].draw(this.oGc);
      }
    },
    drawRain(cxt) {
      
    },
    updateRain(cxt) {
      
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
