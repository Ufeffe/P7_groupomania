<template>
    <div>
        <h1>Affichage des posts</h1>
        <Profil />
        <button type="submit" @click="FecthPosts">Fetch Posts</button>
        <Post v-for="post in posts"
        :key="post.id"
        :user="post.user.username"
        :createdAt="post.createdAt"
        :description="post.description"
        :imageUrl="post.imageUrl"
        :imageAlt="post.imageAlt"
        :likes="post.likes"
        ></Post>
    </div>
</template>

<script>
    import Post  from "./ThePost.vue";
    import Profil from "./TheProfile.vue";
    import { mapActions } from "vuex";

    export default{
        name:'Home',
        data(){
            return{
                posts:[{postId:1, user:{username:'Hector'},createdAt:"2 Avril",description:"fzeu",imageUrl:"url", imagAlt:"altImage",likes:5},{postId:2, user:{username:'Jean'},createdAt:"2 Avril",description:"fzeu",imageUrl:"", imagAlt:"altImage",likes:2},]
            }
        },
        components:{
            Post,
            Profil,
        },
        methods:{
            ...mapActions(['actionCallAllPosts']),
            
            FecthPosts(){
                this.actionCallAllPosts()
            }
            },
        
    }
</script>