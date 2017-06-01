module.exports = function (app) {
    app.use(function(req,res,next){
    console.log(req.path);
        if (req.path==='/api/getTasks'){
            res.status(403);
            return res.send('Forbidden!');
        }
        next();
    });
}