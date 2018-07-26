import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {   //基础全局公用
        activeCode: {
            method: 'funny',   //后期可以添加更多的邀请码活动方式
            funny: {   //邀请码难易等级
                'simple': {
                    speed: 0,   //速度
                    time: 3000,   //定时器时间，单位: ms
                    reward: [0,1],   //奖励区间
                    rainNum: 10
                },
                'middle': {
                    speed: 1,   //速度
                    time: 3000,   //定时器时间，单位: ms
                    reward: [1,2],   //奖励区间
                    rainNum: 10
                },
                'hard': {
                    speed: 2,   //速度
                    time: 5000,   //定时器时间，单位: ms
                    reward: [2,3],   //奖励区间
                    rainNum: 15
                },
                'difficult': {
                    speed: 5,   //速度
                    time: 8000,   //定时器时间，单位: ms
                    reward: [3,5],   //奖励区间
                    rainNum: 50
                }
            },
        },
        level: 0   //这个是登录页的下落速度
    },
    getters: {},
    mutations: {
        
    },
    modules: {
       
    },
})

