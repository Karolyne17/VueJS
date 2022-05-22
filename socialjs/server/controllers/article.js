const Article = require('../models/Article');

//contrôleur de la route GET /user
exports.listeArticle = async (req, res) => {
    // return genericCtrl(req, res, async () => {
    try {
      const articles = await Article.find();
      if (articles) res.status(200).json(articles);
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
    // });
  }

//contrôleur de la route GET /todos/:id
exports.getOneArticle = (req, res) => {
    // on interroge la base de donnée
    Article.findOne({
    _id: req.params.id
    }).then((article) => {
      // si il a des données, on les renvoie en JSON
      res.status(200).json(article)
      // en cas d'erreur on capture le message d'erreur pour l'aficher dans la réponse en JSON
    }).catch(error => res.status(400).json({ error }))
  }

//contrôleur de la route POST /user/inscription
exports.addArticle = async (req, res) => {
    // console.log(req.body)
    // on fait des vérifications sur la donnée passée dans le body
    if(!req.body.titre || !req.body.texte) {
      // si il y a une erreur on interrompt l'opération...
      res.status(400).json({ error: 'Vous n\'avez pas renseigné tous les champs.' })
      return;
    }
  
    //si tout va bien
    //on crée un nouveau document Mongo avec le model User
    const article = new Article({
      ...req.body //ici on passe les données envoyées dans le body de la requête post
    })
  
    //sauvegarde en BDD, retourne la donnée sauvegardée
    article.save().then(() => {
  
      // retourne la réponse au format JSON
      //le status code 201 indique que la ressource a bien été créée
      res.status(201).json({
        message: 'Article créé !'
      })
    // en cas d'erreur à l'enregistrement en BDD...
    }).catch(error => res.status(400).json({ error }))
  }