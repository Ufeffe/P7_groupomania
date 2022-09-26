<template>
<article class="news">
    <header>
        <h2 class="news_name">{{post.userId}}</h2>
        <h3 class="news_time">{{post.createdAt}}</h3>
    </header>

    <p class="news_article"> {{post.description}}</p>

    <div class="news_img_container" v-if="imageUrl != ''">
        <img class="news_img" :src="imageUrl" :alt="imageAlt">
    </div>

    <div class="news_like_container"> 
    <font-awesome-icon icon="fa-solid fa-heart" class="like_icon"/> {{post.likes}}
    </div>

    <!-- <div class="news_commentaire_container">
        <h2> {{user_commentaire}}</h2>
        <p> {{commentaire}}</p>
    </div>
    <div class="news_commentaire_container">
        <h2> {{user_commentaire}}</h2>
        <p> {{commentaire}}</p>
    </div> -->
        
    <!-- commentaire component -->
</article>

</template>

<script>
import { numberLiteralTypeAnnotation } from '@babel/types';
import axios from 'axios'
import postsData from '../posts.json'
import usersData from '../user.json'

export default{
    name: 'feed',
    props:{
        userId:{
            type:Number,
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
            required:true
        },
        imageAlt:{
            type:String,
            required:true
        },
        likes:{
            type:Number,
            required:true
        }
    }
    // data: function(){
    //     return{
    //         username:"Alphonse",
    //         createdAt:"10 aout",
    //         imageUrl: "photo_repas.jpg",
    //         imageAlt:"Photo de repas avec une vidéo de feu de cheminé dans la télé",
    //         description: 'Un bon repas de dimanche',
    //         likes: 12,
    //         user_commentaire: "Alfred",
    //         commentaire:"ouugsdqf qsidiug qsdpifuig sqdffug sdoug qsdfpoug qsdfqsdffqsdfu sdfiugsd dgh ds sd sd ug f"
    //     }
    // }
    // data(){
    //     return{
    //         posts:[],
    //         user:usersData
    //     }
    // }    
}

//  async function getPost(){
//     const postsInDataBase= await axios.get('http://127.0.0.1:5432/api/posts/')
//     return result = await postsInDataBase.json()
// }

// getPost()
//     .then(postsInDataBase =>{
//         return this.posts.map(posts => {
//             const post = postsInDataBase.find(post =>post.userId === user.id)
//             if (post){
//                 post.id = post.id
//                 post.userId = user.name
//                 post.description = post.description
//                 post.imageUrl = post.imageUrl
//                 post.imageAlt = post.imageAlt
//                 post.createdAt = post.createdAt
//             }
//             return this.post
//         })
//     })
</script>

<style scoped>

/* Paramètres du post */
.news{
    display: flex;
    flex-direction: column;
    width: auto;
    max-width: 1024px;
    margin: 20px auto;
    border-radius: 25px;
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    /* box-shadow:  5px 5px 1px #d9d9d9; */
}
/* En tete du post */
header{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px 0px 5px 20px;
    border-bottom: 1px solid rgb(194, 194, 194);
}

/* Paramètres du texte du post */
.news_article{
    padding-left: 20px;
    text-align: left;
    margin: 10px 0px;
}
/* Paramètres de l'image */
.news_img {
    max-height: 300px;
    height: 100%;
    width: 100%;
    object-fit: cover;
}

/* Paramètres des likes */
.news_like_container{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 0px 5px 20px;
    border-bottom: 1px solid rgb(194, 194, 194);
}
.like_icon{
    color: #ff7575;
    margin: 0px 5px;
}
.dis{
    color: #6d3434;
}
/* Paramètres des commentaires */
.news_commentaire_container{
text-align: left;
padding-left: 20px;
margin-top: 10px;
margin-bottom: 5px;
}
</style>