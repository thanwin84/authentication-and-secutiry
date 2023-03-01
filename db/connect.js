const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

const connect = (connectionString)=>{
    return mongoose.connect(connectionString)
}
module.exports = connect