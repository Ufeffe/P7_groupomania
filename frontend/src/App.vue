<template>
  <div class="container">
    <div class="logo_container">
      <img src="./assets/icon-left-font.svg" alt="logo de l'entreprise groupomania">
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

<style scoped>
.logo_container{
  height:150px;
  width: 270px;
  overflow: hidden;
}
img{
height: 200%;
position: relative;
top: -80px;
left: -40px;
}
</style>