const supertest = require('supertest');
const expect = require('chai').expect;
const sinon = require('sinon');
const server = require('../source');
const AuthService = require('../source/service/authentication');
const Account = require('../source/model/account');
const helper = require('./helper');

const request = supertest(server);

describe('GET /api/accounts/me', () => {
  beforeEach(helper.database.reset);
  beforeEach(() => AuthService
    .generate({ id: 1 })
    .then((token) => Object.assign(this, { token })));

  it('should answer 200 with validtoken', () => {
    return request
      .get('/api/accounts/me')
      .query({ token: this.token })
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property('id', 1);
      });
  });

  it('should answer 401 without token', () => {
    return request
      .get('/api/accounts/me')
      .expect(401);
  });
});
