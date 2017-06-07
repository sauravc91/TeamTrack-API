var Users = require('../models/users');
var mailClient = require ('../routes/emailSender.js');

module.exports = function (app) {

    //Create User
    app.post('/api/createUser', function (req, res) {
        Users.create({
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            UserName: req.body.userName,
            Password: req.body.password,
            IsActive: false,
            CreatedAt: new Date()
        }, function (err, user) {
            if (err)
                res.status(500).send(err);

            mailClient.sendMail(user.FirstName,user.UserName,user.Password);

            res.status(200).json({
              success: true,
              message: 'User Creation Successfull!',
              createdUserID: user._id
            });
        });
    });

    //Update User
    app.put('/api/UpdateUser/:id', function (req, res) {
        Users.findById(req.params.id, function (err, user) {      
            if (err) {
                res.status(500).send(err);
            } else {
                user.FirstName = req.body.firstName;
                user.LastName = req.body.lastName;
                user.UserName = req.body.userName;
                user.Password = req.body.password;
                user.IsActive = req.body.isActive;
                
                user.save(function (err, user) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json({
                    success: true,
                    message: 'User Updation Successfull!'
                    });
                });
            }
        });
    });
	
	//Get Users
	app.get('/api/getUsers', function (req, res) {
        Users.find({},{FirstName: "1", LastName:"1", UserName: "1", IsActive: "1"},function (err, users) {
            if (err)
                res.status(500).send(err);
				
			res.status(200).json({
              success: true,
              Users: users
            });
        });
    });
	
	//Delete Users
	app.delete('/api/deleteUser/:id', function (req, res) {
        Users.remove({_id:req.params.id},function (err, users) {
            if (err)
                res.status(500).send(err);
            res.status(200).json({
              success: true,
              message: 'User Deletion Successfull!',
            });
        });
    });
}