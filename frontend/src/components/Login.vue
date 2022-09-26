<template>
   <div id="login_form">
        <h1 class="login_title" v-if="mode == 'login'">Connexion</h1>
        <h1 class="login_title" v-else>Inscription</h1>
        <p class="card_subtitle" v-if="mode == 'login'">Vous n'avez pas de compte ? <br><span class="card_action" @click="swicthToCreateAccount">Créer un compte</span></p>
        <p class="card_subtitle" v-else>Vous avez déjà un compte ? <br><span class="card_action" @click="swicthToLogin">Connectez-vous</span></p>
        <div class="form">
            <!-- <font-awesome-icon icon="fa-solid fa-eye" /> -->
            <input v-model="username" type="text" placeholder="Nom d'utilisateur">
            <input v-model="password" type="password" id="myPassword" placeholder="Mot de passe">
            <div>
                <input type="checkbox" id="mdp" @click="showPassword">
                <label id="view_password" for="mdp">Voir mot de passe</label> 
            </div>
        </div>
        <div class="form_button" >
            <button @click="login" class="sumbit_button" :class="{'disabled' : !validatedFields}" v-if="mode=='login'">Connexion</button>
            <button @click="signup" class="sumbit_button" :class="{'disabled' : !validatedFields}" v-else>Créer mon compte</button>
        </div>
    </div>
</template>


<script >
import axios from 'axios'

export default{
name:'login',
data:function(){
    return{
        mode:'login',
        username:'',
        password:''
    }
},
props:{
    getToken:Function 
},
computed:{    
validatedFields: function(){
    if (this.username !="" && this.password !=""){
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
},
showPassword:function(){
    const showPassword = document.getElementById("myPassword")
    if (showPassword.type ==="password"){
        showPassword.type = "text"

    }else{
        showPassword.type ="password"
    }
},
login:function(){
    console.log("debut du login");
    console.log( this.password, this.username)
    axios.post('http://127.0.0.1:3000/api/auth/login', {username:this.username, password:this.password})
    .then((res) => {
        this.userLoggedData = res
        console.log(this.userLoggedData);
        console.log(this.userLoggedData.data.token);
    })
},
signup:function(){
    console.log("debut du login");
    console.log( this.password, this.username)
    axios.post('http://127.0.0.1:3000/api/auth/signup', {username:this.username, password:this.password})
    .then((res) => {
        this.userLoggedData = res
        console.log(this.userLoggedData);
    })
    }
}}
</script>

<style scoped>
#login_form{
    max-width: 350px;
    margin: auto;
    border-radius: 25px;
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    box-shadow:  7px 7px 1px #d9d9d9;
    }

#view_password{
font-size: 16px;
margin-left: 5px;
}
.form{
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: auto;
}
.form >input{
height: 30px;
margin: 5px 0;
border: 0px;
border-radius: 8px;
}

</style>