var jwt = require('jsonwebtoken');
var Users = require('../models/users');

module.exports = function(app){

    //Verify API call
    app.get('/',function(req,res){
		res.status(200).json({
              success: true,
              message: 'Welcome to the TeamTrack API!',
            });
    });

    //Unauthenticated API call for login
    app.post('/api/authenticateUser', function (req, res) {
        Users.findOne({
            UserName: req.body.userName
        }, function(err, user) {

        if (err) res.status(500).send(err);

        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

          if (user.Password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
            var tokenizeObj=user.toObject();
            delete tokenizeObj.Password;
            var token = jwt.sign(tokenizeObj, 'imsaurav', {
              expiresIn : 1200
            });

            res.status(200).json({
              success: true,
              message: 'Login Successfull!',
              token: token
            });
          }
        }
      });
    });
	
}