var mongoose = require('mongoose');

module.exports = mongoose.model('Users', {    
      FirstName: String,
      LastName: String,
      UserName: String,
      Password: String,
      Role: String,
      IsActive: Boolean,
      CreatedAt: Date     
});