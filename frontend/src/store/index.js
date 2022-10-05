import { createStore } from 'vuex'
import axios from 'axios'


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
        actionLogin(context, payload) {
            axios.post('http://127.0.0.1:3000/api/auth/login', { username: payload.username, password: payload.password })
                .then((res) => {
                    console.log("reponse du server back", res);
                    const data = res.data
                    context.commit('login_success', { userId: data.userId, token: data.token, role: data.role })
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
        actionCallAllPosts(context, state) {
            axios.get('http://127.0.0.1:3000/api/posts/', {
                    headers: {
                        "Authorization": 'Bearer ' + state.userInfos.token
                    }
                })
                .then((res) => {
                    console.log(res);
                })
        }
    },
})

export default store