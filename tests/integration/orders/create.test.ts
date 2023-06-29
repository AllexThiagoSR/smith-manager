import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app'
import { orderToAdd, orderUserIdAsString, orderUserIdWithANumberAsString, orderWithProductIdsDifferentOfNumber, orderWithoutProductIds, orderWithoutUserId} from '../../mocks/orders.mock';
import ProductModel from '../../../src/database/models/order.model';
import * as jwtUtils from '../../../src/utils/jwtUtils';
import UserModel, { UserSequelizeModel } from '../../../src/database/models/user.model';
import OrderModel from '../../../src/database/models/order.model';
import { ProductSequelizeModel } from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('create a order without userId', async function () {
    sinon.stub(jwtUtils, 'decode').returns({ id: 1, username: 'teste' });
    const httpResponse = await chai.request(app).post('/orders').send(orderWithoutUserId).set({ authorization: 'token' });
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"userId" is required' });
  });

  it('create a order with a string as userId', async function () {
    sinon.stub(jwtUtils, 'decode').returns({ id: 1, username: 'teste' });
    const httpResponse = await chai.request(app).post('/orders').send(orderUserIdAsString).set({ authorization: 'token' });
    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: '"userId" must be a number' });
  });

  it('create a order with a number in a string as userId', async function () {
    sinon.stub(jwtUtils, 'decode').returns({ id: 1, username: 'teste' });
    const httpResponse = await chai.request(app).post('/orders').send(orderUserIdWithANumberAsString).set({ authorization: 'token' });
    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: '"userId" must be a number' });
  });

  it('create a order without productIds', async function () {
    sinon.stub(jwtUtils, 'decode').returns({ id: 1, username: 'teste' });
    const httpResponse = await chai.request(app).post('/orders').send(orderWithoutProductIds).set({ authorization: 'token' });
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"productIds" is required' });
  });

  it('create a order with productIds different of number', async function () {
    sinon.stub(jwtUtils, 'decode').returns({ id: 1, username: 'teste' });
    const httpResponse = await chai.request(app).post('/orders').send(orderWithProductIdsDifferentOfNumber).set({ authorization: 'token' });
    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: '"productIds" must include only numbers' });
  });

  it('create a order with a userId inexistent', async function () {
    sinon.stub(jwtUtils, 'decode').returns({ id: 1, username: 'teste' });
    sinon.stub(UserModel, 'findByPk').resolves(null);
    const httpResponse = await chai.request(app).post('/orders').send(orderToAdd).set({ authorization: 'token' });
    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: '"userId" not found' });
  });

  it('internal server error', async function () {
    sinon.stub(jwtUtils, 'decode').returns({ id: 1, username: 'teste' });
    sinon.stub(UserModel, 'findByPk').throws();
    const httpResponse = await chai.request(app).post('/orders').send(orderToAdd).set({ authorization: 'token' });
    expect(httpResponse).to.have.property('status', 500);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Internal server error' });
  });

  it('successful add', async function () {
    const { userId } = orderToAdd;
    const order = OrderModel.build({ userId, id: 1 });
    sinon.stub(jwtUtils, 'decode').returns({ id: 1, username: 'teste' });
    sinon.stub(UserModel, 'findByPk').resolves({} as UserSequelizeModel);
    sinon.stub(ProductModel, 'update').resolves([2]);
    sinon.stub(OrderModel, 'create').resolves(order)
    const httpResponse = await chai.request(app).post('/orders').send(orderToAdd).set({ authorization: 'token' });
    
    expect(httpResponse).to.have.property('status', 201);
    expect(httpResponse.body).to.be.deep.equal(orderToAdd);
  });
});
