<template>
  <div class="container">
    <div class="welcome">
        <h1>Welcome select a child</h1>
        <!-- {{getLoginStatus}} -->
    </div>
    <div v-if="getLoginStatus.loginSuccess" class="child_display">
      <posts/>
    </div>
    <div v-else class="child_display">
      <login/>
    </div>
  </div>

</template>

<script>
import posts from "@/components/Home";
import login from '@/components/TheLogin';
import { mapGetters } from "vuex";

export default {
/* eslint-disable */
name: 'Homepage',
components:{
posts,
login
},
computed:{
...mapGetters(['getLoginStatus'])
}
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
