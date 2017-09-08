// in a real use case, use a dedicated service like mailgum/mailjet/mailchimp/mail*
const nodemailer = require('nodemailer');
const config = require('../config');

const transport = nodemailer.createTransport(config.mail.url);

const create = (options) =>
  transporter.sendMail(options);

module.exports = { create };
