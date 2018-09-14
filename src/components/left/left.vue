<template>
    <!-- 目前是手动支持循环出men菜单，后续要改为迭代生成 -->
    <div id="menu-list">
        <Menu v-for="(item,key) in menuList" :key="key" :active-name="item.name" theme="dark" width="auto" :class="menuitemClasses" @on-select="pageRedirect">
            <MenuItem v-if="!item.children.length && (item.level == 1)" :name="item.name">
                <Icon type="home"></Icon>{{ item.title }}
            </MenuItem>
            <Submenu v-else-if="item.children.length" :name="item.name">
                <template slot="title">
                    <Icon type="ios-people"></Icon>{{ item.title }}
                </template>
                <MenuItem  v-for="(child,index) in item.children" :key="index" :name="child.name">{{ child.title }}</MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>

<script>
export default {
  data () {
    return {
       menuList: {},
    }
  },
  created() {
    
  },
  mounted() {
    this.menuList = this.initCate(JSON.parse(sessionStorage.getItem('user_menu')),0);
    console.log(this.menuList);
  },
  methods: {
    pageRedirect(route_name) {
        console.log(route_name);
        this.$router.push({name: route_name});
    }
  },
  computed: {
    menuitemClasses: function () {
        return [
            'menu-item',
            this.collapsed ? 'collapsed-menu' : ''
        ]
    }
  },
  props: ['collapsed']
}
</script>
