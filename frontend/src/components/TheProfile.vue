<template>
    <div>
        <h1>Bonjour {{getLoginStatus.userInfos.username}}</h1>
        <p>Ton role est : {{getLoginStatus.userInfos.role}}</p>
        <button type="sumbit" @click="logoutAction"> Déconnexion</button>

    </div>
</template>

<script>
import store from "@/store";
import { mapMutations,mapGetters } from 'vuex';
export default{
    name:'Profil',
    computed:{
        ...mapGetters(['getLoginStatus'])
    },
    methods:{
        ...mapMutations(['logout']),

            logoutAction(){
                store.commit('logout')
            },
    },
}
</script>