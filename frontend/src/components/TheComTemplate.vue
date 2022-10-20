<template>
    <div class="display_com">
        <header>
            <div>
                <h3>{{username[0]}}</h3>
                <h4>{{postDate[0]}}</h4>
            </div>
            <div v-if="this.getLoginStatus.userInfos.username  === this.user || this.getLoginStatus.userInfos.role ==='Admin'">
                <i class="fa-solid fa-trash" @click="deleteCom" v-if="mode =='read'"></i>
                <i class="fa-solid fa-pen" @click="switchToEdit" v-if="mode == 'read'"></i>
                <i class="fa-solid fa-xmark" @click="switchToRead" v-if="mode=='edit'"></i>
                <i class="fa-solid fa-floppy-disk" v-if="mode=='edit'" @click="modifyCom"></i>
            </div>
        </header>
        
        <p class="text_display" v-if="mode == 'read'"> {{description}}</p>
        <textarea  v-else v-model="newDescription"></textarea>

        
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";

export default {
    name:"TheComTemplate",
    data(){
      return {
        mode:'read',
        newDescription: "",
        username:"",
        postDate:"",
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
        comId:{
            type:Number,
            required:true
        },
        fetchComFunction:{
            type:Function,
            require:true
        },
    },
    computed:{
            ...mapGetters(['getLoginStatus']),
            
        },
    mounted(){
        this.getUsername(this.user)
        this.getPostDate(this.createdAt)
    },
    methods:{
        getPostDate(string){
        this.postDate = string.split('T',1)
        },
        getUsername(string){
            this.username = string.split('@',1)
        },
      switchToEdit:function(){
            this.mode = 'edit'
            this.newDescription= ""
        },
        switchToRead:function(){
            this.mode = 'read'
        },
      deleteCom() {
            axios.delete(`http://127.0.0.1:3000/api/commentaire/${this.comId}`,{
                headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token
                    }
                })
                .then((res) => {
                    this.fetchComFunction()
                    return res
                })
                .catch(error => ({ error }))
        },
        modifyCom(){
            if (this.newDescription !=""){
            axios.put(`http://127.0.0.1:3000/api/commentaire/${this.comId}`,{
                description:this.newDescription
            },{
                headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token
                    }
                })
                .then((res) => {
                    this.mode = 'read'
                    this.fetchComFunction()
                    return res
                })
                .catch(error => (
                    this.mode = 'read', { error }))
        }else{
            window.alert('veuillez entrer un texte avant de poster')
        }},
    },
}
</script>
<style scoped>
.display_com{
    border: 2px solid var(--second-color);
    border-radius: 10px;
    margin: 15px;
}
header{
    padding: 5px;
}
.text_display{
    padding: 5px;
}
</style>