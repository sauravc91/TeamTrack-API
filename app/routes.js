var fs = require('fs');
var jwt = require('jsonwebtoken');
var Users = require('./models/users');
var Tasks = require('./models/tasks');

function getUsers(res){
    Users.find(function (err, users) {
        if (err) {
            res.status(500).send(err);
        }
        res.json(users);
    });
};

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
	
	//Router Middle-ware for Authentication
    // app.use(function(req, res, next) {
    //     var token = req.body.token || req.headers['x-access-token'];
    //     if (token) {
    //         jwt.verify(token, 'imsaurav', function(err, decoded) {          
    //         if (err) {
    //             return res.json({ success: false, message: 'Failed to authenticate token.' });      
    //         } else {
    //             req.decoded = decoded;  
    //             next();
    //         }
    //         });
    //     } else {
    //         return res.status(403).send({ 
    //         success: false, 
    //         message: 'No Authentication token provided.'
    //         });
    //     }
    // });

	//API call to create user
    app.post('/api/createUser', function (req, res) {
        Users.create({
            Name: req.body.name,
            UserName: req.body.userName,
            Password: req.body.password
        }, function (err, user) {
            if (err)
                res.status(500).send(err);
            res.status(200).json({
              success: true,
              message: 'User Creation Successfull!',
              createdUserID: user._id
            });
        });
    });

    //API call to update users
    app.put('/api/UpdateUser/:id', function (req, res) {
        Users.findById(req.params.id, function (err, user) {      
            if (err) {
                res.status(500).send(err);
            } else {
                user.UserName = user.userName;
                user.Name = req.body.name || user.name;
                user.Password = req.body.password || user.password
                
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
	
	//API call to get users
	app.get('/api/getUsers', function (req, res) {
        Users.find({},{Name: "1", UserName: "1"},function (err, users) {
            if (err)
                res.status(500).send(err);
				
			res.status(200).json({
              success: true,
              Users: users
            });
        });
    });
	
	//API call to delete users
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
	
	//API call to create tasks
	app.post('/api/createTask', function (req, res) {
        Tasks.create({    
			Title: req.body.Title,
			Description: req.body.Description,
			TaskType: req.body.TaskType,
			TaskReferenceID: req.body.TaskReferenceID,
			EstimatedStartDate: req.body.EstimatedStartDate,
			EstimatedEndDate: req.body.EstimatedEndDate,
			ActualStartDate: req.body.ActualStartDate,
			ActualEndDate: req.body.ActualEndDate,
			CreatedAt: req.body.CreatedAt,
			UpdatedAt: req.body.UpdatedAt,
			CreatedBy: req.body.CreatedBy
		}, function (err, task) {
            if (err)
                res.status(500).send(err);
            res.status(200).json({
              success: true,
              message: 'Task Creation Successfull!',
              craetedTaskID: task._id
            });
        });
    });
	
	//API call to get tasks
	app.get('/api/getTasks', function (req, res) {
        Tasks.find(function (err, tasks) {
            if (err)
                res.status(500).send(err);
			res.status(200).json({
              success: true,
              Tasks: tasks
            });
        });
    });
	
	//API call to get tasks by Id
	app.get('/api/getTask/:id', function (req, res) {
        Tasks.findOne({_id:req.params.id},function (err, task) {
            if (err)
                res.status(500).send(err);
            res.status(200).json({
              success: true,
              Task: task
            });
        });
    });
	
	//API call to delete tasks
	app.delete('/api/deleteTask/:id', function (req, res) {
        Tasks.remove({_id:req.params.id},function (err, tasks) {
            if (err)
                res.status(500).send(err);
            res.status(200).json({
              success: true,
              message: 'Task Deletion Successfull!',
            });
        });
    });    

};
