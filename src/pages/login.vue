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

      <!-- name start -->
      <div class="name-box">
        <i-input :placeholder="this.$t('login.page.username')" class="login-input"></i-input>
      </div>
      <!-- name end -->

      <!-- pwd start -->
      <div class="pwd-box">
        <i-input type="password" :placeholder="this.$t('login.page.password')" class="login-input"></i-input>
      </div>
      <!-- pwd end -->

      <!-- login-btn start -->
      <div class="login-btn">{{ this.$t('login.page.login') }}</div>
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
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
