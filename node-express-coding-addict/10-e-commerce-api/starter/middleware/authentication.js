const CustomError = require('../errors');
const user = require('../models/user');
const {isTokenValid} = require('../utils');

const authenticateUser = async (req, res, next) =>{
    const token = req.signedCookies.token;

    if(!token){
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    try {
        const {name, userId, role} = isTokenValid({token});
        req.user = { name: name, userId: userId, role: role };
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
}

const authorizePermissions = (...roles) =>{
    return (req, res, next)=>{
        //in the incoming list includes the role in the user it will have access
        if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError(
                'Unauthorized to acces this route'
                );
        }
        next();
    };
};

module.exports = {
    authenticateUser,
    authorizePermissions
};