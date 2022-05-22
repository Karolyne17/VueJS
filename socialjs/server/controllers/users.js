const User = require('../models/User');
const passService = require('../services/pass');

//contrôleur de la route GET /user
exports.getOneUser = async (req, res) => {
  User.findOne({
    _id: req.params.id
    }).then((user) => {
      // si il a des données, on les renvoie en JSON
      res.status(200).json(user)
      // en cas d'erreur on capture le message d'erreur pour l'aficher dans la réponse en JSON
    }).catch(error => res.status(400).json({ error }))
}

//contrôleur de la route POST /user/inscription
exports.addUser = async (req, res) => {
  // console.log(req.body)
  // on fait des vérifications sur la donnée passée dans le body
  if(!req.body.email || !req.body.pseudo || !req.body.password) {
    // si il y a une erreur on interrompt l'opération...
    res.status(400).json({ error: 'Vous n\'avez pas renseigné tous les champs.' })
    return;
  }

  //si tout va bien
  //on crée un nouveau document Mongo avec le model User
  const user = new User({
    ...req.body //ici on passe les données envoyées dans le body de la requête post
  })


  if (!req.files || Object.keys(req.files).length === 0) {
    
  }
  else {
    let sampleFile;
    let uploadPath;
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.image;
    uploadPath = __dirname + '../../../client/public/img/' + user._id + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);

      // res.send('File uploaded!');
    });

    user.photo = user._id + sampleFile.name;

  }

  user.password = await passService.hashPassword(user.password);

  //sauvegarde en BDD, retourne la donnée sauvegardée
  user.save().then(() => {

    // retourne la réponse au format JSON
    //le status code 201 indique que la ressource a bien été créée
    res.status(201).json({
      message: 'Utilisateur créé !'
    })
  // en cas d'erreur à l'enregistrement en BDD...
  }).catch(error => res.status(400).json({ error }))
}


//contrôleur de la route POST /user/connexion
exports.connectUser = async (req, res) => {
  // on fait des vérifications sur la donnée passée dans le body
  if(!req.body.email || !req.body.password) {
    // si il y a une erreur on interrompt l'opération...
    res.status(400).json({ error: 'Vous n\'avez pas renseigné tous les champs.' })
    return;
  }

  const user = await User.findOne({email: req.body.email}).exec();
  console.log('User found:', user);

  const isPasswordCorrect = await passService.comparePasswords(req.body.password, user.password);

  if (isPasswordCorrect) {
    console.log('Connecté');

    const token = passService.createToken(user.email);

    res.status(200).json({
      message: 'Vous êtes connecté !',
      token: token,
      isConnected: true,
      mail: user.email
    });
  }
  else {
    console.log('mauvais pass');
    res.status(200).json({
      message: 'Mauvais pass !'
    })
  }
}

//contrôleur de la route GET /user
exports.getTokenUser = async (req, res) => {

  try {
    const token = req.headers.authorization.split(" ")[1];

    const tokenData = passService.verifyToken(token);
    const userEmail = tokenData.data;

    User.findOne({
      email: userEmail
      }).then((user) => {
        // si il a des données, on les renvoie en JSON
        res.status(200).json(user)
        // en cas d'erreur on capture le message d'erreur pour l'aficher dans la réponse en JSON
      }).catch(error => res.status(400).json({ error }))
}
catch (error) {
    console.log('mauvais token');
    res.status(401).json(error);
}



}