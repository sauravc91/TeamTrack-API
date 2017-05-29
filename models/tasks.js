var mongoose = require('mongoose');

module.exports = mongoose.model('Tasks', {    
	Title: String,
	Description: String,
	TaskType: String,
	TaskReferenceID: String,
	EstimatedStartDate: Date,
	EstimatedEndDate: Date,
	ActualStartDate: Date,
	ActualEndDate: Date,
	CreatedAt: Date,
	UpdatedAt: Date,
	CreatedBy: String,
	Status: String,
	TaskDetails: [{
		TaskTitle: String,
		TaskHoursSpent: String,
		TaskDescription:String
	}]
});



