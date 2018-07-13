<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
        <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
            <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                <MenuItem name="1-1">
                    <Icon type="ios-navigate"></Icon>
                    <span>Option 1</span>
                </MenuItem>
                <MenuItem name="1-2">
                    <Icon type="search"></Icon>
                    <span>Option 2</span>
                </MenuItem>
                <MenuItem name="1-3">
                    <Icon type="settings"></Icon>
                    <span>Option 3</span>
                </MenuItem>
            </Menu>
        </Sider>
        <Layout>
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">Content</div>
                </Card>
            </Content>
        </Layout>
    </Layout>
    <header></header>
  </div>
</template>

<script>
import header from "components/header/header.vue";

export default {
  components: {
    header
  },
  data () {
    return {
        isCollapsed: false
    };
  },
  computed: {
    menuitemClasses: function () {
        return [
            'menu-item',
            this.isCollapsed ? 'collapsed-menu' : ''
        ]
    }
  }
}
</script>

