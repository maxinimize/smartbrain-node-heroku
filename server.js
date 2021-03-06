const express = require('express');
const bodyparser =require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
    // heroku database
    connectionString: process.env.DATABASE_URL,
    ssl: true,
		// host : '127.0.0.1',
		// user : 's73v3n',
		// password : '',
		// database : 'smart-brain'
	}
});

const app = express();

app.use(bodyparser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) } )
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) } )

// heroku deployment
app.listen(process.env.PORT || 3000, () => {
	console.log(`app is on port ${process.env.PORT}`);
})