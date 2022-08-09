<template>
   <div id="login_form">
        <h1 class="login_title" v-if="mode == 'login'">Connexion</h1>
        <h1 class="login_title" v-else>Inscription</h1>
        <p class="card_subtitle" v-if="mode == 'login'">Vous n'avez pas de compte ? <br><span class="card_action" @click="swicthToCreateAccount">Créer un compte</span></p>
        <p class="card_subtitle" v-else>Vous avez déjà un compte ? <br><span class="card_action" @click="swicthToLogin">Connectez-vous</span></p>
        <div class="form">
            <input v-model ="username" type="text" placeholder="Nom d'utilisateur">
            <input v-model="password" type="password" placeholder="Mot de passe"> 
        </div>
        <div class="form_button">
            <button class="sumbit_button" :class="{'disabled' : !validatedFields}" v-if="mode=='login'">Connexion</button>
            <button class="sumbit_button" :class="{'disabled' : !validatedFields}" v-else>Créer mon compte</button>
        </div>
    </div>
</template>


<script >
export default{
name:'login',
data:function(){
    return{
        mode:'login',
        username:'',
        password:''
    }
},computed:{    
validatedFields: function(){
    if (this.username !="" && this.password!=""){
        return true
    }else{
        return false
    }
}
},
methods:{
 swicthToCreateAccount: function(){
    this.mode= 'create';
},
 swicthToLogin: function(){
    this.mode= 'login';
}}}
</script>

<style scoped>
#login_form{
    width: 300px;
}
.form{
    display: flex;
    flex-direction: column;
}
.form >input{
height: 30px;
margin: 5px 0;
}
</style>