const User = require('../models/user');


const jwtvalidate = async (decoded, req, h) => {
    const user = await User.findOne({
        email: decoded.email
    })
    return {
        isValid: (user.email === decoded.email)
    }
}


module.exports = jwtvalidate;