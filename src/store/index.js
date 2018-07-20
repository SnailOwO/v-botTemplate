import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {   //基础全局公用
        activeCode: {
            method: 'funny',   //后期可以添加更多的邀请码活动方式
            funny: {   //邀请码难易等级
                level: 1
            },
        },
        level: 1   //这个是登录页的下落速度
    },
    getters: {},
    mutations: {
        
    },
    modules: {
       
    },
})

