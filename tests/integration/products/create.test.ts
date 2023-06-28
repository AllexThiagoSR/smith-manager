import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app'
import productsMock from '../../mocks/products.mock';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('create a product without name', async function () {
    const httpResponse = await chai.request(app).post('/products').send(productsMock.productWithoutName);
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"name" is required' });
  });

  it('create a product with empty name', async function () {
    const httpResponse = await chai.request(app).post('/products').send(productsMock.productWithInvalidName);
    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: '"name" length must be at least 3 characters long' });
  });

  it('create a product without price', async function () {
    const httpResponse = await chai.request(app).post('/products').send(productsMock.productWithoutPrice);
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"price" is required' });
  });

  it('create a product with empty price', async function () {
    const httpResponse = await chai.request(app).post('/products').send(productsMock.productWithInvalidPrice);
    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: '"price" length must be at least 3 characters long' });
  });

  it('create a product without orderId', async function () {
    const httpResponse = await chai.request(app).post('/products').send(productsMock.productWithouOrderId);
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"orderId" is required' });
  });

  it('create a valid product', async function () {
    const newProduct = ProductModel.build({ ...productsMock.newProduct, id: 2 });
    sinon.stub(ProductModel, 'create').resolves(newProduct);
    const httpResponse = await chai.request(app).post('/products').send(productsMock.newProduct);
    expect(httpResponse).to.have.property('status', 201);
    expect(httpResponse.body).to.be.deep.equal(newProduct.dataValues);
  });

  it('internal server error', async function () {
    sinon.stub(ProductModel, 'create').throws();
    const httpResponse = await chai.request(app).post('/products').send(productsMock.newProduct);
    expect(httpResponse).to.have.property('status', 500);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Internal server error' });
  });
});
