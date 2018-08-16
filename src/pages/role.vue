<template>
  <div id="role">
    <div id="search-box">
        <div class="name-box">
          <label>{{ this.$t('role.page.roleName') }}</label>
          <i-input v-model="roleName" :placeholder="this.$t('role.page.roleNmaePlaceholder')" class="role-input"></i-input>
        </div>
        <div class="datetime-box">
          <label>{{ this.$t('role.page.createdTime') }}</label>
          <DatePicker :editable="editAble" v-model="createTime" @on-change="changeCreateTime" @on-clear="clearCreate" type="datetimerange" :placeholder="this.$t('role.page.dateTimePlaceholder')"></DatePicker>
        </div>
        <div class="datetime-box">
          <label>{{ this.$t('role.page.updatedTime') }}</label>
          <DatePicker :editable="editAble" v-model="updateTime" @on-change="changeUpdateTime" @on-clear="clearUpdate" type="datetimerange" :placeholder="this.$t('role.page.dateTimePlaceholder')"></DatePicker>
        </div>
        <Button type="primary" @click="search">{{ this.$t('role.page.confirm') }}</Button>
        <Button @click="reset">{{ this.$t('role.page.reset') }}</Button>
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
      <Page :total="count" :page-size="pageSize" :current="current" @on-change="pageSwitch" show-elevator></Page>
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
      editAble: false,
      createTime: '',
      updateTime: '',
      columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title:this.$t('role.page.roleTable.roleName'),
            key: 'name'
          },
          {
            title: this.$t('role.page.roleTable.guardName'),
            key: 'guard_name'
          },
          {
            title: this.$t('role.page.roleTable.createdTime'),
            key: 'created_at'
          },
          {
            title: this.$t('role.page.roleTable.updatedTime'),
            key: 'updated_at'
          }
      ],
      data: [],
      current: 1,  
      count: 0,
      pageSize: 10,
      paramObj: {
        page: 1,
      },
    }
  },
  created() {
    this.getList(this.paramObj);
  },
  mounted() {

  },
  methods: {
    getList(obj) {
      this.$http({url: '/roleList',data: obj, method: 'post'}, (res) => {
        if(res.data.roleAry) {
          this.data = res.data.roleAry;
        }
        this.count = res.data.count;
      }, (error) => {
        if(error.data.msg) {
          this.$Message.warning(error.data.msg);  
        }
        console.log('role',error);
      })
    },
    checkAll() {
      this.isCheckALL = !this.isCheckALL;
      this.$refs.selection.selectAll(true);
    },
    cancel() {
      this.isCheckALL = !this.isCheckALL;
      this.$refs.selection.selectAll(false);
    },
    search() {
      let create_len = this.createTime.length;
      if(this.createTime.length) {
        for(let i = 0;i < create_len;i++) {
          if(!this.createTime[i] || (this.createTime[i] && !this.validateDate(this.createTime[i]))) {
            this.$Message.warning(this.$t('role.info.createTimeIllegal'));  
            return false;
          }
        }
        this.$set(this.paramObj,'created_at',this.createTime);
      }
      let update_len = this.updateTime.length;
      if(this.updateTime.length) {
        for(let i = 0;i < update_len;i++) {
          if(!this.updateTime[i] || (this.updateTime[i] && !this.validateDate(this.updateTime[i]))) {
            this.$Message.warning(this.$t('role.info.updateTimeIllegal'));  
            return false;
          }
        }
        this.$set(this.paramObj,'updated_at',this.updateTime);
      }
      if(this.roleName) {
        this.$set(this.paramObj,'name',this.roleName);
      }
      this.getList(this.paramObj);
    },
    changeCreateTime(dateTime) {
      this.createTime = dateTime;
    },
    changeUpdateTime(dateTime) {
      this.updateTime = dateTime;
    },
    pageSwitch(event) {
      event = !event ? 1 : event;
      this.$set(this.paramObj,'page',event);
      this.search();
    },
    reset() {
      this.roleName = '';
      this.createTime = '';
      this.updateTime = '';
      this.paramObj = {};
      this.$set(this.paramObj,'page',1);
      this.search();
    },
    clearCreate() {
      this.createTime = '';
      this.$delete(this.paramObj,'created_at',this.paramObj['createTime']);
    },
    clearUpdate() {
      this.updateTime = '';
      this.$delete(this.paramObj,'updated_at',this.paramObj['updated_at']);
    }
  },
  watch: {

  }
}
</script>
