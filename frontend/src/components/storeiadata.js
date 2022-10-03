import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import Application from "./components/Models/KafkaStreamApplication/Application";
import Processor from "./components/Models/KafkaStreamApplication/Processor";
import Transformer from "./components/Models/KafkaStreamApplication/Transformer";
import UserInfos from "./components/Models/security/UserInfos";
import KafkaStore from "./components/Models/KafkaStreamApplication/KafkaStore";
import PropertyMetadata from "./components/Models/PropertyMetadata/PropertyMetadata";
import UseCase from "./components/Models/usecase/UseCase";
import RBACPage from "./components/Models/security/RBACPage";
import Role from "./components/Models/security/Role";
import axios from 'axios'
import PropertyDataType from "./components/Models/PropertyMetadata/PropertyDataType";
import Dashboard from "@/components/Models/dashboard/Dashboard";
import ActuCategory from "./components/Models/Actu/ActuCategory";
import Actu from "./components/Models/Actu/Actu";
import ActuActuCategory from "./components/Models/Actu/ActuActuCategory";



Vue.use(Vuex);
VuexORM.use(VuexORMAxios, {
    axios,
    withCredentials: true
})
const database = new VuexORM.Database()

database.register(Application)
database.register(Processor)
database.register(Transformer)
database.register(UserInfos)
database.register(PropertyMetadata)
database.register(RBACPage)
database.register(Role)
database.register(UseCase)
database.register(PropertyDataType)
database.register(Dashboard)
database.register(ActuCategory)
database.register(Actu)
database.register(ActuActuCategory)



const store = new Vuex.Store({
    state: {
        loginSuccess: false,
        loginError: false,
        userInfos: null
    },
    mutations: {
        login_success: function (state, userInfos) {
            state.loginSuccess = true;
            state.loginError = false,
                state.userInfos = userInfos;
        },
        login_error: function (state) {
            state.loginSuccess = false;
            state.loginError = true,
                state.userInfos = 0;
        },
        logout: function (state) {
            state.loginError = false;
            state.loginSuccess = false;
            state.userInfos = 0;
        }
    },
    actions: {
        login: async function (context) {
            return new Promise(function (resolve, reject) {
                // console.log(process.env.VUE_APP_ENV);
                if (process.env.VUE_APP_ENV == 'local') {
                    // Success login local
                    context.commit('login_success', {
                        username: "yy32603",
                        roles: ['role_user_dn','role_user_devfront'],
                        fullName: "Thierry Ung",
                        email: "thierry.ung@toulouse-metropole.fr",
                        enabled: true,
                        auth_username: "Thierry Ung",
                        auth_userid: "yy32603"
                    });
                    resolve()
                } else {
                    UserInfos.getAll()
                        .then(function (userInfos) {
                            context.commit('login_success', userInfos);
                            resolve(userInfos)
                        })
                        .catch(function () {
                            context.commit('login_error');
                            resolve()
                        })
                }
            })
        },
        logout: function (context) {
            if (process.env.VUE_APP_AUTH_LOGOUT) {
                //Logout from remote SSO
                axios.get(process.env.VUE_APP_AUTH_LOGOUT)
                    .catch(error => {
                        console.log("Unable to process to logout from SSO")
                    })
                    //Finally logout from appli even if SSO logout didnt work
                    .finally(() => context.commit('logout'))
            } else {
                //Local mode : no SSO, only logout from appli
                context.commit('logout')
            }

        }
    },
    getters: {
        isLoggedIn: state => state.loginSuccess,
        hasLoginErrored: state => state.loginError,
        getUserInfos: state => state.userInfos,
        // getUserRoles: state => state.userInfos.roles,
        getUserRoles: (state) => {
            if (state.userInfos != null) {
                return state.userInfos.roles
            } else {
                return []
            }
        },

        isAdmin: (state) => {
            if (state.userInfos.roles.includes("role_user_dn")) {
                return true;
            } else {
                return false;
            }
        },
        isDevFront: (state) => {
            if (state.userInfos.roles.includes("role_user_devfront")) {
                return true;
            } else {
                return false;
            }
        },
        isVisitor: (state) => {
            // console.log(state)
            if (state.userInfos.roles.length == 1 && state.userInfos.roles.includes("role_user_visitor")) {
                return true
            } else {
                return false
            }
        }
    },
    //plugins: [createPersistedState(),VuexORM.install(database)],
    plugins: [VuexORM.install(database)],
    modules: {
        KafkaStore
    }
});

export default store;