var fs = require('fs');

var mailer = function (empName,userName,password) {
    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    };
    
    var managerMailId='saurav.chatterjee91@gmail.com';

    var empTemplate = fs.readFileSync('./mailTemplates/empMail.html', {encoding: 'utf-8'});
    var mgrTemplate = fs.readFileSync('./mailTemplates/mgrMail.html', {encoding: 'utf-8'});
    
    var api_key = 'key-e0ae98228970d40e23e061a391c787ce'; // replace with your API KEY Value
    var domain = 'sandbox6ebc947195fa405c95eb138b0e225e40.mailgun.org'; // replace with your domain
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
    
    empTemplate = empTemplate.replace('{{EmployeeName}}', empName);
    empTemplate = empTemplate.replace('{{UserName}}', userName);
    empTemplate = empTemplate.replace('{{Password}}', password);

    mgrTemplate = replaceAll(mgrTemplate,'{{EmployeeName}}', empName);
    
    var userData = {
      from: 'TeamTrack Admin <postmaster@sandboxf7294ae590fa4845b971d595d7fe94ee.mailgun.org>', // replace with your SMTP Login ID
      to: userName, // enter email Id to which email notification has to come. 
      subject: 'Welcome to TeamTrack', // Subject Line
      html: empTemplate
    };

    var mgrData = {
      from: 'TeamTrack Admin <postmaster@sandboxf7294ae590fa4845b971d595d7fe94ee.mailgun.org>', // replace with your SMTP Login ID
      to: managerMailId, // enter email Id to which email notification has to come. 
      subject: 'New Registration Aert ('+empName+')', // Subject Line
      html: mgrTemplate
    };

    mailgun.messages().send(userData, function (error, body) { 
        console.log('User Mail Sent!');
        mailgun.messages().send(mgrData, function (error, body) { 
            console.log('Manager Mail Sent!');
        });
    });
  
};

module.exports.sendMail= mailer;