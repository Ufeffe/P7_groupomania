<template>
  <article class="news">
        <header>
            <h2 class="news_name">{{user}}</h2>
            <h3 class="news_time">{{createdAt}}</h3>
        </header>

        <p class="news_article" v-if="mode == 'read'"> {{description}}</p>
        <textarea  v-else v-model="newDescription"></textarea>

        <div class="news_img_container" v-if="imageUrl != ''">
            <img class="news_img" :src="imageUrl" :alt="imageAlt">
        </div>

        <div class="news_like_container"> 
        <!-- <font-awesome-icon icon="fa-solid fa-heart" class="like_icon"/> -->
         {{likes}}
        </div>
        <div v-if="this.getLoginStatus.userInfos.username  === this.user || this.getLoginStatus.userInfos.role ==='Admin'">
            <button type="submit" @click="deletePost">Delete</button>
            <button @click="switchToEdit" v-if="mode == 'read'">Modifier texte</button>
            <button @click="switchToRead" v-if="mode=='edit'">Annuler</button>
            <button type="submit" v-if="mode=='edit'" @click="modifyPost">Enregistrer</button>
        </div>
        <button type="submit" @click="likePost">Like</button>

        <TheComTemplate v-for="com in coms"
        :key="com.id"
        :username= "com.user.username"
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
            coms:[],
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
                .then((res)=>{
                    this.coms= res
                    console.log("log de this.coms",this.coms);
                })
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