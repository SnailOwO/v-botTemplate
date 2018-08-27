import * as api from '../../api/rolePermission.js'

const state = {
    userMenuList: [],
}
const getters = {

}
const actions = {
    getUserMenu({ commit }) {
        try {
            api.getUserMenu().then(function (res) {
                commit('setUserMenu', res.data);
            }).catch(function (error) {
                console.log('get user menu failed');     
            });
        } catch (e) {
            console.log('user info empty');
        }
    }
}

const mutations = {
    setUserMenu(state, data) {
        let json_str_ata = JSON.stringify(data);
        state.userMenuList = json_str_ata;
        sessionStorage.setItem('user_menu', json_str_ata);
    }
}

export default {    
    state,
    getters,
    actions,
    mutations
}