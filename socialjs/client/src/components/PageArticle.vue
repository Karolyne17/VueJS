<template>
  <div id="container">
    <div >
      <div>{{ article.titre }}</div>
      <div>{{ article.texte }}</div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
import router from "../router/index";

export default {
  name: "PageArticle",
  data() {
    return {
      article: Object,
    };
  },
  methods: {
    //getArticle() {},
  },
  created() {
    if(!this.$store.getters.isConnected){
    router.push('/connexion');
    }
    if (this.$route.params.id) {
      const articleId = this.$route.params.id;
      if (!articleId) {
        router.push("/inscription");
      }

    axios({
      method: "get",
      baseURL: 'http://localhost:3000/article/'+ articleId,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status == 200) {
          this.article = res.data;
          console.log("on est là hein", res.data);
          //router.push('/');
        } else {
          console.log("err", res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
}
</script>