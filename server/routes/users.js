const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

router.post('/register', (req, res) => {
    // When user put data to sign up
    // These data will be stored in a database.
    // bodyParser form req.body to json type of data
    const user = new User(req.body)
    // mongoDB function save
    user.save((err, userInfo) => { 
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

router.post('/login', (req, res) => {
    
    // 1. Check email data whether it is stored in database
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message:"Email address not found"
            })
        }
        // 2. If this is the case check password data
        user.comparePassword(req.body.password, (err, isEqual) => {
            if (!isEqual) {
                return res.json({ loginSuccess: false, message: "Password does not match" });
            }
            // 3. if password matches then create token for user        
            user.createToken((err, user) => {
                if (err) return res.status(400).send(err);
                // Save token (cookie, local storage)
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            })
        })
    })
});
// role 1 is admin role, 2 is department admin
router.get('/auth', auth ,(req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name:req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
})

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        }
    )
})
module.exports = router;