'use strict';
var nodemailer = require('nodemailer'),
    configMailer = require('../configs/mailer'),
    hbs = require('nodemailer-express-handlebars'),
    optionsHandlebars = {
      viewEngine: {
        extName: '.hbs',
        layoutsDir: 'views/email'
        //defaultLayout : 'template',
      },
      viewPath: 'views/email',
      extName: '.hbs'
    };

/*init transport*/
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: configMailer.mailer.user,
        pass: configMailer.mailer.pass
    }
});

/*using template handlbar*/

transporter.use('compile', hbs(optionsHandlebars));

var mailOptions = {
    subject: 'Verify account',
    template: 'verify-email'
  };

module.exports = {
  transporter: transporter,
  mailOptions: mailOptions
};
