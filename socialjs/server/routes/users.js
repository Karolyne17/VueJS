const express = require('express')
const router = express.Router()

//importer les fonctions du contrôleur des routes pour todos/
const userCtrl = require('../controllers/users');

// route /todos/
router.get('/', userCtrl.getTokenUser);
router.get('/:id', userCtrl.getOneUser);
router.post('/inscription', userCtrl.addUser);
router.post('/connexion', userCtrl.connectUser);
// router.put('/:id', userCtrl.updatetUser);
//router.put('/Update', userCtrl.updateUser);
//router.delete('/Delete', userCtrl.deleteUser);

module.exports = router