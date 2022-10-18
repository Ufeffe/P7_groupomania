<template>
    <div>
        <h1>Affichage des posts</h1>
        <Profil />
        <PostCreator 
        :fetchFunction="this.fetchItem"/>

        <Post v-for="post in postsFetched"
        :fetchFunction="this.fetchItem"
        :key="post.id"
        :user="post.user.username"
        :createdAt="post.createdAt"
        :description="post.description"
        :imageUrl="post.imageUrl"
        :imageAlt="post.imageAlt"
        :likes="post.nb_likes"
        :postId="post.id"
        ></Post>
    </div>
</template>

<script>
    import Post  from "./ThePost.vue";
    import Profil from "./TheProfile.vue";
    import PostCreator from "./ThePostCreator.vue";
    import SimpleUpload from "./SimpleUpload.vue"
    import { mapMutations , mapGetters } from "vuex";
    import axios from 'axios';
    import store from "@/store";


    export default{
        name:'Home',
        data(){
            return{
                postsFetched:[],
            }
        },
        components:{
            Post,
            Profil,
            PostCreator,
            SimpleUpload,
        },
        computed:{
            ...mapGetters(['getLoginStatus']),
            
        },
        mounted(){
            this.fetchItem()
        },
        methods:{
            ...mapMutations(['logout']),

            logoutAction(){
                store.commit('logout')
            },
            //Call des posts de la BDD
            fetchItem(){
            axios.get('http://127.0.0.1:3000/api/posts/', {
                    headers: {
                        "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token
                    }
                })
                .then((res) => {
                    console.log("response axios", res.data);
                    return res.data
                })
                .then((postsArray)=> {
                    //recupération du tableau des posts et tri en fonction de l'id en décroissant
                    this.postsFetched = postsArray.sort(function(a,b) { 
                        return b.id - a.id })
                    console.log("result final",this.postsFetched);
                })
                .catch(error => ({ error }))
            },
            
        },
    }
</script>