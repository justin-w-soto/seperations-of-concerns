const pool = require('../lib/utils/pool');
// const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');


jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order (POST) in our database and sends a text message', async () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });

  /* CREATE TEST ROUTES FOR GET ALL, GET ID, PATCH, DELETE*/
  it('gets all orders in the database', async () => {
    const order = await Order.insert({ quantity: 10 });

    return request(app)
      .get('/api/v1/orders')
      .then((res) => {
        expect(res.body).toEqual([order]);
      });
  });

  // it('gets order by id', async () => {

  // });

  // it('PATCH', async () => {

  // });

  // it('DELETES orders in the database', async () => {

  // });
});
