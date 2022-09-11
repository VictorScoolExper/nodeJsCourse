//check username, password in post(login) request
//if exist create new JWT
//send back to front-end

//setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../errors');

const login = async (req, res)=>{
    const { username, password } = req.body;
    //We can implement a variety of validations
    //mongoose validations
    //Joi
    //Check in the controller
    if(!username || !password){
        throw new BadRequestError('Please provide email and password')
    }

    //this is a dummy id since we do not have access to db
    const id = new Date().getDate();

    //try to keep the jwt payload small, better user experience for user(internet conexion)
    //just for demo, in production use long, complex and unguessable string value!!
    const token = jwt.sign({id, username},process.env.JWT_SECRET, {expiresIn: '30d'})

    res.status(200).json({msg: "user created", token});
}

const dashboard = async (req, res) => {
    //console.log(req.user);

    const luckyNumber = Math.floor(Math.random()*100);

    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret:`Here is your authorized data, yourlucky number is ${luckyNumber}`
    });   
}

module.exports = {
    login, dashboard
}