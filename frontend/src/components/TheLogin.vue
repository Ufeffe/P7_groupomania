<template>
    <div>
        <h2  v-if="mode == 'login'">Connexion</h2>
        <h2  v-else>Inscription</h2>
        <div class="form">
            <input class="custom_items hover_effect" v-model="username" type="text" placeholder="Adresse mail" autofocus>
            <input class="custom_items hover_effect" v-model="password" type="password" placeholder="Mot de passe">
            <button class="custom_items hover_effect egal" type="submit" @click="submitLogin" v-if="mode=='login'">Se connecter</button>
            <button class="custom_items hover_effect" type="submit" @click="submitSignup" v-else>Créer mon compte</button>
        </div>
        <p v-if="mode == 'login'">Vous n'avez pas de compte ? <br><span class="card_action" @click="swicthToCreateAccount">Créer un compte</span></p>
        <p v-else>Vous avez déjà un compte ? <br><span class="card_action" @click="swicthToLogin">Se connecter</span></p>
        
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
        },
    },
    }
</script>

<style scoped>
.card_action{
    cursor: pointer;
    text-decoration:underline var(--prim-color);
}
.form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 15px 0;
}
.form>input{
    margin-bottom: 10px;
}

</style>