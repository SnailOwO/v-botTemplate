<template>
  <div id="role">
    <div id="search-box">
        <label>角色名</label>
        <i-input v-model="roleName" :placeholder="this.$t('login.page.registerDialog.account')"></i-input>
    </div>
    <div id="operation-box">

    </div>
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
        roleName: '',
        
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    
  },
  watch: {

  }
}
</script>
