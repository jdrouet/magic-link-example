const Joi = require('joi');
const config = require('../config');
const AccountModel = require('../model/account');
const AuthService = require('../service/authentication');
const MailService = require('../service/mail');

const schema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
});

module.exports = (req, res, next) => {
  const body = schema.validate(req.body);
  if (body.error) return next(body.error);
  return AccountModel
    .find({
      where: req.body,
      limit: 1,
    })
    .then((list) => {
      if (list.length) return list;
      return AccountModel.create(res.body);
    })
    .then((list) => AuthService.generate(list[0]))
    .then((token) => MailService.create({
      to: body.value.email,
      subject: 'Magic link 🎩',
      html: `
        <h1>Magic link 🎩 !</h1>
        <a href="${config.host}/api/accounts/me?token=${encodeURIComponent(token)}">
          YOUHOU
        </a>
      `,
      text: `Magic link: ${config.host}/api/accounts/me?token=${encodeURIComponent(token)}`,
    }))
    .then(() => res.json({ status: 'ok' }))
    .catch(next);
}
