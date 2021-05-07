const express = require('express')
const bodyParser = require('body-parser')
const { check , ValidationResult, validationResult } = require('express-validator');


const app = express()
const PORT = 4000;

// set ejs view
// Set Templating Enginge
app.set('view engine', 'ejs')
app.use(express.static('views'))

const urlencodedparser = bodyParser.urlencoded({extended : true})
app.use(urlencodedparser)
// Navigation
app.get('' , (req,res) => {
    res.render('index')
})
app.get('/index' , (req,res) => {
    res.render('Index')
})
app.get('/register' , (req,res) => {
    res.render('register')
})
app.post('/register' ,[
    check('username' , 'This username must be 3+ characters long')
    .exists()
    .isLength({ min : 3 }),

    check('email',"Email is not valid")
    .isEmail()
    .normalizeEmail()
], (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
    //  return res.status(422).jsonp(errors.array())  
    const alert = errors.array()
    res.render('register' , {
        alert
    })
}
})




app.listen(PORT , (req,res) => {
    console.log(`Server is running on port => ${PORT}`)
})