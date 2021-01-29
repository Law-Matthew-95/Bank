const express = require('express')
const app = express()
// const { sequelize } = require('./models')
const {auth, requiresAuth} = require('express-openid-connect')

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const authSettings=
{
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN
}



app.use(express.json())
app.use(auth(authSettings))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('login')
    // console.log(req.oidc);
    // res.send(req.oidc.user || "no user is logged in")
})

app.get('/profile', requiresAuth(), (req, res) => { 
    res.send(JSON.stringify(req.oidc.user));
  });

app.listen(process.env.PORT || 3000, () => {
    
        console.log('Bank app running on port', process.env.PORT)
    
})

// app.listen(3000, () => {
//     sequelize.sync().then(() => console.log("All ready for users"))
// })