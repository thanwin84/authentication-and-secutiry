//jshint esversion:6
const express = require('express')
const ejs = require('ejs')
const connect = require(__dirname + '/db/connect')
const User = require(__dirname + '/models/user')
const mongoose = require('mongoose')


const app = express()

const url = 'mongodb://127.0.0.1:27017/userDB'

// enable ejs engine
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
  }))


app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/login', (req, res)=>{
    res.render('login')
})
app.get('/register', (req, res)=>{
    res.render('register')
})

app.post('/register', (req, res)=>{
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    })
    try {
        newUser.save()
        res.render('secrets')
    } catch (error) {
        console.log(error)
    }
})

app.post('/login', async(req, res)=>{
    const username = req.body.username
    const password = req.body.password
    try{
        const foundData = await User.findOne({email:username})
        if (foundData){
            if (foundData.password === password){
                res.render('secrets')
            }
        }
    }
    catch(error){
        console.log(error)
    }
})


const port = 3000 || process.env.PORT;

const start = async()=>{
    try {
        await connect(url);
        console.log('connected successfully to db')
        app.listen(port, ()=> console.log("server is running port ", port))
    } catch (error) {
        console.log(error)
    }
}
start()