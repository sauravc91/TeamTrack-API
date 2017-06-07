var elevatedPaths= require('../config/elevatedRoutes.js');

var getAPIPath=function(x){
	var arr= x.split('/');
	var s='/'+arr[1]+'/'+arr[2];
	return s;
}

module.exports = function (app) {
    app.use(function(req,res,next){
    var path=getAPIPath(req.path);

    if(elevatedPaths.find(function(x){
        return x===path;
    })){

        //Check for role in user object or else throw 403
        return res.status(403).json({
            success: false,
            message: 'Access Denied'
        });
    }
           
    next();

    });
}