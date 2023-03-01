require('dotenv').config()
const mongoose = require('mongoose')
var encrypt = require('mongoose-encryption');

const userSchema = new mongoose.Schema(
    {
        email: String,
        password: String
    }
)
var secret = process.env.SECRET
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password']});

const User = mongoose.model('User', userSchema)

// const u = new User(
//     {
        
//         email: "thanwin@gmail.com",
//         password: "1234"
//     }
// )
// console.log(u)

module.exports = User