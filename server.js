const express = require('express')
const app = express()
const { sequelize } = require('./models')
const { requiresAuth } = require('express-openid-connect');
const {auth} = require('express-openid-connect')
// const authSettings=
// {
//     authRequired: false,
//     auth0Logout: true,
//     secret: "This isn't the greatest secret in the world. This is a tribute. ",
//     baseURL: 'https://kach1ng.herokuapp.com/',
//     clientID: 'WV9ock0rqQZG8v1sGbWJT5OpRCfiGkQ7',
//     issuerBaseURL: 'https://dev-81ef3zeo.eu.auth0.com'
// }

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

app.use(express.json())
// app.use(auth(authSettings)) 


app.get('/', (req, res) => {
    res.send(req.oidc.user || "no user is logged in")
})

app.get('/profile', requiresAuth(), (req, res) => { 
    res.send(JSON.stringify(req.oidc.user));
  });

app.listen(process.env.PORT, () => {
    sequelize.sync(() => {
        console.log('Bank app running on port', process.env.PORT)
    })
})