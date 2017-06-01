var mongoose = require('mongoose');

module.exports = mongoose.model('Users', {    
      FirstName: String,
      LastName: String,
      UserName: String,
      Password: String,
      IsActive: Boolean,
      CreatedAt: Date     
});



