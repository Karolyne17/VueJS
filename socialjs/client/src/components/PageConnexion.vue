<template>
    
  <div id="container">
    <h1>Connexion</h1>

      <label for="email">Email</label><br>
      <input v-model="email" type="email"><br>

      <label for="password">Mot de passe</label><br>
      <input v-model="password" type="text"><br>

      <button @click="connexion()">connexion</button>
  </div> 


</template>

<script>
import router from "../router/index";
const axios = require('axios').default;
//import router from "../router/index";

export default {
  name: 'PageConnexion',
  data() {
    return {
      email:"",
      pseudo:"",
      password:"",
      photo:""
    }
  },
  methods: {
    connexion() {
      axios({
        method: 'post',
        baseURL: 'http://localhost:3000/user/connexion',
        data: JSON.stringify({email: this.email, password: this.password}),
        headers: {'Content-Type': 'application/json'}
      })
      .then((res) =>{
        if(res.status == 200) {
            console.log('connexion valide', res);
            this.$store.dispatch('connect', {token:res.data.token})
            router.push('/listeArticles');
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