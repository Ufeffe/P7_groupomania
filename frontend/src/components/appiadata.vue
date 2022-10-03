<template>
    <div id="app" :class="[{ collapsed: collapsed }, { onmobile: isOnMobile }]">
      <div v-if="login" class="app d-flex flex-column min-vh-100">
        <NavBar :key="$route.fullPath" />
        <Error v-if="error!=null" :error="error"/>
        <router-view v-else v-on:error="throwError" class="top"/>
        <Footer class="mt-auto" />
      </div>
      <div v-else class="loadingContainer">
        <Loader />
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from "@/components/TheNavBar";
  import Error from "@/components/system/Error";
  import Footer from "@/components/TheFooter";
  import Loader from "@/components/TheLoader";
  
  const separator = {
    template: `<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">`,
  };
  
  export default {
    name: "app",
    components: {
      NavBar,
      Footer,
      Error,
      Loader
    },
    computed: {
      login: function () {
        this.$forceUpdate()
        // console.log('force update')
        return this.$store.getters.isLoggedIn
      },
    },
    data() {
      return {
        collapsed: false,
        isOnMobile: false,
        detect: false,
        displayError: true,
        error: null,
        loading: false,
      }
    },
    watch:{
      $route (to, from){
        this.error = null;
      }
    },
    mounted() {
      this.onResize();
      window.addEventListener("resize", this.onResize);
    },
    methods: {
      onToggleCollapse(collapsed) {
        this.collapsed = collapsed;
      },
      onResize() {
        if (window.innerWidth <= 767) {
          this.isOnMobile = true;
          this.collapsed = true;
        } else {
          this.isOnMobile = false;
          this.collapsed = false;
        }
      },
      throwError( error )
      {
          this.error = error
      }
    },
  };
  </script>
  
  <style scoped>
  .top {
    margin-top:65px;
  }
  .loadingContainer {
    margin-top:250px;
  }
  </style>