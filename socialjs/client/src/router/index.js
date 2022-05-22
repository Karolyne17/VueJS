import VueRouter from "vue-router";
import PageInscription from "../components/PageInscription";
import PageConnexion from "../components/PageConnexion";
import PageAjoutArticle from "../components/PageAjoutArticle";
import PageListeArticle from "../components/PageListeArticle";
import PageArticle from "../components/PageArticle";
import PageProfil from "../components/PageProfil";

const routes = [
    {path: "/inscription", component: PageInscription},
    {path: "/connexion", component: PageConnexion},
    {path: "/addArticle", component: PageAjoutArticle},
    {path: "/listeArticles", component: PageListeArticle},
    {path: "/article/:id", component: PageArticle},
    {path: "/users", component: PageProfil},
  ];
  
const router = new VueRouter({
    mode: "history",
    routes
});
  
  export default router;