const mongoose = require('mongoose');


const LogInLogOutHistory = new mongoose.Schema({

userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register'
},

logInHistory:[{
    DateAndTime:{
        type: String,
        required: true
    }
}],

logOutHistory:[{
    DateAndTime:{
        type: String,
        required: true
    }
}],

},
{timestamps:true})


module.exports = mongoose.model('LogInLogOutHistory', LogInLogOutHistory);