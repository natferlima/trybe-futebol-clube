import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/User';
import user from './mocks/user';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota post /login e get /login/validate', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  const userMock = {
    user: {
      id: 1,
      username: "Admin",
      role: "admin",
      email: "admin@admin.com"
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjQ5NjM1MDk4LCJleHAiOjE2NTA0OTkwOTh9.HpnalqZu1g9vkiLEUSHMgX3FUU7tIVgTI60cNTbAHtE"
  }

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('rota POST /login responde com status 200', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
    .send({
      email: "admin@admin.com",
      password: "secret_admin"
    });

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
    expect(chaiHttpResponse.body.user).to.be.deep.equals(userMock.user);
  });

  it('rota GET /login/validate responde com status 200', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate');

    expect(chaiHttpResponse.status).to.be.eq(200);
  });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
});

