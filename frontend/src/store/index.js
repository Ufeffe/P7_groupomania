import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        loginSuccess: false,
        userInfos: { username: '', token: '', role: '' },
    },
    getters: {
        getLoginStatus(state) {
            return state
        },
    },
    mutations: {
        login_success(state, payload) {
            state.loginSuccess = true;
            state.userInfos = payload;
            localStorage.setItem('user', JSON.stringify(state.userInfos));
        },
        logout(state) {
            localStorage.removeItem('user');
            state.loginSuccess = false;
        },
    },
    actions: {
        actionLogin(context, payload) {
            axios.post('http://127.0.0.1:3000/api/auth/login', { username: payload.username, password: payload.password })
                .then((res) => {
                    const data = res.data
                    context.commit('login_success', { username: data.username, token: data.token, role: data.role })
                })
        },
        async actionSignup(context, payload) {
            const regex = new RegExp('^[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$')
            let testEmail = regex.test(payload.username)
            if (testEmail) {
                axios.all([
                        await axios.post('http://127.0.0.1:3000/api/auth/signup', { username: payload.username, password: payload.password }),
                        axios.post('http://127.0.0.1:3000/api/auth/login', { username: payload.username, password: payload.password })
                    ])
                    .then((axios.spread((data1, data2) => {
                        const data = data2.data
                        context.commit('login_success', { username: data.username, token: data.token, role: data.role })
                    })))
            }
        },
    },
})
let user = localStorage.getItem('user');
if (user) {
    try {
        let userInfos = JSON.parse(user)
        store.commit('login_success', { username: userInfos.username, token: userInfos.token, role: userInfos.role })
    } catch (ex) {
        console.log("pas de données récupéré");
    }
}
export default store