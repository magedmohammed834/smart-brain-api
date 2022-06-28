const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register= require('./Controllers/register');
const signin= require('./Controllers/signin');
const profile= require('./Controllers/profile');
const image= require('./Controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'smart-brain'
    }
});


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {

res.send('success');
});


app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db)); 
app.post('/imageurl', image.handleAPICall); 


const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
});


console.log(PORT);