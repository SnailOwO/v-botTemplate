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
        <!-- <Button @click="reset">{{ this.$t('role.page.reset') }}</Button> -->
    </div>
    
    <div id="operation-box">
      <div class="icon-box" @click="reset">
        <Icon type="refresh"></Icon>
        <p>{{ this.$t('role.page.reset') }}</p>
      </div>

      <div class="icon-box" @click="removeRole(selectIds)">
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

      <div class="icon-box" @click="showRoleModal">
        <Icon type="person-add"></Icon>
        <p>{{ this.$t('role.page.addRole') }}</p>
      </div>

      <!-- <div class="icon-box">
        <Icon type="gear-a"></Icon>
        <p>{{ this.$t('role.page.addPower') }}</p>
      </div> -->
    </div>

    <div id="table-box">
      <Table @on-select-cancel="selectCancel" @on-select-all="selecAll" @on-select="selectOne" border ref="selection" :columns="columns" :data="data"></Table>
    </div>

    <div class="footer">
      <Page :total="count" :page-size="pageSize" :current="current" @on-change="pageSwitch" show-elevator></Page>
    </div>
    <Modal
      v-model="addRoleShow"
      :mask-closable="false"
      :title="roleObj.title"
    >
    <div class="role-operate-box">
      <i-input v-model="roleObj.name" :placeholder="this.$t('role.page.roleNmaePlaceholder')" class="role-operate-input"></i-input>
    </div>
    <div slot="footer">
      <Button type="primary" @click="confirm()">{{ this.$t('login.page.registerDialog.confirm') }}</Button>
    </div>
    </Modal>

    <Modal
      v-model="powerShow"
      :mask-closable="false"
      :title="this.$t('role.page.roleModal.rolePowerOperate')"
    >
    <div class="permission-operate-box">
      <Tree :data="treeData" @on-check-change="checkNode" show-checkbox multiple></Tree>
    </div>
    <div slot="footer">
      <Button type="primary" @click="confirmPower()">{{ this.$t('login.page.registerDialog.confirm') }}</Button>
    </div>
    </Modal>
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
      addRoleShow: false,
      isEdit: false,
      powerShow: false,
      createTime: '',
      updateTime: '',
      index: [],   //预留本地更新使用,本想删除也手动删除，但是感觉还是手动刷新吧
      selectIds: [],
      columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title:this.$t('role.page.roleTable.roleName'),
            key: 'name',
            ellipsis: true
          },
          {
            title: this.$t('role.page.roleTable.guardName'),
            key: 'guard_name',
            ellipsis: true
          },
          {
            title: this.$t('role.page.roleTable.createdTime'),
            key: 'created_at',
            ellipsis: true
          },
          {
            title: this.$t('role.page.roleTable.updatedTime'),
            key: 'updated_at',
            ellipsis: true
          },
          {
            title: this.$t('role.page.roleTable.action'),
            key: 'action',
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            // type: 'primary',
                            size: 'small',
                            shape: "circle",
                            icon: "wrench" 
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.isEdit = true;
                            this.index.push(params.index);
                            this.$set(this.roleObj,'id',params.row.id);
                            this.$set(this.roleObj,'name',params.row.name);
                            this.showRoleModal();
                          }
                        }
                    }),   // this.$t('role.page.editRole')
                    h('Button', {
                        props: {
                            // type: 'error',
                            size: 'small',
                            shape: "circle",
                            icon: "trash-a" 
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.removeRole([params.row.id]);
                          }
                        }
                    }),   // this.$t('role.page.delRole')
                    h('Button', {
                        props: {
                            size: 'small',
                            shape: "circle",
                            icon: "gear-a" 
                        },
                        on: {
                          click: () => {
                            this.roleId = params.row.id;
                            this.powerModal();
                          }
                        }
                     })
                ]);
            }
        }
      ],
      data: [],
      current: 1,  
      count: 0,
      pageSize: 10,
      paramObj: {
        page: 1,
      },
      roleObj: {
        id: '',
        name: '',
        title: this.$t('role.page.roleModal.addTitle'),
      },
      treeData: [],
      nodeAry: [],
      roleId: 0,
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
    showRoleModal() {
      this.addRoleShow = !this.addRoleShow;
    },
    confirm() {
      if(!this.roleObj.name) {
        this.$Message.warning(this.$t('role.page.roleModal.roleNameEmpty'));  
        return false;
      }
      if(this.roleObj.name.length > 191) {
        this.$Message.warning(this.$t('role.page.roleModal.roleNameLengthMax'));  
        return false;
      }
      if(!this.isEdit) {
        this.addRole();
      } else {
        this.editRole();
      }
    },
    close() {
      this.isEdit = false;
      this.addRoleShow = false;
      this.$set(this.roleObj,'name','');
      this.index.splice(0,this.index.length);
    },
    addRole() {
      this.$http({url: '/addRole',data:this.roleObj,method: 'post'}, (res) => {
        this.data.push(res.data.data);
        this.close();
      }, (error) => {
        console.log('add role',error);
      })
    },
    editRole() {
      this.$http({url: '/editRole',data:this.roleObj,method: 'put'}, (res) => {
        this.$set(this.data[this.index[0]],'name',res.data.data.name);
        this.close();
      }, (error) => {
        console.log('edit role',error);
      })
    },
    removeRole(role_ids) {
      if(!role_ids.length) {
        this.$Message.warning(this.$t('role.info.chooseSelectionFirst')); 
        return false;
      }
      let obj = {
        ids: role_ids
      };
      this.$http({url: '/delRole',data: obj,method: 'delete'}, (res) => {
        this.search();
        this.cancel();
      }, (error) => {
        console.log('delete role',error);
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
    selectOne(selection,row) {
      this.selectIds.push(row.id);
    },
    selecAll(selection) {
      this.selectIds.splice(0,this.selectIds.length);
      if(selection.length) {
        for(let i = 0;i < selection.length;i++) {
          this.selectIds.push(selection[i]['id']);
        }
      }
    },
    selectCancel(selection) {
      this.selectIds.splice(0,this.selectIds.length);
      if(selection.length) {
        for(let i = 0;i < selection.length;i++) {
          this.selectIds.push(selection[i]['id']);
        }
      }
    },
    search() {
      console.log(this.createTime);
      console.log(this.updateTime);
      let create_len = this.createTime.length;
      if(this.createTime.length) {
        for(let i = 0;i < create_len;i++) {
          if(this.createTime[i] && this.validateDate(this.createTime[i])) {
            this.$set(this.paramObj,'created_at',this.createTime);
          }
        }
      }
      let update_len = this.updateTime.length;
      if(this.updateTime.length) {
        for(let i = 0;i < update_len;i++) {
          if(this.updateTime[i] && this.validateDate(this.updateTime[i])) {
            this.$set(this.paramObj,'updated_at',this.updateTime);
          }
        }
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
    },
    getAllPower() {   //获取当前数据库中，所有的权限信息
      return this.$axios.get('/permissionList');
    },
    getRolePermission() {   //获取当前角色的权限id
      return this.$axios.get('/rolePermission?role_id=' + this.roleId);
    },
    allGetPermission() {
      let _this = this;
      this.$axios.all([this.getAllPower(), this.getRolePermission()])
      .then(this.$axios.spread((powers, role_powers) => {
        let all_power = powers.data;
        let role_power = role_powers.data;
        this.treeData = this.initTree(all_power,0,role_power);
        console.log(this.treeData);
      }));
    },
    powerModal() {
      this.powerShow = !this.powerShow;
      if(!this.roleId) {
        this.$Message.warning(this.$t('role.info.roleIDIllegal')); 
        return false;
      }
      if(this.powerShow) {
        this.allGetPermission();  
      }
    },
    initTree(data,pid,role_power) {
      let tree_ary = [];
      let len = data.length;
      let role_power_len = role_power.length;
      for(let i = 0;i < len;i++) {
        if(data[i]['pid'] == pid) {
          let obj = {
            id: data[i]['id'],
            title: this.$t('common.menu.' + data[i]['name']),
            expand: true,
          };
          if(role_power_len) {
            for(let j = 0;j < role_power_len;j++) {
              if(role_power[j]['id'] == data[i]['id']) {
                obj.checked = true;
                break;
              }
            }
          }
          obj.children = this.initTree(data,data[i]['id'],role_power);
          tree_ary.push(obj);
        }
      }
      return tree_ary;
    },
    checkNode(node) {
      let node_len = node.length;
      if(node_len) {
        for(let i = 0;i < node_len;i++) {
          this.nodeAry.push(node[i]['id']);
        } 
      }
      console.log(this.nodeAry);
    },
    confirmPower() {
      if(!this.nodeAry.length) {
        this.$Message.warning(this.$t('role.info.permissionEmpty')); 
        return false;
      }
      let obj = {
        role_id: this.roleId,
        permission_ary: this.nodeAry
      };
      this.$http({url: '/permissionOperate',data: obj,method: 'post'}, (res) => {
        this.powerShow = false;
      }, (error) => {
        console.log('get role permission',error);
      })
    }
  },
  watch: {
    isEdit: function() {
      if(this.isEdit) {
        this.$set(this.roleObj,'title',this.$t('role.page.roleModal.editTittle'));
      } else {
        this.$set(this.roleObj,'title',this.$t('role.page.roleModal.addTitle'));
      }
    },
    addRoleShow: function() {
      if(!this.addRoleShow) {
        this.close();
      }
    },
    powerShow: function() {
      if(!this.powerShow) {
        this.nodeAry.splice(0,this.nodeAry.length);
        this.treeData.splice(0,this.treeData.length);
      }
    }
  }
}
</script>
