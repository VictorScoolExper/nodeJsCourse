const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'please provide email'],
        validate:{
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        }
    
    },
    password:{
        type:String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    role:{
        type: String,
        enum:['admin', 'user'],
        default: 'user',
    }
});
//this is a pre create for password
UserSchema.pre('save', async function(){
    //console.log(this.modifiedPaths());
    //console.log(this.isModified('name'));
    
    //this helps us to no create new password hashed if it not modified.
    if(!this.isModified('password')){
        return
    } 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema);