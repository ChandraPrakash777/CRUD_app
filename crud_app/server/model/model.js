const mongoose = require('mongoose')

var schema = new mongoose.Schema({ //**new mongoose scheme scheme allows you to define a shape and content of the document */
    name:{
        type : String,
        required: true
        // required: false
    },
    email: {
        type : String,
        required: true,
        // required: false,
        unique: true
    },
    gender : String,
    status : String
})

const Userdb = mongoose.model('userdb', schema)

module.exports = Userdb