<template>
    <Menu theme="dark" width="auto" :class="menuitemClasses">
        <MenuItem :name="this.$t('common.menu.index')"> 
            <Icon type="home"></Icon>{{ this.$t('common.menu.index') }}
        </MenuItem>
        <Submenu :name="this.$t('common.menu.userManage')">
            <template slot="title">
                <Icon type="ios-people"></Icon>{{ this.$t('common.menu.userManage') }}
            </template>
            <MenuItem name="this.$t('common.menu.userList')">{{ this.$t('common.menu.userList') }}</MenuItem>
        </Submenu>
        <Submenu :name="this.$t('common.menu.roleManage')">
            <template slot="title">
                <Icon type="stats-bars"></Icon>{{ this.$t('common.menu.roleManage') }}
            </template>
            <MenuItem :name="this.$t('common.menu.roleList')">{{ this.$t('common.menu.roleList') }}</MenuItem>
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
            <!-- <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup> -->
        </Submenu>
    </Menu>
</template>

<script>
export default {
  data () {
    return {
     
    }
  },
  methods: {
  
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
