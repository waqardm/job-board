const bcrypt = require('bcryptjs');

// To Encrypt Password
module.exports.encryptPass = (user) => {
    if(!user.changed('password')) {
        return;
    }
    return bcrypt.genSalt(12)
        .then(salt => {
            return bcrypt.hash(user.password, salt)
        })
        .then(hash => {
            user.password = hash;
        })
}


module.exports.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
}