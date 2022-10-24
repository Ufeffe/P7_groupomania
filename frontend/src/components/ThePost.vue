<template>
    <article class="news">
          <header>
              <div>
                  <h2 class="news_name"> {{username[0]}}</h2>
                  <h3 class="news_time">{{postDate[0]}}</h3>
              </div>
              <div class="setting_items" v-if="this.getLoginStatus.userInfos.username  === this.user || this.getLoginStatus.userInfos.role ==='Admin'">
                  <i class="fa-solid fa-trash" @click="deletePost" v-if="mode =='read'"></i>
                  <i class="fa-solid fa-pen" @click="switchToEdit" v-if="mode == 'read'"></i>
                  <i class="fa-solid fa-xmark" @click="switchToRead" v-if="mode=='edit'"></i>
                  <i class="fa-solid fa-floppy-disk" v-if="mode=='edit'" @click="modifyPost"></i>
                  <div class="import_file" v-if="mode =='edit'">
                    <i class="fa-solid fa-file-arrow-up"></i>
                    <input type="file" id="fileEdit" name="fileEdit" accept="image/png, image/jpeg, image/jpg" class="inputfile" @change="onFileSelected($event)">
                    <label for="fileEdit" v-if="this.imageName==''">Photo</label>
                    <label for="fileEdit" v-else><span>{{imageName}}</span></label>
                </div>
              </div>
          </header>
  
          <p class="text_display" v-if="mode == 'read'"> {{description}}</p>
          <textarea cols="30" rows="5" maxlength="200" v-else v-model="newDescription" :placeholder=this.description></textarea>
  
          <div v-if="imageUrl != null">
              <img class="news_img" :src="imageUrl" :alt="imageAlt" >
          </div>
  
          <i class="fa-solid fa-heart spacing" @click="likePost"></i>{{likes}}
  
          <div class="flex_row">
              <textarea cols="30" rows="2" maxlength="200" placeholder="Entrez votre commentaire" v-model="descriptionCommentaire"></textarea>
              <div class="import_file" @click="CreatCom">
                  <i class="fa-solid fa-paper-plane"></i>
              </div>
          </div>
  
          <TheComTemplate v-for="com in comsFetched"
          :fetchComFunction="this.callComments"
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
import { mapGetters } from "vuex";

import TheComTemplate  from "./TheComTemplate.vue";

export default {
    name:'Post',
    data(){
        return{
            mode:'read',
            newDescription: "",
            comsFetched:[],
            descriptionCommentaire:"",
            username:"",
            postDate:"",
            image:'',
            imageName:'',
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
        },
        fetchFunction:{
            type:Function,
            require:true
        }
    }, 
    computed:{
            ...mapGetters(['getLoginStatus']),

        },
    mounted(){
        this.callComments()
        this.getUsername(this.user)
        this.getPostDate(this.createdAt)
    },
    methods:{
        onFileSelected(event){
            this.image = event.target.files[0]
            if (this.image != undefined){
                this.imageName = event.target.files[0].name
            }else{
                this.imageName = ""
            }
        },
        getPostDate(string){
        this.postDate = string.split('T',1)
        },
        getUsername(string){
            this.username = string.split('@',1)
        },
        switchToEdit:function(){
            this.mode = 'edit'
        },
        switchToRead:function(){
            this.mode = 'read'
        },
        CreatCom(){

            if(this.descriptionCommentaire !=""){
            axios.post(`http://127.0.0.1:3000/api/commentaire/${this.postId}`,{
                        description:this.descriptionCommentaire
                    },{
                headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token
                    }
                })
                .then((res)=>{
                    this.descriptionCommentaire = ""
                    this.callComments()
                    return res.data
                })
                .catch(error => ({ error }))
        }else{
            window.alert('Veuillez entrer un message avant de poster votre commentaire')
        }
    },
        callComments(){
                    axios.get(`http://127.0.0.1:3000/api/commentaire/${this.postId}`,{
                headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token
                    }
                })
                .then((res)=>{
                    return res.data
                })
                .then((comArray)=> {
                    //recupération du tableau des posts et tri en fonction de l'id en décroissant
                    this.comsFetched = comArray.sort(function(a,b) { 
                        return b.id - a.id })
                    this.fetchFunction()
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
                    this.fetchFunction()
                    return res
                })
                .catch(error => ({ error }))
        },
        modifyPost(){
            if(this.newDescription != "" && this.image == ''){
                axios.put(`http://127.0.0.1:3000/api/posts/${this.postId}`,
                {description:this.newDescription}
                ,
                {headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token,
                }} )
                .then(() => {
                    this.newDescription = ""
                    this.mode='read'
                    this.fetchFunction()
                })
                .catch(error => ({ error }))
            }else if( this.newDescription != "" && this.image !=''){        
                const formData = new FormData();
                formData.append('file', this.image);
                formData.append('description', this.newDescription);
                       
                axios.put(`http://127.0.0.1:3000/api/posts/${this.postId}`,
                    formData
                ,
                {headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token,
                        'Content-Type': 'multipart/form-data'
                }} )
                .then(() => {
                    this.newDescription = ""
                    this.image = ""
                    this.imageName = ""
                    this.fetchFunction()
                    this.mode='read'
                })
                .catch(error => ({ error }))
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
                    this.fetchFunction()
                    return res
                })
                .catch(error => ({ error }))
        },
    }
}
</script>

<style scoped>
.news{
    border: 2px solid var(--ter-color);
    border-radius: 10px;
    margin-top: 30px;
    padding: 15px 0px;
    background-color: white;
    box-shadow: 5px 5px 2px 1px rgb(0 0 255 / 30%);
}
header, .flex_row{
    padding: 0px 15px;
    text-align: left;
    display: flex;
    justify-content: space-between;
}

.text_display{
    padding: 15px;
    text-align: justify;
}
.news_img{
    width: 100%;
    height: 450px;
    object-fit: cover;
}
.import_file{
    padding-top: 10px;
}
.spacing{
    margin: 15px;
}
.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

.import_file>label {
    cursor: pointer;
    color: var(--prim-color);
}
</style>