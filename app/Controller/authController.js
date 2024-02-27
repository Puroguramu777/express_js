const User = require('../model/userScheme');
const bcrypt = require('bcrypt');

exports.showRegistrationForm = (req, res) => {
    res.render('register', { error: null })
}

exports.showLoginForm = (req, res) => {
    res.render('login', {error: null})
}

exports.loginUser = (req, res) => {
    
}

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.render('register', { error: 'Cet utilisateur existe déja' })
        }

        if (name == '' || email == '' || password == '') {
            return res.render('register', { error: 'Tous les champs sont obligatoires' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
   
        const newUser = new User({
            name:name,
            email: email,
            password: hashedPassword
        });
        
        await newUser.save();

        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.render('/register', {error: 'Erreur lors de l\'entregistrement de l\'utilisateur'});
    }
}

