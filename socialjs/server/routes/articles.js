const express = require('express')
const router = express.Router()

//importer les fonctions du contrôleur des routes pour todos/
const articleCtrl = require('../controllers/article');

// route /todos/
router.get('/listeArticle', articleCtrl.listeArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.post('/addArticle', articleCtrl.addArticle);
//router.post('/connexion', userCtrl.connectUser);
//router.put('/Update', userCtrl.updateUser);
//router.delete('/Delete', userCtrl.deleteUser);

module.exports = router