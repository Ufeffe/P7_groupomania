<template>
    <div class="display_com">
      <h3>Com de {{user}}</h3>
      <h6>{{createdAt}}</h6>
      <p class="news_article" v-if="mode == 'read'"> {{description}}</p>
        <textarea  v-else v-model="newDescription"></textarea>

      <div v-if="this.getLoginStatus.userInfos.username  === this.user || this.getLoginStatus.userInfos.role ==='Admin'">
              <button type="submit" @click="deletePost">Delete</button>
              <button @click="switchToEdit" v-if="mode == 'read'">Modifier texte</button>
              <button @click="switchToRead" v-if="mode=='edit'">Annuler</button>
              <button type="submit" v-if="mode=='edit'" @click="modifyPost">Enregistrer</button>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from "vuex";

export default {
    name:"TheComTemplate",
    data(){
      return {
        mode:'read',
        newDescription: "",
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
            }
    },
    computed:{
            ...mapGetters(['getLoginStatus']),
            
        },
    methods:{
      switchToEdit:function(){
            this.mode = 'edit'
        },
        switchToRead:function(){
            this.mode = 'read'
        },
      deletePost() {
            axios.delete(`http://127.0.0.1:3000/api/commentaire/${this.comId}`,{
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
            axios.put(`http://127.0.0.1:3000/api/commentaire/${this.comId}`,{
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
    },
}
</script>
<style scoped>
.display_com{
    border: dashed red;
margin: 15px;}
</style>