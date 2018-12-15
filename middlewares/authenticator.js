// Returns a middleware to authenticate User
module.exports = (userType) => {
    return (req, res, next) => {
        if((!userType && req.user) || (userType == 'hirer' && req.user && req.session.isHirer) || (userType == 'candidate' && req.user && req.session.isCandidate)) {
            next();
        } else {
            req.flash('errors', ['Login Required']);
            res.redirect('/auth/login');
        }
    }
}