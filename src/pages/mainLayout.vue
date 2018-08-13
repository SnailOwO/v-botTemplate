<template>
  <div class="layout">
    <headerNav></headerNav>
    <Layout :style="{minHeight: '100vh'}">
        <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
          <leftNav :collapsed="isCollapsed"></leftNav>
        </Sider>
        <Layout>
          <div id="container">
            <router-view/>
          </div>
        </Layout>
    </Layout>
  </div>
</template>

<script>
import headerNav from "components/header/header.vue";
import leftNav from "components/left/left.vue";

export default {
  components: {
    headerNav,
    leftNav
  },
  data () {
    return {
      isCollapsed: false
    };
  },
  methods: {
    
  },
  computed: {
    
  }
}
</script>

