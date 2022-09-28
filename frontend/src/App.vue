<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/icon-left-font.svg"  />
  </header> -->

  <!-- <div>
      <div>
      <router-link to="/"> Login</router-link>
      <router-link to="/feed">Feed news</router-link>
      </div>
    <router-view></router-view>
  </div> -->
  <main>
    
    <Login/>

    <!-- <Feed
    v-for = "post in posts"
    :key="post.id"
    :userId="post.userId"
    :description="post.description"
    :imageUrl="post.imageUrl"
    :imageAlt="post.imageAlt"
    :likes="post.likes"
    ></Feed> -->
    <!-- v-bind="post"-->
 </main>

</template>



<script >
  import Login from './components/Login.vue'
  import Feed from './components/Feed.vue'
  
export default{

components:{
  Login, Feed
},
data(){
  return {
    posts:[]
  }
}}
</script>
// methods:{
//   getBearerToken(token){
//     alert(token)
//   }
// },
// created()
//   {axios.get('http://127.0.0.1:5432/api/posts/', {
//     headers:{
//         "Authorization":'Bearer '+ userLoggedData.data.token
//     }
//   })
//   .then((response) => {
//       console.log("la réponse est :",response);
//   this.posts = response;
//   })
//   }
// }


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  width:250px;
  height:250px;
}
main{
  width: 100%;
  /* margin: auto; */
}
/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  } 

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
