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

// describe('Testa a rota post /login', () => {
//   /**
//    * Exemplo do uso de stubs com tipos
//    */

//   let chaiHttpResponse: Response;

//   const userMock = {
//     user: {
//       id: 1,
//       username: "Admin",
//       role: "admin",
//       email: "admin@admin.com"
//     },
//     token: "123.456.789"
//   }

//   before(async () => {
//     sinon
//       .stub(User, "findOne")
//       .resolves(userMock);
//   });

//   after(()=>{
//     (User.findOne as sinon.SinonStub).restore();
//   })

//   it('responde com status 200', async () => {
//     chaiHttpResponse = await chai.request(app).post('/login');

//     expect(chaiHttpResponse.status).to.be.eq(200);
//   });

//   // it('Seu sub-teste', () => {
//   //   expect(false).to.be.eq(true);
//   // });
// });
