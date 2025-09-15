module.exports = function (requiredRole){
    return function(req,res,next){
        const role = req.user.role;

        if( !role || role !== requiredRole){
            return res.status(403).send({
                message : "Access denied !"
            });
        }

        next();
    }
}