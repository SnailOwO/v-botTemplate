<template>

</template>

<script>
import funnyRain from "components/login/funnyRain.vue";

export default {
  components: {
    funnyRain
  },
  data () {
    return {
        method: this.$store.state.activeCode.method,
        extraSetting: ''
    }
  },
  created() {
 
  }, 
  mounted(){
    let c = this.$store.state.activeCode[this.method];
    console.log(c);
  },
  methods: { 

  }
}
</script>
