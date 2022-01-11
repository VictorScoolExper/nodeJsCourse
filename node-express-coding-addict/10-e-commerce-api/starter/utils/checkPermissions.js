const CustomError = require('../errors');

const checkPermissions = (requestUser, resourceUserId) =>{
    //console.log(requestUser);
    //console.log(resourceUserId);
    //console.log(typeof resourceUserId);

    //if user is admin it will allow
    if(requestUser.role === 'admin'){
        return
    }
    //if user is looking for his own id it will be allowed
    if(requestUser.userId === resourceUserId.toString()){
        return
    }

    throw new CustomError.UnauthorizedError('Not authorized to access this route');
};

module.exports = checkPermissions;