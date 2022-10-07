import { createStore } from 'vuex';
import axios from 'axios';


const store = createStore({
    state: {
        loginSuccess: false,
        userInfos: { userId: '', token: '', role: '' },
    },
    getters: {
        getLoginStatus(state) {
            return state
        }
    },
    mutations: {
        login_success(state, payload) {
            state.loginSuccess = true;
            state.userInfos = payload;
        },
    },
    actions: {
        actionLogin({ commit }, payload) {
            axios.post('http://127.0.0.1:3000/api/auth/login', { username: payload.username, password: payload.password })
                .then((res) => {
                    console.log("reponse du server back", res);
                    const data = res.data
                    commit('login_success', { userId: data.userId, token: data.token, role: data.role })
                })
        },
        actionSignup(context, payload) {
            axios.post('http://127.0.0.1:3000/api/auth/signup', { username: payload.username, password: payload.password })
                .then((res) => {
                    console.log("reponse du server back", res);
                    const data = res.data
                    console.log(data);
                })
        },

    },
})

export default store


// actionCallAllPosts({ getters }) {
//     axios.get('http://127.0.0.1:3000/api/posts/', {
//             headers: {
//                 "Authorization": 'Bearer ' + getters.getLoginStatus.userInfos.token
//             }
//         })
//         .then((res) => {
//             console.log("response axios", res.data);
//             return res.data
//         })
//         .catch(error => ({ error }))
// }