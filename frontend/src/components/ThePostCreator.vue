<template>
    <div class="post_creation">
        <textarea cols="30" rows="10" maxlength="200" v-model="description" placeholder="Créer un nouveau post"></textarea>
        <div class="wrapper_option">
            <div class="import_file">
                <i class="fa-solid fa-file-arrow-up"></i>
                <input type="file" id="file" name="file" accept="image/png, image/jpeg, image/jpg" class="inputfile" @change="onFileSelected($event)">
                <label for="file" v-if="this.imageName==''">Photo</label>
                <label for="file" v-else><span>{{imageName}}</span></label>
            </div>
            <div class="import_file" @click="CreatPost">
                <i class="fa-solid fa-paper-plane"></i>
            </div>
        </div>
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
            imageName:'',
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
            if (this.image != undefined){
                this.imageName = event.target.files[0].name
            }else{
                this.imageName = ""
            }
        },
        
        CreatPost() {
            if(this.description != "" && this.image == ''){
                axios.post('http://127.0.0.1:3000/api/posts/',
                {description:this.description}
                ,
                {headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token,
                }} )
                .then(() => {
                    this.description = ""
                    this.fetchFunction()
                })
                .catch(error => ({ error }))
            }else if( this.description != "" && this.image !=''){        
                const formData = new FormData();
                formData.append('file', this.image);
                formData.append('description', this.description);
                       
                axios.post('http://127.0.0.1:3000/api/posts/',
                    formData
                ,
                {headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token,
                        'Content-Type': 'multipart/form-data'
                }} )
                .then(() => {
                    this.description = ""
                    this.image = ""
                    this.imageName = ""
                    this.fetchFunction()
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
    height: 150px;
    border: 2px solid var(--ter-color);
    box-shadow: 5px 5px 2px 1px rgb(0 0 255 / 30%);
}

.wrapper_option{
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-evenly
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