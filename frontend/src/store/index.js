import { createStore } from 'vuex';
import axios from 'axios';


const store = createStore({
    state: {
        loginSuccess: false,
        userInfos: { username: '', token: '', role: '' },
        posts: {}
    },
    getters: {
        getLoginStatus(state) {
            return state
        },
        getAllPosts(state) {
            return state.posts
        }
    },
    mutations: {
        login_success(state, payload) {
            state.loginSuccess = true;
            state.userInfos = payload;
        },
        getPosts_success(state, payload) {
            state.posts = payload
        }
    },
    actions: {
        actionLogin(context, payload) {
            axios.post('http://127.0.0.1:3000/api/auth/login', { username: payload.username, password: payload.password })
                .then((res) => {
                    console.log("reponse du server back", res);
                    const data = res.data
                    context.commit('login_success', { username: data.username, token: data.token, role: data.role })
                })
        },
        async actionSignup(context, payload) {
            axios.all([
                    await axios.post('http://127.0.0.1:3000/api/auth/signup', { username: payload.username, password: payload.password }),
                    axios.post('http://127.0.0.1:3000/api/auth/login', { username: payload.username, password: payload.password })
                ])
                .then((axios.spread((data1, data2) => {
                    const data = data2.data
                    context.commit('login_success', { username: data.username, token: data.token, role: data.role })
                })))
        },
        actionCallAllPosts(context) {
            console.log("debut fetch");
            axios.get('http://127.0.0.1:3000/api/posts/', {
                    headers: {
                        "Authorization": 'Bearer ' + context.state.userInfos.token
                    }
                })
                .then((res) => {
                    console.log("response axios", res.data);
                    let data = res.data.reverse()
                    console.log("apres fetch", data);
                    return context.commit('getPosts_success', { data })
                })
                .catch(error => ({ error }))
        },
    },
})

export default store