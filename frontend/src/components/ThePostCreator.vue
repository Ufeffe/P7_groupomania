<template>
    <div class="post_creation">
        <h1>Créer votre post</h1>

        <textarea name="" id="" cols="30" rows="10" v-model="description"></textarea>

        <label for="insert_image">Importer une image:</label>
        <input type="file" id="insert_image" name="insert_image" accept="image/png, image/jpeg, image/jpg" @change="onFileSelected($event)">

        <button type="submit" @click="CreatPost()">Poster</button>

     </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import axios from "axios";

export default {
    name:"PostCreator",
    data(){
        return{
            description:"",
            image:'',
        }
    },
    props:{
        fetchFunction:{
            type:Function,
            require:true
        }
    },
    computed:{
        ...mapGetters(['getLoginStatus']),
    },
    methods:{
        onFileSelected(event){
            this.image = event.target.files[0]       
        },
        
        CreatPost() {
            if(this.description != "" && this.image == ''){
                axios.post('http://127.0.0.1:3000/api/posts/',
                {description:this.description}
                ,
                {headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token,
                }} )
                .then((res) => {
                    this.description = ""
                    this.fetchFunction()
                    console.log(res);
                })
                .catch(error => ({ error }))
            }else if( this.description != "" && this.image !=''){        
                const formData = new FormData();
                formData.append('file', this.image);
                formData.append('description', this.description);
                for (const value of formData.values()) {
                console.log(value);
                }       
                axios.post('http://127.0.0.1:3000/api/posts/',
                    formData
                ,
                {headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token,
                        'Content-Type': 'multipart/form-data'
                }} )
                .then((res) => {
                    this.description = ""
                    this.image = ''
                    this.fetchFunction()
                    console.log(res);
                })
                .catch(error => ({ error }))
            }else{
                window.alert('veuillez entrer un texte avant de poster')
            }},  
    }
}
</script>

<style scoped>
.post_creation{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
}

textarea {
    width: 250px;
    height: 150px;
  resize: none;
}
</style>