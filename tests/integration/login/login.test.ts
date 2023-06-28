import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../../../src/database/models/user.model'
import { incorrectPassword, loggedUser, loginWithoutPassword, loginWithoutUsername, successfullLogin } from '../../mocks/login.mocks';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('try to login without username', async function () {
    const httpResponse = await chai.request(app).post('/login').send(loginWithoutUsername);
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ "message": "\"username\" and \"password\" are required" })
  });

  it('try to login without password', async function () {
    const httpResponse = await chai.request(app).post('/login').send(loginWithoutPassword);
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ "message": "\"username\" and \"password\" are required" })
  });

  it('try to login with invalid fields(inexistent user)', async function () {
    sinon.stub(UserModel, 'findOne').resolves(null);
    const httpResponse = await chai.request(app).post('/login').send(successfullLogin);
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: "Username or password invalid" })
  });

  it('try to login with invalid fields(invalid password)', async function () {
    const user = UserModel.build(loggedUser);
    sinon.stub(UserModel, 'findOne').resolves(user);
    const httpResponse = await chai.request(app).post('/login').send(incorrectPassword);
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: "Username or password invalid" })
  });

  it('internal server error', async function () {
    sinon.stub(UserModel, 'findOne').throws();
    const httpResponse = await chai.request(app).post('/login').send(incorrectPassword);
    expect(httpResponse.status).to.be.equal(500);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Internal server error' })
  });

  it('successfull login', async function () {
    const user = UserModel.build(loggedUser);
    sinon.stub(UserModel, 'findOne').resolves(user);
    const httpResponse = await chai.request(app).post('/login').send(successfullLogin);
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.have.property('token');
  });
});
