const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        require:true,
    },
    password:{
        type: String,
        require:true,
    }
    ,
    email:{
        type: String,
        require:true,
        unique: true,
    }
    ,
    cellphone:{
        type: String,
        require:true,
    }
    ,
    rol:{
        type: String,
        default: "user",
    }
    ,
    state:{
        type: Boolean,
        default: true,
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
