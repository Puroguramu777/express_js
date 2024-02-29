//import des modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const ejs = require('ejs');
const flash = require('express-flash');
require('dotenv').config();

//initialisation de l'application
const app = express();
//connexion a MongoDB
mongoose.connect(process.env.MONGODB_URI,{
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
//Configuration de la session
app.use(session({
  secret: process.env.SESSION_SECRET, //clé secrète pour crypter les données
  resave: true,//sauvegarde de la session à chaque requête
  saveUninitialized: true //sauvegarde des sessions vides
}));

//bodyParser : middleware pour parser les requêtes
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Configuration du passport
app.use(passport.initialize());
app.use(passport.session());

//configuration du dossier public
app.use(express.static('public'));

//configuration des messages flash
app.use(flash());

//configuration des routes
const authRoutes = require('./routes/authRoute');
const postRoutes = require('./routes/postRoute');
const userRoutes = require('./routes/userRoute');

app.use('/', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

//Configuration du moteur de rendu
app.set('view engine', 'ejs');
app.set('views', './view');

//Ecoute du serveur sur le port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log(`Server is running on port http://localhost:${PORT}`);
})