const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
        minlength: 1, 
        trim: true, 
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    
    return _.pick(userObject, ['_id', 'email']);
    
}

UserSchema.methods.generateAuthToken = function () {
    const user = this; 
    const access = 'auth';
    const token = jwt.sign({
        _id: user._id.toHexString(), 
        access
    }, 'abc123').toString(); 
    
    
    //user.tokens.concat([{access, token}]);
    user.tokens.push({access, token});
   
    
    //This is interesting remember it 
    return user.save().then(() => {
       return token; 
    });
};

UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;
    
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        // return new Promise((res, rej) => {
        //     rej();
        // });
        return Promise.reject();
    }
    
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token, 
        'tokens.access': 'auth'
    });
};

UserSchema.pre('save', function(next) {
    const user = this; 
    
    if (user.isModified('password')) {
        
        bcrypt.genSalt(10, (err, salt) => {
            if(err) {
                console.log(err);
            }
            
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err){
                    console.log(err);
                }
                
                user.password = hash;
                next(); 
                console.log(hash);
            });
        });
    }
    else {
        next();
    }
})

const User = mongoose.model('Users', UserSchema); 

module.exports = {User};