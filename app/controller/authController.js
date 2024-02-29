const passport = require('../passport-config');
const User = require('../model/userScheme');
const bcrypt = require('bcrypt');

//Affiche le formulaire d'inscription
exports.showRegistrationForm = (req, res) => {
  res.render('register', { error: null });
}

//enregistrement d'un nouvel utilisateur
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.render('register', { error: 'Cet utilisateur existe déjà' });
    }
    //on vérifie que les champs soient remplis
    if (name === '' || email === '' || password === '') {
      return res.render('register', { error: 'Tous les champs sont obligatoires' });
    }

    //on encode le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    //on crée l'objet utilisateur
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword
    });

    //on sauvegarde l'utilisateur dans la base de données
    await newUser.save();

    res.redirect('/login');

  } catch (error) {
    console.error(error);
    res.render('register', { error: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
  }
}

//affiche le formulaire de connexion
exports.showLoginForm = (req, res) => {
  res.render('login');
}

//connexion de l'utilisateur
exports.loginUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

//déconnexion de l'utilisateur
exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect('/login');
}