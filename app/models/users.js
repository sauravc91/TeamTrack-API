var mongoose = require('mongoose');

module.exports = mongoose.model('Users', {    
      Name: String,
      UserName: String,
      Password: String
});



