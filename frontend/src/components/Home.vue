<template>
    <div>
        <h1>Affichage des posts</h1>
        <Profil />
        <PostCreator />

        <button type="submit" @click="fetchItem">Fetch Posts</button>
        <Post v-for="post in postsFetched"
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
    import { mapActions, mapGetters } from "vuex";
    import axios from 'axios';


    export default{
        name:'Home',
        data(){
            return{
                posts:[{postId:1, user:{username:'Hector'},createdAt:"2 Avril",description:"fzeu",imageUrl:"url", imagAlt:"altImage",likes:5},{postId:2, user:{username:'Jean'},createdAt:"2 Avril",description:"fzeu",imageUrl:"", imagAlt:"altImage",likes:2},],
                postsFetched:[],
            }
        },
        components:{
            Post,
            Profil,
            PostCreator,
        },
        computed:{
            ...mapGetters(['getLoginStatus', 'getAllPosts']),
            
        },
        mounted(){
            this.actionCallAllPosts()
            // this.fetchItem()
        },
        created(){
            this.postsFetched=this.getAllPosts
        },
        methods:{
            ...mapActions(['actionCallAllPosts']),

            // fetchItem(){
            // axios.get('http://127.0.0.1:3000/api/posts/', {
            //         headers: {
            //             "Authorization": 'Bearer ' + this.getLoginStatus.userInfos.token
            //         }
            //     })
            //     .then((res) => {
            //         console.log("response axios", res.data);
            //         return res.data
            //     })
            //     .then((postsArray)=> {
            //         this.postsFetched = postsArray.reverse()
            //         console.log("result final",this.postsFetched);
            //     })
            //     .catch(error => ({ error }))
            // },
            // FecthPosts(){
            //     this.actionCallAllPosts()
            //     .then((postsArray)=> {
            //         this.postsFetched = postsArray
            //         console.log("result final 2 ",this.postsFetched);
            //     })
            // }
        },
    }
</script>