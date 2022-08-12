<script setup>
import Login from './components/Login.vue'
import Feed from './components/Feed.vue'

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/icon-left-font.svg"  />
  </header>

  <main>
    <Login/>
    <Feed/>


  </main>
</template>

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
