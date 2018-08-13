<template>
  <div id="role">
    <div id="search-box">
        <div class="name-box">
          <label>{{ this.$t('role.page.roleName') }}</label>
          <i-input v-model="roleName" :placeholder="this.$t('role.page.roleNmaePlaceholder')" class="role-input"></i-input>
        </div>
        <div class="datetime-box">
          <label>{{ this.$t('role.page.createdTime') }}</label>
          <DatePicker type="datetime" :placeholder="this.$t('role.page.dateTimePlaceholder')"></DatePicker>
        </div>
        <div class="datetime-box">
          <label>{{ this.$t('role.page.updatedTime') }}</label>
          <DatePicker type="datetime" :placeholder="this.$t('role.page.dateTimePlaceholder')"></DatePicker>
        </div>
        <Button type="primary" @click="search">{{ this.$t('role.page.confirm') }}</Button>
    </div>
    
    <div id="operation-box">
      <div class="icon-box">
        <Icon type="refresh"></Icon>
        <p>{{ this.$t('role.page.refresh') }}</p>
      </div>

      <div class="icon-box">
        <Icon type="trash-a"></Icon>
        <p>{{ this.$t('role.page.delete') }}</p>
      </div>

      <div v-if="isCheckALL" class="icon-box" @click="checkAll">
         <Icon type="checkmark"></Icon>
        <p>{{ this.$t('role.page.checkAll') }}</p>
      </div>

      <div v-else class="icon-box" @click="cancel">
        <Icon type="close"></Icon>
        <p>{{ this.$t('role.page.cancel') }}</p>
      </div>

      <div class="icon-box">
        <!-- <Icon type="ios-plus"></Icon> -->
        <Icon type="ios-plus-outline"></Icon>
        <p>{{ this.$t('role.page.addPower') }}</p>
      </div>
    </div>

    <div id="table-box">
      <Table border ref="selection" :columns="columns" :data="data"></Table>
    </div>

    <div class="footer">
      <Page :total="100" show-elevator></Page>
    </div>
  </div>  
</template>

<script>

export default {
  components: {},
  data () {
    return {
      roleName: '',
      isCheckALL: true,
      columns: [
          {
              type: 'selection',
              width: 60,
              align: 'center'
          },
          {
              title:this.$t('role.page.roleTable.roleName'),
              key: 'roleName'
          },
          {
              title: this.$t('role.page.roleTable.guardName'),
              key: 'guardName'
          },
          {
              title: this.$t('role.page.roleTable.createdTime'),
              key: 'createdTime'
          },
          {
              title: this.$t('role.page.roleTable.updatedTime'),
              key: 'updatedTime'
          }
      ],
      data: [
        {
          roleName: 'John Brown',
          guardName: 18,
          createdTime: 'New York No. 1 Lake Park',
          updatedTime: '2016-10-03'
        },
        {
          roleName: 'John Brown',
          guardName: 18,
          createdTime: 'New York No. 1 Lake Park',
          updatedTime: '2016-10-03'
        },
        {
          roleName: 'John Brown',
          guardName: 18,
          createdTime: 'New York No. 1 Lake Park',
          updatedTime: '2016-10-03'
        },
        {
          roleName: 'John Brown',
          guardName: 18,
          createdTime: 'New York No. 1 Lake Park',
          updatedTime: '2016-10-03'
        }
      ]  
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    checkAll() {
      this.isCheckALL = !this.isCheckALL;
      this.$refs.selection.selectAll(true);
    },
    cancel() {
      this.isCheckALL = !this.isCheckALL;
      this.$refs.selection.selectAll(false);
    },
    search() {
      
    }
  },
  watch: {

  }
}
</script>
