const mongoose = require('mongoose');

//Mongoose Schema create model
const TaskSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'must provide a name'],
        //trim gets rid of spaces
        trim:true,
        maxlength:[20, 'name cannot be more than 20 chars']
    },
    completed:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Task', TaskSchema); 