import {nativeAxios} from './axios_config'

export const getUserMenu = () => {
    let user_info = JSON.parse(sessionStorage.getItem('user_info'));
	return nativeAxios.get('/userMenuList?role_id=' + user_info['role']);
}