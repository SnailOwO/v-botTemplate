<template>
    <div id="menu-list">
        <Menu v-for="(item,key) in menuList" :key="key" active-name="index" theme="dark" width="auto" :class="menuitemClasses" @on-select="pageRedirect">
            <MenuItem :name="item.title" v-if="!item.children.length && (item.level == 1)"></MenuItem>
            <Submenu v-else-if="!item.children.length && item.level == 2" :name="item.title">
                <template slot="title">
                    <Icon type="ios-people"></Icon>{{ item.title }}
                </template>
                <MenuItem name="user">{{ item.title }}</MenuItem>
            </Submenu>
            <Submenu v-else-if="item.children.length && item.level == 2" :name="item.title">
                <template slot="title">
                    <Icon type="ios-people"></Icon>{{ item.title }}
                </template>
                <Submenu v-for="(child,index) in item.children" :key="index" :name="item.title">
                    <template slot="title">
                        <Icon type="stats-bars"></Icon>{{ item.title }}
                    </template>
                    <MenuItem :name="item.title">{{ item.title }}</MenuItem>
                </Submenu>
            </Submenu>
            <!-- <MenuItem name="index"> 
                <Icon type="home"></Icon>{{ this.$t('common.menu.index') }}
            </MenuItem>
            <Submenu :name="this.$t('common.menu.userManage')">
                <template slot="title">
                    <Icon type="ios-people"></Icon>{{ this.$t('common.menu.userManage') }}
                </template>
                <MenuItem name="user">{{ this.$t('common.menu.userList') }}</MenuItem>
            </Submenu>
            <Submenu :name="this.$t('common.menu.roleManage')">
                <template slot="title">
                    <Icon type="stats-bars"></Icon>{{ this.$t('common.menu.roleManage') }}
                </template>
                <MenuItem name="role">{{ this.$t('common.menu.roleList') }}</MenuItem>
            </Submenu>
            <Submenu :name="this.$t('common.menu.sys.index')">
                <template slot="title">
                    <Icon type="stats-bars"></Icon>{{ this.$t('common.menu.sys.index') }}
                </template>
                <MenuItem :name="this.$t('common.menu.sys.activeCode')">{{ this.$t('common.menu.sys.activeCode') }}</MenuItem>
                <MenuItem :name="this.$t('common.menu.sys.ipSet')">{{ this.$t('common.menu.sys.ipSet') }}</MenuItem>
                <Submenu :name="this.$t('common.menu.sys.botSet')">
                    <template slot="title">
                        <Icon type="stats-bars"></Icon>{{ this.$t('common.menu.sys.botSet') }}
                    </template>
                    <MenuItem :name="this.$t('common.menu.sys.bot.reRead')">{{ this.$t('common.menu.sys.bot.reRead') }}</MenuItem>
                    <MenuItem :name="this.$t('common.menu.sys.bot.doutuBot')">{{ this.$t('common.menu.sys.bot.doutuBot') }}</MenuItem>
                </Submenu>
            </Submenu> -->
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
    pageRedirect(name) {
        console.log(name);
        this.$router.push(name);
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
