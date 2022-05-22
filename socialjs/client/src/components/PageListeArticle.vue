<template>
    
<div id="container">

    <div v-for="article in articles" :key="article._id"  @click="$router.push('/article/' + article._id)">
        <div>{{article.titre}}</div>
        <div>{{article.texte}}</div>
    </div>

</div> 


</template>

<script>
const axios = require('axios').default;
import router from "../router/index";

export default {
  name: 'PageListeArticle',
  data() {
    return {
        articles:[]
    }
  },
  methods: {
    //getArticle() {},
  },
    created(){
            if(!this.$store.getters.isConnected){
                router.push('/connexion');
            }
            axios({
            method: 'get',
            baseURL: 'http://localhost:3000/article/listeArticle',
            headers: {'Content-Type': 'application/json'}
      })
    .then((res) =>{
        if(res.status == 200) {
            this.articles = res.data;
            //router.push('/');
        }
        else{
          console.log('err', res);
        }
      })
      .catch((error)=> {
        console.log(error);
      });
    }
}
</script>