const express = require('express'); 
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { auth } = require('./middleware/auth');
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

app.use('/api/users', require('./routes/users'));
app.use('/api/favorite', require('./routes/favorite'));

const port = 5000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
