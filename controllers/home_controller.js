module.exports.home = function(req, res) {
    console.log(req.cookies);
    res.cookie('user_id_2', '2')
    res.render('home', {
        title: 'Home'
    });
};