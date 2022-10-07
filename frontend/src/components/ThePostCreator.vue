<template>
  <div>
    <h1>Créer votre post</h1>
    <input type="text" v-model="description">
    <button type="submit" @click="CreatPost(description)">Poster</button>
  </div>
</template>

<script>
    import { mapActions,mapGetters } from "vuex";
    import axios from "axios";

export default {
    name:"PostCreator",
    data(){
        return{
            description:"",
            imageUrl:""
        }
    },
    computed:{
            ...mapGetters(['getLoginStatus']),
        },
    methods:{
    
        // ...mapActions(['actionCreatPost']),

        CreatPost(text) {
            console.log("2",this.getLoginStatus.userInfos.token);
            console.log("1",text);

        axios.post('http://127.0.0.1:3000/api/posts/', {
                description:text,
                },
                {headers: {
                    "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token
                }} )
            .then((res) => {
                console.log(res);
            })
            .catch(error => ({ error }))
        },

            // CreatPost(){
            //     this.actionCreatPost({ description:this.description })
            // },
        }
}
</script>

