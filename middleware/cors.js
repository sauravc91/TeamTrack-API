module.exports = function (app) {

    //Middle-ware for authorising Pre-Flight requests
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header("Access-Control-Allow-Headers", "x-access-token, Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        if ('OPTIONS' == req.method) {
            res.header('Access-Control-Allow-Origin', "*");
            res.sendStatus(200);
        }
        else {
            next();
        }
    });

}