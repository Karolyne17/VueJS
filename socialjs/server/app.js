require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:8080'
}));

const port = process.env.PORT;



const mongoose = require('mongoose');

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const cluster = process.env.MONGO_URL;
const db = process.env.MONGO_DB;

mongoose.connect(
  "mongodb://" + cluster + "/" + db,
  {
    pass,
    user,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((e) => console.log(e, 'Connexion à MongoDB échouée !'));

app.listen(port, () => {
    console.log(`Server launched on port ${port}`);
});

app.use('/ping', (req, res) => {
  res.status(200).send("PING OK");
});

const fileUpload = require('express-fileupload');
app.use(fileUpload());


const usersRoutes = require('./routes/users');
app.use('/user', usersRoutes);

const articleRoutes = require('./routes/articles');
app.use('/article', articleRoutes);


module.exports = app;