const mongoose = require('mongoose');


const connectDB = (url) => {
    return mongoose
    .connect(url, {
        //if using version 6 this is not needed
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }).then(() => console.log('connected to the db....'));
    //this should be deleted after it has been tested
    //.then(() => console.log('connected to the db....'))
    //.catch((err) => console.log(err));
}

module.exports = connectDB;


