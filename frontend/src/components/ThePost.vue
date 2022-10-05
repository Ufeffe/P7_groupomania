<template>
  <article class="news">
        <header>
            <h2 class="news_name">{{user}}</h2>
            <h3 class="news_time">{{createdAt}}</h3>
        </header>

        <p class="news_article"> {{description}}</p>

        <div class="news_img_container" v-if="imageUrl != ''">
            <img class="news_img" :src="imageUrl" :alt="imageAlt">
        </div>

        <div class="news_like_container"> 
        <!-- <font-awesome-icon icon="fa-solid fa-heart" class="like_icon"/> -->
         {{likes}}
        </div>
    </article>
</template>

<script>
export default {
    name:'Post',
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
        }
    }
}
</script>

<style scoped>
.news{
    border:  solid grey;
    margin-top: 5px;
}
</style>