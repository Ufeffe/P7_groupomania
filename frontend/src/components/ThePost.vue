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
        <button @click="switchToEdit" v-if="mode == 'read'">Modifier texte</button>
        <button type="submit" v-else @click="modifyPost">Enregistrer</button>
        <button type="submit" @click="deletePost">Delete</button>
        <button type="submit" @click="likePost">Like</button>

    </article>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from 'axios';


export default {
    name:'Post',
    data(){
        return{
            mode:'read',
            newDescription: ""
        }
    },
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
    methods:{
            // ...mapActions(['actionDeletePost']),
        switchToEdit:function(){
            this.mode = 'edit'
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

            // deletePost(){
            //     console.log(this.postId);
            //     this.actionDeletePost({postId:this.postId})
            // }
        }
}
</script>

<style scoped>
.news{
    border:  solid grey;
    margin-top: 5px;
}
</style>