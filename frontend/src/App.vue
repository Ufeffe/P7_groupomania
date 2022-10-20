<template>
  <div class="container">
    <h1>Groupomania</h1>
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
