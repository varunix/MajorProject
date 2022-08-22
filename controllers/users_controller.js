module.exports.profile = function(req, res) {
    return res.render('user_profile', {
        title: 'User Profile'
    });
};

module.exports.signUp = function(req, res) {
    res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
};

module.exports.signIn = function(req, res) {
    res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
};