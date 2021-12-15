const asyncWrapper = (fn) => {
    return async (req, res, next) =>{
        try{
            await fn(req, res, next)
        }catch(err){
            //next sends it to middlewear, it has a defualt
            //but we created a a file to handle the error
            next(err);
        }
    }
}

module.exports = asyncWrapper