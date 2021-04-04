const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {type: String ,required: true},
    age: {type: Number ,default: 15 ,min: 1 ,max: 100},
    status: {type: String ,default:"ACTIVE" ,enum: ['ACTIVE' ,'PENDING']},
    create_date: {type: Date ,default: Date.now()}
})

const User = mongoose.model('users' ,schema)

module.exports = User;