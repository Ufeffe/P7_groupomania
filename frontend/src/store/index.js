import { createStore } from 'vuex'
import axios from 'axios'


const store = createStore({
    state: {
        loginSuccess: false,
        userInfos: { userId: '', token: '' },
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
                    context.commit('login_success', { userId: data.userId, token: data.token })
                })
        }
    },
})

export default store



// const state = { token: null }
// const mutation = {
//     login_success(state, res) {
//         state.token = res.token
//     }
// }