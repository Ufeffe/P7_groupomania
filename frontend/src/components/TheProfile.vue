<template>
    <div>
        <h1>Bonjour {{getLoginStatus.userInfos.userId}}</h1>
        <p>Ton role est : {{getLoginStatus.userInfos.role}}</p>
        
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default{
        name:'Profil',
        computed:{
            ...mapGetters(['getLoginStatus'])
        }
    }
</script>