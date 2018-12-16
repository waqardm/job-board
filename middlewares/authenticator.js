// Returns a middleware to authenticate User
module.exports = (userType) => {
    return (req, res, next) => {
        if((!userType && req.user) || (req.user && req.session.userType === userType)) {
            next();
        } else {
            req.flash('errors', ['Login Required']);
            res.redirect('/auth/login');
        }
    }
}