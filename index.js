const express = require('express'); 
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require('./models/User');
const config = require('./config/key');

// Get application/x-ww-form-urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));
// Get application/json data
app.use(bodyParser.json());

mongoose.connect(config.mogoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World! Happy new wow');
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
