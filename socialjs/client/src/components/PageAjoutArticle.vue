<template>
    
  <div id="container">
    <h1>Nouvel Article</h1>

      <label for="titre">Titre</label><br>
      <input v-model="titre" type="text"><br>

      <label for="texte">Texte</label><br>
      <input v-model="texte" type="text"><br>

      <label for="photo">Photo</label><br>
      <input v-model="photo" type="text"><br>

      <button @click="addArticle()">Ajouter l'article</button>
  </div> 


</template>

<script>
const axios = require('axios').default;
import router from "../router/index";

export default {
  name: 'PageAjoutArticle',
  data() {
    return {
      titre:"",
      texte:"",
      photo:""
    }
  },
  methods: {
    addArticle() {
      axios({
        method: 'post',
        baseURL: 'http://localhost:3000/article/addArticle',
        data: JSON.stringify({titre: this.titre, texte: this.texte, photo: this.photo}),
        headers: {'Content-Type': 'application/json'}
      })
      .then((res) =>{
        if(res.status == 201) {
          console.log('ajout de l\'article valide', res);
          router.push('/listeArticle');
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
  created(){
    if(!this.$store.getters.isConnected){
    router.push('/connexion');
}
  }
}
</script>