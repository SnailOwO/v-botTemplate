<template>
  <div class="layout">
    <headerNav></headerNav>
    <Layout :style="{minHeight: '100vh'}">
        <leftNav :collapsed="isCollapsed"></leftNav>
        <Layout>
            <!-- <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header> -->
            <contentNav></contentNav>
        </Layout>
    </Layout>
  </div>
</template>

<script>
import headerNav from "components/header/header.vue";
import leftNav from "components/left/left.vue";
import contentNav from "components/HelloWorld.vue";

export default {
  components: {
    headerNav,
    leftNav,
    contentNav
  },
  data () {
    return {
        isCollapsed: false
    };
  },
  methods: {
    // menuitemClasses: function () {
    //     return [
    //         'menu-item',
    //         this.isCollapsed ? 'collapsed-menu' : ''
    //     ]
    // }
  },
  computed: {
    
  }
}
</script>

