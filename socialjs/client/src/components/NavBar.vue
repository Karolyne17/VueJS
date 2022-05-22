<template>
    <div>

        <div v-if="$store.getters.isConnected"><router-link to="listeArticles">Liste des articles</router-link></div>
        <div v-if="$store.getters.isConnected"><router-link to="users">Mon profil</router-link></div>
        <div v-if="$store.getters.isConnected"><router-link to="addArticle">Ajouter un article</router-link></div>
        <div v-if="!$store.getters.isConnected"><router-link to="connexion">Connexion</router-link></div>
        <div v-if="!$store.getters.isConnected"><router-link to="inscription">Inscription</router-link></div>
        <div v-if="$store.getters.isConnected"><a href="" @click="$store.dispatch('disconnect')">Deconnexion</a></div>

    </div>
</template>

<script>

export default {
  name: "NavBar",
  data() {
    return {
      
    };
  },

}

</script>


