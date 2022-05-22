<template>
    
  <div id="container">
    <h1>Inscription</h1>

      <label for="email">Email</label><br>
      <input v-model="email" type="email"><br>

      <label for="pseudo">Pseudo</label><br>
      <input v-model="pseudo" type="text"><br>

      <label for="password">Mot de passe</label><br>
      <input v-model="password" type="text"><br>

      <label for="photo">Photo</label><br>
      <input type="file" id="picToUpload" name="sampleFile" />

      <button @click="inscription()">Inscription</button>
  </div> 


</template>

<script>
const axios = require('axios').default;
import router from "../router/index";

export default {
  name: 'PageInscription',
  data() {
    return {
      email:"",
      pseudo:"",
      password:"",
      photo:""
    }
  },
  methods: {
    inscription() {


        var formData = new FormData();
        var imagefile = document.querySelector('#picToUpload');
        formData.append("image", imagefile.files[0]);
        formData.append("email", this.email);
        formData.append("password", this.password);
        formData.append("pseudo", this.pseudo);

      axios({
        method: 'post',
        baseURL: 'http://localhost:3000/user/inscription',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      })
      .then((res) =>{
        if(res.status == 201) {
          console.log('inscription valide', res);
          router.push('/connexion');
        }
        else{
          console.log('err', res);
        }
      })
      .catch((error)=> {
        console.log(error);
      });

    }
  },
}
</script>