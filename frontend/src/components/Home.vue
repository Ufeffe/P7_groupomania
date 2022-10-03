<template>
    <div>
        <h1>Affichage des posts</h1>
        <p> Es tu connecté ? Réponse : {{getLoginStatus.loginSuccess}} </p>
        <p>Ton userId est : {{getLoginStatus.userInfos.userId}}</p>
        
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default{
        name:'postDisplay',

        computed:{
            ...mapGetters(['getLoginStatus'])
        }
    }
</script>