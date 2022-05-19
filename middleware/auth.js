const { User } = require("../models/User");
    
    let auth = (req, res, next) => {
    // authentication part
    // 1. Get token from client side cookie
    let token = req.cookies.x_auth;
    // 2. Decrypt token and check user id
        User.findByToken(token, (err, user) => {
            if (err) throw err;
            if (!user) return res.json({ isAuth: false, error: true })
            req.token = token;
            req.user = user;
            next();
    })
    // 3. if database has the decrypted user id then authentication success.
    // 4. Fail to authenticate
}

module.exports = { auth };