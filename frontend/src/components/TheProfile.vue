<template>
    <div class="profil_vue">
        <h2>Bonjour {{username[0]}}</h2>
        <i class="fa-solid fa-user-gear" v-if="this.getLoginStatus.userInfos.role === 'Admin'"></i>
        <i class="fa-solid fa-user" v-else></i>
        <i class="fa-solid fa-right-from-bracket" @click="logoutAction"></i>
    </div>
</template>

<script>
import store from "@/store";
import { mapMutations,mapGetters } from 'vuex';
export default{
    name:'Profil',
    data(){
        return{
            username:""
        }
    },
    computed:{
        ...mapGetters(['getLoginStatus'])
    },
    mounted(){
        this.getUsername(this.getLoginStatus.userInfos.username)
    },
    methods:{
        ...mapMutations(['logout']),

        getUsername(string){
            this.username = string.split('@',1)
        },
        logoutAction(){
            store.commit('logout')
        },
    },
}
</script>

<style scoped>
h2{
    text-shadow: 3px 3px 2px var(--second-color);
}
</style>