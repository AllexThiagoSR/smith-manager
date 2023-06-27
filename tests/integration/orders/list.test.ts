import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ordersMock from '../../mocks/orders.mock';
import productsMock from '../../mocks/products.mock';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('internal server error', async function () {
    sinon.stub(OrderModel, 'findAll').throws();
    const httpResponse = await chai.request(app).get('/orders');
    expect(httpResponse).to.have.property('status', 500);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Internal server error' });
  });
});
