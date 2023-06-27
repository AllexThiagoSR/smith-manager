import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productsMock from '../../mocks/products.mock';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('create a valid product', async function () {
    const buildedProducts = productsMock.productsList.map((product) => ProductModel.build(product));
    sinon.stub(ProductModel, 'findAll').resolves(buildedProducts);
    const httpResponse = await chai.request(app).get('/products');
    expect(httpResponse).to.have.property('status', 200);
    expect(httpResponse.body).to.be.deep.equal(productsMock.productsList);
  });

  it('internal server error', async function () {
    sinon.stub(ProductModel, 'findAll').throws();
    const httpResponse = await chai.request(app).get('/products');
    expect(httpResponse).to.have.property('status', 500);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Internal server error' });
  });
});
