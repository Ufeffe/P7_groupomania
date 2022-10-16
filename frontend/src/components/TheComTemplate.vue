<template>
  <div class="display_com">
    <div>{{username}}</div>
    <div>{{createdAt}}</div>
    <div>{{description}}</div>


  </div>
</template>

<script>
export default {
    name:"TheComTemplate",
    props:{
            username:{
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
    },
}
</script>
