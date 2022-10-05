<template>
    
    <div id="login_form">
        <h1 class="login_title" v-if="mode == 'login'">Connexion</h1>
        <h1 class="login_title" v-else>Inscription</h1>
        <p class="card_subtitle" v-if="mode == 'login'">Vous n'avez pas de compte ? <br><span class="card_action" @click="swicthToCreateAccount">Créer un compte</span></p>
        <p class="card_subtitle" v-else>Vous avez déjà un compte ? <br><span class="card_action" @click="swicthToLogin">Connectez-vous</span></p>
        <div class="form">
            <input v-model="username" type="text" placeholder="Nom d'utilisateur">
            <input v-model="password" type="text" id="myPassword" placeholder="Mot de passe">
            <button type="submit" @click="submitLogin" class="sumbit_button" v-if="mode=='login'">Connexion</button>
            <button type="submit" @click="submitSignup" class="sumbit_button"  v-else>Créer mon compte</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

    export default{
    name:'login_view',
    data(){
        return {
            mode:'login',
            username:'',
            password:''
        }
    },
    methods:{
        ...mapActions(['actionLogin', 'actionSignup']),

        swicthToCreateAccount: function(){
        this.mode= 'create';
        },
        swicthToLogin: function(){
            this.mode= 'login';
        },
        submitLogin(){
            this.actionLogin({username:this.username, password:this.password})
        },
        submitSignup(){
            this.actionSignup({username:this.username, password:this.password})
            this.mode= 'login';
            // Ajouter modal compte créé log toi
        },
    },
    }
</script>

<style scoped>
.card_action{
    text-decoration:underline
}
</style>