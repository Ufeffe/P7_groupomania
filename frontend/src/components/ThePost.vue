<template>
  <article class="news">
        <header>
            <h2 class="news_name"> Post de {{user}}</h2>
            <h3 class="news_time">{{createdAt}}</h3>
        </header>

        <p class="news_article" v-if="mode == 'read'"> {{description}}</p>
        <textarea  v-else v-model="newDescription"></textarea>

        <div class="news_img_container" v-if="imageUrl != ''">
            <img class="news_img" :src="imageUrl" :alt="imageAlt">
        </div>

        <div class="news_like_container"> 
        <!-- <font-awesome-icon icon="fa-solid fa-heart" class="like_icon"/> -->
        <button type="submit" @click="likePost">Like</button>
 
        {{likes}}
        </div>
        <div class="new_like_com_creator">
            <textarea placeholder="Entrez votre commentaire" v-model="descriptionCommentaire"></textarea>
            <button type="submit" @click="CreatCom">Poster Com</button>

        </div>
        <div v-if="this.getLoginStatus.userInfos.username  === this.user || this.getLoginStatus.userInfos.role ==='Admin'">
            <button type="submit" @click="deletePost">Delete Post</button>
            <button @click="switchToEdit" v-if="mode == 'read'">Modifier Post</button>
            <button @click="switchToRead" v-if="mode=='edit'">Annuler</button>
            <button type="submit" v-if="mode=='edit'" @click="modifyPost">Enregistrer</button>
        </div>

        <TheComTemplate v-for="com in comsFetched"
        :comId="com.id"
        :key="com.id"
        :user= "com.user.username"
        :description="com.description"
        :createdAt="com.createdAt"
        ></TheComTemplate>

    </article>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from "vuex";

import TheComTemplate  from "./TheComTemplate.vue";

export default {
    name:'Post',
    data(){
        return{
            mode:'read',
            newDescription: "",
            comsFetched:[],
            descriptionCommentaire:""
        }
    },
    components:{TheComTemplate},
    props:{
        user:{
            type:String,
            required:true
        },
        createdAt:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        imageUrl:{
            type:String,
        },
        imageAlt:{
            type:String,
        },
        likes:{
            type:Number,
            required:true
        },
        postId:{
            type:Number,
            required:true
        }
    }, 
    computed:{
            ...mapGetters(['getLoginStatus']),
            
        },
    mounted(){
        this.callComments()
    },
    methods:{
            // ...mapActions(['actionDeletePost']),

        switchToEdit:function(){
            this.mode = 'edit'
        },
        switchToRead:function(){
            this.mode = 'read'
        },
        CreatCom(){
            axios.post(`http://127.0.0.1:3000/api/commentaire/${this.postId}`,{
                        description:this.descriptionCommentaire
                    },{
                headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token
                    }
                })
                .then((res)=>{
                    console.log("response axios", res.data);
                    return res.data
                })
                .catch(error => ({ error }))
        },
        callComments(){
                    axios.get(`http://127.0.0.1:3000/api/commentaire/${this.postId}`,{
                headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token
                    }
                })
                .then((res)=>{
                    console.log("response axios", res.data);
                    return res.data
                })
                .then((comArray)=> {
                    //recupération du tableau des posts et tri en fonction de l'id en décroissant
                    this.comsFetched = comArray.sort(function(a,b) { 
                        return b.id - a.id })
                    console.log("result final",this.comsFetched);
                })
                .catch(error => ({ error }))
            },
        deletePost() {
            axios.delete(`http://127.0.0.1:3000/api/posts/${this.postId}`,{
                headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token
                    }
                })
                .then((res) => {
                    console.log("response axios", res);
                    return res
                })
                .catch(error => ({ error }))
        },
        modifyPost(){
            if (this.newDescription !=""){
            axios.put(`http://127.0.0.1:3000/api/posts/${this.postId}`,{
                description:this.newDescription
            },{
                headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token
                    }
                })
                .then((res) => {
                    console.log("response axios", res);
                    this.mode = 'read'
                    return res
                })
                .catch(error => (
                    this.mode = 'read', { error }))
        }else{
            window.alert('veuillez entrer un texte avant de poster')
        }},
        likePost() {
             axios.post(`http://127.0.0.1:3000/api/posts/${this.postId}/like`,{},{
                headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token
                    }
                })
                .then((res) => {
                    console.log("response axios", res);
                    return res
                })
                .catch(error => ({ error }))
        },
    }
}
</script>

<style scoped>
.news{
    border:  solid grey;
    margin-top: 5px;
}
</style>