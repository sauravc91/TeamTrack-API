var Tasks = require('../models/tasks');

module.exports = function (app) {

	//Create Task
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
	
	//Get Tasks
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
	
	//Get Task by ID
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
	
	//Delete Task
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
