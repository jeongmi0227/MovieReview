const express = require('express'); 
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require('./models/User');
const config = require('./config/key');
const cookieParser = require('cookie-parser');
// Get application/x-ww-form-urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));
// Get application/json data
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mogoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/register', (req, res) => {
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

app.post('/login', (req, res) => {
    
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


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
