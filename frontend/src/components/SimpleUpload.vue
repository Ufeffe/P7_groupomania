<template>
  <form @submit.prevent="submitFile" enctype="multipart/form-data">

<div class="file">
    <label>File
        <input type="file" @change="selectFile( $event )"/>
      </label>
      <button @click="submitFile()">Submit</button>
</div>

  </form>
</template>

<script>
import { axios } from "axios";
export default {
name:"SimpleUpload",
data(){
    return{
        file:""
    }
},
methods:{
selectFile(event){
    this.file = event.target.files[0];}
},
submitFile(){
    let formData = new FormData();
    formData.append('file', this.file);
    axios.post( '/single-file',
        formData,
        {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        }
    ).then(function(){
    console.log('SUCCESS!!');
})
    .catch(function(){
    console.log('FAILURE!!');
});
},
}
</script>

<style>

</style>