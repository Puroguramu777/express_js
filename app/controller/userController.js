const User = require('../model/userScheme');

exports.showUser = async (req, res) => {
    try{
        const userId = req.user._id;

        const user = await User.findById(userId);
        

        res.render('account/userInfo', { user });


    }catch (error){
        console.log(error);
    }
}