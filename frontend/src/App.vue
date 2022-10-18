<template>
  <div class="container">
    <div class="welcome">
        <h1>Groupomania</h1>
    </div>
    <div v-if="getLoginStatus.loginSuccess" class="child_display">
      <Home/>
    </div>
    <div v-else class="child_display">
      <TheLogin/>
    </div>
  </div>

</template>

<script>
import Home from "@/components/Home";
import TheLogin from '@/components/TheLogin';
import { mapGetters } from "vuex";
import store from "./store";

export default {
/* eslint-disable */
name: 'Homepage',
components:{
  Home,
  TheLogin
},
computed:{
...mapGetters(['getLoginStatus']),
},
}
</script>


<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
