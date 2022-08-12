<template>

<div class="news">
    <header class="news_header">
        <h2 class="news_name">{{userName}}</h2>
        <p class="news_time">{{createdAt}}</p>
    </header>
    <div class="news_img" v-if="imageUrl !== ''">
        <img src="{{imageUrl}}" alt= {{imageAlt}}>
    </div>
    <article class="news_article"> {{description}}</article>
    <div class="news_like_comments"> 
        <div class="like"> 
            <p>Likes: {{likes}}</p>
            <p>Dislike: {{dislikes}}</p>
        </div>
    </div>
</div>

</template>



<script>
export default{
    name: 'feed',
    data: function(){
        return{
            userName:"Alphonse",
            createdAt:"10 aout",
            imageUrl: '',
            imageAlt:"Photo de repas avec une vidéo de feu de cheminé dans la télé",
            description: 'Un bon repas de dimanche',
            likes: 12,
            dislikes: 1
        }
    }
}
</script>




<style scoped>
.news{
    background-color: rgb(122, 41, 95);
    display: flex;
    flex-direction: column;
    max-width: 1024px;
    margin: auto;
}
.news_header{
    display: flex;
    justify-content: space-between;
    align-items: center
}

.like{
    display: flex;
    flex-direction: row;
justify-content: space-evenly}
</style>