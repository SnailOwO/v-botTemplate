<template>
  <Content>
    <!-- 后台登录后的展示首页 -->
    <div id="total-login"></div><!-- style="width: 600px;height:400px;" -->
    <div id="last-login"></div>
  </Content>
</template>

<script>
export default {
  data () {
    return {
     
    }
  },
  created() {

  }, 
  mounted(){
    //todo:后续写接口时再决定
    this.createTotal();
    this.lastLogin();
  },
  methods: { 
    createTotal() {
      let total = document.getElementById('total-login');
      let myChart = this.$echarts.init(total);
      let option = {
        title: {
          text: '今年用户登录一览',
          left: '40%',
          bottom: 3,
        },
        color: '#2a323d',
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
      };
      myChart.setOption(option);
    },
    lastLogin() {
      let last = document.getElementById('last-login');
      let myChart = this.$echarts.init(last);
      let option = {
        title: {
          text: '今年用户登录一览',
          left: '40%',
          bottom: 3,
        },
        color: '#2a323d',
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
      };
      myChart.setOption(option);
    }
  }
}
</script>
