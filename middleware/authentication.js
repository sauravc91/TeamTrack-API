var jwt = require('jsonwebtoken');

module.exports = function (app) {
    //Router Middle-ware for Authentication
    app.use(function(req, res, next) {
        var token = req.body.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, 'imsaurav', function(err, decoded) {          
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });      
            } else {
                req.decoded = decoded;  
                next();
            }
            });
        } else {
            return res.status(403).send({ 
            success: false, 
            message: 'No Authentication token provided.'
            });
        }
    });
}