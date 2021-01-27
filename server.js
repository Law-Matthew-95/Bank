const express = require('express')
const app = express()
const { sequelize } = require('./models')
const { requiresAuth } = require('express-openid-connect');
const {auth} = require('express-openid-connect')
const authSettings=
{
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'WV9ock0rqQZG8v1sGbWJT5OpRCfiGkQ7',
    issuerBaseURL: 'https://dev-81ef3zeo.eu.auth0.com'
}

app.use(express.json())
app.use(auth(authSettings))


app.get('/', (req, res) => {
    res.send(req.oidc.user || "no user is logged in")
})

app.get('/profile', requiresAuth(), (req, res) => { 
    res.send(JSON.stringify(req.oidc.user));
  });

app.listen(3000, () => {
    sequelize.sync().then(() => console.log("All ready for users"))
})