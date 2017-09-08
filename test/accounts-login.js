const supertest = require('supertest');
const expect = require('chai').expect;
const sinon = require('sinon');
const server = require('../source');
const MailService = require('../source/service/mail');
const Account = require('../source/model/account');
const helper = require('./helper');

const request = supertest(server);

describe('POST /api/accounts/login', () => {
  beforeEach(helper.database.reset);

  it('should answer ok', () => {
    request
      .post('/api/accounts/login')
      .send({ email: 'user@example.com' })
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property('status', 'ok');
      });
  });

  it('should create the user in db', () => {
    request
      .post('/api/accounts/login')
      .send({ email: 'user@example.com' })
      .expect(200)
      .expect(() => Account
        .find({ where: { email: 'user@example.com' }, limit: 1 })
        .then((list) => {
          expect(list).to.have.length(1);
        }));
  });

  it('should send the email', () => {
    const MailMock = sinon.mock(MailService);
    MailMock
      .expects('create')
      .once()
      .returns(Promise.resolve());
    request
      .post('/api/accounts/login')
      .send({ email: 'user@example.com' })
      .expect(200)
      .expect(() => {
        MailMock.verify();
        MailMock.restore();
      });
  });
});
