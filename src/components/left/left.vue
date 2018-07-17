<template>
    <Menu theme="dark" width="auto" :class="menuitemClasses">
        <MenuItem name="1-1"> 
            <Icon type="home"></Icon>{{ this.$t('common.menu.index') }}
        </MenuItem>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-people"></Icon>{{ this.$t('common.menu.userManage') }}
            </template>
            <MenuItem name="2-1">{{ this.$t('common.menu.userList') }}</MenuItem>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="stats-bars"></Icon>{{ this.$t('common.menu.roleManage') }}
            </template>
            <MenuItem name="2-1">{{ this.$t('common.menu.roleList') }}</MenuItem>
        </Submenu>
        <Submenu name="4">
            <template slot="title">
                <Icon type="stats-bars"></Icon>{{ this.$t('common.menu.sys.index') }}
            </template>
            <MenuItem name="2-1">{{ this.$t('common.menu.sys.activeCode') }}</MenuItem>
            <MenuItem name="2-2">{{ this.$t('common.menu.sys.ipSet') }}</MenuItem>
            <Submenu name="5">
                <template slot="title">
                    <Icon type="stats-bars"></Icon>{{ this.$t('common.menu.sys.botSet') }}
                </template>
                <MenuItem name="5-1">{{ this.$t('common.menu.sys.bot.reRead') }}</MenuItem>
                <MenuItem name="5-1">{{ this.$t('common.menu.sys.bot.doutuBot') }}</MenuItem>
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
