<template>
  <div id="container">
    <div >
        <div v-if="user.photo"><img style="max-width:150px;border-radius:60px;" :src="'/img/' + user.photo"  ></div>
        <div v-if="!user.photo"><img style="max-width:150px;border-radius:60px;" :src="'/img/no-pic.webp'"  ></div>
        <div>{{ user.pseudo }}</div>
        <div>{{ user.email }}</div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
import router from "../router/index";

export default {
  name: "PageProfil",
  data() {
    return {
      user: Object, 
    };
  },
  methods: {

  },
  
  created() {
    if(!this.$store.getters.isConnected){
        router.push('/connexion');
    }
    axios({
      method: "get",
      baseURL: 'http://localhost:3000/user/',
      headers: this.$store.getters.headers,
    })
      .then((res) => {
        if (res.status == 200) {
          this.user = res.data;
          //router.push('/');
        } else {
          console.log("err", res);
        }
      })
      .catch((error) => {
        console.log('err', error);
      });
  }

}
</script>